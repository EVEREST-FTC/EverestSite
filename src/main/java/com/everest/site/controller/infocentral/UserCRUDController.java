package com.everest.site.controller.infocentral;

import com.everest.site.domain.dto.users.RegisterRequest;
import com.everest.site.domain.dto.users.info.UserResponse;
import com.everest.site.domain.entity.auth.User;
import com.everest.site.service.info.UserDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserCRUDController {
    private final UserDataService userDataService;
    @DeleteMapping
    @PreAuthorize("hasAuthority('user::delete')")
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal User user) {
        userDataService.deleteUser(user.getEmail());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<UserResponse> patchUser(@RequestBody Map<String, Object> patchedInfo,
                                                  @AuthenticationPrincipal User user) {
        return  userDataService.patchUser(user.getEmail(), patchedInfo).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    @PreAuthorize("hasAuthority('user::write')")
    public ResponseEntity<UserResponse> putUser(@AuthenticationPrincipal User user,
                                    @RequestBody RegisterRequest registerRequest) {
        return userDataService.updateUser(user.getEmail(), registerRequest).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    @PreAuthorize("hasAuthority('user::read')")
    public ResponseEntity<UserResponse> getUser(@AuthenticationPrincipal User user){
        return userDataService.getUser(user.getEmail()).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


}
