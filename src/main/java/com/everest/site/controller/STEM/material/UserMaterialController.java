package com.everest.site.controller.STEM.material;

import com.everest.site.service.stem.material.StorageMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<
            Map.Entry<String, String>> getURL(@PathVariable("filekey")String fileKey){
        try {
            Map.Entry<String, String> presignedUrl = storageMaterialService.getPresignedURL(fileKey);
            return ResponseEntity.ok(presignedUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}
