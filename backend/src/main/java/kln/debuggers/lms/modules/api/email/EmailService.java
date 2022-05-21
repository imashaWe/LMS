package kln.debuggers.lms.modules.api.email;

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
import java.util.stream.Collectors;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SpringTemplateEngine thymeleafTemplateEngine;

    public void sendContentMail(Content content) throws MessagingException {
        Context thymeleafContext = new Context();
        Map<String, Object> data = new HashMap<>();
        data.put("title", content.getCourse().getTitle());
        thymeleafContext.setVariables(data);
        String body = thymeleafTemplateEngine.process("content-email.html", thymeleafContext);
        List<String> emails = content.getCourse()
                .getStudentList()
                .stream()
                .map(e -> e.getEmail()).collect(Collectors.toList());

        send(content.getName(), body, emails);

    }

    private void send(String subject, String body, List<String> emails) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        helper.setSubject(subject);
        helper.setText(body, true);
        for (String email : emails) {
            helper.setTo(email);
            mailSender.send(message);
        }

    }
}
