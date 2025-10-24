package com.everest.everest_site.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stem-dash")
@RequiredArgsConstructor
public class STEMDashboardController {
    @GetMapping
    public ResponseEntity<String> homepage() {
        return  ResponseEntity.ok("Aqui está o stem dashboard");
    }
}
