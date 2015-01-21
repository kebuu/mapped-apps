package com.kebuu.workshop.controller;

import com.kebuu.workshop.config.WorkshopBonuses;
import com.kebuu.workshop.config.WorkshopResponses;
import com.kebuu.workshop.dto.StepEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

    @RequestMapping("/{tp:tp[1-4]}")
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
            bonus = workshopResponses.getTp1();
        } else if (tp.equals("tp2")) {
            bonus = workshopResponses.getTp2();
        } else if (tp.equals("tp3")) {
            bonus = workshopResponses.getTp3();
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
            isAnswerCorrect = workshopResponses.getTp4().equalsIgnoreCase(answer);
        }
        
        return isAnswerCorrect;
    }
}
