🏔️ Everest FTC #23060 - Official Website

"Inovação que Transforma o Mundo."

Bem-vindo ao repositório oficial do site da equipe de robótica Everest FTC SESI (#23060). Este projeto não é apenas uma vitrine, mas um Sistema Operacional completo para gestão da equipe, desenvolvido com uma estética Neo-Brutalista moderna e vibrante.

🚀 Funcionalidades

🌐 Área Pública (Landing Page)

Design Impactante: Estética Neo-Brutalista com bordas grossas, sombras duras e cores de alto contraste.

Showcase da Equipe: Seção interativa apresentando os membros como "cards de RPG".

Metodologia STEAM: Explicação visual e animada sobre como aplicamos Ciência, Tecnologia, Engenharia, Artes e Matemática.

Parceiros: Área dedicada aos patrocinadores que fazem o robô rodar.

🔐 Portal do Aluno (Sistema Interno)

Um dashboard simulando um painel de controle de robô industrial:

📊 Dashboard: Status em tempo real (bateria, ping), avisos e contagem regressiva para a temporada.

📂 Gestão de Projetos: Sistema Kanban para acompanhar a construção dos robôs e metas.

🔧 Almoxarifado: Controle visual de peças críticas (motores, hubs, baterias).

📝 Diário de Engenharia: Ferramenta para registro diário de progresso (obrigatório na FTC).

📚 Biblioteca Técnica: Acervo de manuais, regras e SDKs filtrável por nível (Kids, Teens, Pro).

🛠️ Tech Stack

Este projeto foi construído com as tecnologias mais modernas do ecossistema React:

Core: React + Vite (Build ultra-rápido)

Linguagem: TypeScript (Para tipagem segura)

Estilização: Tailwind CSS (Utility-first CSS)

Animações: Framer Motion (Transições suaves e complexas)

Componentes: Baseados em shadcn/ui

Ícones: Lucide React

Roteamento: React Router Dom

⚡ Como Rodar o Projeto

Pré-requisitos: Você precisa ter o Node.js instalado.

Clone o repositório:

git clone [https://github.com/SEU-USUARIO/site-everest-robotics.git](https://github.com/SEU-USUARIO/site-everest-robotics.git)
cd site-everest-robotics


Instale as dependências:

npm install


Rode o servidor de desenvolvimento:

npm run dev


Acesse:
Abra http://localhost:8080 (ou a porta indicada) no seu navegador.

📂 Estrutura de Pastas

src/
├── assets/          # Imagens (Logos, Fotos da Equipe)
├── components/      # Componentes Reutilizáveis (Navbar, Buttons, UI)
│   └── ui/          # Componentes base (shadcn)
├── pages/           # Páginas Principais
│   ├── Index.tsx    # Home / Landing Page
│   ├── Steam.tsx    # Página de Metodologia
│   ├── Portal.tsx   # Dashboard do Aluno
│   ├── Login.tsx    # Tela de Login Estilizada
│   └── Register.tsx # Tela de Cadastro
└── App.tsx          # Configuração de Rotas


🤝 Contribuição

Este projeto é mantido pelos alunos e mentores da equipe Everest. Quer ajudar?

Faça um Fork do projeto.

Crie uma Branch para sua feature (git checkout -b feature/NovaFuncionalidade).

Faça o Commit (git commit -m 'Adiciona nova funcionalidade incrível').

Faça o Push (git push origin feature/NovaFuncionalidade).

Abra um Pull Request.

📄 Licença

Este projeto é desenvolvido para fins educacionais no contexto do torneio FIRST Tech Challenge.

<p align="center">
Desenvolvido com 💙 e ☕ pela Equipe de Programação Everest #23060
</p>
