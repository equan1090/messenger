package equan.Messenger.service;

import equan.Messenger.exception.ApiRequestException;
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

    public enum FriendAction {
        ADD,
        REMOVE
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();

    }
    public void updateFriend(String email, String friendEmail, FriendAction action) {
        Optional<User> userOpt = userRepository.findUserByEmail(email);
        Optional<User> friendOpt = userRepository.findUserByEmail(friendEmail);

        if (userOpt.isPresent() && friendOpt.isPresent()) {
            User user = userOpt.get();
            User friend = friendOpt.get();

            switch (action) {
                case ADD:
                    user.getFriends().add(friend.getId());
                    friend.getFriends().add(user.getId());
                    break;
                case REMOVE:
                    user.getFriends().remove(friend.getId());
                    friend.getFriends().remove(user.getId());
                    break;
            }

            userRepository.save(user);
            userRepository.save(friend);
        }
    }


    public void addFriend(String email, String friendEmail) {
        updateFriend(email, friendEmail, FriendAction.ADD);
    }

    public void removeFriend(String email, String friendEmail) {
        updateFriend(email, friendEmail, FriendAction.REMOVE);
    }
}
