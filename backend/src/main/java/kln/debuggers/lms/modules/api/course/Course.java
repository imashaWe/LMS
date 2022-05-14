package kln.debuggers.lms.modules.api.course;

import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.basicdata.Level;
import kln.debuggers.lms.modules.api.basicdata.Subject;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private String description;
    private String thumbnailURL;
    private int duration;

    @ManyToOne
    private Subject subject;
    @ManyToOne
    private Level level;
    @ManyToOne
    private Lecturer lecturer;

    @Transient
    private Long subjectID;
    @Transient
    private Long levelID;
    @Transient
    private MultipartFile thumbnail;

    public long getId() { return id; }

    public void setId(long id) { this.id = id; }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnailURL() {
        return thumbnailURL;
    }

    public void setThumbnailURL(String thumbnailURL) {
        this.thumbnailURL = thumbnailURL;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Lecturer getLecturer() {
        return lecturer;
    }

    public void setLecturer(Lecturer lecturer) {
        this.lecturer = lecturer;
    }

    public Long getSubjectID() {
        return subjectID;
    }

    public void setSubjectID(Long subjectID) {
        this.subjectID = subjectID;
    }

    public MultipartFile getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(MultipartFile thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Long getLevelID() {
        return levelID;
    }

    public void setLevelID(Long levelID) {
        this.levelID = levelID;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

}
