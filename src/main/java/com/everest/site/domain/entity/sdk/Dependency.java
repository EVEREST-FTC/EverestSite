package com.everest.site.domain.entity.sdk;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Dependency {
    CABECALHO("    maven{ url = 'https://www.jitpack.io'}\n" +
            "    maven{ url = 'https://maven.brott.dev/'}\n"+
            "}"),
    LOMBOK("    compileOnly 'org.projectlombok:lombok'\n" +
            "    annotationProcessor 'org.projectlombok:lombok'"),
    COMMAND_BASED("    implementation 'com.github.EVEREST-FTC:Command-Based:1.7.1'"),
    ROADRUNNER("    implementation 'com.acmerobotics.roadrunner:ftc:0.1.25'\n" +
            "    implementation 'com.acmerobotics.roadrunner:core:1.0.1'\n" +
            "    implementation 'com.acmerobotics.roadrunner:actions:1.0.1'\n" +
            "    implementation 'com.acmerobotics.dashboard:dashboard:0.5.1'"),
    GRAPHS("    implementation 'com.github.angelolfreitas:P1Demo:1.5'")
    ;
    final String resource;

}
