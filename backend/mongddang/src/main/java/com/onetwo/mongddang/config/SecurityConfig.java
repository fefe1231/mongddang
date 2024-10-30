package com.onetwo.mongddang.config;

import com.onetwo.mongddang.domain.user.jwt.JwtAuthenticationFilter;
import com.onetwo.mongddang.domain.user.jwt.JwtTokenProvider;
import com.onetwo.mongddang.domain.user.oauth.CustomOAuthAuthenticationProvider;
import com.onetwo.mongddang.domain.user.oauth.GoogleTokenService;
import com.onetwo.mongddang.domain.user.oauth.LoginFilter;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.domain.user.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private final GoogleTokenService googleTokenService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomOAuthAuthenticationProvider customOAuthAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화 실험
                // 폼 로그인 비활성화
                .formLogin(formLogin -> formLogin.disable())
                // 기본 인증 방식 비활성화
                .httpBasic(httpBasic -> httpBasic.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 관리
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login","/api/auth/signup").permitAll()
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/api-docs/**").permitAll()
                        .anyRequest().permitAll()
                )
                // LoginFilter를 '/api/v1/auth/login'에 대한 요청을 처리하도록 등록
                .addFilterBefore(new LoginFilter("/api/auth/login",
                        authenticationManager(authenticationConfiguration),
                        jwtTokenProvider,
                        customUserDetailsService,
                        userRepository,
                        googleTokenService), UsernamePasswordAuthenticationFilter.class)
                //JWT 필터 추가 (UsernamePasswordAuthenticationFilter 전에 실행)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    //다양한 인증 방식을 처리할 수 있는 매니저 생성
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // CustomOAuthAuthenticationProvider 등록
    @Autowired
    public void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(customOAuthAuthenticationProvider);
    }

}
