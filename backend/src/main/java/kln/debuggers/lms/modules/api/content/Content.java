package kln.debuggers.lms.modules.api.content;
import kln.debuggers.lms.modules.api.course.Course;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;
    private String type;
    private LocalDateTime dueDate;
    private String fileURL;
    @ManyToOne
    private Course course;

    @CreationTimestamp
    private LocalDateTime addedDate;

    @Transient
    private MultipartFile file;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = LocalDateTime.parse(dueDate);
    }

    public String getFileURL() {
        return fileURL;
    }

    public void setFileURL(String fileURL) {
        this.fileURL = fileURL;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public LocalDateTime getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDateTime addedDate) {
        this.addedDate = addedDate;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
