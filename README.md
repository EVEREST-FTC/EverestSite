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
| 🟢 **Verde** | **POST** | Criação de recurso. |
| 🔵 **Azul** | **GET** | Leitura/Busca de recurso(s). |
| 🟡 **Amarelo** | **PATCH** | Alteração parcial de recurso. |
| 🟠 **Laranja** | **PUT** | Alteração total (substituição) de recurso. |
| 🔴 **Vermelho** | **DELETE** | Exclusão de recurso. |

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

| Endpoint | Descrição |
|:---| :--- |
| 🟢 `/auth/admin` | Registra novos managers. |
| 🟢 `/auth/user/login` | Realiza o login de um usuário existente. |
| 🟢 `/auth/user/register` | Cria uma nova conta de usuário. |

### 3.2. Informações e Gerenciamento de Usuário (Permissão: U, A, M)

| Endpoint | Descrição |
|:---|:---|
| 🔵 `/user` | Lê as informações do usuário logado. |
| 🔴 `/user` | Deleta a conta do usuário logado. |
| 🟠 `/user` | Atualiza **totalmente** as informações do usuário. |
| 🟡 `/user` | Atualiza **parcialmente** as informações do usuário. |

### 3.3. Funcionalidades STEM - Materiais

#### Gerenciamento de Materiais (Permissão: A, M)

| Endpoint | Descrição |
|:---| :--- |
| 🟢 `/stem/material/management` | Realiza o upload de um PDF de STEM para o AWS S3. |

#### Leitura de Materiais (Permissão: U)
| Endpoint | Descrição |
|:---| :--- |
| 🔵 `/stem/material/user` | Lista os links de todos os materiais disponíveis no AWS. |
| 🔵 `/stem/material/user/{filekey}` | Retorna o link para download de um arquivo específico. |

### 3.4. Funcionalidades STEM - Projetos

#### Gerenciamento de Projetos (Permissão: A, M)

| Endpoint | Descrição |
|:---| :--- |
| 🔵 `/stem/admin/projects` | Lista todos os projetos feitos por todas as equipes. |
| 🔵 `/stem/admin/projects/project/{userId}` | Lista os projetos de um usuário específico. |
| 🔴 `/stem/material/management` | Deleta um projeto específico de um usuário. |

#### Projetos do Usuário (Permissão: U)

| Endpoint | Descrição |
|:---| :--- |
| 🔵 `/stem/users/projects` | Lê as informações de todos os projetos do usuário logado. |
| 🟢 `/stem/users/projects` | Cria um novo projeto para o usuário logado. |
| 🔴 `/stem/users/projects/{projectName}` | Deleta um projeto do usuário pelo seu nome. |
| 🟡 `/stem/users/projects/{projectName}` | Altera **parcialmente** um projeto do usuário. |
| 🟠 `/stem/users/projects/{projectName}` | Altera **totalmente** (substitui) um projeto do usuário. |

### 4. Tarefas
#### 4.1 Feitas
- [x] Autenticação
- [x] Upar PDFs pro AWS
- [x] Diferenciar os ADMIN/USERS/Managers
- [x] Alterar informações dos usuários
- [x] Criar, ler, deletar, put e patch dos projetos
#### 4.2 Pendentes
- [ ] Fazer download dos materiais
- [ ] Colocar os materiais de stem
- [ ] Criar o campo de metas dos projetos -> Automatizar com microsserviços
- [ ] Criar o gerador de projetos
- [ ] Aprender a hospedar o site
