import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, Mail, Lock, User, ArrowLeft, 
  Cpu, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula envio
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDF5] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-black selection:text-white">
      
      {/* Background: Grid + Elementos Flutuantes */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>
      
      {/* --- FAIXA DECORATIVA VERDE (CORRIGIDA) --- */}
      {/* Usando style={{ width: '200vw' }} para garantir largura infinita */}
      <div 
        className="absolute top-[30%] left-1/2 -translate-x-1/2 bg-[#6BCB77] border-y-4 border-black py-3 rotate-[-6deg] z-0 shadow-sm hidden md:flex justify-center items-center"
        style={{ width: '200vw' }}
      >
        <div className="flex gap-12 whitespace-nowrap font-mono font-black text-sm tracking-widest text-black opacity-90">
          <span>NEW_USER // RECRUITMENT_MODE</span>
          <span>NEW_USER // RECRUITMENT_MODE</span>
          <span>NEW_USER // RECRUITMENT_MODE</span>
          <span>NEW_USER // RECRUITMENT_MODE</span>
          <span>NEW_USER // RECRUITMENT_MODE</span>
          <span>NEW_USER // RECRUITMENT_MODE</span>
        </div>
      </div>

      {/* --- CARD DE REGISTRO --- */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Botão Voltar (Estilo Aba) */}
        <Link to="/login" className="absolute -top-10 left-0 z-0">
          <div className="bg-white border-4 border-black px-4 py-2 rounded-t-xl hover:bg-black hover:text-white transition-colors flex items-center gap-2 font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000]">
            <ArrowLeft className="w-4 h-4" /> VOLTAR
          </div>
        </Link>

        {/* Corpo do Card */}
        <div className="bg-white border-4 border-black p-6 md:p-10 rounded-2xl shadow-[8px_8px_0px_0px_#000] md:shadow-[12px_12px_0px_0px_#000] relative z-10">
          
          {/* Badge Decorativo */}
          <div className="absolute -top-8 -right-4 md:-top-8 md:-right-8 bg-[#6BCB77] border-4 border-black w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#000] animate-bounce-slow">
            <UserPlus className="w-7 h-7 md:w-8 md:h-8 text-black" />
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 md:w-6 md:h-6 text-[#6BCB77]" />
              <span className="font-mono font-bold text-[10px] md:text-xs bg-black text-white px-2 py-1 rounded">CADASTRO V.1.0</span>
            </div>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-black leading-none">
              FICHA DE <br/> RECRUTA
            </h1>
            <p className="font-medium text-sm md:text-base text-slate-500 mt-3 border-l-4 border-[#6BCB77] pl-3">
              Preencha seus dados para iniciar sua jornada na Everest.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 md:space-y-5">
            
            {/* Nome Completo */}
            <div className="space-y-1.5">
              <Label className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Nome de Piloto
              </Label>
              <input 
                type="text" 
                className="w-full bg-[#F0F0F0] border-4 border-black rounded-lg p-3 font-mono text-sm focus:outline-none focus:bg-[#E8F5E9] focus:shadow-[4px_4px_0px_0px_#000] transition-all placeholder:text-gray-400"
                placeholder="Ex: João Silva"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Institucional
              </Label>
              <input 
                type="email" 
                className="w-full bg-[#F0F0F0] border-4 border-black rounded-lg p-3 font-mono text-sm focus:outline-none focus:bg-[#E8F5E9] focus:shadow-[4px_4px_0px_0px_#000] transition-all placeholder:text-gray-400"
                placeholder="nome@escola.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Senha */}
              <div className="space-y-1.5">
                <Label className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Criar Senha
                </Label>
                <input 
                  type="password" 
                  className="w-full bg-[#F0F0F0] border-4 border-black rounded-lg p-3 font-mono text-sm focus:outline-none focus:bg-[#E8F5E9] focus:shadow-[4px_4px_0px_0px_#000] transition-all placeholder:text-gray-400"
                  placeholder="******"
                  required
                />
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-1.5">
                <Label className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Confirmar
                </Label>
                <input 
                  type="password" 
                  className="w-full bg-[#F0F0F0] border-4 border-black rounded-lg p-3 font-mono text-sm focus:outline-none focus:bg-[#E8F5E9] focus:shadow-[4px_4px_0px_0px_#000] transition-all placeholder:text-gray-400"
                  placeholder="******"
                  required
                />
              </div>
            </div>

            {/* Termos (Estilo Checkbox Retro) */}
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-lg">
              <div className="flex items-center h-5 mt-0.5">
                <input 
                  id="terms" 
                  type="checkbox" 
                  className="w-5 h-5 border-2 border-black rounded text-black focus:ring-black cursor-pointer accent-black" 
                  required
                />
              </div>
              <label htmlFor="terms" className="text-xs font-bold text-slate-700 cursor-pointer leading-tight">
                Aceito as regras da <span className="underline">Aliança Everest</span> e prometo não construir robôs que dominem o mundo (por enquanto).
              </label>
            </div>

            {/* Botão de Cadastro */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 md:h-14 bg-[#6BCB77] text-black hover:bg-black hover:text-[#6BCB77] border-4 border-black font-black text-base md:text-lg rounded-xl shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all active:translate-y-[0px] active:shadow-[0px_0px_0px_0px_#000]"
            >
              {isLoading ? (
                <span className="font-mono animate-pulse">PROCESSANDO...</span>
              ) : (
                "CONFIRMAR INSCRIÇÃO"
              )}
            </Button>

          </form>

        </div>
        
        {/* Footer Decorativo */}
        <div className="text-center mt-6 opacity-50 font-mono text-xs font-bold">
          EVEREST ROBOTICS TEAM © 2025
        </div>

      </motion.div>
    </div>
  );
};

export default Register;