package kln.debuggers.lms.modules.api.auth.lecturer;

import kln.debuggers.lms.modules.api.auth.user.User;

import javax.persistence.Entity;

@Entity
public class Lecturer extends User {
    private String firstName;
    private String lastName;
    private String email;

    public Lecturer() {

    }

    public Lecturer(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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
