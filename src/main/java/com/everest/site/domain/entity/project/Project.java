package com.everest.site.domain.entity.project;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@EqualsAndHashCode(of = "name")
public class Project {
    private Integer reachedPeople;
    private Integer km;
    private String name;
    private String description;

}
