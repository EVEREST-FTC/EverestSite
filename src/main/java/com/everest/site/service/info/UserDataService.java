package com.everest.site.service.info;

import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.info.UserResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.infra.auth.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserDataService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void deleteUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()) return;
        userRepository.delete(user.get());
    }

    @Transactional
    public Optional<UserResponse> updateUser(String lastEmail, RegisterRequest registerRequest) {
        Optional<User> userOptional = userRepository.findByEmail(lastEmail);
        if(userOptional.isEmpty()) return Optional.empty();
        User user = userOptional.get();

        user.setPassword(passwordEncoder.encode(registerRequest.password()));
        user.setEmail(registerRequest.email());
        user.setUsername(registerRequest.name());
        userRepository.save(user);
        return Optional.of(new UserResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getId()
        ));
    }

    @Transactional
    public Optional<UserResponse> patchUser(String email, Map<String, Object> fields){
        Optional<User> userOptional = userRepository.findByEmail(email);
        //lançar exceção
        if(userOptional.isEmpty()) return  Optional.empty();

        User user = userOptional.get();
        merge(fields, user);

        userRepository.save(user);

        return Optional.of(new UserResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getId()
        ));
    }

    private void merge(Map<String, Object> fields, User user){
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(User.class, key);
            field.setAccessible(true);
            ReflectionUtils.setField(field, user, value);
        });
    }

    public Optional<UserResponse> getUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()) return Optional.empty();
        User user = userOptional.get();
        return Optional.of(new UserResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getId()
        ));
    }
}
