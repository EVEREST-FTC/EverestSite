package com.everest.site.service.stem.inventory;

import com.everest.site.domain.dto.stem.material.MaterialResponse;
import com.everest.site.domain.dto.stem.projects.InventoryRequest;
import com.everest.site.domain.dto.stem.projects.InventoryResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.inventory.InventoryMaterial;
import com.everest.site.domain.exception.auth.EmailNotFound;
import com.everest.site.infra.auth.UserRepository;
import com.everest.site.infra.ports.StoragePort;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryMaterialService {

    private final UserRepository userRepository;
    @Transactional
    public Optional<InventoryResponse> updateMaterial(String materialName, InventoryRequest materialDTO, User user) {
        Optional<InventoryMaterial> optionalMaterial = user.getMaterials().stream().filter(project1 -> project1.getName().equals(materialName)).findFirst();
        if(optionalMaterial.isEmpty()) return Optional.empty();
        InventoryMaterial material = optionalMaterial.get();
        user.deleteMaterial(material);

        return addMaterial(materialDTO, user);
    }
    public Set<InventoryResponse> findAll(String email) {
        User user = findUser(email);
        Set<InventoryMaterial> material = user.getMaterials();
        return material.stream()
                .map(m ->
                        new InventoryResponse(
                                m.getName(),
                                m.getQuantity()
                        )
                )
                .collect(Collectors.toSet());
    }

    public Set<InventoryResponse> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(User::getMaterials)
                .flatMap(Set::stream)
                .map(project ->
                        new InventoryResponse(
                                project.getName(),
                                project.getQuantity()
                        )
                )
                .collect(Collectors.toSet());
    }

    public Optional<InventoryResponse> addMaterial(InventoryRequest projectDTO, User user) {
        //projeto adicionado
        Optional<InventoryMaterial> savedMaterial = buildMaterial(projectDTO, user);
        if(savedMaterial.isEmpty()) return Optional.empty();
        //chave, descrição
        InventoryMaterial project = savedMaterial.get();
        return Optional.of(new InventoryResponse(
                projectDTO.name(),
                projectDTO.quantity()
        ));
    }

    public Optional<InventoryMaterial> buildMaterial(InventoryRequest materialDTO, User user) {
        InventoryMaterial material = new InventoryMaterial(materialDTO.name(), materialDTO.quantity());
        if (user.getMaterials().contains(material))
            return Optional.empty();
        user.addMaterial(material);
        userRepository.save(user);
        return Optional.of(material);
    }

    public void deleteMaterial(String materialName, String authenticatedEmail) {
        User user = findUser(authenticatedEmail);
        InventoryMaterial materialValue = assertMaterial(authenticatedEmail, materialName);
        user.deleteMaterial(materialValue);//projeto deletado
        userRepository.save(user);
    }

    @Transactional
    public void updatePatch(String authenticatedEmail, String projectName, Map<String, Object> fields){
        InventoryMaterial projectValue = assertMaterial(authenticatedEmail, projectName);
        merge(fields, projectValue);
    }

    private void merge(Map<String, Object> fields, InventoryMaterial project) {
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(InventoryMaterial.class, key);
            field.setAccessible(true);
            ReflectionUtils.setField(field, project, value);
        });
    }

    private Optional<InventoryMaterial> searchMaterial(User user, String projectName) {
        return user.getMaterials().stream()
                .filter(project1 -> project1.getName().equals(projectName))
                .findFirst();
    }

    private User findUser(String authenticatedEmail){
        Optional<User> userOptional = userRepository.findByEmail(authenticatedEmail);
        if (userOptional.isEmpty()) throw new EmailNotFound(authenticatedEmail);
        return userOptional.get();
    }
    private InventoryMaterial assertMaterial(String authenticatedEmail, String projectName){
        User user = findUser(authenticatedEmail);
        Optional<InventoryMaterial> project = searchMaterial(user, projectName);
        if (project.isEmpty()) throw new RuntimeException(user.getUsername());
        return project.get();
    }

    public List<InventoryResponse> searchByName(String name){
        return userRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(InventoryResponse::fromEntity)
                .toList();
    }
}
