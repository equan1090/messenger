package equan.Messenger;

import equan.Messenger.model.User;
import equan.Messenger.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MessengerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MessengerApplication.class, args);
	}


	@Bean
	CommandLineRunner runner(UserRepository repository) {
		return args -> {
			User user = new User(
					"Eric",
					"Quan",
					"e@gmail.com",
					"password"
			);

			repository.findUserByEmail("e@gmail.com").ifPresentOrElse(s -> {
				System.out.println(s + " already exists");
			}, () -> {
				System.out.println("Inserting student " + user);
				repository.insert(user);
			});
		};
	}

}
