package com.everest.site.controller.STEM.material;

import com.everest.site.service.stem.material.StorageMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/stem/material/user")
@RestController
@PreAuthorize("hasRole('USER')")
@RequiredArgsConstructor
public class UserMaterialController {
    private final StorageMaterialService storageMaterialService;

    @GetMapping
    public ResponseEntity<List<String>> listMaterials() {
        return ResponseEntity.ok(storageMaterialService.listMaterials());
    }
    @GetMapping("/{filekey}")
    public ResponseEntity<String> getURL(@RequestParam("key")String fileKey){
        try {
            String presignedUrl = storageMaterialService.getPresignedURL(fileKey);

            // Retornamos a URL para o cliente
            return ResponseEntity.ok(presignedUrl);
        } catch (Exception e) {
            // Em um sistema real, você verificaria se a chave S3 existe (404)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Falha ao gerar o link de download: " + e.getMessage());
        }
    }
}
