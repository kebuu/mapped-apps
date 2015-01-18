package com.kebuu.workshop.controller;

import com.kebuu.workshop.config.WorkshopResponses;
import com.kebuu.workshop.dto.StepEvent;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

@RestController
@RequestMapping("/response")
public class StepResponseController {
    
    @Autowired private WorkshopResponses workshopResponses;
    @Autowired private SimpMessagingTemplate webSocketTemplate;

    @RequestMapping("/")
    public ResponseEntity<Void> d() {
        return ResponseEntity.ok().build();
    }
    
    @RequestMapping("/{tp:tp(?:1|2|3)}/{answer}/{user}")
    public ResponseEntity<Void> answerTp1(@PathVariable("tp") String tp, @PathVariable("answer") String answer, @PathVariable("user") String user) {
        boolean isAnswerCorrect = isAnswerCorrect(tp, answer);
        sendWebSocketFeedBack(tp, user, isAnswerCorrect);
        return isAnswerCorrect ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @RequestMapping(value="/tp4/{user}", method= RequestMethod.POST)
    public ResponseEntity<Void> handleFileUpload(@PathVariable("user") String user, @RequestParam("answer") MultipartFile file) throws IOException {
        boolean isAnswerCorrect = Arrays.equals(file.getBytes(), IOUtils.toByteArray(workshopResponses.getTp4().getInputStream()));
        sendWebSocketFeedBack("tp4", user, isAnswerCorrect);
        return isAnswerCorrect ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
    
    private void sendWebSocketFeedBack(String tp, String user, boolean isAnswerCorrect) {
        StepEvent stepEvent = StepEvent.builder().step(tp).user(user).successful(isAnswerCorrect).build();
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
