package com.everest.site.controller.auth;

import com.everest.site.domain.dto.users.LoginRequest;
import com.everest.site.domain.dto.users.LoginResponse;
import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.RegisterResponse;
import com.everest.site.domain.entity.auth.roles.Role;
import com.everest.site.service.auth.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth/user")
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
        Optional<RegisterResponse> registerResponse = authenticationService.register(registration,
                Role.USER);
        return registerResponse.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}

