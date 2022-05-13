package kln.debuggers.lms.modules.api.auth.utils;

import org.springframework.http.HttpStatus;

public class ResponseMessage {
    private final String message;
    private final HttpStatus status;

    public ResponseMessage(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}
