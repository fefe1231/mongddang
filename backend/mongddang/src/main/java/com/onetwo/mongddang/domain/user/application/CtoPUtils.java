package com.onetwo.mongddang.domain.user.application;

import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.CtoPRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CtoPUtils {

    private final CtoPRepository ctoPRepository;

    /**
     * 보호자와 아이가 연결되어 있는지 확인
     *
     * @param protectorId 보호자 id
     * @param childId     아이 id
     * @return 연결되어 있으면 true, 아니면 false
     */
    public boolean checkProtectorAndChildIsConnected(Long protectorId, Long childId) {
        log.info("checkProtectorAndChildIsConnected protectorId: {}, childId: {}", protectorId, childId);

        // 보호자의 아이 리스트
        List<User> childrenList = ctoPRepository.findChildByProtectorId(protectorId);
        log.info("childrenList: {}", childrenList.size());

        // 보호자의 아이 리스트에 해당 아이가 있는지 확인
        for (User childInList : childrenList) {
            if (childInList.getId().equals(childId)) {
                return true;
            }
        }

        return false;
    }


}
