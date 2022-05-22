package kln.debuggers.lms.modules.api.submission;

import kln.debuggers.lms.modules.api.auth.student.Student;
import kln.debuggers.lms.modules.api.content.Content;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private int marks;
    private String comment;
    private String fileURL;
    private LocalDateTime submittedDate;
    private LocalDateTime markedDate;
    @ManyToOne
    private Content content;
    @ManyToOne
    private Student student;
    @Transient
    private MultipartFile file;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(LocalDateTime submittedDate) {
        this.submittedDate = submittedDate;
    }

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getFileURL() {
        return fileURL;
    }

    public void setFileURL(String fileURL) {
        this.fileURL = fileURL;
    }

    public LocalDateTime getMarkedDate() {
        return markedDate;
    }

    public void setMarkedDate(LocalDateTime markedDate) {
        this.markedDate = markedDate;
    }
}