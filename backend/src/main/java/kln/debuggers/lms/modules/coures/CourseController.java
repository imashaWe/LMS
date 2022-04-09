package kln.debuggers.lms.modules.coures;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("course")
public class CourseController {

    @GetMapping()
    String getMap() {
        return "Hello";
    }
}
