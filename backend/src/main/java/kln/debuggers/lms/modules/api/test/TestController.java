package kln.debuggers.lms.modules.api.test;

import kln.debuggers.lms.modules.storage.CloudStorage;
import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("test")
@CrossOrigin
public class TestController {

    @Autowired
    private CloudStorage cloudStorage;

    @PostMapping()
    ResponseEntity upload(@RequestParam MultipartFile file) {
        try {
           String path = cloudStorage.upload(file);
         return   ResponseEntity.ok(path);
        } catch (CloudStorageException e) {
           return ResponseEntity.ok(e.getMessage());
        }

    }
}
