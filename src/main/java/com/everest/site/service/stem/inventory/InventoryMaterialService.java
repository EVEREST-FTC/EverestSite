package com.everest.site.service.stem.inventory;

import com.everest.site.domain.dto.stem.projects.NotebookRequest;
import com.everest.site.domain.dto.stem.projects.NotebookResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.notebook.Notebook;
import com.everest.site.domain.exception.auth.EmailNotFound;
import com.everest.site.infra.auth.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryMaterialService {

    private final UserRepository userRepository;
    @Transactional
    public Optional<NotebookResponse> updateNotebook(String notebookId, NotebookRequest notebookDTO, User user) {
        // Fetch managed user first
        User managedUser = findUser(user.getEmail());

        Optional<Notebook> optionalMaterial = managedUser.getNotebookEntries().stream()
                .filter(project1 -> project1.getId().equals(notebookId))
                .findFirst();

        if(optionalMaterial.isEmpty()) return Optional.empty();

        Notebook material = optionalMaterial.get();
        managedUser.deleteNotebook(material);

        return addNotebook(notebookDTO, managedUser);
    }
    public Set<NotebookResponse> findAll(String email) {
        User user = findUser(email);
        Set<Notebook> notebooks = user.getNotebookEntries();
        return notebooks.stream()
                .map(NotebookResponse::fromEntity)
                .collect(Collectors.toSet());
    }

    public Set<NotebookResponse> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(User::getNotebookEntries)
                .flatMap(Set::stream)
                .map(NotebookResponse::fromEntity)
                .collect(Collectors.toSet());
    }


    public Optional<NotebookResponse> addNotebook(NotebookRequest projectDTO, User user) {
        User managedUser = findUser(user.getEmail());

        // 2. Pass the MANAGED user to the builder
        Optional<Notebook> savedMaterial = buildNotebook(projectDTO, managedUser);

        if(savedMaterial.isEmpty()) return Optional.empty();

        Notebook notebook = savedMaterial.get();
        return Optional.of(NotebookResponse.fromEntity(notebook));
    }

    public Optional<Notebook> buildNotebook(NotebookRequest request, User user) {
        Notebook entry = Notebook.builder()
                .id(UUID.randomUUID().toString()) // Unique handle for the UI
                .date(request.date())
                .tag(request.tag())
                .content(request.content())
                .author(request.author())
                .build();

        // This now checks if the user ALREADY has a note with this date, tag, and content
        if (user.getNotebookEntries().contains(entry)) {
            return Optional.empty();
        }

        user.addNotebook(entry);
        userRepository.save(user);
        return Optional.of(entry);
    }

    public void deleteNotebook(String notebookId, String authenticatedEmail) {
        User user = findUser(authenticatedEmail);
        Notebook notebook = assertNotebook(authenticatedEmail, notebookId);
        user.deleteNotebook(notebook);//projeto deletado
        userRepository.save(user);
    }

    public void updatePatch(String authenticatedEmail, String projectName, Map<String, Object> fields){
        Notebook projectValue = assertNotebook(authenticatedEmail, projectName);
        merge(fields, projectValue);
    }

    private void merge(Map<String, Object> fields, Notebook project) {
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(Notebook.class, key);
            field.setAccessible(true);
            ReflectionUtils.setField(field, project, value);
        });
    }

    private Optional<Notebook> searchNotebook(User user, String projectId) {
        return user.getNotebookEntries().stream()
                .filter(project1 -> project1.getId().equals(projectId))
                .findFirst();
    }

    private User findUser(String authenticatedEmail){
        Optional<User> userOptional = userRepository.findByEmail(authenticatedEmail);
        if (userOptional.isEmpty()) throw new EmailNotFound(authenticatedEmail);
        return userOptional.get();
    }
    private Notebook assertNotebook(String authenticatedEmail, String projectName){
        User user = findUser(authenticatedEmail);
        Optional<Notebook> project = searchNotebook(user, projectName);
        if (project.isEmpty()) throw new RuntimeException(user.getUsername());
        return project.get();
    }

}
