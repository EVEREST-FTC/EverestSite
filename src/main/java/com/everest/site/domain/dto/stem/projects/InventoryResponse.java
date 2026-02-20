package com.everest.site.domain.dto.stem.projects;

import com.everest.site.domain.entity.inventory.InventoryMaterial;

public record InventoryResponse(String name, int quantity) {
    public static InventoryResponse fromEntity(InventoryMaterial inventoryMaterial) {
        return new InventoryResponse(inventoryMaterial.getName(), inventoryMaterial.getQuantity());
    }
}
