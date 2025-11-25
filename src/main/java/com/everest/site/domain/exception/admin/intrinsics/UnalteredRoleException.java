package com.everest.site.domain.exception.admin.intrinsics;

public class UnalteredRoleException extends RuntimeException {
    public UnalteredRoleException(String requiredManager) {
        super(
                String.format(
                        "The required user to update: %s is already a manager",
                        requiredManager
                )
        );
    }
}
