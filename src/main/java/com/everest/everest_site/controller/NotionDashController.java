package com.everest.everest_site.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notion-dash")
@RequiredArgsConstructor
public class NotionDashController {
    @GetMapping
    public ResponseEntity<String> homepage() {
        return  ResponseEntity.ok("Aqui está a página do notion");
    }
    @GetMapping("/admin")
    public ResponseEntity<String> adminPage() {
        return ResponseEntity.ok("Pagina dos admins");
    }

}
