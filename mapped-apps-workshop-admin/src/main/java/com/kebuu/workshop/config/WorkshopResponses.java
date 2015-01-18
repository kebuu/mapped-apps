package com.kebuu.workshop.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="zenika.workshop.response")
@Data
public class WorkshopResponses {

    private Long tp1;
    private String tp2;
    private Long tp3;
    private Resource tp4;
}