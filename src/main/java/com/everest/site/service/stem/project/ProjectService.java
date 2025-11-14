package com.everest.site.service.stem.project;


import com.everest.site.domain.dto.stem.projects.ProjectRequest;
import com.everest.site.domain.dto.stem.projects.ProjectResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.entity.project.Project;
import com.everest.site.infra.auth.UserRepository;
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
public class ProjectService {
    private final UserRepository userRepository;
    @Transactional
    public Optional<ProjectResponse> updateProject(String projectName, ProjectRequest projectDTO, User user) {
        Optional<Project> optionalProject = user.getProjects().stream().filter(project1 -> project1.getName().equals(projectName)).findFirst();
        if(optionalProject.isEmpty()) return Optional.empty();
        Project project = optionalProject.get();
        user.deleteProject(project);

        return addProject(projectDTO, user);
    }
    public Set<ProjectRequest> findAll(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        //lançar exceção para "nçao achou o email dentro do repositorio"
        if (userOptional.isEmpty()) return null;
        User user = userOptional.get();
        Set<Project> projects = user.getProjects();
        return projects.stream()
                .map(project ->
                        new ProjectRequest(
                                project.getReachedPeople(),
                                project.getKm(),
                                project.getName(),
                                project.getDescription()
                        )
                )
                .collect(Collectors.toSet());
    }

    public Set<ProjectRequest> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(User::getProjects)
                .flatMap(Set::stream)
                .map(project ->
                        new ProjectRequest(
                                project.getReachedPeople(),
                                project.getKm(),
                                project.getName(),
                                project.getDescription()
                        )
                )
                .collect(Collectors.toSet());
    }

    public Optional<ProjectResponse> addProject(ProjectRequest projectDTO, User user) {
        //projeto adicionado
        Optional<Project> savedProject = buildProject(projectDTO, user);
        if(savedProject.isEmpty()) return Optional.empty();
        System.out.println("Chegou aqui 3");
        //chave, descrição
        Project project = savedProject.get();
        return Optional.of(new ProjectResponse(
                project.getName(),
                project.getDescription()
        ));
    }

    public Optional<Project> buildProject(ProjectRequest projectDTO, User user) {
        Project project = Project.builder()
                .km(projectDTO.km())
                .description(projectDTO.description())
                .name(projectDTO.name())
                .reachedPeople(projectDTO.reachedPeople())
                .build();
        if (user.getProjects().contains(project))
            //projeto existente
            return Optional.empty();
        user.addProject(project);
        userRepository.save(user);
        return Optional.of(project);
    }

    public boolean deleteProject(String projectName, String authenticatedEmail) {
        Optional<User> userOptional = userRepository.findByEmail(authenticatedEmail);
        if (userOptional.isEmpty()) return false;//user not found throw exception
        User user = userOptional.get();
        Optional<Project> project = searchProject(user, projectName);
        if (project.isEmpty()) return false;//throw expection> project not found
        Project projectValue = project.get();
        user.deleteProject(projectValue);//projeto deletado
        userRepository.save(user);
        return true;
    }

    @Transactional
    public void updatePatch(String authenticatedEmail, String projectName, Map<String, Object> fields){
        Optional<User> userOptional = userRepository.findByEmail(authenticatedEmail);
        //lançar exceção
        if(userOptional.isEmpty()) return;
        User user = userOptional.get();
        Optional<Project> project = searchProject(user, projectName);
        //lançar exceção
        if(project.isEmpty()) return;
        Project projectValue = project.get();
        merge(fields, projectValue);
    }

    private void merge(Map<String, Object> fields, Project project) {
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(Project.class, key);
            field.setAccessible(true);
            ReflectionUtils.setField(field, project, value);
        });
    }

    private Optional<Project> searchProject(User user, String projectName) {
        return user.getProjects().stream()
                .filter(project1 -> project1.getName().equals(projectName))
                .findFirst();
    }
}