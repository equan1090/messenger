package equan.Messenger.service;

import equan.Messenger.config.JwtService;
import equan.Messenger.exception.ApiRequestException;
import equan.Messenger.model.AuthenticationRequest;
import equan.Messenger.model.AuthenticationResponse;
import equan.Messenger.model.RegisterRequest;
import equan.Messenger.model.Role;
import equan.Messenger.model.User;
import equan.Messenger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Optional<User> existingUser = repository.findUserByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new ApiRequestException("Email already exists");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var foundUser = repository.findUserByEmail(request.getEmail())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(foundUser);
            return AuthenticationResponse.builder().token(jwtToken).user(foundUser).build();
        } catch( AuthenticationException e) {
            throw new ApiRequestException("Invalid email or password");
        }


    }




}
