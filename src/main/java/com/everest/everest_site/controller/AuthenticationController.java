package com.everest.everest_site.controller;

import com.everest.everest_site.domain.user.User;
import com.everest.everest_site.dto.auth.LoginRequest;
import com.everest.everest_site.dto.auth.LoginResponse;
import com.everest.everest_site.dto.auth.RegisterRequest;
import com.everest.everest_site.dto.auth.RegisterResponse;
import com.everest.everest_site.infra.security.TokenService;
import com.everest.everest_site.repository.UserRepository;
import jakarta.servlet.Registration;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController{

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest login){
        User user = this.userRepository.findByEmail(login.email())
                .orElseThrow(()->new RuntimeException("User not found"));
        if(!passwordEncoder.matches(login.password(), user.getPassword()))
            return  ResponseEntity.badRequest().build();

        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(new LoginResponse(login.email(),token));
    }
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registration){
        Optional<User> verifyUser = this.userRepository.findByEmail(registration.email());
        if(verifyUser.isPresent())
            return ResponseEntity.badRequest().build();
        User user = User.builder()
                .password(passwordEncoder.encode(registration.password()))
                .email(registration.email())
                .username(registration.name())
                .build();

        this.userRepository.save(user);

        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(new RegisterResponse(user.getUsername(),token));
    }
}

