// ============================================================================
// ExamScheduleMapper.java — MapStruct Mapper (cập nhật cho Many-to-Many)
// Package: com.nhahocduong.mapper
// ============================================================================

package com.nhahocduong.mapper;

import com.nhahocduong.dto.ExamScheduleDTO;
import com.nhahocduong.entity.ExamSchedule;
import com.nhahocduong.entity.Dentist;
import org.mapstruct.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ExamScheduleMapper {

    // ═══════════════════════════════════════════
    // Entity → DTO
    // ═══════════════════════════════════════════
    @Mapping(target = "dentistIds", ignore = true)
    @Mapping(target = "dentistNames", ignore = true)
    ExamScheduleDTO toDto(ExamSchedule entity);

    // ═══════════════════════════════════════════
    // DTO → Entity (skip dentists — set manually in Service)
    // ═══════════════════════════════════════════
    @Mapping(target = "dentists", ignore = true)
    ExamSchedule toEntity(ExamScheduleDTO dto);

    // ═══════════════════════════════════════════
    // @AfterMapping: tự động map Dentist → IDs + Names
    // ═══════════════════════════════════════════
    @AfterMapping
    default void mapDentistsToDto(ExamSchedule entity, @MappingTarget ExamScheduleDTO dto) {
        List<Dentist> dentists = entity.getDentists();
        if (dentists == null || dentists.isEmpty()) {
            dto.setDentistIds(Collections.emptyList());
            dto.setDentistNames(Collections.emptyList());
            return;
        }

        List<Long> ids = dentists.stream()
                .map(Dentist::getId)
                .collect(Collectors.toList());

        List<String> names = dentists.stream()
                .map(d -> (d.getLastName() != null ? d.getLastName() + " " : "")
                        + (d.getFirstName() != null ? d.getFirstName() : ""))
                .map(String::trim)
                .collect(Collectors.toList());

        dto.setDentistIds(ids);
        dto.setDentistNames(names);
    }
}
