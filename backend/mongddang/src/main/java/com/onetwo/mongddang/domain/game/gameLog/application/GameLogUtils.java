package com.onetwo.mongddang.domain.game.gameLog.application;

import com.onetwo.mongddang.domain.game.gameLog.model.GameLog;
import com.onetwo.mongddang.domain.game.gameLog.repository.GameLogRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameLogUtils {


    public final GameLogRepository gameLogRepository;
    public final UserRepository userRepository;


    /**
     * 게임 로그 초기화 - 회원가입 시 호출
     *
     * @param id 사용자 id
     */
    @Transactional
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
     *
     * @param id       사용자 id
     * @param category 게임 로그 카테고리
     * @return 추가된 게임 로그
     */
    @Transactional
    public GameLog addGameLog(Long id, GameLog.GameLogCategory category) {
        log.info("addGameLog - userId: {}, category: {}", id, category);

        // id 에 해당하는 User 조회
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다. id: " + id));


        // userId에 해당하는 GameLog 조회
        GameLog foundGameLog = gameLogRepository.findTopByChildIdOrderByIdDesc(id)
                .orElseThrow(() -> new RuntimeException("게임 로그를 찾을 수 없습니다. userId: " + id));

        // 게임 로그 생성
        GameLog newGameLog = GameLog.builder()
                .child(user)
                .mealCount(category.equals(GameLog.GameLogCategory.meal_count) ? foundGameLog.getMealCount() + 1 : foundGameLog.getMealCount())
                .exerciseCount(category.equals(GameLog.GameLogCategory.exercise_count) ? foundGameLog.getExerciseCount() + 1 : foundGameLog.getExerciseCount())
                .sleepCount(category.equals(GameLog.GameLogCategory.sleep_count) ? foundGameLog.getSleepCount() + 1 : foundGameLog.getSleepCount())
                .medicationCount(category.equals(GameLog.GameLogCategory.medication_count) ? foundGameLog.getMedicationCount() + 1 : foundGameLog.getMedicationCount())
                .build();

        // 게임 로그 저장
        GameLog savedGameLog = gameLogRepository.save(newGameLog);
        log.info("게임 로그 저장 완료 => 카테고리 {} + 1", category);

        return savedGameLog;
    }
}
