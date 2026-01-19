import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// importando a logo nova da everest
// Nota: Se a imagem não carregar, verifique se o arquivo está exatamente nesta pasta
import logoEverest from "@/assets/everestlogos/logoEverest.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Sobre Nós", path: "/#about", scroll: true },
    { name: "O que é FTC?", path: "/#first-ftc", scroll: true },
    { name: "STEAM", path: "/steam", scroll: false },
    { name: "Projetos", path: "/#projects", scroll: true },
    { name: "Patrocinadores", path: "/#partners", scroll: true },
  ];

  // funçao pra lidar com o scroll suave
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    // Se for um link de scroll
    if (link.scroll) {
      const id = link.path.split('#')[1];
      const element = document.getElementById(id);
      
      // Se o elemento existe na pagina atual (ex: estamos na Home)
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      } 
      // Se não existe (ex: estamos na Steam), deixa o Link navegar normalmente para a Home
    } else {
      setIsMenuOpen(false);
    }
  };

  // funçao pra voltar pro topo quando clica na logo
  const handleLogoClick = () => {
    if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    // deixei o fundo meio off-white pra combinar e meti uma borda grossa embaixo
    <header className="sticky top-0 z-50 bg-[#FFFDF5] border-b-4 border-black shadow-sm">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          
          {/* --- logo e nome da equipe --- */}
          <Link 
            to="/" 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              {/* aumentei a logo pra 64px (w-16) e botei uma bordinha preta nela */}
              <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden shadow-[3px_3px_0px_0px_#000] group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_0px_#000] transition-all duration-300">
                <img 
                  src={logoEverest} 
                  alt="Everest ftc" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            {/* texto do lado da logo */}
            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl leading-none text-black tracking-tighter group-hover:text-[#4D96FF] transition-colors">
                EVEREST
              </span>
              <span className="font-mono text-sm font-bold text-gray-500 tracking-widest group-hover:text-black transition-colors">
                FTC
              </span>
            </div>
          </Link>

          {/* --- menu desktop --- */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const LinkContent = (
                <span className="font-bold text-sm uppercase tracking-wide">
                  {link.name}
                </span>
              );

              // estilo dos botoes do menu: borda transparente que fica preta no hover + cor amarela
              const classes = "px-4 py-2 rounded-lg text-black hover:bg-[#FFD600] hover:text-black border-2 border-transparent hover:border-black transition-all hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[2px] active:shadow-none";

              return link.scroll ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={classes}
                >
                  {LinkContent}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={classes}
                >
                  {LinkContent}
                </Link>
              );
            })}

            {/* botao do portal com estilo neo-brutalista */}
            <Link to="/login" className="ml-4">
              <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black font-bold rounded-xl shadow-[4px_4px_0px_0px_#9D4EDD] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                PORTAL
              </Button>
            </Link>
          </div>

          {/* --- botao do menu mobile --- */}
          <button
            className="md:hidden p-2 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
          </button>
        </div>

        {/* --- menu mobile expandido --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[#FFFDF5] border-t-2 border-black mt-3"
            >
              <div className="flex flex-col gap-3 py-6">
                {navLinks.map((link) => (
                  link.scroll ? (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link)}
                      className="block px-4 py-3 mx-2 text-center font-bold text-black border-2 border-black rounded-xl bg-white hover:bg-[#FFD600] shadow-[3px_3px_0px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-3 mx-2 text-center font-bold text-black border-2 border-black rounded-xl bg-white hover:bg-[#FFD600] shadow-[3px_3px_0px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                
                <Link to="/login" className="mx-2 mt-2">
                  <Button className="w-full bg-black text-white hover:bg-[#9D4EDD] font-extrabold rounded-xl py-6 border-2 border-transparent hover:border-black shadow-[3px_3px_0px_0px_#888]">
                    ACESSAR PORTAL
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;