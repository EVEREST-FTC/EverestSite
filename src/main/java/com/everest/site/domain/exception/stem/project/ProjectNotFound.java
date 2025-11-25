package com.everest.site.domain.exception.stem.project;

public class ProjectNotFound extends RuntimeException {
    public ProjectNotFound(String username, String project) {
        super(
                String.format(
                        "Could not find the project with name %s associated with user %s",
                        project, username
                )
        );
    }
}
