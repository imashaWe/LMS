package kln.debuggers.lms.modules.api.submission;

import kln.debuggers.lms.modules.api.auth.AuthService;
import kln.debuggers.lms.modules.api.auth.student.Student;
import kln.debuggers.lms.modules.api.content.Content;
import kln.debuggers.lms.modules.api.content.ContentRepository;
import kln.debuggers.lms.modules.storage.CloudStorage;
import kln.debuggers.lms.modules.storage.CloudStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {
    @Autowired
    private SubmissionRepository submissionRepository;
    @Autowired
    private ContentRepository contentRepository;
    @Autowired
    private AuthService authService;
    @Autowired
    private CloudStorage cloudStorage;

    public void addSubmission(Long contentID, Submission submission) throws CloudStorageException {
        if (submission.getFile() != null) {
            submission.setFileURL(cloudStorage.upload(submission.getFile()));
        }
        submission.setStudent((Student) authService.getAuthUser());
        submission.setContent(contentRepository.getById(contentID));
        submission.setSubmittedDate(LocalDateTime.now());
        submissionRepository.save(submission);
    }

    public void markSubmission(Long submissionID, SubmissionMark submissionMark) {
        Submission submission = submissionRepository.getById(submissionID);
        submission.setMarks(submissionMark.getMarks());
        submission.setComment(submissionMark.getComment());
        submission.setMarkedDate(LocalDateTime.now());
        submissionRepository.save(submission);
    }

    public Optional<List<Submission>> getAllSubmissions(Long contentID) {
        return submissionRepository.findAllByContent(contentRepository.findById(contentID).get());
    }

    public Optional<List<Submission>> getMySubmissions() {
        return submissionRepository.findAllByStudent((Student) authService.getAuthUser());
    }

    public Optional<List<Content>> getTodolist() {
        return submissionRepository.getTodolist((Student) authService.getAuthUser());
    }
}
