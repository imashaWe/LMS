package kln.debuggers.lms.modules.api.content;

import kln.debuggers.lms.modules.api.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<List<Content>> findByCourse(Course course);
}
