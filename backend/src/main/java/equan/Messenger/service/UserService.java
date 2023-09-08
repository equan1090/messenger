package equan.Messenger.service;

import equan.Messenger.model.User;
import equan.Messenger.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private PasswordEncoder encoder;
    private final UserRepository userRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();

    }

//    public User createUser(User user) {
//        Optional<User> existingUser = userRepository.findUserByEmail(user.getEmail());
//        if (existingUser.isPresent()) {
//            throw new ApiRequestException("Email already exists");
//        }
//        user.setPassword(encoder.encode(user.getPassword()));
//        return userRepository.insert(user);
//    }

    public void addFriend(String userId, String friendId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<User> friendOpt = userRepository.findById(friendId);

        if (userOpt.isPresent() && friendOpt.isPresent()) {
            User user = userOpt.get();
            User friend = userOpt.get();

            user.getFriends().add(friendId);
            friend.getFriends().add(userId);

            userRepository.save(user);
            userRepository.save(friend);
        }

    }

//    public LoginResponseDTO loginUser(User user) {
//        try {
//            String token = tokenService.generateJwt()
//        } catch(AuthenticationException e) {
//            return new LoginResponseDTO(null, "");
//        }
//    }
    public void removeFriend(String userId, String friendId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<User> friendOpt = userRepository.findById(friendId);

        if (userOpt.isPresent() && friendOpt.isPresent()) {
            User user = userOpt.get();
            User friend = friendOpt.get();

            user.getFriends().remove(friendId);
            friend.getFriends().remove(userId);

            userRepository.save(user);
            userRepository.save(friend);
        }
    }

}
