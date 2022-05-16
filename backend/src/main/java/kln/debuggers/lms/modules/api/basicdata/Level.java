package kln.debuggers.lms.modules.api.basicdata;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String level;

    public Long getId() {
        return id;
    }

    public String getLevel() {
        return level;
    }
}
