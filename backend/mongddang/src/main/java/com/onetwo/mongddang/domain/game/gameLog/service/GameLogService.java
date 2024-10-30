package com.onetwo.mongddang.domain.game.gameLog.service;

import com.onetwo.mongddang.domain.game.gameLog.model.GameLog;
import com.onetwo.mongddang.domain.game.gameLog.model.GameLog.GameLogCategory;
import com.onetwo.mongddang.domain.game.gameLog.repository.GameLogRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@Builder
public class GameLogService {

    public final GameLogRepository gameLogRepository;
    public final UserRepository userRepository;

    /**
     * 게임 로그 초기화 - 회원가입 시 호출
     * @param id 사용자 id
     */
    public void initGameLog(Long id) {
        log.info("initGameLog - userId: {}", id);

        // id 에 해당하는 User 조회
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found for id: " + id));

        // 사용자에 대한 기존 게임 로그가 존재하는지 확인
        if (gameLogRepository.existsByChild(user)) {
            log.warn("사용자 (이메일:{})에 대한 게임 로그가 이미 존재합니다.", user.getEmail());
            return;
        }

        // 초기화용 게임 로그 생성
        GameLog gameLog = GameLog.builder()
                .child(user)
                .mealCount(0)
                .exerciseCount(0)
                .sleepCount(0)
                .medicationCount(0)
                .build();

        gameLogRepository.save(gameLog);
    }

    /**
     * 게임 로그 추가
     * @param id 사용자 id
     * @param category 게임 로그 카테고리
     * @return 추가된 게임 로그
     */
    public GameLog addGameLog(Long id, GameLogCategory category) {
        log.info("addGameLog - userId: {}, category: {}", id, category);

        // userId에 해당하는 GameLog 조회
        GameLog foundGameLog = gameLogRepository.findTopByChildIdOrderByIdDesc(id)
                .orElseThrow(() -> new RuntimeException("게임 로그를 찾을 수 없습니다. userId: " + id));

        // 카테고리와 일치하는 게임 로그 카운트 증가
        updateLogCount(foundGameLog, category);

        // id 에 해당하는 User 조회
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다. id: " + id));

        // 게임 로그 생성
        GameLog gameLog = GameLog.builder()
                .child(user)
                .mealCount(foundGameLog.getMealCount())
                .exerciseCount(foundGameLog.getExerciseCount())
                .sleepCount(foundGameLog.getSleepCount())
                .medicationCount(foundGameLog.getMedicationCount())
                .build();

        // 게임 로그 저장
        gameLogRepository.save(gameLog);
        log.info("게임 로그 저장 완료 => 카테고리 {} + 1", category);

        return gameLog;
    }

    /**
     * 게임 로그 카운트 증가
     * @param gameLog 게임 로그
     * @param category 게임 로그 카테고리
     */
    private void updateLogCount(GameLog gameLog, GameLogCategory category) {
        switch (category) {
            case meal_count:
                gameLog.setMealCount(gameLog.getMealCount() + 1);
                log.info("식사 카운트 증가: {}", gameLog.getMealCount());
                break;
            case exercise_count:
                gameLog.setExerciseCount(gameLog.getExerciseCount() + 1);
                log.info("운동 카운트 증가: {}", gameLog.getExerciseCount());
                break;
            case sleep_count:
                gameLog.setSleepCount(gameLog.getSleepCount() + 1);
                log.info("수면 카운트 증가: {}", gameLog.getSleepCount());
                break;
            case medication_count:
                gameLog.setMedicationCount(gameLog.getMedicationCount() + 1);
                log.info("복약 카운트 증가: {}", gameLog.getMedicationCount());
                break;
            default:
                throw new IllegalArgumentException("지원하지 않는 카테고리입니다: " + category);
        }
    }

}
