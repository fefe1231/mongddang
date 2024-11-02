package com.onetwo.mongddang.domain.user.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;

import com.onetwo.mongddang.domain.game.mongddang.errors.CustomMongddangErrorCode;
import com.onetwo.mongddang.domain.game.mongddang.model.Mongddang;
import com.onetwo.mongddang.domain.game.mongddang.model.MyMongddang;
import com.onetwo.mongddang.domain.game.mongddang.repository.MyMongddangRepository;
import com.onetwo.mongddang.domain.game.title.repository.MyTitleRepository;
import com.onetwo.mongddang.domain.user.dto.ConnectedUserInfoDto;
import com.onetwo.mongddang.domain.user.dto.UserInfoDto;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.CtoPRepository;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetUserInfoService {

    private final UserRepository userRepository;
    private final MyMongddangRepository myMongddangRepository;
    private final MyTitleRepository myTitleRepository;
    private final CtoPRepository ctoPRepository;

    public ResponseDto getUserInfo(Long userId) {
        //사용자
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("Existing User : {}", userId);

        // 메인 몽땅, 메인칭호, 연결 유저 리스트 초기화
        Long mainMongddang = null;
        Long mainTitle = null;
        List<User> connectedUserList = List.of();

        // 어린이일 때만 메인몽땅, 메인칭호 제공
        // 연결된 보호자 리스트 뽑아냄
        if ("child".equals(user.getRole().toString())) {
            // 메인 몽땅 id
            mainMongddang = myMongddangRepository.findByChildIdAndIsMainTrue(userId).get().getId();
            // 메인 칭호 id
            mainTitle = myTitleRepository.findByChildIdAndIsMainTrue(userId).get().getId();
            // 연결된 보호자 리스트
            connectedUserList = ctoPRepository.findProtectorByChildId(userId);
        }
        // 보호자일 경우 : 연결된 어린이 리스트 뽑기
        else if ("protector".equals(user.getRole().toString())) {
            // 연결된 어린이 리스트
            connectedUserList = ctoPRepository.findChildByProtectorId(userId);
        }

        // Object에 들어갈 연결상대 리스트 초기화 (상대 없으면 null 반환)
        List<ConnectedUserInfoDto> responseConnectedUserList = null;
        log.info("Empty response Children List : {}", responseConnectedUserList);

        // 연결된 어린이 리스트에 값이 있다면
        if (connectedUserList != null && !connectedUserList.isEmpty()) {
            // 반환할 값을 리스트로 선언
            responseConnectedUserList = new ArrayList<>();
            for (User connectedUser : connectedUserList) {
                //반환 형식에 맞게 dto에 담기
                ConnectedUserInfoDto responseUser = ConnectedUserInfoDto.builder()
                        .name(connectedUser.getName())
                        .nickname(connectedUser.getNickname())
                        .build();
                // 리스트에 넣기
                responseConnectedUserList.add(responseUser);
            }
        }

        // response data
        UserInfoDto data = UserInfoDto.builder()
                .name(user.getName())
                .role(user.getRole())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .invitationCode(user.getInvitationCode())
                .birth(user.getBirth())
                .gender(user.getGender())
                .mainMongddangId(mainMongddang)
                .mainTitleId(mainTitle)
                .connected(responseConnectedUserList)
                .build();

        // response
        ResponseDto response = ResponseDto.builder()
                .message("사용 가능한 닉네임입니다.")
                .data(data)
                .build();

        return response;
    }
}
