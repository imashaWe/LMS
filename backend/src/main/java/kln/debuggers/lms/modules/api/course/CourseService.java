package kln.debuggers.lms.modules.api.course;

import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.auth.student.Student;
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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    void enroll(Long courseID) {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final Student student = (Student) userRepository.findUserByUsername(auth.getName()).get();
        final Course course = courseRepository.findById(courseID).get();

        if (course.getStudentList().indexOf(student) != -1) {
            return;
        }

        course.addStudent(student);
        courseRepository.save(course);

    }

    List<Course> getCourseByUser() {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final User user = userRepository.findUserByUsername(auth.getName()).get();

        if (user.getAuthorities().contains("ROLE_LECTURER")) {
            return courseRepository.findByLecturer((Lecturer) user).orElse(new ArrayList<>());
        } else {
            return this.getCourseByStudent();
        }

    }

    private List<Course> getCourseByStudent() {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final Student student = (Student) userRepository.findUserByUsername(auth.getName()).get();
        return courseRepository.findAll().stream().filter((c) -> c.getStudentList().indexOf(student) != -1).collect(Collectors.toList());
    }

}
