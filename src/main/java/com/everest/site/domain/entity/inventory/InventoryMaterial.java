package com.everest.site.domain.entity.inventory;

import jakarta.persistence.Embeddable;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@EqualsAndHashCode(of = "name")
public class InventoryMaterial{
    private String name;
    private int quantity;
}
