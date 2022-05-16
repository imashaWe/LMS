package kln.debuggers.lms.modules.api.basicdata;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String subject;

    public Long getId() {
        return id;
    }

    public String getSubject() {
        return subject;
    }
}
