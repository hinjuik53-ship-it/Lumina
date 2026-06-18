package com.sridevi.portal.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @Column(name = "student_id", length = 20, nullable = false, unique = true)
    private String studentId;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "roll_number", unique = true)
    private String rollNumber;
    @Column(name = "program")
    private String program;
    @Column(name = "department")
    private String department;
    @Column(name = "section")
    private String section;
    @Column(name = "semester")
    private Integer semester;
    @Column(name = "batch")
    private String batch;
    @Column(name = "advisor")
    private String advisor;
    @Column(name = "cgpa")
    private Double cgpa;
    @Column(name = "avatar_initials", length = 5)
    private String avatarInitials;
}
