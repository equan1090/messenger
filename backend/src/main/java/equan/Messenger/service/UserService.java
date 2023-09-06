package equan.Messenger.service;

import equan.Messenger.exception.ApiRequestException;
import equan.Messenger.model.User;
import equan.Messenger.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();

    }

    public User createUser(User user) {

        Optional<User> existingUser = userRepository.findUserByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new ApiRequestException("Email already exists");
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }
        return userRepository.insert(user);
    }
}
