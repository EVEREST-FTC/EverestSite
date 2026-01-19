
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { 
  Rocket, Users, Trophy, Target, Eye, Heart, UsersRound, Wrench, Megaphone, PenTool, HeartHandshake, Crown, Terminal, Hash,
  Atom, Monitor, Cog, Palette, Calculator, ArrowRight, Search,
  ExternalLink, LayoutDashboard, Clock, Code, Map, Globe, Zap, Handshake, Cpu, Award, Smile
} from "lucide-react";

// --- IMPORTAÇÃO DAS IMAGENS ---

// Projetos e Linha do Tempo
import teamEverestImg from "@/assets/projects/teamEverest.png";
import steamSeasonsImg from "@/assets/projects/linhaEverest.png"; // Verifique se o nome é esse mesmo

// Parceiros (Ajuste a extensão .png ou .jpg conforme seus arquivos reais)
import logoSesi from "@/assets/partners/logoSesi.png";
import logoGlobaltec from "@/assets/partners/logoGlobaltec.png";
import logoIfageek from "@/assets/partners/logoIfageek.png";
import logoStemOs from "@/assets/partners/logoStemOs.png";
import logoDrControle from "@/assets/partners/logoDrControle.png";
import logoParga from "@/assets/partners/logoParga.png";
import logoBemBom from "@/assets/partners/logoBemBom.png";
import logoFiema from "@/assets/partners/logoFiema.png";
import logoGamut from "@/assets/partners/logoGamut.png";
import logoSH from "@/assets/partners/logoSH.png";

