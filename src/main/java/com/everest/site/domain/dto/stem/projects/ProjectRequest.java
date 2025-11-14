package com.everest.site.domain.dto.stem.projects;

public record ProjectRequest(Integer reachedPeople,
                             Integer km,
                             String name,
                             String description) {
}
