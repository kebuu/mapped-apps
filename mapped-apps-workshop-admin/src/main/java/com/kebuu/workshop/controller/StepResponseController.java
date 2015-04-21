package com.kebuu.workshop.controller;

import com.kebuu.workshop.config.WorkshopBonuses;
import com.kebuu.workshop.config.WorkshopResponses;
import com.kebuu.workshop.dto.StepEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.util.NumberUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/response")
public class StepResponseController {
    
    @Autowired private WorkshopResponses workshopResponses;
    @Autowired private WorkshopBonuses workshopBonuses;
    @Autowired private SimpMessagingTemplate webSocketTemplate;

    @RequestMapping("/{tp:tp[0-5]}")
    public ResponseEntity<String> answerTp1(@PathVariable("tp") String tp,
                                          @RequestParam("answer") String answer,
                                          @RequestParam("user") String user,
                                          @RequestParam(value = "userAvatarUrl", required = false) String userAvatarUrl) {
        boolean isAnswerCorrect = isAnswerCorrect(tp, answer);
        sendWebSocketFeedBack(tp, user, isAnswerCorrect, userAvatarUrl);
        return isAnswerCorrect ? ResponseEntity.ok(getBonus(tp)) : ResponseEntity.badRequest().body("");
    }

    private void sendWebSocketFeedBack(String tp, String user, boolean isAnswerCorrect, String userAvatarUrl) {
        StepEvent stepEvent = StepEvent.builder().step(tp).user(user).successful(isAnswerCorrect).userAvatarUrl(userAvatarUrl).build();
        webSocketTemplate.convertAndSend("/topic/stepEvent", stepEvent);
    }

    private String getBonus(String tp) {
        String bonus = null;

        if (tp.equals("tp1")) {
            bonus = workshopBonuses.getTp1();
        } else if (tp.equals("tp2")) {
            bonus = workshopBonuses.getTp2();
        } else if (tp.equals("tp3")) {
            bonus = workshopBonuses.getTp3();
        } else if (tp.equals("tp4")) {
            bonus = workshopBonuses.getTp4();
        }

        return bonus;
    }

    private boolean isAnswerCorrect(String tp, String answer) {
        boolean isAnswerCorrect = false;

        if (tp.equals("tp1")) {
            isAnswerCorrect = workshopResponses.getTp1().equalsIgnoreCase(answer);
        } else if (tp.equals("tp2")) {
            isAnswerCorrect = workshopResponses.getTp2().equalsIgnoreCase(answer);
        } else if (tp.equals("tp3")) {
            isAnswerCorrect = workshopResponses.getTp3().equalsIgnoreCase(answer);
        } else if (tp.equals("tp4")) {
            try {
                Integer answerInt = NumberUtils.parseNumber(answer, Integer.class);
                if (answerInt >= workshopResponses.getTp4() - 100 && answerInt <= workshopResponses.getTp4() + 100) {
                    isAnswerCorrect = true;
                }
            } catch (IllegalArgumentException e) {
                // Nothing
            }
        } else if (tp.equals("tp5")) {
            isAnswerCorrect = workshopResponses.getTp5().equalsIgnoreCase(answer);
        } else if (tp.equals("tp0")) {
            isAnswerCorrect = true;
        }
        
        return isAnswerCorrect;
    }
}
