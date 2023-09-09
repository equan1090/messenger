package equan.Messenger.controller;

import equan.Messenger.model.User;
import equan.Messenger.service.UserService;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> fetchAllUser() {
        return userService.getAllUsers();
    }


}
