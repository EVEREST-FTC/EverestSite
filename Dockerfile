FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ARG ADMIN_EMAIL
ARG ADMIN_PASSWORD
ARG ALGORITHM_SECRET
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

ENV AWS_REGION=us-east-2
ENV AWS_BUCKET=bucket-projetos-everest


ENTRYPOINT ["java", "-jar", "app.jar"]