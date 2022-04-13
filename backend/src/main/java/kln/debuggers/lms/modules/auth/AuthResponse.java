package kln.debuggers.lms.modules.auth;
import kln.debuggers.lms.modules.auth.user.User;

public class AuthResponse {
   final private String token;
   final private User user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}
