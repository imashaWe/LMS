package kln.debuggers.lms.modules.api.auth;

import kln.debuggers.lms.config.security.JwtTokenProvider;
import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.lecturer.LecturerRepository;
import kln.debuggers.lms.modules.utils.CustomResponseException;
import kln.debuggers.lms.modules.api.auth.student.Student;
import kln.debuggers.lms.modules.api.auth.student.StudentRepository;
import kln.debuggers.lms.modules.api.auth.user.User;
import kln.debuggers.lms.modules.api.auth.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    private LecturerRepository lecturerRepository;
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
            return ResponseEntity
                    .ok()
                    .body(new AuthResponse(jwtTokenProvider.createToken(user.getUsername(), user.getAuthorities()), user));

        } catch (BadCredentialsException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new CustomResponseException(e.getMessage(), HttpStatus.UNAUTHORIZED));

        }
    }

    @PostMapping("signup/student")
    public ResponseEntity signupStudent(@RequestBody Student student) {

        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setUsername(student.getEmail());
        student.setRoles(new String[]{"ROLE_STUDENT"});

        if (!userRepository.findUserByUsername(student.getEmail()).isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new CustomResponseException("This email already exist.", HttpStatus.BAD_REQUEST));
        }

        studentRepository.save(student);

        return ResponseEntity.ok().body(new AuthResponse(jwtTokenProvider.createToken(student.getUsername(), student.getAuthorities()), student));

    }

    @PostMapping("signup/lecturer")
    public ResponseEntity signupLecturer(@RequestBody Lecturer lecturer) {

        lecturer.setPassword(passwordEncoder.encode(lecturer.getPassword()));
        lecturer.setUsername(lecturer.getEmail());
        lecturer.setRoles(new String[]{"ROLE_LECTURER"});

        if (!userRepository.findUserByUsername(lecturer.getEmail()).isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new CustomResponseException("This email already exist.", HttpStatus.BAD_REQUEST));
        }

        lecturerRepository.save(lecturer);

        return ResponseEntity.ok().body(new AuthResponse(jwtTokenProvider.createToken(lecturer.getUsername(), lecturer.getAuthorities()), lecturer));

    }
}
