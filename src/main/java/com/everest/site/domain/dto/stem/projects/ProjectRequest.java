package com.everest.site.domain.dto.stem.projects;

import java.time.LocalDate;

public record ProjectRequest(
        String title,
        String goal,
        LocalDate deadline) {
}