const Index = () => {
  // Scroll suave pro hero ao carregar
  useEffect(() => {
    const timer = setTimeout(() => {
      const heroElement = document.getElementById('hero-main-content');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  // Estado para virar os cards (Simplificado para evitar erro de TypeScript)
  const [flippedProjects, setFlippedProjects] = useState({});

  const toggleProjectFlip = (index) => {
    setFlippedProjects(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Cores Neo-Brutalistas
  const colors = {
    yellow: "bg-[#FFD600]",
    pink: "bg-[#e2798b]",
    blue: "bg-[#4D96FF]",
    green: "bg-[#6BCB77]",
    red: "bg-[#FF4C4C]",
    purple: "bg-[#9D4EDD]",
    dark: "bg-[#1A1A1A]",
    white: "bg-white",
  };

  // Dados STEAM
  const steamItems = [
    { letter: "S", title: "Science", desc: "Exploramos o método científico para entender o mundo, formulando hipóteses e realizando experimentos práticos.", color: colors.blue, icon: Atom },
    { letter: "T", title: "Technology", desc: "Dominamos ferramentas digitais, programação e softwares de ponta para dar vida aos nossos robôs.", color: colors.pink, icon: Monitor },
    { letter: "E", title: "Engineering", desc: "Aplicamos princípios de engenharia mecânica e elétrica para construir soluções robustas e eficientes.", color: colors.yellow, icon: Cog },
    { letter: "A", title: "Arts", desc: "O design e a criatividade são essenciais. Unimos estética e funcionalidade em nossa identidade visual.", color: colors.purple, icon: Palette },
    { letter: "M", title: "Math", desc: "A linguagem do universo. Usamos lógica, geometria e cálculo para programar movimentos precisos.", color: colors.red, icon: Calculator }
  ];

  // Dados Projetos
  const projects = [
    { 
      name: "EverestBot v1", 
      desc: "Primeira versão do robô para competição regional.", 
      color: "bg-[#4D96FF]", 
      image: teamEverestImg, // Use a imagem específica se tiver
      details: "O EverestBot V1 foi construído com foco em agilidade. Utilizamos chassi de tração direta e uma garra de sucção inovadora para maximizar a pontuação."
    },
    { 
      name: "EverestBot v2", 
      desc: "Sistema de coleta automatizado e visão computacional.", 
      color: "bg-[#FF6B6B]", 
      image: teamEverestImg,
      details: "A versão V2 integrou câmeras para detecção de objetos autônoma e um braço articulado com 3 graus de liberdade para maior precisão."
    },
    { 
      name: "Social Impact", 
      desc: "Projeto de inclusão digital em escolas públicas.", 
      color: "bg-[#FFD600]", 
      image: teamEverestImg,
      details: "Levamos oficinas de lógica e montagem de Lego para mais de 5 escolas, impactando 200 crianças diretamente com a metodologia STEAM."
    },
    { 
      name: "Outreach", 
      desc: "Workshops de robótica para comunidade.", 
      color: "bg-[#6BCB77]", 
      image: teamEverestImg,
      details: "Eventos abertos onde a comunidade pode pilotar nossos robôs e aprender sobre as competições da FIRST e oportunidades na tecnologia."
    }
  ];

  // Lista de Parceiros (Imagens Importadas)
  const partnersList = [
    logoSesi, logoGlobaltec, logoIfageek, logoStemOs, logoDrControle, 
    logoParga, logoBemBom, logoFiema, logoGamut, logoSH
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FFFDF5] font-sans selection:bg-black selection:text-white">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-4 md:left-10 w-4 h-full border-l-4 border-black border-dashed opacity-20 hidden md:block"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial="hidden" animate="visible" variants={fadeUpVariants} transition={{ duration: 0.5 }}
              className="bg-white border-4 border-black p-8 md:p-12 rounded-[2rem] shadow-[8px_8px_0px_0px_#000] relative"
            >
              <div className="absolute -top-6 left-8 flex gap-4">
                <div className="w-12 h-6 bg-white border-4 border-black border-b-0 rounded-t-lg"></div>
                <div className="w-12 h-6 bg-white border-4 border-black border-b-0 rounded-t-lg"></div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full font-bold text-xs md:text-sm mb-6 -rotate-2 shadow-[4px_4px_0px_0px_#888]">
                <Trophy className="h-4 w-4 text-[#FFD600]" />
                <span>FIRST® TECH CHALLENGE TEAM</span>
              </div>

              <h1 className="font-heading font-black text-5xl md:text-7xl leading-[0.9] text-black mb-6 uppercase">
                Inovação que <br/>
                <span className="text-[#4D96FF] bg-black/5 px-1 ">Transforma</span> <br/>
                o Mundo.
              </h1>

              <p className="text-black font-medium text-lg mb-8 border-l-8 border-[#FF6B6B] pl-4">
                A <strong>FIRST Tech Challenge (FTC)</strong> desafia estudantes a projetar e pilotar robôs. Construímos o futuro com peças de criatividade e paixão.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#FFD600] text-black border-2 border-black hover:bg-[#ffe033] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000] transition-all font-black text-lg px-8 py-6 rounded-xl">
                  CONHEÇA A EQUIPE <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" 
                onClick={() => {
                  const section = document.getElementById('first-ftc');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black border-2 border-black hover:bg-gray-50 hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000] transition-all font-black text-lg px-8 py-6 rounded-xl">
                  SOBRE A FTC
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, rotate: 5 }}
              animate={{ opacity: 1, rotate: 3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div id="hero-main-content" className="bg-white p-4 pb-20 border-4 border-black shadow-[12px_12px_0px_0px_#000] rounded-[2rem] rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/3] w-full border-2 border-black rounded-xl overflow-hidden bg-black">
                  <img src={teamEverestImg} alt="Equipe Everest" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-2 left-8 ">
                  <div className="font-heading font-black text-4xl text-black">EVEREST TEAM</div>
                  <div className="font-mono text-sm text-gray-500 font-bold">Temporada 2025 • São Luís, MA</div>
                </div>
                
                <motion.a 
                  href="/portal"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="absolute -bottom-6 -right-2 md:-right-6 bg-[#9D4EDD] border-4 border-black text-white p-4 rounded-2xl shadow-[6px_6px_0px_0px_#000] flex items-center gap-3 cursor-pointer z-20"
                >
                  <div className="bg-white border-2 border-black p-2 rounded-lg">
                    <LayoutDashboard className="text-black w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-sm">PORTAL DO ALUNO</div>
                    <div className="text-[10px] font-mono bg-black/20 px-2 rounded w-fit">ACESSO RESTRITO</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute -bottom-[1px] left-0 w-full z-20">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0 50L48 55C96 60 192 70 288 75C384 80 480 80 576 75C672 70 768 60 864 55C960 50 1056 50 1152 55C1248 60 1344 70 1392 75L1440 80V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z" fill="#FFD600" stroke="black" strokeWidth="3" />
          </svg>
        </div>
      </section>

      {/* --- DIVISOR: FAIXA --- */}
      <div className="w-full bg-[#FFD600] border-b-4 border-black py-4 overflow-hidden relative z-20 mt-[-2px]">
        <div className="flex justify-center items-center gap-9 font-black text-xl md:text-2xl italic tracking-widest text-black whitespace-nowrap animate-marquee top-2">
            <Zap className="fill-black w-6 h-6" /> EVEREST FCT <Zap className="fill-black w-6 h-6" /> STEAM EDUCATION <Zap className="fill-black w-6 h-6" /> FUTURE IS NOW <Zap className="fill-black w-6 h-6" /> ROBOTICS TEAM <Zap className="fill-black w-6 h-6" /> INNOVATION & TECHNOLOGY <Zap className="fill-black w-6 h-6" />
        </div>
      </div>

      {/* --- SEÇÃO QUEM SOMOS --- */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            <div className="bg-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_#000]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#FF6B6B] rounded-full border-2 border-black"></div>
                <h2 className="font-heading font-black text-5xl text-black">QUEM SOMOS?</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed text-slate-900 mb-6">
                A Equipe Everest nasceu em 2022 e está entre os primeiros times de robótica formados no Maranhão.
                Nosso laboratório funciona no SESI São Luís – ANEXO.
              </p>
              <p className="text-lg font-medium leading-relaxed text-slate-900">
                Nosso trabalho é estruturado em duas frentes: <span className="bg-[#FF6B6B] px-2 py-0.5 border-2 border-black text-white rounded-md mx-1 font-bold shadow-[2px_2px_0px_0px_#000]">AE (Administração)</span> Estratégia, reúne toda a parte de gestão da equipe, marketing, mídias, documentação e ações sociais. Já a <span className="bg-[#4D96FF] px-2 py-0.5 border-2 border-black text-white rounded-md mx-1 font-bold shadow-[2px_2px_0px_0px_#000]">MCI (Mecânica)</span>, Controle e Inovação, concentra o desenvolvimento técnico, englobando engenharia, eletrônica e programação do robô. A integração dessas áreas representa a essência da Everest: unir estratégia e tecnologia para criar soluções inteligentes e elevar cada vez mais o nível da robótica no estado.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-0">
              <div className="bg-black text-white -z-2 py-2 px-6 h-12 rounded-t-2xl border-4 border-black border-b-0 w-fit font-bold mx-auto">
                TIMELINE EVEREST
              </div>
              <div className="bg-white border-4 border-black p-4 rounded-[2rem] shadow-[8px_8px_0px_0px_#000] rotate-0 hover:rotate-1 transition-transform duration-300">
                <div className="flex justify-between mb-4 px-2">
                   {[...Array(6)].map((_,i) => <div key={i} className="w-3 h-3 bg-black rounded-full border border-gray-500"></div>)}
                </div>
                
                <div className="border-4 border-black rounded-xl overflow-hidden bg-gray-100">
                  <img src={steamSeasonsImg} alt="Linha do Tempo" className="w-full h-auto object-cover" />
                </div>

                <div className="flex justify-between mt-4 px-2">
                   {[...Array(6)].map((_,i) => <div key={i} className="w-3 h-3 bg-black rounded-full border border-gray-500"></div>)}
                </div>
                <div className="text-center font-black text-2xl mt-4 text-black uppercase tracking-tighter">Uma Jornada de Evolução</div>
              </div>
            </div>

          </div>
        </div>
      </section>

    {/* --- SEÇÃO FIRST & FTC (ESTILO MANUAL DE JOGO/TABULEIRO) --- */}
      <section id="first-ftc" className="py-24 bg-[#FF6B6B] border-y-4 border-black relative overflow-hidden">
        
        {/* Fundo Decorativo: Padrão de Tabuleiro */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Cabeçalho da Seção */}
          <div className="text-center mb-20">
            <div className="inline-block bg-white border-4 border-black px-8 py-3 rounded-full shadow-[8px_8px_0px_0px_#000] rotate-2 mb-6">
              <span className="font-heading font-black text-2xl md:text-3xl text-black">MISSION: BRIEFING</span>
            </div>
            <h2 className="font-heading font-black text-5xl md:text-7xl text-white drop-shadow-[4px_4px_0px_#000]">
              O QUE É A <span className="text-[#FFD600]">FIRST</span>?
            </h2>
          </div>

          {/* GRID PRINCIPAL: FIRST vs FTC */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            
            {/* BLOCO 1: SOBRE A FIRST (Azul) */}
            <motion.div 
              whileHover={{ y: -8, rotate: -1 }}
              className="bg-[#4D96FF] border-4 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_#000] relative"
            >
              {/* Etiqueta no topo */}
              <div className="absolute -top-6 left-10 bg-white border-4 border-black px-4 py-1 rounded-lg font-black text-sm rotate-3">
                COMUNIDADE GLOBAL
              </div>
              
              <Globe className="w-16 h-16 text-white mb-6 drop-shadow-[4px_4px_0px_#000]" />
              
              <h3 className="font-heading font-black text-4xl text-white mb-4 drop-shadow-[2px_2px_0px_#000]">
                TRANSFORMANDO O FUTURO
              </h3>
              <p className="font-bold text-white text-lg leading-relaxed mb-6">
                A <span className="bg-black text-white px-1">FIRST</span> é a principal comunidade de robótica para jovens do mundo. Mais do que robôs, oferecemos aprendizado prático em STEM que constrói confiança e prepara para a vida.
              </p>
              
              {/* Mini Stats (Scoreboard) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 border-2 border-black p-3 rounded-xl text-center">
                  <span className="block font-heading font-black text-2xl text-[#FFD600]">3.200+</span>
                  <span className="text-xs font-bold text-white uppercase">Equipes no Mundo</span>
                </div>
                <div className="bg-black/20 border-2 border-black p-3 rounded-xl text-center">
                  <span className="block font-heading font-black text-2xl text-[#FFD600]">$80M+</span>
                  <span className="text-xs font-bold text-white uppercase">Em Bolsas de Estudo</span>
                </div>
              </div>
            </motion.div>

            {/* BLOCO 2: SOBRE A FTC (Amarelo) */}
            <motion.div 
              whileHover={{ y: -8, rotate: 1 }}
              className="bg-[#FFD600] border-4 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_#000] relative"
            >
              {/* Etiqueta no topo */}
              <div className="absolute -top-6 right-10 bg-white border-4 border-black px-4 py-1 rounded-lg font-black text-sm -rotate-3">
                PARA JOVENS 12-18 ANOS
              </div>

              <Cpu className="w-16 h-16 text-black mb-6" />
              
              <h3 className="font-heading font-black text-4xl text-black mb-4">
                FIRST TECH CHALLENGE
              </h3>
              <p className="font-bold text-black text-lg leading-relaxed mb-6">
                Não é só sobre construir robôs. Na <span className="bg-white px-1 border border-black">FTC</span>, equipes projetam, programam e operam robôs para competir em um formato de aliança.
              </p>

              <ul className="space-y-3 font-bold text-black text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center shrink-0">1</div>
                  <span>Desenvolvimento de Robôs de até 18kg</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center shrink-0">2</div>
                  <span>Programação Java (Android Studio)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center shrink-0">3</div>
                  <span>Engajamento com a Comunidade</span>
                </li>
              </ul>
            </motion.div>

          </div>

          {/* FAIXA: COMO FUNCIONA O JOGO? */}
          <div className="bg-white border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 text-center mb-10">
              <h3 className="font-heading font-black text-3xl md:text-5xl text-black mb-4">
                COMO FUNCIONA A TEMPORADA?
              </h3>
              <p className="font-bold text-slate-600 max-w-3xl mx-auto">
                Todos os anos, um novo desafio global é lançado. As equipes têm meses para criar estratégias, construir e programar.
              </p>
            </div>

            {/* CORE VALUES (CARDS PEQUENOS) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Search, label: "Descoberta", color: "bg-blue-400" },
                { icon: Zap, label: "Inovação", color: "bg-yellow-400" },
                { icon: Globe, label: "Impacto", color: "bg-green-400" },
                { icon: Heart, label: "Inclusão", color: "bg-red-400" },
                { icon: Users, label: "Trabalho em Equipe", color: "bg-purple-400" },
                { icon: Smile, label: "Diversão", color: "bg-orange-400" },
              ].map((val, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className={`${val.color} border-4 border-black rounded-xl p-4 flex flex-col items-center justify-center aspect-square shadow-[4px_4px_0px_0px_#000]`}
                >
                  {/* Se o ícone não existir no lucide, troque por um genérico */}
                  <val.icon className="w-8 h-8 text-black mb-2" />
                  <span className="font-black text-black text-xs uppercase text-center">{val.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- SEÇÃO EQUIPE: SQUAD 23060 --- */}
      <section id="team" className="py-24 bg-[#FFFDF5] border-t-4 border-black relative overflow-hidden">
        
        {/* Elementos Decorativos de Fundo */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Header da Seção */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 rounded-full font-mono text-sm mb-4">
              <Hash className="w-4 h-4 text-[#FFD600]" />
              <span>TEAM_ID: 23060</span>
            </div>
            
            <h2 className="font-heading font-black text-5xl md:text-7xl text-black relative inline-block">
              MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#9D4EDD] decoration-black underline decoration-4 underline-offset-8">SQUAD</span>
              {/* Estrela decorativa */}
              <svg className="absolute -top-8 -right-12 w-16 h-16 text-[#FFD600] animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </h2>
            <p className="mt-6 font-bold text-slate-600 max-w-2xl mx-auto text-lg">
              7 mentes, robôs e estudo infinito. Conheça os humanos por trás da máquina.
            </p>
          </div>

          {/* Grid da Equipe */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            
            {/* --- CONFIGURAÇÃO DOS MEMBROS --- */}
            {[
              { 
                name: "Nome do Gestor", 
                role: "Team Captain", 
                tag: "GESTOR",
                icon: Crown, 
                color: "bg-[#FFD600]", 
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", // Placeholder
                desc: "O estrategista. Mantém o time focado e o cronograma em dia (na medida do possível).",
                stat: "Liderança",
                level: "99%"
              },
              { 
                name: "Nome Eng 1", 
                role: "Lead Engineer", 
                tag: "MECÂNICA",
                icon: Wrench, 
                color: "bg-[#4D96FF]", 
                img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop", 
                desc: "Transforma café em código e peças de metal. Se quebrou, ele conserta.",
                stat: "CAD Skills",
                level: "95%"
              },
              { 
                name: "Nome Eng 2", 
                role: "Hardware Spec.", 
                tag: "ELÉTRICA",
                icon: Terminal, 
                color: "bg-[#4D96FF]", 
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", 
                desc: "Mestre dos fios e da programação. Fala Java fluentemente.",
                stat: "Bugs Criados",
                level: "0%"
              },
              { 
                name: "Nome Mkt", 
                role: "Marketing Head", 
                tag: "MARKETING",
                icon: Megaphone, 
                color: "bg-[#FF6B6B]", 
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", 
                desc: "Cuida da nossa imagem e garante que o Instagram esteja sempre on fire.",
                stat: "Criatividade",
                level: "100%"
              },
              { 
                name: "Nome Design", 
                role: "Art Director", 
                tag: "DESIGN",
                icon: PenTool, 
                color: "bg-[#9D4EDD]", 
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", 
                desc: "Tudo o que você vê de bonito saiu da cabeça dessa pessoa. Pixel Perfect.",
                stat: "Estética",
                level: "100%"
              },
              { 
                name: "Nome Comms", 
                role: "PR Manager", 
                tag: "COMUNICAÇÃO",
                icon: HeartHandshake, 
                color: "bg-[#FF9F43]", 
                img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop", 
                desc: "A voz da equipe. Conecta a Everest com parceiros, juízes e o mundo.",
                stat: "Carisma",
                level: "110%"
              },
              { 
                name: "Nome Social", 
                role: "Impact Lead", 
                tag: "PROJETO SOCIAL",
                icon: Globe, 
                color: "bg-[#6BCB77]", 
                img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop", 
                desc: "Leva a robótica para além da arena, impactando a comunidade local.",
                stat: "Empatia",
                level: "∞"
              },
            ].map((member, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
                className="group relative"
              >
                {/* O Card em si */}
                <div className="bg-white border-4 border-black rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-300 h-full flex flex-col">
                  
                  {/* Cabeçalho do Card (Foto) */}
                  <div className={`h-48 ${member.color} relative border-b-4 border-black p-4 flex items-end justify-center`}>
                     {/* Padrão de fundo */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                    
                    {/* Foto (Circular e "Saindo" do header) */}
                    <div className="w-32 h-32 rounded-full border-4 border-black bg-white overflow-hidden absolute -bottom-12 shadow-md">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Badge de Role no topo */}
                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase flex items-center gap-2">
                      <member.icon className="w-3 h-3" />
                      {member.tag}
                    </div>
                  </div>

                  {/* Corpo do Card */}
                  <div className="pt-16 pb-8 px-6 flex flex-col flex-1 text-center">
                    <h3 className="font-heading font-black text-2xl text-black leading-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 font-mono">
                      {member.role}
                    </p>
                    
                    <p className="text-slate-700 font-medium text-sm leading-relaxed mb-6 flex-1">
                      "{member.desc}"
                    </p>

                    {/* Barra de Status (Gamification) */}
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs font-black uppercase mb-1">
                        <span>{member.stat}</span>
                        <span>{member.level}</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full border-2 border-black overflow-hidden relative">
                        <div 
                          className={`h-full ${member.color} absolute top-0 left-0`} 
                          style={{ width: member.level === '∞' ? '100%' : member.level }}
                        ></div>
                        {/* Linhas diagonais na barra (estilo warning) */}
                        <div className="absolute inset-0 w-full h-full opacity-30" style={{backgroundImage: 'linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.1) 75%,transparent 75%,transparent)', backgroundSize: '10px 10px'}}></div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}

            {/* CARD "VOCÊ?" (Convite para entrar na equipe) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-black border-4 border-black rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_#888] flex flex-col items-center justify-center text-center p-8 relative group cursor-pointer"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
              
              <div className="w-24 h-24 border-4 border-dashed border-white/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <UsersRound className="w-10 h-10 text-white/50" />
              </div>
              
              <h3 className="font-heading font-black text-3xl text-white mb-2">
                VOCÊ AQUI?
              </h3>
              <p className="text-gray-400 font-medium text-sm mb-6">
                Tem paixão por robôs e inovação? Junte-se à equipe.
              </p>
              
              <Button className="bg-[#FFD600] text-black font-bold border-2 border-transparent hover:border-white hover:bg-black hover:text-white transition-all w-full rounded-xl">
                PROCESSOS SELETIVOS
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- STEAM METHODOLOGY (CORRIGIDO: CARDS MAIS LARGOS) --- */}
      <section className="py-24 bg-[#6BCB77] border-y-4 border-black relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white border-4 border-black px-8 py-4 rounded-full shadow-[6px_6px_0px_0px_#000] mb-16 transform -rotate-1">
            <h2 className="font-heading font-black text-4xl md:text-5xl text-black">METODOLOGIA S.T.E.A.M.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
            {steamItems.map((item, index) => (
              <div key={item.letter} className="group w-full max-w-[240px] h-80 [perspective:1000px]">
                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRENTE */}
                  <div className={`absolute inset-0 ${item.color} border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] p-4 flex flex-col justify-between items-center [backface-visibility:hidden]`}>
                    <div className="w-full flex justify-between">
                        <span className="font-black text-2xl opacity-50 text-black">{item.letter}</span>
                        <item.icon className="w-6 h-6 opacity-50 text-black" />
                    </div>
                    <div className="bg-white border-4 border-black p-4 rounded-full shadow-[4px_4px_0px_0px_#000]">
                      <item.icon className="w-8 h-8 text-black" />
                    </div>
                    <div className="bg-white border-4 border-black w-full p-2 rounded-lg text-center shadow-[2px_2px_0px_0px_#000]">
                      <h3 className="font-black text-lg text-black uppercase tracking-tighter">{item.title}</h3>
                    </div>
                    <div className="w-full flex justify-between rotate-180">
                        <span className="font-black text-2xl opacity-50 text-black">{item.letter}</span>
                        <item.icon className="w-6 h-6 opacity-50 text-black" />
                    </div>
                  </div>

                  {/* VERSO */}
                  <div className={`absolute inset-0 h-full w-full bg-black border-4 border-white/20 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center`}>
                    <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center mb-4">
                        <span className="font-heading font-black text-2xl text-[#FFD600]">{item.letter}</span>
                    </div>
                    <p className="font-bold text-sm leading-relaxed">{item.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJETOS (CORRIGIDO: LAYOUT HORIZONTAL NO VERSO) --- */}
      <section id="projects" className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="font-heading font-black text-6xl text-black mb-4 inline-block relative">
                NOSSOS PROJETOS
                <div className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFD600] -z-10 -rotate-1"></div>
            </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const isFlipped = flippedProjects[index] || false;

            return (
              <div key={index} className="group h-[450px] [perspective:1000px]">
                <motion.div 
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                  className="relative h-full w-full [transform-style:preserve-3d]"
                >
                  
                  {/* FRENTE */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <div className="h-full bg-white border-4 border-black rounded-xl shadow-[10px_10px_0px_0px_#000] overflow-hidden flex flex-col">
                      <div className={`border-b-4 border-black p-3 flex justify-between items-center ${project.color}`}>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-black"></div>
                            <div className="w-3 h-3 bg-black"></div>
                            <div className="w-1 h-4 border-l-2 border-black mx-1"></div>
                            <span className="font-bold text-black truncate text-sm md:text-base font-mono">{project.name.toUpperCase()}.EXE</span>
                        </div>
                        <div className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-black hover:text-white">_</div>
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#000]">
                            <Cog className="w-10 h-10 text-black animate-spin-slow" />
                        </div>
                        <p className="font-bold text-xl text-center text-black max-w-sm mb-8">{project.desc}</p>
                        
                        <Button 
                          onClick={() => toggleProjectFlip(index)}
                          className="bg-black text-white font-mono text-sm px-6 py-6 hover:bg-[#FFD600] hover:text-black border-4 border-transparent hover:border-black transition-all hover:shadow-[4px_4px_0px_0px_#000]"
                        >
                            RUN PROGRAM_
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* VERSO (Layout Horizontal) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="h-full bg-white border-4 border-black rounded-xl shadow-[10px_10px_0px_0px_#000] overflow-hidden flex flex-col">
                      <div className="bg-black p-3 flex justify-between items-center text-white border-b-4 border-black shrink-0">
                        <span className="font-mono font-bold text-sm truncate pr-2">Running: {project.name}...</span>
                        <div 
                          onClick={() => toggleProjectFlip(index)}
                          className="w-6 h-6 bg-red-500 border-2 border-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-red-600 shrink-0"
                        >
                          X
                        </div>
                      </div>

                      <div className="flex flex-1 h-full overflow-hidden">
                        <div className="w-1/2 h-full border-r-4 border-black relative">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply"></div>
                        </div>
                        
                        <div className="w-1/2 p-5 bg-[#FFFDF5] flex flex-col overflow-y-auto">
                          <h4 className="font-heading font-black text-xl mb-3 text-black border-b-4 border-black pb-2 inline-block">
                            STATUS: ONLINE
                          </h4>
                          <p className="font-medium text-slate-800 text-sm leading-relaxed mb-4">
                            {project.details}
                          </p>
                          <div className="mt-auto pt-4 flex flex-col gap-2">
                            <span className="px-2 py-1 bg-black text-white text-[10px] font-mono rounded w-fit">LOG_DATA_2025</span>
                            <span className="px-2 py-1 bg-gray-200 text-black text-[10px] font-mono rounded border border-black w-fit">V.2.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- MÉTRICAS (LEGO BENTO GRID) --- */}
      <section id="metrics" className="py-24 bg-white border-y-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,20 Q50,20 50,50 T100,80" fill="none" stroke="black" strokeWidth="2" strokeDasharray="5 5" />
            <path d="M100,20 Q50,20 50,50 T0,80" fill="none" stroke="black" strokeWidth="2" strokeDasharray="5 5" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading font-black text-6xl text-black mb-4">
              IMPACTO <span className="bg-[#4D96FF] text-white px-2 border-2 border-black shadow-[4px_4px_0px_0px_#000] inline-block -rotate-2">REAL</span>
            </h2>
            <p className="text-xl font-bold text-slate-600">Números que constroem o futuro.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-[auto]">
            {/* Cards de Métricas (Mantidos do anterior) */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 lg:col-span-2 row-span-2 bg-[#FFD600] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 relative flex flex-col justify-between">
              <div className="absolute top-4 right-4 flex gap-2"><div className="w-4 h-4 rounded-full bg-black/10"></div><div className="w-4 h-4 rounded-full bg-black/10"></div></div>
              <div className="bg-white border-4 border-black w-fit p-4 rounded-2xl mb-4 shadow-[4px_4px_0px_0px_#000]"><Users className="w-10 h-10 text-black" /></div>
              <div>
                <h3 className="font-heading font-black text-8xl text-black leading-none">500+</h3>
                <p className="font-black text-2xl uppercase text-black">Alunos Impactados</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-[#FF6B6B] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 min-h-[200px]">
              <div className="bg-white border-4 border-black w-fit p-3 rounded-xl mb-4 shadow-[4px_4px_0px_0px_#000]"><Trophy className="w-8 h-8 text-black" /></div>
              <h3 className="font-heading font-black text-6xl text-white">15+</h3>
              <p className="font-bold text-black bg-white inline-block px-2 border-2 border-black">Prêmios</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-[#4D96FF] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 min-h-[200px]">
              <div className="bg-white border-4 border-black w-fit p-3 rounded-xl mb-4 shadow-[4px_4px_0px_0px_#000]"><Clock className="w-8 h-8 text-black" /></div>
              <h3 className="font-heading font-black text-6xl text-white">10k+</h3>
              <p className="font-bold text-black bg-white inline-block px-2 border-2 border-black">Horas</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="md:col-span-2 bg-[#6BCB77] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2"><Globe className="w-6 h-6 text-black"/> <span className="font-bold text-black">ALCANCE</span></div>
                <h3 className="font-heading font-black text-6xl text-black">5 ESTADOS</h3>
              </div>
              <Map className="w-32 h-32 text-black opacity-20" />
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-[#1A1A1A] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 flex flex-col justify-center items-center text-center">
              <Code className="w-12 h-12 text-[#6BCB77] mb-2" />
              <h3 className="font-heading font-black text-4xl text-white">Infinite</h3>
              <p className="font-bold text-[#6BCB77]">Lines of Code</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO PARCEIROS (NOVA, CRIATIVA E COMPLETA) --- */}
      <section id="partners" className="py-24 bg-[#FF6B6B] border-t-4 border-black relative overflow-hidden">
        
        {/* Background com padrão de linhas diagonais */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-block bg-white border-4 border-black px-10 py-4 shadow-[8px_8px_0px_0px_#000] rotate-1 hover:rotate-0 transition-transform duration-300">
              <h2 className="font-heading font-black text-4xl md:text-6xl text-black uppercase">
                Quem Faz Acontecer
              </h2>
            </div>
            <p className="mt-6 text-white font-bold text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-[2px_2px_0px_#000]">
              Nossos parceiros são o combustível que leva o robô (e nossos sonhos) mais longe.
            </p>
          </div>

          {/* GRID DE LOGOS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-24">
            {partnersList.map((logo, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, y: -5 }}
                className="bg-white aspect-square border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] flex items-center justify-center p-6 relative group cursor-pointer"
              >
                {/* Pino de fixação visual */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FFD600] border-2 border-black z-20 shadow-sm"></div>
                <img src={logo} alt="Parceiro Everest" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* ÁREA "SEJA UM PATROCINADOR" (CTA) */}
          <div className="bg-[#FFFDF5] border-4 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_#000] relative overflow-hidden">
            
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-400 rounded-full border-4 border-black opacity-20"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-400 rounded-full border-4 border-black opacity-20"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <h3 className="font-heading font-black text-4xl md:text-5xl text-black mb-6">
                  SUA MARCA NO <span className="text-[#4D96FF] underline decoration-4 underline-offset-4 decoration-black">FUTURO</span>?
                </h3>
                <p className="text-lg font-medium text-slate-700 mb-8 leading-relaxed">
                  Apoiar a Everest FTC não é caridade, é investimento em inovação. Conecte sua empresa a jovens talentos, tecnologia de ponta e um dos maiores torneios de robótica do mundo.
                </p>
                
                <a href="https://wa.me/559891747588" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full md:w-auto bg-black text-white hover:bg-[#FFD600] hover:text-black border-4 border-transparent hover:border-black text-xl font-bold px-10 py-8 rounded-xl shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                    QUERO SER PARCEIRO 🚀
                  </Button>
                </a>
              </div>

              <div className="grid gap-4">
                
                <div className="bg-[#4D96FF] border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000] flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="bg-white border-2 border-black p-3 rounded-lg"><Rocket className="w-6 h-6 text-black" /></div>
                  <div>
                    <h4 className="font-black text-white text-lg uppercase">Visibilidade Global</h4>
                    <p className="text-white/90 text-sm font-bold leading-tight">Sua marca na camisa, no robô e em competições internacionais.</p>
                  </div>
                </div>

                <div className="bg-[#FFD600] border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000] flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="bg-white border-2 border-black p-3 rounded-lg"><Heart className="w-6 h-6 text-black" /></div>
                  <div>
                    <h4 className="font-black text-black text-lg uppercase">Impacto Social</h4>
                    <p className="text-black/80 text-sm font-bold leading-tight">Ajude a levar educação tecnológica para escolas públicas.</p>
                  </div>
                </div>

                <div className="bg-[#9D4EDD] border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000] flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="bg-white border-2 border-black p-3 rounded-lg"><Handshake className="w-6 h-6 text-black" /></div>
                  <div>
                    <h4 className="font-black text-white text-lg uppercase">Conexão com Talentos</h4>
                    <p className="text-white/90 text-sm font-bold leading-tight">Contato direto com a próxima geração de engenheiros e devs.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SOFTWARE HOUSE (TERMINAL STYLE) --- */}
      <section id="software-house" className="py-24 bg-[#FFFDF5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-t-2xl border-4 border-black shadow-[12px_12px_0px_0px_#d93652] overflow-hidden">
            <div className="bg-[#e5e5e5] border-b-4 border-black p-3 flex gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black"></div>
              <span className="ml-4 font-mono font-bold text-sm text-black">software_house_undb.exe</span>
            </div>

            <div className="p-8 md:p-12 font-mono text-green-400 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <Code className="w-64 h-64" />
              </div>

              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-green-900/50 border border-green-500 rounded mb-6 text-xs">
                  Running: Education_Module v2.0
                </div>
                
                <h2 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
                  SOFTWARE HOUSE <span className="text-[#d93652] bg-white/10 px-2">UNDB</span>
                </h2>
                
                <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed font-mono">
                  <span className="text-green-500 font-bold mr-2">&gt;</span>
                  Este site foi desenvolvido pela Software House UNDB, um modelo escola-empresa que une educação e prática profissional.
                  <br /><br />
                  <span className="text-green-500 font-bold mr-2">&gt;</span>
                  A parceria entre EVEREST e SH exemplifica como a colaboração entre instituições fortalece a formação de talentos tecnológicos.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-10 text-sm">
                  <div className="border-2 border-green-500/50 p-4 rounded bg-black/50 hover:bg-green-900/20 cursor-pointer">
                    <strong className="text-white block text-lg mb-1">[EDUCAÇÃO]</strong>
                    Modelo inovador de ensino
                  </div>
                  <div className="border-2 border-green-500/50 p-4 rounded bg-black/50 hover:bg-green-900/20 cursor-pointer">
                    <strong className="text-white block text-lg mb-1">[PRÁTICA]</strong>
                    Projetos reais para clientes
                  </div>
                  <div className="border-2 border-green-500/50 p-4 rounded bg-black/50 hover:bg-green-900/20 cursor-pointer">
                    <strong className="text-white block text-lg mb-1">[IMPACTO]</strong>
                    Formação profissional
                  </div>
                </div>

                <a href="https://softwarehouse.undb.edu.br" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#d93652] hover:bg-[#b06ced] text-white font-bold border-2 border-white px-8 py-6 shadow-[4px_4px_0px_0px_#fff] hover:translate-y-[-2px] transition-transform">
                    ACCESS SYSTEM <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;