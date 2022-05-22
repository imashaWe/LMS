package kln.debuggers.lms.modules.api.submission;

import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("submission")
@CrossOrigin
public class SubmissionController {
    @Autowired
    SubmissionService submissionService;

    @PostMapping("{contentID}")
    public ResponseEntity addSubmission(@PathVariable Long contentID, @ModelAttribute Submission submission) {
        try {
            submissionService.addSubmission(contentID, submission);
        } catch (CloudStorageException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Successfully submitted");
    }

    @GetMapping("{contentID}")
    public ResponseEntity getSubmission(@PathVariable Long contentID) {
        return ResponseEntity.ok(submissionService.getAllSubmissions(contentID));
    }

    @PostMapping("/mark/{submissionID}")
    public ResponseEntity markSubmission(@PathVariable Long submissionID, @RequestBody SubmissionMark submissionMark) {
        submissionService.markSubmission(submissionID, submissionMark);
        return ResponseEntity.ok("Successfully mark submission");
    }

    @GetMapping("/my")
    public ResponseEntity mySubmissions() {
        return ResponseEntity.ok(submissionService.getMySubmissions());
    }

    @GetMapping("/todolist")
    public ResponseEntity getTodolist() {
        return ResponseEntity.ok(submissionService.getTodolist());
    }
}
