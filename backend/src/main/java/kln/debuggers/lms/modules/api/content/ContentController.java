package kln.debuggers.lms.modules.api.content;

import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@RequestMapping(value = "content")
@CrossOrigin
public class ContentController {

    @Autowired
    private ContentService contentService;

    @PostMapping("create/{courseID}")
    @PreAuthorize("hasRole('ROLE_LECTURER')")
    public ResponseEntity create(@ModelAttribute Content content, @PathVariable Long courseID) {
        try {
            contentService.addNewContent(content, courseID);
        } catch (CloudStorageException | MessagingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok("Successfully Saved");
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ROLE_LECTURER')")
    public ResponseEntity delete(@PathVariable Long id) {
        contentService.delete(id);
        return ResponseEntity.ok("Successfully Deleted");
    }

    @GetMapping("{courseID}")
    public ResponseEntity get(@PathVariable Long courseID) {
        return ResponseEntity.ok(contentService.getContentsByCourse(courseID));
    }

    @GetMapping("my")
    public ResponseEntity getMy() {
        return ResponseEntity.ok(contentService.getContentsByLecturer());
    }
}
