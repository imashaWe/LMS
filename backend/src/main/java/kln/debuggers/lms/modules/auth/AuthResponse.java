package kln.debuggers.lms.modules.auth;

import kln.debuggers.lms.modules.auth.student.Student;
import kln.debuggers.lms.modules.auth.teacher.Lecturer;

public class AuthResponse {
    final private String token;
    private String firstName;
    private String lastName;
    private String email;

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
