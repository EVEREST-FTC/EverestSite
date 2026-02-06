package com.everest.site.domain.entity.project;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@EqualsAndHashCode(of = "title")
public class Project {
    private String title;
    private String goal;
    private LocalDate deadline;

}
