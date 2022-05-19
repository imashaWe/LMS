package kln.debuggers.lms.modules.api.auth;

import kln.debuggers.lms.config.security.JwtTokenProvider;
import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.lecturer.LecturerRepository;
import kln.debuggers.lms.modules.api.auth.student.Student;
import kln.debuggers.lms.modules.api.auth.student.StudentRepository;
import kln.debuggers.lms.modules.api.auth.user.User;
import kln.debuggers.lms.modules.api.auth.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private LecturerRepository lecturerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    AuthResponse login(User user) throws ResponseStatusException {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    user.getUsername(), user.getPassword()
                            )
                    );
            user = (User) authenticate.getPrincipal();
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
        return new AuthResponse(jwtTokenProvider.createToken(user.getUsername(), user.getAuthorities()), user);
    }

    AuthResponse signup(Student student) throws ResponseStatusException {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setUsername(student.getEmail());
        student.setRoles(new String[]{"ROLE_STUDENT"});

        if (!userRepository.findUserByUsername(student.getEmail()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This email already exist.");
        }

        studentRepository.save(student);
        return new AuthResponse(jwtTokenProvider.createToken(student.getUsername(), student.getAuthorities()), student);

    }

    AuthResponse signup(Lecturer lecturer) throws ResponseStatusException {
        lecturer.setPassword(passwordEncoder.encode(lecturer.getPassword()));
        lecturer.setUsername(lecturer.getEmail());
        lecturer.setRoles(new String[]{"ROLE_LECTURER"});

        if (!userRepository.findUserByUsername(lecturer.getEmail()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This email already exist.");
        }

        lecturerRepository.save(lecturer);
        return new AuthResponse(jwtTokenProvider.createToken(lecturer.getUsername(), lecturer.getAuthorities()), lecturer);

    }

    public User getAuthUser() {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findUserByUsername(auth.getName()).get();
    }

    public boolean hasRole(String role) {
        return this.getAuthUser().getAuthorities().contains(new SimpleGrantedAuthority(role));
    }

}
