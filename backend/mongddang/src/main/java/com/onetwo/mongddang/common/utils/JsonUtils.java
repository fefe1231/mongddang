package com.onetwo.mongddang.common.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class JsonUtils {

    public JsonNode JsonStringToJsonNode(String contentJson) {

        JsonNode content;

        // ObjectMapper로 JSON 문자열을 JsonNode로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            content = objectMapper.readTree(contentJson);
        } catch (
                IOException e) {
            // JSON 파싱 실패 시 예외 처리
            log.error("JSON 파싱 실패: {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return content;
    }
}
