package com.everest.site.domain.dto.stem.projects;

import com.everest.site.domain.entity.notebook.Notebook;

public record NotebookResponse(String id, String author, String content, String tag, String date) {
    public static NotebookResponse fromEntity(Notebook inventoryMaterial) {
        return new NotebookResponse(inventoryMaterial.getId(),
                inventoryMaterial.getAuthor(),
                inventoryMaterial.getContent(),
                inventoryMaterial.getTag(),
                inventoryMaterial.getDate());
    }
}
