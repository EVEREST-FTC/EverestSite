package com.everest.site.service.info;

import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.info.UserResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.domain.exception.auth.EmailNotFound;
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
        User userToDelete = verifyUser(email);
        userRepository.delete(userToDelete);
    }

    @Transactional
    public Optional<UserResponse> updateUser(String lastEmail, RegisterRequest registerRequest) {
        User user = verifyUser(lastEmail);

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

        User user = verifyUser(email);
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
        User user = verifyUser(email);
        return Optional.of(new UserResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getId()
        ));
    }

    private User verifyUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()) throw new  EmailNotFound(email);
        return userOptional.get();
    }
}
