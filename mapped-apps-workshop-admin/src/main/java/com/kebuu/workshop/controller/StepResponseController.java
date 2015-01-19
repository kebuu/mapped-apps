package com.kebuu.workshop.controller;

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
    @Autowired private SimpMessagingTemplate webSocketTemplate;

    @RequestMapping("/{tp:tp(?:[1-4])}/{answer}")
    public ResponseEntity<Void> answerTp1(@PathVariable("tp") String tp,
                                          @PathVariable("answer") String answer,
                                          @RequestParam("user") String user,
                                          @RequestParam(value = "userAvatarUrl", required = false) String userAvatarUrl) {
        boolean isAnswerCorrect = isAnswerCorrect(tp, answer);
        sendWebSocketFeedBack(tp, user, isAnswerCorrect, userAvatarUrl);
        return isAnswerCorrect ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    private void sendWebSocketFeedBack(String tp, String user, boolean isAnswerCorrect, String userAvatarUrl) {
        StepEvent stepEvent = StepEvent.builder().step(tp).user(user).successful(isAnswerCorrect).userAvatarUrl(userAvatarUrl).build();
        webSocketTemplate.convertAndSend("/topic/stepEvent", stepEvent);
    }

    private boolean isAnswerCorrect(String tp, String answer) {
        boolean isAnswerCorrect = false;

        if (tp.equals("tp1")) {
            isAnswerCorrect = workshopResponses.getTp1().equals(answer);
        } else if (tp.equals("tp2")) {
            isAnswerCorrect = workshopResponses.getTp2().equalsIgnoreCase(answer);
        } else if (tp.equals("tp3")) {
            isAnswerCorrect = workshopResponses.getTp3().equals(answer);
        }
        
        return isAnswerCorrect;
    }
}
