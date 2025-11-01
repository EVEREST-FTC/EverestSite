package com.everest.everest_site_eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EverestSiteEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(EverestSiteEurekaApplication.class, args);
	}

}
