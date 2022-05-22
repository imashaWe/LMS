package kln.debuggers.lms.modules.api.content;

import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<List<Content>> findByCourse(Course course);

    @Query("SELECT c FROM Content c WHERE c.course.lecturer =?1 AND c.type ='Assignment'")
    Optional<List<Content>> findAllByLecturer(Lecturer lecturer);
}
