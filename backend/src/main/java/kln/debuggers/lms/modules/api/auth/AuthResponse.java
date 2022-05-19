package kln.debuggers.lms.modules.api.auth;

import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.student.Student;

import java.util.List;
import java.util.stream.Collectors;

public class AuthResponse {
    final private String token;
    private final String firstName;
    private final String lastName;
    private final String email;
    private List<String> roles;

    public AuthResponse(String token, Object user) {
        this.token = token;
        if (user instanceof Student) {
            Student student = (Student) user;
            this.firstName = student.getFirstName();
            this.lastName = student.getLastName();
            this.email = student.getEmail();
            this.roles = student.getAuthorities().stream().map(a -> a.toString()).collect(Collectors.toList());
        } else {
            Lecturer lecturer = (Lecturer) user;
            this.firstName = lecturer.getFirstName();
            this.lastName = lecturer.getLastName();
            this.email = lecturer.getEmail();
            this.roles = lecturer.getAuthorities().stream().map(a -> a.toString()).collect(Collectors.toList());
        }

    }

    public String getToken() {
        return token;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public List<String> getRoles() {
        return roles;
    }
}
