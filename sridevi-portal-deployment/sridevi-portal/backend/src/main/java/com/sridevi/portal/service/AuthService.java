package com.sridevi.portal.service;
import com.sridevi.portal.dto.LoginRequest;
import com.sridevi.portal.dto.LoginResponse;
import com.sridevi.portal.entity.Student;
import com.sridevi.portal.exception.InvalidCredentialsException;
import com.sridevi.portal.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service @RequiredArgsConstructor @Slf4j
public class AuthService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    public LoginResponse login(LoginRequest request) {
        Student student = studentRepository.findByStudentId(request.getStudentId().trim().toUpperCase())
                .orElseThrow(InvalidCredentialsException::new);
        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new InvalidCredentialsException();
        }
        log.info("Login success: {} ({})", student.getName(), student.getStudentId());
        return LoginResponse.builder()
                .success(true).token("")
                .student(LoginResponse.StudentProfile.builder()
                        .studentId(student.getStudentId()).name(student.getName())
                        .email(student.getEmail()).phone(student.getPhone())
                        .rollNumber(student.getRollNumber()).program(student.getProgram())
                        .department(student.getDepartment()).section(student.getSection())
                        .semester(student.getSemester()).batch(student.getBatch())
                        .advisor(student.getAdvisor()).cgpa(student.getCgpa())
                        .avatarInitials(student.getAvatarInitials()).build())
                .build();
    }
}
