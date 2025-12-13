package com.everest.site.controller.code.gen;

import com.everest.site.domain.dto.sdk.SdkGen;
import com.everest.site.domain.entity.sdk.Dependency;
import com.everest.site.service.sdk.SdkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/sdk-initializr/user")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserSDKInitializr {
    final SdkService service;
    @PostMapping
    public ResponseEntity<String> fetch(@RequestBody SdkGen sdkGen) {

        Optional<String> projectURL = service.buildProjectToAWS(sdkGen);
        return ResponseEntity.ok()
                .body(projectURL.orElse(""));

    }
}
