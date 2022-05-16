package kln.debuggers.lms.modules.storage;

import com.cloudinary.Cloudinary;
import com.cloudinary.Singleton;
import com.cloudinary.SingletonManager;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Component
public class CloudinaryStorage implements CloudStorage {
    @Value("${cloudinary.cloud-name}")
    private String cloudName;
    @Value("${cloudinary.cloud-key}")
    private String apiKey;
    @Value("${cloudinary.cloud-secret}")
    private String apiSecret;


    @PostConstruct
    public void init() {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
        SingletonManager manager = new SingletonManager();
        manager.setCloudinary(cloudinary);
        manager.init();
    }

    @Override
    public String upload(MultipartFile file) throws CloudStorageException {
        try {
            Map params = ObjectUtils.asMap(
                    "public_id", "lms/" + UUID.randomUUID(),
                    "overwrite", true
            );
            Map uploadResult = Singleton.getCloudinary().uploader().upload(file.getBytes(), params);
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            throw new CloudStorageException(e);
        }
    }
}
