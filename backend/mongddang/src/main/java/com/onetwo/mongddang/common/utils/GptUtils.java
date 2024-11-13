package com.onetwo.mongddang.common.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class GptUtils {

    private final UserRepository userRepository;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.url}")
    private String url;

    public JsonNode requestGpt(String message) throws JsonProcessingException {
        String requestBody = this.createRequestBody(message);
        log.info("Request Body: {}", requestBody);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        try {
            String response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class).getBody();
            log.info("Response: {}", response);
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readTree(response);
        } catch (HttpClientErrorException e) {
            log.error("HTTP error: {} - Response body: {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("Failed to get GPT response: " + e.getMessage());
        } catch (Exception e) {
            log.error("An error occurred while requesting GPT: {}", e.getMessage(), e);
            throw new RuntimeException("Error while processing GPT request: " + e.getMessage());
        }
    }

    private String createRequestBody(String message) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode requestBody = objectMapper.createObjectNode();
        requestBody.put("model", "gpt-3.5-turbo");
        ArrayNode messages = requestBody.putArray("messages");
        ObjectNode messageNode = objectMapper.createObjectNode();
        messageNode.put("role", "user");
        messageNode.put("content", message);
        messages.add(messageNode);
        requestBody.put("temperature", 0.7);
        return objectMapper.writeValueAsString(requestBody);
    }
}
