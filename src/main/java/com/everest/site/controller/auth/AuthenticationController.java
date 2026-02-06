package com.everest.site.controller.auth;

import com.everest.site.domain.dto.users.LoginRequest;
import com.everest.site.domain.dto.users.LoginResponse;
import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.RegisterResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.auth.roles.Role;
import com.everest.site.service.auth.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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

    @GetMapping("/me")
    @PreAuthorize("hasAuthority('user::read')")
    public ResponseEntity<?> getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof User user) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("name", user.getUsername());
            userData.put("role", user.getRole().toString());

            return ResponseEntity.ok(userData);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
    }
}

