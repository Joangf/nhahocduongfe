// ============================================================================
// ExamSchedule.java — Entity cập nhật (Many-to-Many Dentist)
// Package: com.nhahocduong.entity
// ============================================================================

package com.nhahocduong.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exam_schedule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "campaign_id", nullable = false)
    private Long campaignId;

    @Column(name = "organization_id", nullable = false)
    private Long organizationId;

    @Column(name = "organization_name")
    private String organizationName;

    @Column(name = "school_class", nullable = false)
    private String schoolClass;

    @Column(name = "exam_date", nullable = false)
    private LocalDate examDate;

    @Column(name = "status")
    private Boolean status;

    // ═══════════════════════════════════════════
    // Many-to-Many: ExamSchedule ↔ Dentist
    // ═══════════════════════════════════════════
    @ManyToMany
    @JoinTable(
        name = "nhahocduong_exam_schedule_dentist",
        joinColumns = @JoinColumn(name = "exam_schedule_id"),
        inverseJoinColumns = @JoinColumn(name = "dentist_id")
    )
    @Builder.Default
    private List<Dentist> dentists = new ArrayList<>();
}
