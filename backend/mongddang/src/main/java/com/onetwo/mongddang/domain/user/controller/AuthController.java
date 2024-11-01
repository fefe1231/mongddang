package com.onetwo.mongddang.domain.user.controller;

import com.onetwo.mongddang.common.reponseDto.ResponseDto;
import com.onetwo.mongddang.domain.user.dto.SignupRequestDto;
import com.onetwo.mongddang.domain.user.service.SignupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@Tag(name = "Signup API", description = "회원가입 API")
public class AuthController {

    private final SignupService signupService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입 API", description = "비회원 유저에 대해 회원가입을 진행합니다.")
    public ResponseEntity<ResponseDto> signup(@Valid @RequestBody SignupRequestDto signupRequestDto){
        ResponseDto response = signupService.signup(signupRequestDto);
        return ResponseEntity.ok(response);
    }
}
