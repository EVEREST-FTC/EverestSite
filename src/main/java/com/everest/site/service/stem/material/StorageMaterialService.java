package com.everest.site.service.stem.material;

import com.everest.site.domain.dto.stem.material.MaterialResponse;
import com.everest.site.infra.ports.StoragePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class StorageMaterialService {
    private final StoragePort<String> storagePort;
    private static final String REQUIRED_CONTENT_TYPE = "application/pdf";
    private static final String DEFAULT_EXTENSION = ".pdf";

    
    public String getPresignedURL(String fileKey){
        return  storagePort.getPresignedURL(fileKey);
    }


    public List<String> listMaterials(){
        return  storagePort.getKeys();
    }

    public MaterialResponse uploadMaterial(MultipartFile file, String userName) throws IOException {

        if(!REQUIRED_CONTENT_TYPE.equals(file.getContentType()))
            throw new IllegalArgumentException("Invalid file type");

        String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
        byte[] fileBytes = file.getBytes();

        String url = storagePort.uploadFile(fileBytes, uniqueFileName, "application/pdf");
        return new MaterialResponse(url,
                userName);
    }



    private String generateUniqueFileName(String originalFileName) {
        String extension = DEFAULT_EXTENSION;
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        return UUID.randomUUID() + extension;
    }


}
