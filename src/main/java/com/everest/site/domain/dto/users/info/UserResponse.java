package com.everest.site.domain.dto.users.info;

import com.everest.site.domain.entity.auth.roles.Role;

public record UserResponse(String username,
                           String email,
                           Role role,
                           String id
                           ) {
}
