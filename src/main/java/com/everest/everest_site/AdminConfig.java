package com.everest.everest_site;

import com.everest.everest_site.dto.auth.RegisterRequest;
import com.everest.everest_site.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminComponent {
    @Value("${spring.security.user.name}")
    private String adminEmail;
    @Value("${spring.security.user.password}")
    private String adminPassword;
    @Bean
    public CommandLineRunner initAdmin(AuthenticationService authentication) {
        return args ->
            authentication.registerAdmin(
                    new RegisterRequest("admin", adminEmail, adminPassword)
            );

    }
}
