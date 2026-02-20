package com.everest.site.controller.material;

import com.everest.site.domain.dto.stem.material.MaterialRequest;
import com.everest.site.domain.dto.stem.material.MaterialResponse;
import com.everest.site.domain.dto.stem.projects.InventoryRequest;
import com.everest.site.domain.dto.stem.projects.InventoryResponse;
import com.everest.site.domain.dto.stem.projects.ProjectResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.service.stem.inventory.InventoryMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/user/material")
@RequiredArgsConstructor
public class MaterialController {
    private final InventoryMaterialService service;

    @GetMapping
    @PreAuthorize("hasAuthority('user::read')")
    public ResponseEntity<Set<InventoryResponse>> getMaterial(@AuthenticationPrincipal User user) {
        String userEmail = user.getEmail();
        Set<InventoryResponse> materials = service.findAll(userEmail);
        return ResponseEntity.ok(materials);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<InventoryResponse> createMaterial(@RequestBody InventoryRequest materialDTO,
                                                         @AuthenticationPrincipal User user) {
        Optional<InventoryResponse> materialResponse = service.addMaterial(materialDTO, user);

        return materialResponse.map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @DeleteMapping("/{materialName}")
    @PreAuthorize("hasAuthority('user::delete')")
    public ResponseEntity<String> deleteMaterial(@PathVariable String materialName,
                                                @AuthenticationPrincipal User user) {
        String userEmail = user.getEmail();

        service.deleteMaterial(materialName, userEmail);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{materialName}")
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<InventoryResponse> updateMaterial(
            @PathVariable String materialName,
            @RequestBody InventoryRequest materialDTO,
            @AuthenticationPrincipal User user
    ){
        Optional<InventoryResponse> updatedMaterial = service.updateMaterial(materialName, materialDTO, user);

        // Se o projeto foi encontrado, atualizado e salvo:
        return updatedMaterial.map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @PatchMapping("/{materialName}")
    @PreAuthorize("hasAuthority('user::write')")
    public void patchMaterial(
            @RequestBody Map<String, Object> updates,
            @PathVariable String materialName,
            @AuthenticationPrincipal User user){
        service.updatePatch(user.getEmail(), materialName, updates);
    }
}
