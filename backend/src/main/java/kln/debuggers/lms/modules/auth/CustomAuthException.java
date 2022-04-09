package kln.debuggers.lms.modules.auth;

import org.springframework.http.HttpStatus;

public class CustomAuthException extends RuntimeException {
    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    private final String message;
    private final HttpStatus httpStatus;


    public CustomAuthException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
