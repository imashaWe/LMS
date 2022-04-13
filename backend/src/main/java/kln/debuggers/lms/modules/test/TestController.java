package kln.debuggers.lms.modules.test;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
@CrossOrigin
public class TestController {

    @GetMapping()
    String get() {
        return "Hello wold";
    }
}
