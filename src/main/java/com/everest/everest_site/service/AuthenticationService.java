package com.everest.everest_site.service;

import com.everest.everest_site.domain.user.User;
import com.everest.everest_site.domain.user.roles.Role;
import com.everest.everest_site.dto.auth.LoginRequest;
import com.everest.everest_site.dto.auth.LoginResponse;
import com.everest.everest_site.dto.auth.RegisterRequest;
import com.everest.everest_site.dto.auth.RegisterResponse;
import com.everest.everest_site.infra.security.TokenService;
import com.everest.everest_site.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
                .orElseThrow(()->new RuntimeException("User not found"));
        if(!passwordEncoder.matches(login.password(), user.getPassword()))
            return  Optional.empty();

        String token = tokenService.generateToken(user);
        return Optional.of(new LoginResponse(login.email(),token));
    }
    public Optional<RegisterResponse> register(RegisterRequest register) {
        Optional<User> verifyUser = this.userRepository.findByEmail(register.email());
        if(verifyUser.isPresent())
            return Optional.empty();
        User user = User.builder()
                .password(passwordEncoder.encode(register.password()))
                .email(register.email())
                .username(register.name())
                .role(Role.USER)
                .build();

        this.userRepository.save(user);

        String token = tokenService.generateToken(user);
        return Optional.of(new RegisterResponse(user.getUsername(),token));
    }
}
