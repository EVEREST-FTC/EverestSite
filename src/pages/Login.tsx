import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, Terminal, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDF5] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-black selection:text-white">
      
      {/* Background Pontilhado */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>
      
      {/* --- FAIXA AMARELA (SUPERIOR) --- */}
      {/* CORREÇÃO: Usando style={{ width: '200vw' }} para forçar a largura independente do Tailwind */}
      <div 
        className="absolute top-[10%] left-1/2 -translate-x-1/2 bg-[#FFD600] border-y-4 border-black py-3 -rotate-3 z-0 shadow-sm hidden md:flex justify-center items-center"
        style={{ width: '200vw' }} 
      >
        <div className="flex gap-8 whitespace-nowrap font-mono font-black text-sm tracking-widest opacity-80">
          <span>SYSTEM_ACCESS // RESTRICTED AREA</span>
          <span>SYSTEM_ACCESS // RESTRICTED AREA</span>
          <span>SYSTEM_ACCESS // RESTRICTED AREA</span>
          <span>SYSTEM_ACCESS // RESTRICTED AREA</span>
          <span>SYSTEM_ACCESS // RESTRICTED AREA</span>
          <span>SYSTEM_ACCESS // RESTRICTED AREA</span>
          <span>SYSTEM_ACCESS // RESTRICTED AREA</span>
        </div>
      </div>

      {/* --- FAIXA VERMELHA (INFERIOR) --- */}
      {/* CORREÇÃO: Usando style={{ width: '200vw' }} aqui também */}
      <div 
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 bg-[#FF6B6B] border-y-4 border-black py-3 rotate-2 z-0 shadow-sm hidden md:flex justify-center items-center"
        style={{ width: '200vw' }}
      >
        <div className="flex gap-8 whitespace-nowrap font-mono font-black text-sm tracking-widest text-white opacity-90">
          <span>AUTHORIZED PERSONNEL ONLY // DO NOT CROSS</span>
          <span>AUTHORIZED PERSONNEL ONLY // DO NOT CROSS</span>
          <span>AUTHORIZED PERSONNEL ONLY // DO NOT CROSS</span>
          <span>AUTHORIZED PERSONNEL ONLY // DO NOT CROSS</span>
          <span>AUTHORIZED PERSONNEL ONLY // DO NOT CROSS</span>
          <span>AUTHORIZED PERSONNEL ONLY // DO NOT CROSS</span>
        </div>
      </div>

      {/* --- CARD DE LOGIN --- */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black text-white p-4 rounded-t-2xl border-4 border-black border-b-0 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-white/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 border border-white/50"></div>
          </div>
          <div className="font-mono text-xs text-gray-400">v.2.0.25</div>
        </div>

        <div className="bg-white border-4 border-black p-6 md:p-10 rounded-b-2xl shadow-[8px_8px_0px_0px_#000] md:shadow-[12px_12px_0px_0px_#000] relative">
          
          <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 bg-[#FFD600] border-4 border-black p-3 rounded-xl shadow-[4px_4px_0px_0px_#000] rotate-3">
            <Terminal className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </div>

          <div className="text-center mt-6 mb-8">
            <h1 className="font-heading font-black text-3xl md:text-4xl text-black mb-2">LOGIN</h1>
            <p className="font-mono text-xs md:text-sm text-slate-500 bg-slate-100 inline-block px-3 py-1 rounded border border-black/20">
              Entre com suas credenciais.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Usuário
              </Label>
              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-[#F0F0F0] border-4 border-black rounded-lg p-3 pl-4 font-mono text-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#000] transition-all placeholder:text-gray-400"
                  placeholder="piloto@everest.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Senha
                </Label>
                <a href="#" className="text-xs font-bold underline decoration-2 decoration-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition-colors">
                  Esqueceu?
                </a>
              </div>
              
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  className="w-full bg-[#F0F0F0] border-4 border-black rounded-lg p-3 pl-4 pr-12 font-mono text-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#000] transition-all placeholder:text-gray-400"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 md:h-14 bg-black text-white hover:bg-[#4D96FF] hover:text-black border-4 border-transparent hover:border-black font-black text-lg rounded-xl shadow-[4px_4px_0px_0px_#888] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <span className="font-mono animate-pulse">CONNECTING...</span>
              ) : (
                <>ACESSAR <ArrowRight className="w-6 h-6" /></>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-dashed border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 font-bold">Novo na equipe?</span>
            </div>
          </div>

          <div className="text-center">
             <Link to="/register" className="block w-full">
                <div className="bg-[#FFD600] border-4 border-black px-4 py-3 rounded-lg font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  CRIAR CONTA
                </div>
             </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;