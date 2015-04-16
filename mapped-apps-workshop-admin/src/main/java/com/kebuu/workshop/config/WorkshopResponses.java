package com.kebuu.workshop.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="zenika.workshop.response")
@Data
public class WorkshopResponses {

    private String tp1;
    private String tp2;
    private String tp3;
    private Integer tp4;
    private String tp5;
}