package com.everest.site.domain.exception.auth;

public class ExistentUser extends RuntimeException {
    public ExistentUser(String email) {
        super(
                String.format(
                        "User with email %s already exists"
                        , email)
        );
    }
}
