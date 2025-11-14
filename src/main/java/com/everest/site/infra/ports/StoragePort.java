package com.everest.site.infra.ports;

import org.springframework.core.io.InputStreamResource;

import java.util.List;

/// Interface que abstrai as implementações de portas necesárias
/// para as interações com o http.
/// Isso é ótimo para a escalabilidade do projeto, pois podemos ter
/// múltiplas implementações de portas coexistentes sem atrapalhar
/// os contextos que as demandem.
/// Para mudar a implementação, basta trocar a anotação Component
public interface StoragePort<T> {
    String uploadFile(byte[] file, String fileName, String contentType);

    String getPresignedURL(String keyName);
    List<T> getKeys();
    InputStreamResource downloadFile(String fileName);
}
