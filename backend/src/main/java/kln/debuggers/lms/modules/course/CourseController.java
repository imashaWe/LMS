package kln.debuggers.lms.modules.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="course")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody Course course){
        courseRepository.save(course);
        return ResponseEntity.ok("Successfully Saved");
    }

}
