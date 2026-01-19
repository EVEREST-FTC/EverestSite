import { motion, Variants } from "framer-motion";
import { 
  Atom, Cpu, Wrench, Palette, Calculator, 
  Lightbulb, Rocket, Puzzle, GraduationCap, 
  ArrowDownRight, Star, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Steam = () => {

  // --- CONFIGURAÇÃO DE ANIMAÇÃO ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Dados dos 5 Pilares
  const steamPillars = [
    { 
      letter: "S", 
      title: "CIÊNCIA", 
      desc: "Entender o mundo através de perguntas, hipóteses e experimentos práticos.", 
      color: "bg-[#4D96FF]", // Azul
      icon: Atom 
    },
    { 
      letter: "T", 
      title: "TECNOLOGIA", 
      desc: "Dominar o digital: da programação em blocos à inteligência artificial avançada.", 
      color: "bg-[#9D4EDD]", // Roxo
      icon: Cpu 
    },
    { 
      letter: "E", 
      title: "ENGENHARIA", 
      desc: "Construir soluções robustas. Projetar, montar e testar até funcionar.", 
      color: "bg-[#FFD600]", // Amarelo
      icon: Wrench 
    },
    { 
      letter: "A", 
      title: "ARTES", 
      desc: "Criatividade é combustível. Design, estética e comunicação importam sim.", 
      color: "bg-[#FF6B6B]", // Rosa
      icon: Palette 
    },
    { 
      letter: "M", 
      title: "MATEMÁTICA", 
      desc: "A linguagem do universo usada para calcular movimentos e estratégias.", 
      color: "bg-[#FF4C4C]", // Vermelho
      icon: Calculator 
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans selection:bg-black selection:text-white overflow-hidden">
      
      {/* Background de "Papel Milimetrado" */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" 
           style={{ 
             backgroundImage: 'linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 12 }}
            className="mb-8 bg-[#FFD600] border-4 border-black p-4 rounded-full shadow-[6px_6px_0px_0px_#000]"
          >
            <Star className="w-8 h-8 text-black fill-white" />
          </motion.div>

          <h1 className="font-heading font-black text-6xl md:text-8xl text-black mb-6 leading-none">
            METODOLOGIA <br/>
            <span className="relative inline-block mt-2">
              <span className="absolute inset-0 bg-[#4D96FF] translate-y-4 -rotate-2 -z-10 border-4 border-black"></span>
              <span className="relative z-10 px-4 text-white drop-shadow-[4px_4px_0px_#000]">S.T.E.A.M.</span>
            </span>
          </h1>

          <p className="font-bold text-xl md:text-2xl text-slate-600 max-w-2xl mt-8 bg-white border-2 border-black p-8 md:p-10 rounded-tl-3xl rounded-br-3xl shadow-[8px_8px_0px_0px_#000]">
            Não ensinamos apenas robótica. Ensinamos a <span className="bg-[#FF6B6B] text-white px-1">pensar</span>, <span className="bg-[#9D4EDD] text-white px-1">criar</span> e <span className="bg-[#6BCB77] text-white px-1">resolver</span>.
          </p>

        </div>
      </section>

      {/* --- OS 5 PILARES --- */}
      <section className="py-12 container mx-auto px-4 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          {steamPillars.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={{ x: -10 }}
              className={`group relative flex items-center ${item.color} border-4 border-black rounded-xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] transition-all cursor-pointer`}
            >
              <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 bg-black border-4 border-white rounded-full flex items-center justify-center mr-6 md:mr-12 shadow-lg group-hover:rotate-12 transition-transform">
                <span className="font-heading font-black text-4xl md:text-5xl text-white">{item.letter}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-4">
                <div>
                  <h3 className="font-heading font-black text-3xl md:text-4xl text-white drop-shadow-[2px_2px_0px_#000] uppercase mb-3">
                    {item.title}
                  </h3>
                  <p className="font-bold text-black text-sm md:text-lg leading-tight max-w-xl bg-white/40 p-4 md:p-6 rounded-lg backdrop-blur-sm border-2 border-black/10">
                    {item.desc}
                  </p>
                </div>
                
                <item.icon className="hidden md:block w-24 h-24 text-black opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all" />
                <ArrowDownRight className="md:hidden absolute top-4 right-4 w-6 h-6 text-black opacity-50" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- PLAYBOOK --- */}
      <section className="py-24 bg-black text-white relative border-y-4 border-black mt-12 overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-20">
          <Puzzle className="w-64 h-64 text-[#FFD600] animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="font-heading font-black text-6xl md:text-7xl leading-none text-[#FFD600]">
                PLAY<br/>BOOK
              </h2>
              <div className="h-2 w-20 bg-white mt-4 mb-8"></div>
              <p className="text-xl font-medium text-gray-300">
                Nosso "Manual de Jogo" para transformar alunos em makers.
              </p>
            </div>

            <div className="md:w-2/3 grid gap-6">
              {[
                { title: "1. DESAFIO", text: "Apresentamos um problema real do mundo.", icon: Lightbulb, color: "text-[#FFD600]" },
                { title: "2. PROTOTIPAGEM", text: "Esboços, peças de LEGO e muito teste.", icon: Puzzle, color: "text-[#4D96FF]" },
                { title: "3. PROGRAMAÇÃO", text: "Damos vida ao robô com código lógico.", icon: Zap, color: "text-[#FF6B6B]" },
                { title: "4. COMPETIÇÃO", text: "Testamos tudo na arena sob pressão.", icon: Rocket, color: "text-[#6BCB77]" }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 bg-[#1A1A1A] border-2 border-white/20 p-8 rounded-2xl hover:bg-[#333] transition-colors"
                >
                  <step.icon className={`w-12 h-12 ${step.color} shrink-0`} />
                  <div>
                    <h4 className={`font-black text-2xl uppercase ${step.color}`}>{step.title}</h4>
                    <p className="font-mono text-sm text-gray-400">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIAS (FLL & FTC) --- */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-5xl text-black">NOSSAS LIGAS</h2>
          <p className="font-bold text-slate-500 mt-2">A trajetória completa dentro da FIRST®</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              name: "EXPLORE", 
              age: "6-10 anos", 
              bg: "bg-[#6BCB77]", 
              // Atualizado para tecnologias do FLL Explore
              items: ["LEGO WeDo 2.0", "Spike Essential", "Core Values"] 
            },
            { 
              name: "CHALLENGE", 
              age: "9-15 anos", 
              bg: "bg-[#4D96FF]", 
              // Atualizado para tecnologias do FLL Challenge
              items: ["LEGO Spike Prime", "Missões na Mesa", "Projeto de Inovação"] 
            },
            { 
              name: "FTC", 
              age: "14-18 anos", 
              bg: "bg-[#FF6B6B]", 
              // Atualizado para tecnologias do FTC
              items: ["Java (Android)", "Robôs de Metal", "Engenharia Pura"] 
            }
          ].map((level, i) => (
            <motion.div 
              key={i}
              whileHover={{ rotate: i % 2 === 0 ? 2 : -2, scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-2xl"></div>
              
              <div className={`relative ${level.bg} border-4 border-black rounded-2xl p-8 h-full flex flex-col items-center text-center`}>
                <div className="bg-white border-4 border-black px-4 py-1 rounded-full font-black text-sm mb-6 shadow-sm">
                  {level.age}
                </div>
                
                <GraduationCap className="w-16 h-16 text-black mb-4 drop-shadow-md" />
                
                <h3 className="font-heading font-black text-4xl text-white drop-shadow-[3px_3px_0px_#000] mb-6">
                  {level.name}
                </h3>

                <ul className="space-y-3 mb-8 w-full bg-white/20 p-6 rounded-xl border-2 border-black/10">
                  {level.items.map((item, j) => (
                    <li key={j} className="font-bold text-black flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-4 border-transparent hover:border-black font-bold mt-auto transition-all">
                  CONHECER
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Steam;