package com.everest.site.domain.entity.notebook;

import jakarta.persistence.*;
import lombok.*;
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Removed "id" from here so we can check for business duplicates
@EqualsAndHashCode(of = {"date", "tag", "content"})
public class Notebook {

    @Column(name = "entry_id")
    private String id; // Keep this for referencing the note in the UI/API

    private String date;
    private String tag;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String author;
}