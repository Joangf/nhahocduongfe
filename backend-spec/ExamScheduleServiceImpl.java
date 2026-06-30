// ============================================================================
// ExamScheduleServiceImpl.java — Service cập nhật (validate & set Dentists)
// Package: com.nhahocduong.service.impl
// ============================================================================

package com.nhahocduong.service.impl;

import com.nhahocduong.dto.ExamScheduleDTO;
import com.nhahocduong.entity.Dentist;
import com.nhahocduong.entity.ExamSchedule;
import com.nhahocduong.mapper.ExamScheduleMapper;
import com.nhahocduong.repository.DentistRepository;
import com.nhahocduong.repository.ExamScheduleRepository;
import com.nhahocduong.service.ExamScheduleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExamScheduleServiceImpl implements ExamScheduleService {

    private final ExamScheduleRepository examScheduleRepository;
    private final DentistRepository dentistRepository;
    private final ExamScheduleMapper examScheduleMapper;

    // ═══════════════════════════════════════════
    // CREATE
    // ═══════════════════════════════════════════
    @Override
    @Transactional
    public ExamScheduleDTO create(ExamScheduleDTO dto) {
        ExamSchedule entity = examScheduleMapper.toEntity(dto);

        // Resolve & validate dentists
        List<Dentist> dentists = resolveDentists(dto.getDentistIds());
        entity.setDentists(dentists);

        ExamSchedule saved = examScheduleRepository.save(entity);
        log.info("Created ExamSchedule id={} with {} dentist(s)", saved.getId(), dentists.size());

        return examScheduleMapper.toDto(saved);
    }

    // ═══════════════════════════════════════════
    // UPDATE
    // ═══════════════════════════════════════════
    @Override
    @Transactional
    public ExamScheduleDTO update(Long id, ExamScheduleDTO dto) {
        ExamSchedule existing = examScheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "ExamSchedule not found with id: " + id));

        // Map các field cơ bản (bỏ qua dentists)
        examScheduleMapper.toEntity(dto); // không dùng kết quả này vì bỏ qua dentists
        existing.setCampaignId(dto.getCampaignId());
        existing.setOrganizationId(dto.getOrganizationId());
        existing.setOrganizationName(dto.getOrganizationName());
        existing.setSchoolClass(dto.getSchoolClass());
        existing.setExamDate(dto.getExamDate());
        if (dto.getStatus() != null) {
            existing.setStatus(dto.getStatus());
        }

        // Resolve & validate dentists — replace toàn bộ danh sách
        List<Dentist> dentists = resolveDentists(dto.getDentistIds());
        existing.setDentists(dentists);

        ExamSchedule saved = examScheduleRepository.save(existing);
        log.info("Updated ExamSchedule id={} with {} dentist(s)", saved.getId(), dentists.size());

        return examScheduleMapper.toDto(saved);
    }

    // ═══════════════════════════════════════════
    // Private helper: validate & fetch dentists
    // ═══════════════════════════════════════════
    private List<Dentist> resolveDentists(List<Long> dentistIds) {
        if (dentistIds == null || dentistIds.isEmpty()) {
            return Collections.emptyList();
        }

        List<Dentist> dentists = dentistRepository.findAllById(dentistIds);

        // Kiểm tra xem có ID nào không tồn tại không
        if (dentists.size() != dentistIds.size()) {
            List<Long> foundIds = dentists.stream()
                    .map(Dentist::getId)
                    .collect(Collectors.toList());
            List<Long> missingIds = dentistIds.stream()
                    .filter(id -> !foundIds.contains(id))
                    .collect(Collectors.toList());
            throw new EntityNotFoundException(
                    "Dentist(s) not found with id(s): " + missingIds);
        }

        return dentists;
    }
}
