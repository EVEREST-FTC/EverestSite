package com.everest.site.controller.STEM.material;

import com.everest.site.domain.dto.stem.material.MaterialResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.service.stem.material.StorageMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/stem/material/management")
@RestController
@PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
@RequiredArgsConstructor
public class MaterialManagement {
    private final StorageMaterialService  storageMaterialService;

    @PostMapping
    public ResponseEntity<MaterialResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User user
    ) throws IOException {
        return ResponseEntity.ok(
                storageMaterialService.uploadMaterial(file, user.getUsername())
        );
    }
}
