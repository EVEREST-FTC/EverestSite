package com.everest.site.domain.exception.auth;

public class WrongPassword extends RuntimeException {
    public WrongPassword() {
        super("Wrong Password for the required user");
    }
}
