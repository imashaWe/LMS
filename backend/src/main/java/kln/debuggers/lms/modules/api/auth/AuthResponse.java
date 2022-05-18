package kln.debuggers.lms.modules.api.auth;

import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.student.Student;

public class AuthResponse {
    final private String token;
    private final String firstName;
    private final String lastName;
    private final String email;

    public AuthResponse(String token, Object user) {
        this.token = token;
        if (user instanceof Student) {
            Student student = (Student) user;
            this.firstName = student.getFirstName();
            this.lastName = student.getLastName();
            this.email = student.getEmail();
        } else {
            Lecturer lecturer = (Lecturer) user;
            this.firstName = lecturer.getFirstName();
            this.lastName = lecturer.getLastName();
            this.email = lecturer.getEmail();
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
}
