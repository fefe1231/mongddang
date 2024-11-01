package com.onetwo.mongddang.domain.user.service;

import com.onetwo.mongddang.common.reponseDto.ResponseDto;
import com.onetwo.mongddang.domain.user.dto.SignupRequestDto;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.jwt.JwtTokenProvider;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.oauth.GoogleTokenService;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SignupService {

    private final UserRepository userRepository;
    private final GoogleTokenService googleTokenService;
    private final MakeRandomCodeService makeRandomCodeService;
    private final JwtTokenProvider jwtTokenProvider;

    public ResponseDto signup(SignupRequestDto signupRequestDto){

        // idtoken에서 회원 정보 뽑기(email)
        String idToken = signupRequestDto.getIdToken();
        String email = googleTokenService.getEmailFromIdToken(idToken);

        // 이미 있는 사용자인지 검사
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RestApiException(CustomUserErrorCode.USER_IS_EXISTS);
        }

        String invitedCode = null; // 어른은 초대코드 null

        // role이 child일 때
        User.Role role = signupRequestDto.getRole();
        if (role.toString() == "child") {
            // 초대코드 생성
            invitedCode =  makeRandomCodeService.makeCodeAndCheckUnique();

            // 재화로그, 게임 로그 초기화
            // 코드 들어오면 하자...!
        }
        // 저장
        User user = User.builder()
                .email(email)
                .birth(signupRequestDto.getBirth())
                .gender(signupRequestDto.getGender())
                .nickname(signupRequestDto.getNickname())
                .name(signupRequestDto.getName())
                .role(role)
                .invitationCode(invitedCode)
                .build();
        userRepository.save(user);

        // jwt token 생성
        String jwtToken = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().toString(), user.getId());
        // response
        Map<Object, Object> data = new HashMap<>();
        data.put("accessToken", jwtToken);

        ResponseDto response = ResponseDto.builder()
                .message("회원가입을 성공했습니다.")
                .data(data)
                .build();

        return response;
    }
}