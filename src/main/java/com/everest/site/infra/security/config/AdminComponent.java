package com.everest.site.infra.security.config;


import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.entity.auth.roles.Role;
import com.everest.site.service.auth.AuthenticationService;
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
                authentication.register(
                        new RegisterRequest("admin", adminEmail, adminPassword),
                        Role.ADMIN
                );

    }
}
