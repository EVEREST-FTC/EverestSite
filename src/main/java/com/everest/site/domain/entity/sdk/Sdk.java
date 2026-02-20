package com.everest.site.domain.entity.sdk;

import jakarta.persistence.Embeddable;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Sdk {
    private String title;
    private String description;
    private String link;
}
