package com.everest.site.domain.exception.stem.project;

public class ExistentProject extends RuntimeException {
    public ExistentProject(String projectName) {
        super(
                String.format(
                        "The project %s alredy exists", projectName
                )
        );
    }
}
