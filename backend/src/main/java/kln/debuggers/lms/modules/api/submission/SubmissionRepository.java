package kln.debuggers.lms.modules.api.submission;

import kln.debuggers.lms.modules.api.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    Optional<List<Submission>> findAllByContent(Content content);
}