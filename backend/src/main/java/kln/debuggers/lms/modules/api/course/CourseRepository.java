package kln.debuggers.lms.modules.api.course;

import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<List<Course>> findByLecturer(Lecturer lecturer);
}
