package com.onetwo.mongddang.domain.user.jwt;

import com.onetwo.mongddang.domain.user.service.CustomUserDetailsService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.equals("/api/v1/auth/signup");  // /signup 경로에 필터 적용하지 않음
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Authorization 헤더에서 JWT 토큰을 가져옴
        String authorizationHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;

        // 헤더가 없는 경우 401 에러를 반환
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            log.error("JWT 토큰이 존재하지 않음 또는 올바르지 않음.");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT 토큰이 존재하지 않습니다.");
            return;
        }

        // "Bearer " 이후의 토큰 부분을 가져옴
        token = authorizationHeader.substring(7);

        try {
            // JWT 토큰에서 이메일 추출
            email = jwtTokenProvider.getEmailFromToken(token);
            log.info("토큰 추출 email : " + email);
        } catch (JwtException e) {
            log.error("JWT 토큰이 유효하지 않습니다.", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 JWT 토큰입니다.");
            return;
        }

    }
}
