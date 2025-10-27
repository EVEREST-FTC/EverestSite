package com.everest.everest_site.controller;

import com.everest.everest_site.domain.user.User;
import com.everest.everest_site.dto.auth.LoginRequest;
import com.everest.everest_site.dto.auth.LoginResponse;
import com.everest.everest_site.dto.auth.RegisterRequest;
import com.everest.everest_site.dto.auth.RegisterResponse;
import com.everest.everest_site.infra.security.TokenService;
import com.everest.everest_site.repository.UserRepository;
import com.everest.everest_site.service.AuthenticationService;
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

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest login){
       Optional<LoginResponse> loginResponse = authenticationService.login(login);
        return loginResponse.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registration){
        Optional<RegisterResponse> registerResponse = authenticationService.register(registration);
        return registerResponse.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}

