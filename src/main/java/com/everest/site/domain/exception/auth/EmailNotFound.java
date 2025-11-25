package com.everest.site.domain.exception.auth;

public class EmailNotFound extends RuntimeException {
    public EmailNotFound(String email) {
        super(
                String.format(
                        "Could not find the user with the required email: %s"
                        , email)
        );
    }
}
