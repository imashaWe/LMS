package kln.debuggers.lms.modules.api.auth.student;

import kln.debuggers.lms.modules.api.auth.user.User;

import javax.persistence.Entity;

@Entity
public class Student extends User {
    private String firstName;
    private String lastName;
    private String email;


    public Student(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public Student() {

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
