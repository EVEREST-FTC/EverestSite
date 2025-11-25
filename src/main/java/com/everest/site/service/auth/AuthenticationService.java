package com.everest.site.service.auth;


import com.everest.site.domain.dto.users.LoginRequest;
import com.everest.site.domain.dto.users.LoginResponse;
import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.RegisterResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.auth.roles.Role;
import com.everest.site.domain.exception.admin.intrinsics.UnalteredRoleException;
import com.everest.site.domain.exception.auth.EmailNotFound;
import com.everest.site.domain.exception.auth.WrongPassword;
import com.everest.site.infra.auth.UserRepository;
import com.everest.site.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
            throw new EmailNotFound(register.email());
        return Optional.of(buildUser(register, role));
    }

    private RegisterResponse buildUser(RegisterRequest register, Role role) {
        User user = User.builder()
                .password(passwordEncoder.encode(register.password()))
                .email(register.email())
                .username(register.name())
                .role(role)
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
}

