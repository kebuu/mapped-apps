package com.kebuu.workshop.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="zenika.workshop.bonus")
@Data
public class WorkshopBonuses {

    private String tp1;
    private String tp2;
    private String tp3;
}