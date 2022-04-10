package kln.debuggers.lms.modules.auth;

import kln.debuggers.lms.config.security.JwtTokenProvider;
import kln.debuggers.lms.modules.auth.student.Student;
import kln.debuggers.lms.modules.auth.student.StudentRepository;
import kln.debuggers.lms.modules.auth.user.User;
import kln.debuggers.lms.modules.auth.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    final private AuthenticationManager authenticationManager;
    final private JwtTokenProvider jwtTokenProvider;
    final private UserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("login")
    public ResponseEntity login(@RequestBody User user) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    user.getUsername(), user.getPassword()
                            )
                    );

            user = (User) authenticate.getPrincipal();
            user.setPassword("");
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenProvider.createToken(user.getUsername(), user.getAuthorities())
                    )
                    .body(user);

        } catch (BadCredentialsException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        }
    }

    @PostMapping("registerStudent")
    public ResponseEntity registerStudent(@RequestBody Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setUsername(student.getEmail());
        student.setRoles(new String[]{"ROLE_USER"});

        if (!userRepository.findUserByUsername(student.getEmail()).isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email already exist.");
        }

        studentRepository.save(student);
        
        return ResponseEntity.ok().build();

    }
}
