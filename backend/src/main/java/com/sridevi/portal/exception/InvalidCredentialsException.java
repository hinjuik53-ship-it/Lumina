package com.sridevi.portal.exception;
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() { super("Invalid Student ID or password."); }
}
