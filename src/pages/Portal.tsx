import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, BookOpen, Settings, LogOut,
  Plus, Trash2, Edit3, Download, FileText, Cpu, Bell, Search,
  Wrench, User, Package, ClipboardList, Battery, Wifi, CheckSquare,
  AlertTriangle, Save, X, Clock, BarChart3, Video,
  LinkIcon,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import React from "react";

type NotebookEntry = {
  id: string;
  content: string;
  tag: string;
  date: string;
  author: string;
};
type Project = {
  id: number;
  projectName: string;
  goal: string;
  deadline: string;
  status: string;
  progress: number;
  color: string;
};
type Sdk = {
  projectName: string;
  description: string;
  link: string;
};

const getProjectColor = (status: string) => {
  switch (status) {
    case "EM_ANDAMENTO":
      return "bg-[#4D96FF]";
    case "ATRASADO":
      return "bg-[#FF6B6B]";
    case "CONCLUIDO":
      return "bg-[#6BCB77]";
    case "PLANEJAMENTO":
    default:
      return "bg-[#FFD600]";
  }
};


// --- MOCK DATA (Todos os Dados Juntos) ---

const USER_DATA = {
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
};


// Dados da Biblioteca
const LIBRARY_DATA = [
  { id: 1, title: "Manual de Regras FLL 2025", type: "PDF", category: "KIDS", size: "5.2 MB", date: "10/02/2025" },
  { id: 2, title: "Programação em Blocos LEGO", type: "VIDEO", category: "KIDS", size: "120 MB", date: "12/02/2025" },
  { id: 3, title: "Introdução ao Java para FTC", type: "PDF", category: "TEENS", size: "2.1 MB", date: "15/03/2025" },
  { id: 4, title: "Guia de Motores DC", type: "DOC", category: "TEENS", size: "800 KB", date: "20/03/2025" },
  { id: 5, title: "SDK Android Studio Base", type: "ZIP", category: "TOOLS", size: "250 MB", date: "05/01/2025" },
];

// Dados de Estoque
const INVENTORY_DATA = [
  { id: 1, name: "Control Hub REV", qtd: 2, status: "Crítico" },
  { id: 2, name: "Motor GoBilda 5202", qtd: 8, status: "OK" },
  { id: 3, name: "Omni Wheel 96mm", qtd: 4, status: "Baixo" },
  { id: 4, name: "Bateria 12V 3000mAh", qtd: 3, status: "OK" },
  { id: 5, name: "Servo Motor High Torque", qtd: 6, status: "OK" },
];

// Dados do Diário
const NOTEBOOK_ENTRIES = [
  { id: 1, date: "Hoje, 14:30", tag: "MECÂNICA", content: "Alteramos a relação de engrenagens do braço para 4:1. O torque aumentou.", author: "João S." },
  { id: 2, date: "Ontem, 09:15", tag: "PROGRAMAÇÃO", content: "Corrigido bug no autônomo onde o robô girava 90 graus errado.", author: "Maria E." },
];

const ROBOT_CHECKLIST = [
  { id: 1, task: "Bateria Principal >13V", checked: false },
  { id: 2, task: "Cabos Control Hub fixos", checked: true },
  { id: 3, task: "Parafusos das rodas", checked: false },
];

