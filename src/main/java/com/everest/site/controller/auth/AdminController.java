package com.everest.site.controller.auth;


import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.RegisterResponse;
import com.everest.site.service.auth.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AuthenticationService authenticationService;

    @PostMapping("/managers")
    public ResponseEntity<RegisterResponse> recordManager(
            @RequestBody RegisterRequest registerRequest
    ){
        Optional<RegisterResponse> promoteRequest =
                authenticationService.registerManager(registerRequest);
        return promoteRequest.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.accepted()
                .build());
    }

}