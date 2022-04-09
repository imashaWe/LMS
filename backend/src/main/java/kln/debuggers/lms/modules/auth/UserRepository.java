package kln.debuggers.lms.modules.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    public Optional<User> findUserByUsername(String username);
}
