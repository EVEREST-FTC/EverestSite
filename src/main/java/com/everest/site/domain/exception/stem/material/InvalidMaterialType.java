package com.everest.site.domain.exception.stem.material;

public class InvalidMaterialType extends RuntimeException {
    public InvalidMaterialType(String format) {
        super(
                String.format(
                        "Could not send the file with extension %s", format)
        );
    }
}
