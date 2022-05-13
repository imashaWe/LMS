package kln.debuggers.lms.modules.api.basicdata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController()
@RequestMapping("basicdata")
@CrossOrigin
public class BasicDataController {

    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    LevelRepository levelRepository;

    @GetMapping()
    ResponseEntity getAll() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("subjects", subjectRepository.findAll());
        map.put("levels", levelRepository.findAll());
        return ResponseEntity.ok(map);
    }

    @GetMapping("subject")
    ResponseEntity getAllSubjects() {
        return ResponseEntity.ok(subjectRepository.findAll());
    }

    @PostMapping("subject")
    ResponseEntity saveSubject(@RequestBody Subject subject) {
        subjectRepository.save(subject);
        return ResponseEntity.ok("Save Success");
    }

    @GetMapping("level")
    ResponseEntity getAllLevels() {
        return ResponseEntity.ok(levelRepository.findAll());
    }

    @PostMapping("level")
    ResponseEntity saveLevel(@RequestBody Level level) {
        levelRepository.save(level);
        return ResponseEntity.ok("Save Success");
    }
}
