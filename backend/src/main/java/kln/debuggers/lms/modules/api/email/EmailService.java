package kln.debuggers.lms.modules.api.email;

import kln.debuggers.lms.modules.api.auth.student.Student;
import kln.debuggers.lms.modules.api.content.Content;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SpringTemplateEngine thymeleafTemplateEngine;

    public void sendContentMail(Content content) throws MessagingException {
        Map<String, Object> data = new HashMap<>();

        data.put("course", content.getCourse().getTitle());
        data.put("description", content.getDescription());
        data.put("title", content.getName());
        data.put("date", content.getDueDate());
        data.put("url", content.getFileURL());

        List<Student> studentList = content.getCourse()
                .getStudentList();

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        helper.setSubject(content.getName());
        String template;

        if (content.getType().equals("Announcement")) {
            template = "announcement-email.html";
        } else {
            template = "content-email.html";
        }

        for (Student student : studentList) {
            data.put("student", student.getFirstName() + " " + student.getLastName());
            helper.setText(getTemplate(data, template), true);
            helper.setTo(student.getEmail());
            mailSender.send(message);
        }

    }

    private String getTemplate(Map<String, Object> data, String template) {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(data);
        return thymeleafTemplateEngine.process(template, thymeleafContext);
    }


}
