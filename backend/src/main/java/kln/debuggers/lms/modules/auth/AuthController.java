package kln.debuggers.lms.modules.auth;

import kln.debuggers.lms.config.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController()
@RequestMapping("auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;
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

    @PostMapping("signin")
    public ResponseEntity signin(@RequestBody User user) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    user.getUsername(), user.getPassword()
                            )
                    );

            user = (User) authenticate.getPrincipal();


            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenProvider.createToken(user.getUsername(), user.getAuthorities())
                    )
                    .body(userDetailsService.loadUserByUsername(user.getUsername()));

        } catch (BadCredentialsException e) {

            return ResponseEntity.badRequest().build();

        }
    }

    @PostMapping("signup")
    public ResponseEntity signup(@RequestBody User user) {
        List<String> roles = new ArrayList() {{
            add("ROLE_STUDENT");
        }};
        userRepository.save(new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), roles));

        return ResponseEntity.ok().build();

    }
}
