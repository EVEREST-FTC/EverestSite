package com.everest.site.controller.STEM.project;

import com.everest.site.domain.dto.stem.projects.ProjectRequest;
import com.everest.site.domain.dto.stem.projects.ProjectResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.service.stem.project.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/stem/users/projects")
@RequiredArgsConstructor
public class STEMUserController {
    private final ProjectService projectService;

    @GetMapping
    @PreAuthorize("hasAuthority('user::read')")
    public ResponseEntity<Set<ProjectRequest>> getProjects(@AuthenticationPrincipal User user) {
        String userEmail = user.getEmail();
        Set<ProjectRequest> projects = projectService.findAll(userEmail);
        return ResponseEntity.ok(projects);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<ProjectResponse> createProject(@RequestBody ProjectRequest projectDTO,
                                                         @AuthenticationPrincipal User user) {
        Optional<ProjectResponse> projectResponse = projectService.addProject(projectDTO, user);

        return projectResponse.map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @DeleteMapping("/{projectName}")
    @PreAuthorize("hasAuthority('user::delete')")
    public ResponseEntity<String> deleteProject(@PathVariable String projectName,
                                                @AuthenticationPrincipal User user) {
        String userEmail = user.getEmail();

        projectService.deleteProject(projectName, userEmail);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{projectName}")
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable String projectName,
            @RequestBody ProjectRequest projectDTO,
            @AuthenticationPrincipal User user
    ){
        Optional<ProjectResponse> updatedProject = projectService.updateProject(projectName, projectDTO, user);

        // Se o projeto foi encontrado, atualizado e salvo:
        return updatedProject.map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @PatchMapping("/{projectName}")
    @PreAuthorize("hasAuthority('user::write')")
    public void patchProject(
                                                        @RequestBody Map<String, Object> updates,
                                                        @PathVariable String projectName,
                                                        @AuthenticationPrincipal User user){
        projectService.updatePatch(user.getEmail(), projectName, updates);
    }


}

