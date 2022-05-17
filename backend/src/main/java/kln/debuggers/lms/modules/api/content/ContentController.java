package kln.debuggers.lms.modules.api.content;

import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "content")
@CrossOrigin
public class ContentController {

    @Autowired
    private ContentService contentService;

//    @GetMapping()
//    public ResponseEntity getAll() {
//        return ResponseEntity.ok(contentService.getAll());
//    }

    @PostMapping("create/{courseID}")
    public ResponseEntity create(@ModelAttribute Content content, @PathVariable Long courseID) {
//        try {
//            contentService.addNewContent(content, courseID);
//        } catch (CloudStorageException e) {
//            System.out.println("ëroro");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
        return ResponseEntity.ok("Successfully Saved");
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        contentService.delete(id);
        return ResponseEntity.ok("Successfully Deleted");
    }

    @GetMapping("{courseID}")
    public ResponseEntity get(@PathVariable Long courseID) {
        return ResponseEntity.ok(contentService.getContentsByCourse(courseID));
    }


}
