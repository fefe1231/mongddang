package com.onetwo.mongddang.domain.user.controller;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.user.dto.ConnectCtoPDto;
import com.onetwo.mongddang.domain.user.dto.SignupRequestDto;
import com.onetwo.mongddang.domain.user.jwt.JwtExtratService;
import com.onetwo.mongddang.domain.user.service.ConnectCtoPService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/ctop")
@RequiredArgsConstructor
@Tag(name = "CtoP API", description = "보호자-어린이 연결 관련 API")
public class CtoPController {

    private final JwtExtratService jwtExtratService;
    private final ConnectCtoPService connectCtoPService;

    @PostMapping("/connect")
    @Operation(summary = "초대코드 입력 API", description = "초대코드를 통해 보호자와 어린이를 연결합니다.")
    public ResponseEntity<ResponseDto> connectCtoP(@Valid @RequestBody ConnectCtoPDto connectCtoPDto, HttpServletRequest request) {
        Long userId = jwtExtratService.jwtFindId(request);
        ResponseDto response = connectCtoPService.connectCtoP(connectCtoPDto, userId);
        return ResponseEntity.ok(response);
    }
}
