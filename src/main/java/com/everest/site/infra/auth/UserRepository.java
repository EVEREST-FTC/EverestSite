package com.everest.site.infra.auth;


import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.inventory.InventoryMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByEmail(String login);
    List<InventoryMaterial> findByNameContainingIgnoreCase(String name);
}
