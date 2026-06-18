package com.sridevi.portal.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class LoginResponse {
    private boolean success;
    private String message;
    private String token;
    private StudentProfile student;
    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class StudentProfile {
        private String studentId;
        private String name;
        private String email;
        private String phone;
        private String rollNumber;
        private String program;
        private String department;
        private String section;
        private Integer semester;
        private String batch;
        private String advisor;
        private Double cgpa;
        private String avatarInitials;
    }
}
