package com.everest.site.service.sdk;

import com.everest.site.domain.dto.sdk.SdkGen;
import com.everest.site.domain.entity.sdk.Dependency;
import com.everest.site.infra.ports.StoragePort;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RequiredArgsConstructor
@Service
public class SdkService {
    private final ResourcePatternResolver resourceResolver;
    private final StoragePort<String> storagePort;
    private static final String TEMPLATE_BASE_PATH = "FtcRobotController-master/";
    private static final String DEPENDENCY_FILE_NAME = "build.dependencies.gradle";

    public Optional<String> buildProjectToAWS(SdkGen sdkGen) {
        String projectName = sdkGen.projectName();
        List<Dependency> dependencies = sdkGen.dependencies();
        Path tempProjectDir = null;
        try {
            tempProjectDir = Files.createTempDirectory(projectName + "_temp_dir");
            copyTemplateAndModifyDependency(tempProjectDir, dependencies);
            ByteArrayOutputStream byteArrayOutputStream = createZipFromDirectory(tempProjectDir);

            String zipName = projectName + ".zip";
            byte[] zipBytes = byteArrayOutputStream.toByteArray();
            String uploadLink = storagePort.uploadFile(zipBytes, zipName, "application/zip", projectName);
            return Optional.ofNullable(uploadLink);

        } catch (IOException e) {
            throw new RuntimeException("Erro durante a construção ou upload do projeto.", e);
        } finally {
            if (tempProjectDir != null) {
                try {
                    Files.walk(tempProjectDir)
                            .sorted(Comparator.reverseOrder())
                            .forEach(path -> {
                                try {
                                    Files.delete(path);
                                } catch (IOException ignored) { }
                            });
                } catch (IOException ignored) {}
            }
        }
    }public void copyTemplateAndModifyDependency(Path destinationDir, List<Dependency> dependencies) throws IOException {
        String locationPattern = "classpath*:" + TEMPLATE_BASE_PATH + "**";
        Resource[] resources = resourceResolver.getResources(locationPattern);
        boolean dependencyFileFound = false;

        for (Resource resource : resources) {
            if (!resource.isReadable()) continue;
            String uriString = resource.getURI().toString();
            int startIndex = uriString.indexOf(TEMPLATE_BASE_PATH);
            if (startIndex == -1) continue;
            String relativePath = uriString.substring(startIndex);

            Path targetPath = destinationDir.resolve(relativePath);

            Files.createDirectories(targetPath.getParent());

            try (InputStream inputStream = resource.getInputStream()) {
                Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
            }
            if (relativePath.endsWith(DEPENDENCY_FILE_NAME)) {
                dependencyFileFound = true;

                List<String> lines = Files.readAllLines(targetPath, StandardCharsets.UTF_8);

                if (lines.size() < 16)
                    throw new IOException("O arquivo de dependência do template é muito curto para modificação.");

                lines.set(2, Dependency.CABECALHO.getResource());
                dependencies.forEach(dep -> {lines.add(16-1, dep.getResource());});

                Files.write(targetPath, lines, StandardCharsets.UTF_8);
            }
        }
        if (!dependencyFileFound)
                throw new FileNotFoundException("O arquivo de dependência (" + DEPENDENCY_FILE_NAME + ") não foi encontrado no template.");

    }
    public ByteArrayOutputStream createZipFromDirectory(Path sourceDir) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(bos)) {
            Files.walk(sourceDir)
                    .filter(path -> !Files.isDirectory(path))
                    .forEach(path -> {
                        try {
                            String zipEntryName = sourceDir.relativize(path).toString();
                            zipEntryName = zipEntryName.replace("\\", "/");

                            ZipEntry entry = new ZipEntry(zipEntryName);
                            zos.putNextEntry(entry);

                            Files.copy(path, zos);

                            zos.closeEntry();
                        } catch (IOException e) {
                            throw new RuntimeException("Erro ao adicionar arquivo ao ZIP: " + path, e);
                        }
                    });
        }
        return bos;
    }
}