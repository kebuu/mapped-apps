package com.kebuu.workshop.dto;

import lombok.Data;
import lombok.experimental.Builder;

@Data
@Builder
public class StepEvent {
    private String user;
    private String userAvatarUrl;
    private String step;
    private boolean successful;
}
