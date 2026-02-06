package com.everest.site.domain.dto.stem.projects;

import java.time.LocalDate;

public record ProjectResponse(
        String projectName,
        String goal,

        LocalDate deadline
) {
}
