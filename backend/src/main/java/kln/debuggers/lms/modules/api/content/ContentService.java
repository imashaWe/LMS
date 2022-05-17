package kln.debuggers.lms.modules.api.content;

import kln.debuggers.lms.modules.api.auth.user.UserRepository;
import kln.debuggers.lms.modules.api.course.Course;
import kln.debuggers.lms.modules.api.course.CourseRepository;
import kln.debuggers.lms.modules.storage.CloudStorage;
import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {
    @Autowired
    private ContentRepository contentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CloudStorage cloudStorage;

    void addNewContent(Content content, Long courseID) throws CloudStorageException {
        final Course course = courseRepository.findById(courseID).get();
        final String url = cloudStorage.upload(content.getFile());
        content.setCourse(course);
        content.setFileURL(url);
        contentRepository.save(content);
    }

    Optional<List<Content>> getContentsByCourse(Long courseID) {
        final Course course = courseRepository.findById(courseID).get();
        return contentRepository.findByCourse(course);
    }

    public void delete(Long id) {
        contentRepository.deleteById(id);
    }
}
