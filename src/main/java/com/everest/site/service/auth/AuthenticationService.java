package com.everest.site.service.auth;


import com.everest.site.domain.dto.stem.projects.ProjectRequest;
import com.everest.site.domain.dto.stem.projects.ProjectResponse;
import com.everest.site.domain.dto.users.LoginRequest;
import com.everest.site.domain.dto.users.LoginResponse;
import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.RegisterResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.auth.roles.Role;
import com.everest.site.domain.entity.project.Project;
import com.everest.site.domain.exception.admin.intrinsics.UnalteredRoleException;
import com.everest.site.domain.exception.auth.EmailNotFound;
import com.everest.site.domain.exception.auth.ExistentUser;
import com.everest.site.domain.exception.auth.WrongPassword;
import com.everest.site.domain.exception.stem.project.ProjectNotFound;
import com.everest.site.infra.auth.UserRepository;
import com.everest.site.infra.security.TokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public Optional<LoginResponse> login(LoginRequest login) {
        User user = this.userRepository.findByEmail(login.email())
                .orElseThrow(
                        ()->new EmailNotFound(login.email()
                        ));
        if(!passwordEncoder.matches(login.password(), user.getPassword()))
            throw new WrongPassword();

        String token = tokenService.generateToken(user);

        return Optional.of(new LoginResponse(login.email(),token, user.getRole().toString()));
    }
    public Optional<RegisterResponse> register(RegisterRequest register, Role role) {
        Optional<User> verifyUser = this.userRepository.findByEmail(register.email());
        if(verifyUser.isPresent())
            throw new ExistentUser(register.email());
        return Optional.of(buildUser(register, role));
    }

    private RegisterResponse buildUser(RegisterRequest register, Role role) {
        User user = User.builder()
                .password(passwordEncoder.encode(register.password()))
                .email(register.email())
                .username(register.name())
                .role(role)
                .isActiveInFirst(register.isActiveInFIRST())
                .build();

        this.userRepository.save(user);

        String token = tokenService.generateToken(user);
        return new RegisterResponse(user.getUsername(),token);
    }

    public Optional<RegisterResponse> registerManager(RegisterRequest register) {
        Optional<User> verifyUser = this.userRepository.findByEmail(register.email());
        //usuario inexistente, criado como manager
        if(verifyUser.isEmpty())
            return Optional.of(buildUser(register, Role.MANAGER));
        //usuário existente, atualiza a role
        User user = verifyUser.get();
        //retorna nada se o usuário já é manager
        if(!updateRole(user, Role.MANAGER))
            throw new UnalteredRoleException(register.name());


        String newToken = tokenService.generateToken(user);
        return Optional.of(new RegisterResponse(user.getUsername(), newToken));
    }

    public boolean updateRole(User user, Role newRole) {
        if (user.getRole() == newRole)
            return false;

        user.setRole(newRole);
        this.userRepository.save(user);
        return true;
    }


    @Transactional
    public RegisterResponse updateUser(RegisterRequest projectDTO, User user) {
        user.setEmail(projectDTO.email());
        user.setPassword(passwordEncoder.encode(projectDTO.password()));
        user.setActiveInFirst(projectDTO.isActiveInFIRST());
        user.setUsername(projectDTO.name());

        this.userRepository.save(user);
        String newToken = tokenService.generateToken(user);
        return new RegisterResponse(user.getUsername(), newToken);
    }
    @Transactional
    public void patchUser(User user, Map<String, Object> updates) {
        updates.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(User.class, key);
            field.setAccessible(true);
            ReflectionUtils.setField(field, user, value);
        });
        this.userRepository.save(user);
    }
}

