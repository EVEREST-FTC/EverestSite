package com.everest.everest_site;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EverestSiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(EverestSiteApplication.class, args);
	}

}
