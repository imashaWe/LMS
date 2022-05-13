package kln.debuggers.lms.modules.api.course;


import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.user.User;
import kln.debuggers.lms.modules.api.auth.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;

    void addNewCourse(Course course) {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final User user = userRepository.findUserByUsername(auth.getName()).get();
        course.setLecturer((Lecturer) user);
        courseRepository.save(course);
    }

    Optional<List<Course>> getCoursesByLecturer() {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final User user = userRepository.findUserByUsername(auth.getName()).get();
        return courseRepository.findByLecturer((Lecturer) user);
    }
}
