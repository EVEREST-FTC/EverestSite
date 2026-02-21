package com.everest.site.controller.notebook;

import com.everest.site.domain.dto.stem.projects.NotebookRequest;
import com.everest.site.domain.dto.stem.projects.NotebookResponse;
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
@RequestMapping("/user/notebook")
@RequiredArgsConstructor
public class NotebookController {
    private final InventoryMaterialService service;

    @GetMapping
    @PreAuthorize("hasAuthority('user::read')")
    public ResponseEntity<Set<NotebookResponse>> getNotebook(@AuthenticationPrincipal User user) {
        String userEmail = user.getEmail();
        Set<NotebookResponse> notebooks = service.findAll(userEmail);
        return ResponseEntity.ok(notebooks);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<NotebookResponse> createNotebook(@RequestBody NotebookRequest notebookDTO,
                                                           @AuthenticationPrincipal User user) {
        Optional<NotebookResponse> materialResponse = service.addNotebook(notebookDTO, user);

        return materialResponse.map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @DeleteMapping("/{notebookName}")
    @PreAuthorize("hasAuthority('user::delete')")
    public ResponseEntity<String> deleteNotebook(@PathVariable String notebookName,
                                                @AuthenticationPrincipal User user) {
        String userEmail = user.getEmail();

        service.deleteNotebook(notebookName, userEmail);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{notebookName}")
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<NotebookResponse> updateNotebook(
            @PathVariable String notebookName,
            @RequestBody NotebookRequest notebookRequest,
            @AuthenticationPrincipal User user
    ){
        Optional<NotebookResponse> updatedMaterial = service.updateNotebook(notebookName, notebookRequest, user);

        // Se o projeto foi encontrado, atualizado e salvo:
        return updatedMaterial.map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @PatchMapping("/{materialName}")
    @PreAuthorize("hasAuthority('user::write')")
    public void patchNotebook(
            @RequestBody Map<String, Object> updates,
            @PathVariable String notebookName,
            @AuthenticationPrincipal User user){
        service.updatePatch(user.getEmail(), notebookName, updates);
    }
}
