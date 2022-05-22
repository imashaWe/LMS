package kln.debuggers.lms.modules.api.content;

import kln.debuggers.lms.modules.api.auth.AuthService;
import kln.debuggers.lms.modules.api.auth.lecturer.Lecturer;
import kln.debuggers.lms.modules.api.course.Course;
import kln.debuggers.lms.modules.api.course.CourseRepository;
import kln.debuggers.lms.modules.api.email.EmailService;
import kln.debuggers.lms.modules.storage.CloudStorage;
import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;

@Service
public class ContentService {
    @Autowired
    private ContentRepository contentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CloudStorage cloudStorage;
    @Autowired
    private EmailService emailService;
    @Autowired
    private AuthService authService;

    void addNewContent(Content content, Long courseID) throws CloudStorageException, MessagingException {
        final Course course = courseRepository.findById(courseID).get();
        if (content.getFile() != null) {
            final String url = cloudStorage.upload(content.getFile());
            content.setFileURL(url);
        }
        content.setCourse(course);
        contentRepository.save(content);
        emailService.sendContentMail(content);
    }

    Optional<List<Content>> getContentsByCourse(Long courseID) {
        final Course course = courseRepository.findById(courseID).get();
        return contentRepository.findByCourse(course);
    }

    public void delete(Long id) {
        contentRepository.deleteById(id);
    }

    Optional<List<Content>> getContentsByLecturer() {
        return contentRepository.findAllByLecturer((Lecturer) authService.getAuthUser());
    }
}
