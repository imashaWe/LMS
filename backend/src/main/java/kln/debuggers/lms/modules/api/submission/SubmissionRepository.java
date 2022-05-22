package kln.debuggers.lms.modules.api.submission;

import kln.debuggers.lms.modules.api.auth.student.Student;
import kln.debuggers.lms.modules.api.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    Optional<List<Submission>> findAllByContent(Content content);

    Optional<List<Submission>> findAllByStudent(Student student);

    @Query("SELECT c FROM Content c WHERE ?1 member of c.course.studentList")
    Optional<List<Content>> getTodolist(Student student);
}