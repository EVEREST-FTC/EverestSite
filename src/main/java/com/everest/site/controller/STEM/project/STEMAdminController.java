package com.everest.site.controller.STEM.project;

import com.everest.site.domain.dto.stem.projects.ProjectRequest;
import com.everest.site.service.stem.project.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/stem/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class STEMAdminController {
    private final ProjectService projectService;

    @GetMapping("/projects")
    public ResponseEntity<Set<ProjectRequest>> getAllProjects() {
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/project/{userId}")
    public ResponseEntity<Set<ProjectRequest>> getUserProjects(@PathVariable("userId") String userId) {

       return ResponseEntity.ok(projectService.findAll(userId));

    }

    @DeleteMapping("/project/{userId}/{projectName}")
    public ResponseEntity<String> deleteUserProject(
            @PathVariable("userId") String userId,
            @PathVariable("projectName") String projectName
    ) {
        boolean canDelete = projectService.deleteProject(userId, projectName);
        if (canDelete)
            return ResponseEntity.ok("Project deleted successfully");
        else
            return ResponseEntity.notFound().build();
    }

}
