package kln.debuggers.lms.modules.api.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "course")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody Course course) {
        courseService.addNewCourse(course);
        return ResponseEntity.ok("Successfully Saved");
    }

    @GetMapping("/get")
    public ResponseEntity get() {
        return ResponseEntity.ok(courseService.getCoursesByLecturer());
    }

}
