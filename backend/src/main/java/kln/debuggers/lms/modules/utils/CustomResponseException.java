package kln.debuggers.lms.modules.utils;

import org.springframework.http.HttpStatus;

public class CustomResponseException extends RuntimeException {
    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    private final String message;
    private final HttpStatus httpStatus;


    public CustomResponseException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
