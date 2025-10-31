package com.everest.everest_site.controller;

import com.everest.everest_site.dto.auth.RegisterRequest;
import com.everest.everest_site.dto.auth.RegisterResponse;
import com.everest.everest_site.service.AuthenticationService;
import jakarta.ws.rs.GET;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
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
