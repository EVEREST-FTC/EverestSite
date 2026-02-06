package com.everest.site.controller.STEM.project;

import com.everest.site.domain.dto.stem.projects.ProjectRequest;
import com.everest.site.domain.dto.stem.projects.ProjectResponse;
import com.everest.site.service.stem.project.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/stem/admin/projects")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class STEMAdminController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<Set<ProjectRequest>> getAllProjects() {
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Set<ProjectResponse>> getUserProjects(@PathVariable("userId") String userId) {

       return ResponseEntity.ok(projectService.findAll(userId));

    }

    @DeleteMapping("/{userId}/{projectName}")
    public ResponseEntity<String> deleteUserProject(
            @PathVariable("userId") String userId,
            @PathVariable("projectName") String projectName
    ) {
        projectService.deleteProject(userId, projectName);
        return ResponseEntity.ok("Project deleted successfully");
    }

}
