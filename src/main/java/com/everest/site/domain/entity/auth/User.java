package com.everest.site.domain.entity.auth;

import com.everest.site.domain.entity.auth.roles.Role;
import com.everest.site.domain.entity.project.Project;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.function.Consumer;

@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String id;
    private String username;
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_projects",
            joinColumns = @JoinColumn(name = "user_id")
    )
    private Set<Project> projects;

    public void deleteProject(Project project){
        this.projects.remove(project);
    }

    public void addProject(Project project){
        this.projects.add(project);
    }

    public void setProject(Project project, Consumer<Project> consumer){
        consumer.accept(project);
        this.projects.add(project);
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }
}
