// ============================================================================
// ExamScheduleDTO.java — DTO cập nhật (thêm dentistIds, dentistNames)
// Package: com.nhahocduong.dto
// ============================================================================

package com.nhahocduong.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamScheduleDTO {

    private Long id;
    private Long campaignId;
    private Long organizationId;
    private String organizationName;
    private String schoolClass;
    private LocalDate examDate;
    private Boolean status;

    // ── New fields for Many-to-Many Dentist ──
    /** Danh sách ID bác sĩ — dùng cho Request (create/update) và Response */
    private List<Long> dentistIds;

    /** Danh sách tên bác sĩ — chỉ dùng cho Response (hiển thị) */
    private List<String> dentistNames;
}
