package equan.Messenger.service;

import equan.Messenger.config.JwtService;
import equan.Messenger.controller.AuthenticationRequest;
import equan.Messenger.controller.AuthenticationResponse;
import equan.Messenger.controller.RegisterRequest;
import equan.Messenger.model.Role;
import equan.Messenger.model.User;
import equan.Messenger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println("Made it in service " + request);
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        System.out.println("Ths is user " + user);
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findUserByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }


//    public User createUser(User user) {
//        System.out.println("made it to createUser-----------" + user);
//        Optional<User> existingUser = userRepository.findUserByEmail(user.getEmail());
//        if (existingUser.isPresent()) {
//            throw new ApiRequestException("Email already exists");
//        }
//        Roles userRole = roleRepository.findByAuthority("USER").get();
//        user.setPassword(encoder.encode(user.getPassword()));
//        Set<Roles> authorities = new HashSet<>();
//        authorities.add(userRole);
//        user.setAuthorities(authorities);
//        return userRepository.insert(user);
//    }
//
//
//    public LoginResponseDTO login(String email, String password) {
//        System.out.println("made it to login service");
//        System.out.println("email " + email);
//        System.out.println("password " + password);
////        try{
//            Authentication auth = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(email, password)
//            );
////            System.out.println("auth + " + auth);
////            String token = tokenService.generateJwt(auth);
////            System.out.println("token " + token);
////            return null;
//            return new LoginResponseDTO(userRepository.findUserByEmail(email).get(), "RandomString");
////        }catch (AuthenticationException e) {
////            System.out.println("In catch block");
////            System.out.println("Reason: " + e.getMessage());
//////            return new LoginResponseDTO(null, "");
////            return null;
////        }
//
//
//
//    }

}
