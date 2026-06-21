package com.sridevi.portal.config;

import com.sridevi.portal.entity.Student;
import com.sridevi.portal.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Student s = studentRepository.findByStudentId("22B81A05H7").orElse(null);
        if (s == null) {
            s = new Student();
            s.setStudentId("22B81A05H7");
            log.info("Seeding demo account — 22B81A05H7");
        }

        // Always use the seeded credentials — no separate fix scripts needed
        s.setPassword(passwordEncoder.encode("charan123"));
        s.setName("Charan Peddi");
        s.setEmail("charan.t@sridevi.edu.in");
        s.setPhone("+91 96760 XXXXX");
        s.setRollNumber("22B81A05H7");
        s.setProgram("B.Tech Computer Science and Engineering");
        s.setDepartment("School of Computing");
        s.setSection("CSE-A");
        s.setSemester(6);
        s.setBatch("2022-2026");
        s.setAdvisor("Dr. Priya Venkataraman");
        s.setCgpa(8.92);
        s.setAvatarInitials("CT");

        studentRepository.save(s);
        log.info("Student record ready — 22B81A05H7 / charan123");
    }
}
