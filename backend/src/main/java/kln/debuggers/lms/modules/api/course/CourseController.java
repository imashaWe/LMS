package kln.debuggers.lms.modules.api.course;

import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "course")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping()
    public ResponseEntity getAll() {
        return ResponseEntity.ok(courseService.getAll());
    }

    @PostMapping()
    public ResponseEntity create(@ModelAttribute Course course) {
        try {
            courseService.addNewCourse(course);
        } catch (CloudStorageException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok("Successfully Saved");
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        courseService.delete(id);
        return ResponseEntity.ok("Successfully Saved");
    }

    @GetMapping("/my")
    public ResponseEntity get() {
        return ResponseEntity.ok(courseService.getCourseByUser());
    }

}
