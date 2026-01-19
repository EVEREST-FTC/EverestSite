import { Link } from "react-router-dom";
import { Instagram, Youtube, MapPin, Mail, Phone, Linkedin } from "lucide-react";

// importando a logo certinho agora
import logoEverest from "@/assets/everestlogos/logoEverest.png";

const Footer = () => {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/everest_ftc",
      label: "Instagram",
      color: "bg-[#FF6B6B]", // rosa
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@everest_ftc",
      label: "YouTube",
      color: "bg-[#FFD600]", // amarelo
    },
    {
      icon: Linkedin,
      href: "#", // caso tenha linkedin, senao pode tirar
      label: "LinkedIn",
      color: "bg-[#4D96FF]", // azul
    }
  ];

  return (
    <footer className="relative bg-[#1A1A1A] text-white border-t-4 border-black overflow-hidden font-sans">
      
      {/* --- faixa decorativa superior (estilo lego) --- */}
      <div className="flex h-4 w-full">
        <div className="w-1/4 bg-[#FFD600] border-r-2 border-black"></div>
        <div className="w-1/4 bg-[#FF6B6B] border-r-2 border-black"></div>
        <div className="w-1/4 bg-[#4D96FF] border-r-2 border-black"></div>
        <div className="w-1/4 bg-[#6BCB77]"></div>
      </div>

      <div className="container mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* --- coluna 1: identidade --- */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6 w-fit">
              {/* logo quadrada estilo icone de app */}
              <div className="h-50 w-50 p-1 rounded-xl group-hover:translate-y-[-2px] transition-transform flex items-center justify-center overflow-hidden">
                <img 
                  src={logoEverest} 
                  alt="Logo Everest" 
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed border-l-4 border-[#FFD600] pl-4">
              Transformando o futuro através da robótica e da educação STEAM.
              <br/>
              <span className="text-xs font-mono mt-2 block opacity-70">EST. 2022 • SÃO LUÍS, MA</span>
            </p>
          </div>

          {/* --- coluna 2 e 3: contato (ocupando espaço duplo) --- */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="font-heading font-black text-2xl text-[#FFD600] uppercase mb-2">
              Entre em Contato
            </h3>
            
            {/* card de email */}
            <a href="mailto:equipeoftceverest@gmail.com" className="group flex items-center gap-4 bg-[#262626] p-4 rounded-xl border-2 border-transparent hover:border-[#FF6B6B] transition-all">
              <div className="bg-[#FF6B6B] p-3 rounded-full border-2 border-black text-black group-hover:rotate-12 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Email Oficial</p>
                <p className="font-bold text-lg break-all">equipeoftceverest@gmail.com</p>
              </div>
            </a>

            {/* card de telefone */}
            <a href="https://wa.me/559891747588" className="group flex items-center gap-4 bg-[#262626] p-4 rounded-xl border-2 border-transparent hover:border-[#6BCB77] transition-all">
              <div className="bg-[#6BCB77] p-3 rounded-full border-2 border-black text-black group-hover:rotate-12 transition-transform">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Telefone / Whatsapp</p>
                <p className="font-bold text-lg">(98) 9174-7588</p>
              </div>
            </a>

            {/* card de endereço */}
            <div className="flex items-start gap-4 bg-[#262626] p-4 rounded-xl border-2 border-transparent hover:border-[#4D96FF] transition-all">
              <div className="bg-[#4D96FF] p-3 rounded-full border-2 border-black text-black mt-1">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Nossa Base (SESI)</p>
                <p className="font-medium text-sm leading-snug max-w-xs">
                  R. Jerônimo Viveiros - Alemanha,<br/>
                  São Luís - MA, 65036-370
                </p>
              </div>
            </div>
          </div>

          {/* --- coluna 4: socials --- */}
          <div>
            <h3 className="font-heading font-black text-2xl text-[#9D4EDD] uppercase mb-6">
              Siga a Gente
            </h3>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} block w-full p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-black uppercase">{social.label}</span>
                    <social.icon className="h-6 w-6 text-black" />
                  </div>
                  <p className="text-black text-xs font-bold mt-1">@everest_ftc</p>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* --- rodapé do rodapé --- */}
        <div className="border-t-2 border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm font-mono text-gray-500">
            © {new Date().getFullYear()} EVEREST ROBOTICS. Feito com <span className="text-[#FF6B6B]">♥</span> e Código.
          </p>
          <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>#23060</span>
            <span>FTC BRASIL</span>
            <span>SESI MA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;