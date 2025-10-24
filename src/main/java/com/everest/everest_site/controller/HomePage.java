package com.everest.everest_site.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/homepage")
public class HomePage {
    @GetMapping
    public ResponseEntity<String> homepage() {
        return  ResponseEntity.ok("Pagina inicial");
    }
}
