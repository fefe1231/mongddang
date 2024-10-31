package com.onetwo.mongddang.domain.game.achievement.service;

import com.onetwo.mongddang.common.ResponseDto;
import com.onetwo.mongddang.domain.game.achievement.dto.RequestAchievementListDto;
import com.onetwo.mongddang.domain.game.achievement.model.Achievement;
import com.onetwo.mongddang.domain.game.achievement.repository.AchievementRepository;
import com.onetwo.mongddang.domain.game.gameLog.model.GameLog;
import com.onetwo.mongddang.domain.game.gameLog.repository.GameLogRepository;
import com.onetwo.mongddang.domain.game.title.model.MyTitle;
import com.onetwo.mongddang.domain.game.title.model.Title;
import com.onetwo.mongddang.domain.game.title.repository.MyTitleRepository;
import com.onetwo.mongddang.domain.game.title.repository.TitleRepository;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final TitleRepository titleRepository;
    private final MyTitleRepository myTitleRepository;
    private final UserRepository userRepository;
    private final GameLogRepository gameLogRepository;

    // 업적 목록 조회
    @Transactional
    public ResponseDto getAchievementList(Long childId) {
        log.info("getAchievementList childId: {}", childId);

        List<Achievement> achievementList = achievementRepository.findAll();
        List<RequestAchievementListDto> achievementListDto = achievementList.stream()
                .map(achievement -> {
                    // 업적에 해당하는 칭호 조회
                    Title title = titleRepository.findById(achievement.getId()).orElse(null);

                    // 유저의 게임 로그 조회
                    GameLog gameLog = gameLogRepository.findTopByChildId(childId);

                    MyTitle myTitle = myTitleRepository.findByTitleId(title.getId());

                    // 업적 달성 여부
                    boolean isAchieved;
                    switch (achievement.getCategory()) {
                        case meal:
                            isAchieved = gameLog.getMealCount() >= achievement.getCount();
                            break;
                        case sleep:
                            isAchieved = gameLog.getSleepCount() >= achievement.getCount();
                            break;
                        case exercise:
                            isAchieved = gameLog.getExerciseCount() >= achievement.getCount();
                            break;
                        default:
                            isAchieved = gameLog.getMedicationCount() >= achievement.getCount();
                            break;
                    }
                    return RequestAchievementListDto.builder()
                            .titleId(title.getId())
                            .titleName(title.getName())
                            .description(achievement.getDescription())
                            .executionCount(1)
                            .count(achievement.getCount())
                            .category(achievement.getCategory())
                            .isOwned(isAchieved)
                            .isNew(isAchieved ? myTitle.getIsNew() : false)
                            .isMain(isAchieved ? myTitle.getIsMain() : false)
                            .build();
                })
                .toList();

        ResponseDto responseDto = ResponseDto.builder()
                .message("업적 목록 조회에 성공했습니다.")
                .data(achievementListDto)
                .build();

        return responseDto;
    }

    // 업적 보상 수령

    // 메인 업적 설정
}
