# API REST do site da Everest

## 1. Objetivo

A aplicação tem o objetivo de:
1. gerenciar as regras de acesso 
dos usuários
2. gerenciar as automações referentes ao dashboard de projetos 
idealizados pelas equipes
3. administrar o armazenamento
e a leitura dos materiais de estudo de STEM em nuvem (usando um
bucket do AWS)
4. Produzir de um SDK da FTC com dependências 
selecionáveis pelo usuário (parecido com o spring initializr,
mas no contexto do desenvolvimento da FTC)
5. Possuir funcionalidades de CRUD para desses projetos
e para os usuários.

Os projetos são objetos criados pelos usuários e armazenados em um banco de dados,
bem como os usuários. Eles representam ações sociais feitas pelas equipes.
A utilidade do site para esses projetos é servir como um alarme para
metas e outras funcionalidades analíticas que podem ser implementadas no futuro.

## 2. Legendas

### 2.1 O que cada cor representa:

| Cor | Método HTTP | Ação |
| :--- | :--- | :--- |
| <span style="color: green;">Verde</span> | **POST** | Criação de recurso. |
| <span style="color: blue;">Azul</span> | **GET** | Leitura/Busca de recurso(s). |
| <span style="color: yellow;">Amarelo</span> | **PATCH** | Alteração parcial de recurso. |
| <span style="color: orange;">Laranja</span> | **PUT** | Alteração total (substituição) de recurso. |
| <span style="color: red;">Vermelho</span> | **DELETE** | Exclusão de recurso. |

---
### 2.2 Permissões:
| Código | Nível de Acesso | Descrição |
| :----: | :--- | :--- |
| **NONE** | Acesso Livre | Não requer autenticação. |
| **U** | Usuário | Usuário autenticado padrão. |
| **M** | Manager | Usuário com permissões de gerenciamento. |
| **A** | Administrador | Usuário com permissões administrativas elevadas. |
## 3 Funcionalidades:
### 3.1. Autenticação e Registro (Permissão: NONE)

| Endpoint                                                                        | Descrição |
|:--------------------------------------------------------------------------------| :--- |
         | <span style="color: green;">/auth/admin</span>                                  | Registra novos managers. |
              | <span style="color: green;">/auth/user/login</span>                             | Realiza o login de um usuário existente. |
                   | <span style="color: green;">/auth/user/register</span>                             | Cria uma nova conta de usuário. |

### 3.2. Informações e Gerenciamento de Usuário (Permissão: U, A, M)

| Endpoint                                                        | Descrição                                                      |
|:----------------------------------------------------------------|:---------------------------------------------------------------|
           | <span style="color: blue;">/user</span>      | Lê as informações do usuário logado.                           |
                                              | <span style="color: red;">/user</span>    | Deleta a conta do usuário logado.                              |
                                                 | <span style="color: orange;">/user</span> | Atualiza **totalmente** as informações do usuário.             |
                                                  | <span style="color: yellow">/user</span> | Atualiza **parcialmente** as informações do usuário. |

### 3.3. Funcionalidades STEM - Materiais

#### Gerenciamento de Materiais (Permissão: A, M)

| Endpoint                                 | Descrição |
|:-----------------------------------------| :--- |
       | <span style="color: green;">/stem/material/management</span> | Realiza o upload de um PDF de STEM para o AWS S3. |

#### Leitura de Materiais (Permissão: U)
| Endpoint                                                        | Descrição |
|:----------------------------------------------------------------| :--- |
| <span style="color: blue;">/stem/material/user</span>           | Lista os links de todos os materiais disponíveis no AWS. |
| <span style="color: blue;">/stem/material/user/{filekey}</span> | Retorna o link para download de um arquivo específico. |

### 3.4. Funcionalidades STEM - Projetos

#### Gerenciamento de Projetos (Permissão: A, M)

| Endpoint                                                                                                                  | Descrição |
|:--------------------------------------------------------------------------------------------------------------------------| :--- |
| <span style="color: blue;">/stem/admin/projects</span>                                                                    | Lista todos os projetos feitos por todas as equipes. |
| <span style="color: blue;">/stem/admin/projects/project/{userId}</span>                                                   | Lista os projetos de um usuário específico. |
| <span style="color: red;">/stem/material/management</span>                                                                | Deleta um projeto específico de um usuário. |

#### Projetos do Usuário (Permissão: U)

| Endpoint                                                                                                        | Descrição |
|:----------------------------------------------------------------------------------------------------------------| :--- |
| <span style="color: blue;">/stem/users/projects</span>                                                          | Lê as informações de todos os projetos do usuário logado. |
| <span style="color: green;">/stem/users/projects</span>                                                         | Cria um novo projeto para o usuário logado. |
| <span style="color: red;">/stem/users/projects/{projectName}</span>                                             | Deleta um projeto do usuário pelo seu nome. |
| <span style="color: yellow;">/stem/users/projects/{projectName}</span>                                          | Altera **parcialmente** um projeto do usuário. |
| <span style="color: orange;">/stem/users/projects/{projectName}</span>                                                   | Altera **totalmente** (substitui) um projeto do usuário. |

### 4. Tarefas
#### 4.1 Feitas

#### 4.2 Pendentes

