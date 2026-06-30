// ============================================================================
// DentistController.java — REST endpoint cho bảng nhahocduong_dentist
// Package: com.nhahocduong.controller
// ============================================================================

package com.nhahocduong.controller;

import com.nhahocduong.dto.DentistDTO;
import com.nhahocduong.service.DentistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentists")
@RequiredArgsConstructor
public class DentistController {

    private final DentistService dentistService;

    /** GET /api/dentists — lấy danh sách tất cả bác sĩ */
    @GetMapping
    public ResponseEntity<List<DentistDTO>> getAll() {
        List<DentistDTO> dentists = dentistService.getAll();
        return ResponseEntity.ok(dentists);
    }

    /** GET /api/dentists/{id} — lấy thông tin 1 bác sĩ */
    @GetMapping("/{id}")
    public ResponseEntity<DentistDTO> getById(@PathVariable Long id) {
        DentistDTO dentist = dentistService.getById(id);
        return ResponseEntity.ok(dentist);
    }
}
