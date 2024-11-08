package com.onetwo.mongddang.domain.mission.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.medication.repository.MedicationManagementRepository;
import com.onetwo.mongddang.domain.medication.repository.MedicationTimeRepository;
import com.onetwo.mongddang.domain.missionlog.repository.MissionLogRepository;
import com.onetwo.mongddang.domain.record.repository.RecordRepository;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MissionService {

    private final RecordRepository recordRepository;
    private final MedicationManagementRepository medicationManagementRepository;
    private final MedicationTimeRepository medicationTimeRepository;
    private final UserRepository userRepository;
    private final MissionLogRepository missionLogRepository;

    public ResponseDto getMissionList(Long childId) {
        log.info("childId: {}", childId);

//        // User 를 조회합니다.
//        User child = userRepository.findById(childId).orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
//        log.info("child: {}", child.getEmail());
//
//        LocalDate today = LocalDate.now();
//        LocalDateTime todayStart = today.atStartOfDay(); // 오늘 00:00:00
//        LocalDateTime todayEnd = today.atTime(23, 59, 59); // 오늘 23:59:59
//
//        // 오늘의 medication_management 리스트 조회
//        List<MedicationManagement> todayMedicationManagement = medicationManagementRepository.findByChildIdAndTodayIncluded(child, todayStart);
//
//        // RecordRepository 를 통해 record 리스트를 조회합니다.
//        List<Record> todayRecordList = recordRepository.findByChildAndStartTimeBetween(child, todayStart, todayEnd);
//
//        // 오늘의 missionLog 리스트
//        List<MissionLog> todayMissionLogList = missionLogRepository.findByChildAndCreatedAtBetween(childId, todayStart);
//
//        List<MissionDto> missionList = new ArrayList<>();
//
//        // 운동 미션
//        MissionDto.Status exerciseStatus;
//        // 수령한 상태
//        // 수령 불가능 상태
//
//        missionList.add(MissionDto.builder()
//                .name(MissionDto.MissionName.exercise)
//                .rewards(MissionDto.MissionName.exercise.getRewards())
//                .status(MissionDto.Status.rewardable)
//                .build());
//
//        // 복약 관리 기록 : medication_management 리스트를 가지고 오늘의 medication_time 리스트 조회
//        List<MedicationTime> todayMedicationTime = todayMedicationManagement.stream()
//                .flatMap(medicationManagement -> medicationTimeRepository.findByMedicationManagementId(medicationManagement.getId()).stream())
//                .toList();


        return ResponseDto.builder()
                .message("미션 목록 조회에 성공했습니다.")
//                .data(missionList)
                .build();
    }


}
