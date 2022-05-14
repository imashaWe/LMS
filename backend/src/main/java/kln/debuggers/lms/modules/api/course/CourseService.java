package kln.debuggers.lms.modules.api.course;


import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.user.User;
import kln.debuggers.lms.modules.api.auth.user.UserRepository;
import kln.debuggers.lms.modules.api.basicdata.Level;
import kln.debuggers.lms.modules.api.basicdata.LevelRepository;
import kln.debuggers.lms.modules.api.basicdata.Subject;
import kln.debuggers.lms.modules.api.basicdata.SubjectRepository;
import kln.debuggers.lms.modules.storage.CloudStorage;
import kln.debuggers.lms.modules.storage.CloudStorageException;
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
    private LevelRepository levelRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private CloudStorage cloudStorage;

    List<Course> getAll() {
        return courseRepository.findAll();
    }

    void addNewCourse(Course course) throws CloudStorageException {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final User user = userRepository.findUserByUsername(auth.getName()).get();
        final Subject subject = subjectRepository.findById(course.getSubjectID()).get();
        final Level level = levelRepository.findById(course.getLevelID()).get();
        final String url = cloudStorage.upload(course.getThumbnail());
        course.setLecturer((Lecturer) user);
        course.setSubject(subject);
        course.setLevel(level);
        course.setThumbnailURL(url);
        courseRepository.save(course);
    }

    void delete(Long id) {
        courseRepository.deleteById(id);
    }

    Optional<List<Course>> getCourseByUser() {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final User user = userRepository.findUserByUsername(auth.getName()).get();
        if (user.getAuthorities().contains("ROLE_LECTURER")) {
            return courseRepository.findByLecturer((Lecturer) user);
        } else {
            return courseRepository.findByLecturer((Lecturer) user);
        }

    }
}
