package com.everest.site.domain.dto.sdk;

import com.everest.site.domain.entity.sdk.Dependency;

import java.util.List;

public record SdkGen(String projectName, List<Dependency> dependencies) {
}