const Portal = () => {
  const SDK_OPTIONS = [
    "LOMBOK", "COMMAND_BASED", "ROADRUNNER", "GRAPHS"
  ];
  const [user, setUser] = useState({ name: "Carregando...", role: "", avatar: "" });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'library' | 'notebook' | 'inventory' | 'initializr'>('dashboard');

  const [projects, setProjects] = useState<Project[]>([]);
  const [libraryFilter, setLibraryFilter] = useState('TODOS');
  const [checklist, setChecklist] = useState(ROBOT_CHECKLIST);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30 });

  const [projectName, setProjectName] = useState("");
  const [dependencies, setDependencies] = useState<string[]>([]); // A lista de tags
  const [inputValue, setInputValue] = useState("");
  const [selectedDependency, setSelectedDependency] = useState("");
  const [sdks, setSdks] = useState<Sdk[]>([]);
  const [isInitializrModalOpen, setIsInitializrModalOpen] = useState(false);

  const [notebooks, setNotebooks] = useState<NotebookEntry[]>([]);
  const [author, setAuthor] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("MECÂNICA");
  const [isNotebookModalOpen, setIsNotebookModalOpen] = useState(false);



  // Funções Auxiliares
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const goal = (form.elements.namedItem('goal') as HTMLInputElement).value;
    const deadline = (form.elements.namedItem('deadline') as HTMLInputElement).value;

    try {
      const response = await api.post("/stem/users/projects", {
        title,
        goal,
        deadline,
      });

      const newProject: Project = {
        ...response.data,
        color: getProjectColor(response.data.status),
      };

      setProjects(prev => [...prev, newProject]);
      setIsProjectModalOpen(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  };
  const handleRemoveDependency = (dep: string) => {
    setDependencies(prev => prev.filter(d => d !== dep));
  };
  const handleFormSDK = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit SDK disparou");
    const form = e.target as HTMLFormElement;
    const nameFromForm = (form.elements.namedItem('projectName') as HTMLInputElement).value;

    try {
      const response = await api.post("/sdk-initializr/user", {
        projectName: nameFromForm,
        dependencies: dependencies,
      });


      const downloadUrl = response.data.link;

      window.location.href = downloadUrl;


      const newProject = {
        ...response.data
      };

      setSdks(prev => [...prev, newProject]);
      setIsInitializrModalOpen(false);

      // Reset
      setDependencies([]);
      setInputValue("");
      form.reset();

    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  };

  const handleDeleteProject = async (projectName: string) => {
    try {
      await api.delete(
        `/stem/users/projects/${projectName}`
      );

      setProjects(prev =>
        prev.filter(p => p.projectName !== projectName)
      );
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const fetchNotebooks = async () => {
    try {
      const response = await api.get("/user/notebook");
      setNotebooks(response.data);
    } catch (error) {
      console.error("Erro ao buscar notebooks:", error);
    }
  };
  const handleCreateNotebook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;

    const content = (form.elements.namedItem('content') as HTMLInputElement).value;
    const author = (form.elements.namedItem('author') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;

    try {
      const response = await api.post("/user/notebook", {
        content: content,
        tag: selectedTag,
        author: author,
        date: date
      });

      setNotebooks(prev => [response.data, ...prev]);
      setNewContent("");
      setAuthor("");

    } catch (error) {
      console.error("Erro ao salvar notebook:", error);
    }
  };


  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  useEffect(() => {
    // Busca os dados do usuário logado
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/user/me"); // Certifique-se que essa rota existe no Java
        setUser({
          name: response.data.name,
          role: response.data.role || "Membro da Equipe",
          avatar: response.data.avatar || "https://via.placeholder.com/150"
        });
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        localStorage.removeItem('token')
      }

    };

    const fetchProjects = async () => {
      try {
        const response = await api.get("/stem/users/projects");
        console.log("PROJETOS BACKEND:", response.data);

        const formattedProjects = response.data.map((p: any) => ({
          ...p,
          color: getProjectColor(p.status),
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProfile();
    fetchProjects();
    fetchNotebooks();
  }, []);

  // --- VIEWS ---

  // 1. DASHBOARD
  const DashboardView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-black text-white p-6 md:p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#6BCB77] relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 bg-[#6BCB77] rounded-full animate-pulse"></span>
              <span className="font-mono text-xs text-[#6BCB77]">SYSTEM ONLINE</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase truncate">Olá, {user.name.split(' ')[0]}</h2>
            <p className="text-gray-400 mt-2 max-w-md text-sm md:text-base">Bem-vindo ao centro de comando.</p>
          </div>
          <div className="relative z-10 flex gap-6 mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-[#FFD600]" />
              <div><div className="text-[10px] text-gray-500 font-bold">BATTERY</div><div className="font-mono font-bold text-[#FFD600]">13.4 V</div></div>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-[#4D96FF]" />
              <div><div className="text-[10px] text-gray-500 font-bold">PING</div><div className="font-mono font-bold text-[#4D96FF]">24 ms</div></div>
            </div>
          </div>
          <Cpu className="absolute -right-6 -bottom-6 w-48 h-48 text-[#1A1A1A]" />
        </div>

        <div className="bg-[#FF6B6B] p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
          <h3 className="font-black text-black text-lg mb-4 bg-white px-2 py-1 rounded border-2 border-black rotate-1">TEMPORADA</h3>
          <div className="flex gap-2 font-mono text-white items-baseline">
            <div><span className="text-5xl font-black block leading-none">{timeLeft.days}</span><span className="text-[10px] font-bold text-black">DIAS</span></div>
            <span className="text-3xl font-black">:</span>
            <div><span className="text-5xl font-black block leading-none">{timeLeft.hours}</span><span className="text-[10px] font-bold text-black">HRS</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
          <h3 className="font-black text-lg mb-4 flex items-center gap-2"><CheckSquare className="w-6 h-6" /> CHECKLIST RÁPIDO</h3>
          <div className="space-y-2">
            {checklist.map((item) => (
              <div key={item.id} onClick={() => toggleCheck(item.id)} className={`flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer transition-all ${item.checked ? 'bg-green-50 border-green-200' : 'hover:border-black border-gray-100'}`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.checked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>{item.checked && <CheckSquare className="w-3 h-3 text-white" />}</div>
                <span className={`font-bold text-xs ${item.checked ? 'line-through text-gray-400' : 'text-black'}`}>{item.task}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#FFFDF5] border-4 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
          <h3 className="font-black text-lg mb-4 flex items-center gap-2"><AlertTriangle className="w-6 h-6 text-[#FFD600]" /> AVISOS</h3>
          <div className="space-y-3">
            <div className="bg-white p-3 border-l-4 border-red-500 shadow-sm text-sm"><span className="font-bold text-red-500 block text-xs mb-1">URGENTE</span>Entregar caderno de engenharia.</div>
            <div className="bg-white p-3 border-l-4 border-blue-500 shadow-sm text-sm"><span className="font-bold text-blue-500 block text-xs mb-1">INFO</span>Novas peças no almoxarifado.</div>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. PROJETOS
  const ProjectsView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div><h2 className="font-heading font-black text-3xl">PROJETOS</h2><p className="text-gray-500 font-mono text-sm">Gestão de missões.</p></div>
        <Button onClick={() => setIsProjectModalOpen(true)} className="bg-black text-white hover:bg-[#6BCB77] hover:text-black border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"><Plus className="w-5 h-5 mr-2" /> NOVO PROJETO</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.projectName} className="group relative bg-white border-4 border-black rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform flex flex-col">
            <div className={`h-3 ${project.color} border-b-4 border-black`}></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-black text-xl leading-tight uppercase truncate" title={project.projectName}>{project.projectName}</h3>
                <div className="bg-gray-100 border-2 border-black rounded px-2 py-0.5 text-[10px] font-bold uppercase shrink-0">{project.status}</div>
              </div>
              <div className="mb-6 bg-[#FFFDF5] p-3 rounded-lg border-2 border-dashed border-gray-300">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1"><AlertTriangle className="w-3 h-3 text-[#FFD600]" /> META:</div>
                <p className="font-medium text-sm text-black leading-snug">{project.goal}</p>
              </div>
              <div className="mt-auto space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>PROGRESSO</span><span>{project.progress}%</span></div>
                  <div className="h-3 w-full bg-gray-200 rounded-full border-2 border-black overflow-hidden"><div className={`h-full ${project.color}`} style={{ width: `${project.progress}%` }}></div></div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-red-500"><Clock className="w-3 h-3" />{new Date(project.deadline).toLocaleDateString('pt-BR')}</div>
                  <div className="flex gap-2">
                    <Button className="p-2 hover:bg-gray-100 rounded border-2 border-transparent hover:border-black transition-all"><Edit3 className="w-4 h-4" /></Button>
                    <Button onClick={() => handleDeleteProject(project.projectName)} className="p-2 hover:bg-red-100 text-red-500 rounded border-2 border-transparent hover:border-red-500 transition-all"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 3. BIBLIOTECA
  const LibraryView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div><h2 className="font-heading font-black text-3xl">BIBLIOTECA</h2><p className="text-gray-500 font-mono text-sm">Acervo técnico.</p></div>
        <div className="flex flex-wrap gap-2 p-1 bg-white border-2 border-black rounded-lg">
          {['TODOS', 'KIDS', 'TEENS', 'TOOLS'].map((filter) => (
            <Button key={filter} onClick={() => setLibraryFilter(filter)} className={`px-3 py-1 rounded text-xs font-bold font-mono transition-all border-2 ${libraryFilter === filter ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_#6BCB77]' : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100'}`}>{filter}</Button>
          ))}
        </div>
      </div>
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] overflow-hidden">
        <div className="divide-y-2 divide-gray-100">
          {LIBRARY_DATA.filter(item => libraryFilter === 'TODOS' || item.category === libraryFilter).map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#FFFDF5] transition-colors group">
              <div className="col-span-10 md:col-span-6 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center font-black shadow-sm shrink-0 ${item.type === 'PDF' ? 'bg-red-100 text-red-600' : item.type === 'VIDEO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  {item.type === 'VIDEO' ? <Video className="w-5 h-5" /> : item.type === 'ZIP' ? <Package className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div><h4 className="font-bold text-sm truncate pr-4">{item.title}</h4><span className="text-[10px] text-gray-400 font-mono font-bold md:hidden">{item.size} • {item.category}</span></div>
              </div>
              <div className="col-span-3 hidden md:flex"><span className={`text-[10px] font-bold px-2 py-1 rounded border border-black ${item.category === 'KIDS' ? 'bg-[#6BCB77]' : item.category === 'TEENS' ? 'bg-[#4D96FF]' : 'bg-gray-200'}`}>{item.category}</span></div>
              <div className="col-span-2 hidden md:block font-mono text-xs text-gray-500">{item.date}</div>
              <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center"><Button size="icon" variant="ghost" className="hover:bg-black hover:text-white border-2 border-transparent hover:border-black rounded-lg transition-all"><Download className="w-5 h-5" /></Button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 4. DIÁRIO DE BORDO
  const NotebookView = ({
      notebooks,
      newContent,
      setNewContent,
      handleCreateNotebook,
      selectedTag,
      setSelectedTag,
      author,
      setAuthor
    }: {
      notebooks: NotebookEntry[];
      newContent: string;
      setNewContent: React.Dispatch<React.SetStateAction<string>>;
      handleCreateNotebook: (e: React.FormEvent) => Promise<void>;
      selectedTag: string;
      setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
      author: string;
      setAuthor: React.Dispatch<React.SetStateAction<string>>;
    }) => {
      return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-heading font-black text-3xl">DIÁRIO</h2>
              <p className="text-gray-500 font-mono text-xs md:text-sm">
                Registro de engenharia.
              </p>
            </div>

            <Button
              onClick={() => setIsNotebookModalOpen(true)}
              className="bg-[#9D4EDD] text-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              NOVO
            </Button>
          </div>

          {/* LISTA */}
          <div className="space-y-4">
            {notebooks.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#FFFDF5] border-l-8 border-black p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase">
                      {entry.author}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      • {entry.date}
                    </span>
                  </div>

                  <span className="text-xs font-bold px-2 py-1 rounded border border-black bg-[#FFD600]">
                    {entry.tag}
                  </span>
                </div>

                <p className="text-slate-800 font-medium">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    };


  const Initializr = () => (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

      {/* SEÇÃO DE HEADER - Ocupando toda a largura horizontal */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b-4 border-black">
        <div className="space-y-1">
          <h2 className="font-heading font-black text-4xl tracking-tight">FTC INITIALIZR</h2>
          <p className="text-gray-500 font-mono text-sm bg-gray-100 inline-block px-2 border-2 border-black">
            Gerencie e construa seus SDKs customizados.
          </p>
        </div>

        <Button
          onClick={() => setIsInitializrModalOpen(true)}
          className="bg-[#FFD600] text-black hover:bg-black hover:text-[#FFD600] border-4 border-black font-black text-lg px-8 py-6 shadow-[6px_6px_0px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        >
          <Plus className="w-6 h-6 mr-2 stroke-[3px]" /> NOVO SDK
        </Button>
      </div>

      {/* SEÇÃO DE APÊNDICE (GRID DE PROJETOS) - Renderizada abaixo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sdks.map((sdk) => (
          <motion.div
            key={sdk.projectName}
            whileHover={{ y: -8, x: -4 }}
            className="group relative bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_#000] flex flex-col h-full transition-all"
          >
            {/* Header do Card */}
            <div className="h-4 bg-[#6BCB77] border-b-4 border-black group-hover:bg-black transition-colors"></div>

            <div className="p-6 flex-col flex-1 flex">
              <div className="mb-4">
                <h3 className="font-black text-xl leading-tight uppercase break-words border-l-4 border-black pl-2">
                  {sdk.projectName}
                </h3>
              </div>

              {/* Link Section */}
              <div className="mb-4 bg-gray-50 p-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1 uppercase">
                  <LinkIcon className="w-3 h-3" /> Source Link
                </div>
                <p className="font-mono text-xs text-black break-all line-clamp-1 italic">
                  {sdk.link}
                </p>
              </div>

              {/* Descrição */}
              <div className="flex-1">
                <Label className="font-black text-[10px] uppercase text-gray-500 bg-gray-100 px-1">Descrição</Label>
                <p className="text-sm font-bold leading-relaxed text-gray-800 line-clamp-3 mt-2">
                  {sdk.description || "Sem descrição disponível."}
                </p>
              </div>

              {/* Footer do Card */}
              <div className="mt-6 pt-4 border-t-4 border-black flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-gray-400">Status</span>
                  <span className="text-xs font-black text-[#6BCB77]">STABLE</span>
                </div>
                <button className="bg-black text-white p-2 rounded-full hover:bg-[#FFD600] hover:text-black transition-colors border-2 border-black">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans selection:bg-black selection:text-white flex flex-col md:flex-row overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-full md:w-20 lg:w-64 bg-white border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col z-20 sticky top-0 md:h-screen transition-all">
        <div className="p-4 md:p-6 border-b-4 border-black bg-[#FFD600] flex justify-between items-center md:block">
          <div><h1 className="font-heading font-black text-xl lg:text-2xl tracking-tighter"><span className="lg:hidden">EVR</span><span className="hidden lg:block">PORTAL <br /> EVEREST</span></h1></div>
          <div className="md:hidden"><div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200 overflow-hidden"><img src={USER_DATA.avatar} alt="User" /></div></div>
        </div>
        <nav className="flex-1 p-2 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">

          <Button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl font-bold border-2 transition-all shrink-0 md:w-full group ${activeTab === 'dashboard' ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#4D96FF]' : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-600'}`}><LayoutDashboard className="w-5 h-5" /><span className="uppercase text-xs lg:text-sm hidden lg:block">Painel</span></Button>

          <Button onClick={() => setActiveTab('projects')} className={`flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl font-bold border-2 transition-all shrink-0 md:w-full group ${activeTab === 'projects' ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#FF6B6B]' : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-600'}`}><FolderOpen className="w-5 h-5" /><span className="uppercase text-xs lg:text-sm hidden lg:block">Projetos</span></Button>

          <Button onClick={() => setActiveTab('library')} className={`flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl font-bold border-2 transition-all shrink-0 md:w-full group ${activeTab === 'library' ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#6BCB77]' : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-600'}`}><BookOpen className="w-5 h-5" /><span className="uppercase text-xs lg:text-sm hidden lg:block">Biblioteca</span></Button>

          <Button onClick={() => setActiveTab('notebook')} className={`flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl font-bold border-2 transition-all shrink-0 md:w-full group ${activeTab === 'notebook' ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#9D4EDD]' : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-600'}`}><ClipboardList className="w-5 h-5" /><span className="uppercase text-xs lg:text-sm hidden lg:block">Diário</span></Button>


          <Button onClick={() => setActiveTab('initializr')} className={`flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl font-bold border-2 transition-all shrink-0 md:w-full group ${activeTab === 'initializr' ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#FF6B6B]' : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-600'}`}><ClipboardList className="w-5 h-5" /><span className="uppercase text-xs lg:text-sm hidden lg:block">Ftc Initializr</span></Button>

          <div className="md:mt-auto border-t-2 border-dashed border-gray-300 pt-4 hidden md:block"><Link to="/login"><Button className="flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-red-500 hover:bg-red-50 w-full text-sm mt-1"><LogOut className="w-4 h-4" /> <span className="hidden lg:inline">Sair</span></Button></Link></div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-80px)] md:h-screen relative">
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

        {/* Header Desktop */}
        <header className="hidden md:flex justify-between items-center mb-8 relative z-10">
          <div><h2 className="font-black text-2xl uppercase tracking-wide flex items-center gap-2">
            {activeTab === 'dashboard' ? 'Centro de Comando' : activeTab === 'projects' ? 'Gestão de Projetos' : activeTab === 'library' ? 'Biblioteca STEM' : activeTab === 'notebook' ? 'Diário de Bordo' : 'Ftc Initializr'}
          </h2><div className="h-1 w-20 bg-black mt-1"></div></div>
          <div className="flex items-center gap-4"><div className="flex items-center gap-3 bg-white border-2 border-black p-1 pl-3 pr-1 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"><div className="text-right hidden lg:block"><div className="font-bold text-sm leading-none truncate max-w-[150px]">{user.name}</div><div className="text-[10px] font-mono text-gray-500">{user.role}</div></div><div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden"><img src={USER_DATA.avatar} alt="User" className="w-full h-full object-cover" /></div></div></div>
        </header>

        <div className="relative z-10 max-w-7xl mx-auto pb-20">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'projects' && <ProjectsView />}
          {activeTab === 'library' && <LibraryView />}
          {activeTab === 'notebook' && (
            <NotebookView
              notebooks={notebooks}
              newContent={newContent}
              setNewContent={setNewContent}
              handleCreateNotebook={handleCreateNotebook}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              author={author}
              setAuthor={setAuthor}
            />
          )}
          {activeTab === 'initializr' && <Initializr />}
        </div>
      </main>

      {/* --- MODAL DE NOVO PROJETO --- */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProjectModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_#FFD600] w-full max-w-md relative z-10">
              <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                <h3 className="font-heading font-black text-2xl">NOVO PROJETO</h3>
                <Button onClick={() => setIsProjectModalOpen(false)}><X className="w-6 h-6 hover:text-red-500 transition-colors" /></Button>
              </div>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-1"><Label className="font-black text-xs uppercase">Nome do Projeto</Label><Input name="title" className="border-2 border-black font-bold" placeholder="Ex: Robô de Resgate" required /></div>
                <div className="space-y-1"><Label className="font-black text-xs uppercase">Meta Principal (Alarme)</Label><Input name="goal" className="border-2 border-black" placeholder="Ex: Finalizar chassi até sexta" required /></div>
                <div className="space-y-1"><Label className="font-black text-xs uppercase">Prazo Final</Label><Input name="deadline" type="date" className="border-2 border-black" required /></div>
                <div className="pt-4 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setIsProjectModalOpen(false)} className="border-2 border-black font-bold">CANCELAR</Button>
                  <Button type="submit" className="bg-[#FFD600] text-black border-2 border-black hover:bg-black hover:text-[#FFD600] font-bold">CRIAR PROJETO</Button></div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



      <AnimatePresence>
        {isInitializrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsInitializrModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_#FFD600] w-full max-w-md relative z-10"
            >
              <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                <h3 className="font-heading font-black text-2xl uppercase">NOVO SDK</h3>
                <button type="button" onClick={() => setIsInitializrModalOpen(false)}>
                  <X className="w-6 h-6 hover:text-red-500 transition-colors" />
                </button>
              </div>

              <form onSubmit={handleFormSDK} className="space-y-5">
                {/* Nome do Projeto */}
                <div className="space-y-1">
                  <Label className="font-black text-xs uppercase">Nome do Projeto</Label>
                  <Input
                    name="projectName"
                    className="border-2 border-black font-bold"
                    placeholder="Ex: Robot_2026_FTC"
                    required
                  />
                </div>

                {/* Descrição do Projeto (NOVO CAMPO) */}
                <div className="space-y-1">
                  <Label className="font-black text-xs uppercase">Descrição do SDK</Label>
                  <textarea
                    name="description"
                    className="w-full min-h-[80px] border-2 border-black rounded-md p-2 font-medium text-sm focus:ring-2 focus:ring-[#FFD600] focus:outline-none"
                    placeholder="Descreva o propósito deste SDK..."
                  />
                </div>

                {/* Seleção de Dependências */}
                <div className="space-y-3">
                  <Label className="font-black text-xs uppercase">Selecione as Dependências</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-1 no-scrollbar border-2 border-dashed border-gray-300 rounded-lg">
                    {SDK_OPTIONS.map((option) => {
                      const isSelected = dependencies.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => isSelected ? handleRemoveDependency(option) : setDependencies(prev => [...prev, option])}
                          className={`px-2 py-1.5 text-[10px] font-black border-2 transition-all rounded ${isSelected
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black hover:bg-gray-100'
                            }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Resumo de Tags */}
                <div className="flex flex-wrap gap-2 min-h-[20px]">
                  {dependencies.map((dep) => (
                    <span key={dep} className="bg-[#6BCB77] border-2 border-black rounded-full px-2 py-0.5 text-[9px] font-black uppercase">
                      {dep}
                    </span>
                  ))}
                </div>

                {/* Ações */}
                <div className="pt-4 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsInitializrModalOpen(false)} className="border-2 border-black font-bold">
                    CANCELAR
                  </Button>
                  <Button type="submit" className="bg-[#FFD600] text-black border-2 border-black hover:bg-black hover:text-[#FFD600] font-bold shadow-[4px_4px_0px_0px_#000]">
                    CRIAR SDK
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotebookModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsNotebookModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_#9D4EDD] w-full max-w-md relative z-10"
            >
              <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                <h3 className="font-heading font-black text-2xl uppercase">
                  NOVO REGISTRO
                </h3>
                <button type="button" onClick={() => setIsNotebookModalOpen(false)}>
                  <X className="w-6 h-6 hover:text-red-500 transition-colors" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  handleCreateNotebook(e);
                  setIsNotebookModalOpen(false);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <Label>Progresso do dia</Label>
                  <Input
                    name = "content"
                    placeholder="Descreva o progresso de hoje..."
                    className="border-2 border-black min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label>Autor</Label>
                  <Input
                    name="author"
                    placeholder="Ex: João S."
                    className="border-2 border-black"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Date</Label>
                  <Input
                    name="date"
                    placeholder="Ex: 01/01/2025"
                    className="border-2 border-black"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  {["MECÂNICA", "PROGRAMAÇÃO"].map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      size="sm"
                      onClick={() => setSelectedTag(tag)}
                      className={`text-xs font-bold border-2 border-black ${selectedTag === tag
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        }`}
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNotebookModalOpen(false)}
                    className="border-2 border-black font-bold"
                  >
                    CANCELAR
                  </Button>

                  <Button
                    type="submit"
                    className="bg-[#9D4EDD] text-white border-2 border-black font-bold"
                  >
                    SALVAR
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Portal;