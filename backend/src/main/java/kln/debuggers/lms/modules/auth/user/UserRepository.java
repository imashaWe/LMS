package kln.debuggers.lms.modules.auth.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    public Optional<User> findUserByUsername(String username);
}
