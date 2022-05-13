package kln.debuggers.lms.modules.storage;

import org.springframework.web.multipart.MultipartFile;

public interface CloudStorage {
    String upload(MultipartFile file) throws CloudStorageException;
}
