package com.everest.site.controller.code.gen;

import com.everest.site.domain.dto.sdk.SdkGen;
import com.everest.site.domain.dto.sdk.SdkResponse;
import com.everest.site.domain.dto.stem.projects.ProjectResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.sdk.Dependency;
import com.everest.site.service.sdk.SdkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Controller
@RequestMapping("/sdk-initializr/user")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserSDKInitializr {
    final SdkService service;
    @PostMapping
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<SdkResponse> fetch(@RequestBody SdkGen sdkGen, @AuthenticationPrincipal User user) {
        Optional<SdkResponse> projectURL = service.addToUser(sdkGen, user);
        return ResponseEntity.ok()
                .body(projectURL.orElse(new SdkResponse("sem nome", "sem descrição", "about:blank")));

    }

    @GetMapping
    @PreAuthorize("hasAuthority('user::read')")
    public ResponseEntity<List<SdkResponse>> getProjects(@AuthenticationPrincipal User user) {
        return
                ResponseEntity.ok().body(
                        user.getSdks()
                             .stream()
                             .map(sdk-> new SdkResponse(sdk.getTitle(), sdk.getDescription(),  sdk.getLink()))
                             .toList());
    }
}
