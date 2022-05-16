package kln.debuggers.lms.modules.api.auth;

import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.student.Student;
import kln.debuggers.lms.modules.api.auth.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController()
@RequestMapping("auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("login")
    public ResponseEntity login(@RequestBody User user) {
        try {
            return ResponseEntity.ok(authService.login(user));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getReason());
        }

    }

    @PostMapping("signup/student")
    public ResponseEntity signupStudent(@RequestBody Student student) throws ResponseStatusException {
        try {
            return ResponseEntity.ok(authService.signup(student));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getReason());
        }
    }

    @PostMapping("signup/lecturer")
    public ResponseEntity signupLecturer(@RequestBody Lecturer lecturer) throws ResponseStatusException {
        try {
            return ResponseEntity.ok(authService.signup(lecturer));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getReason());
        }
    }
}
