import React, { useState, useEffect } from 'react';
import { 
  getAppState, saveAppState, AppState 
} from './mockData';
import { Campaign, NumberPool, LeadConversation, KnowledgeDoc, AlertNotification } from './types';

// Importing page components
import { Dashboard } from './components/Dashboard';
import { Campanhas } from './components/Campanhas';
import { CriarCampanha } from './components/CriarCampanha';
import { Conversas } from './components/Conversas';
import { Numeros } from './components/Numeros';
import { BaseConhecimento } from './components/BaseConhecimento';
import { Agenda } from './components/Agenda';
import { Configuracoes } from './components/Configuracoes';

// Lucide Icons
import { 
  LayoutDashboard, Rocket, MessageSquare, Smartphone, Database, 
  Bell, Search, Menu, X, HelpCircle, HeartHandshake, CheckCircle,
  Calendar, Settings
} from 'lucide-react';

export default function App() {
  // Global React States initialized from localStorage
  const [state, setState] = useState<AppState>(() => getAppState());

  // Navigation states
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [activeCampaignFilterId, setActiveCampaignFilterId] = useState<string | null>(null);

  // UI state variables
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertsDropdownOpen, setAlertsDropdownOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Persist state updates to localStorage automatically
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Handler for navigation through widgets
  const handleNavigateToTab = (tabName: string, arg?: string, filterCamId?: string) => {
    if (tabName === 'Conversas') {
      setActiveTab('Conversas');
      if (arg) {
        setActiveConversationId(arg);
      }
      if (filterCamId) {
        setActiveCampaignFilterId(filterCamId);
      } else {
        setActiveCampaignFilterId(null);
      }
    } else if (tabName === 'Criar/Editar Campanha') {
      setEditingCampaignId(arg || null);
      setActiveTab('Criar/Editar Campanha');
    } else if (tabName === 'Números') {
      setActiveTab('Números');
    } else {
      setActiveTab(tabName);
    }
    setMobileMenuOpen(false);
  };

  // Mark alerts as read
  const handleMarkAlertAsRead = (id: string) => {
    const updatedAlerts = state.alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    );
    setState(prev => ({ ...prev, alerts: updatedAlerts }));
  };

  // Remove alert for specific conversation (when operator reads it)
  const handleRemoveConversationAlert = (conversaId: string) => {
    const updatedAlerts = state.alerts.map(alert => 
      alert.conversaId === conversaId ? { ...alert, read: true } : alert
    );
    setState(prev => ({ ...prev, alerts: updatedAlerts }));
  };

  // Toggle Campaign active/paused status
  const handleToggleCampaignStatus = (id: string) => {
    const updatedCampaigns = state.campaigns.map(camp => {
      if (camp.id === id) {
        const nextStatus = camp.status === 'active' ? 'paused' : 'active';
        return { ...camp, status: nextStatus };
      }
      return camp;
    });
    setState(prev => ({ ...prev, campaigns: updatedCampaigns }));
  };

  // Save campaign (covers create AND edit!)
  const handleSaveCampaign = (savedCampaign: Campaign) => {
    // Check if campaign already exists
    const exists = state.campaigns.some(c => c.id === savedCampaign.id);
    let updatedCampaigns: Campaign[] = [];

    if (exists) {
      updatedCampaigns = state.campaigns.map(c => c.id === savedCampaign.id ? savedCampaign : c);
    } else {
      updatedCampaigns = [...state.campaigns, savedCampaign];
    }

    setState(prev => ({ ...prev, campaigns: updatedCampaigns }));
    setActiveTab('Campanhas');
    setEditingCampaignId(null);
  };

  // Chat conversation interaction
  const handleUpdateConversation = (updatedConversa: LeadConversation) => {
    const updatedConversations = state.conversations.map(conv => 
      conv.id === updatedConversa.id ? updatedConversa : conv
    );
    setState(prev => ({ ...prev, conversations: updatedConversations }));
  };

  // Numbers pool addition
  const handleAddNumber = (newNum: NumberPool) => {
    setState(prev => ({ ...prev, numbers: [...prev.numbers, newNum] }));
  };

  // Change number line status
  const handleUpdateNumberStatus = (id: string, nextStatus: 'active' | 'standby' | 'caído' | 'banido') => {
    const updatedNumbers = state.numbers.map(num => 
      num.id === id ? { ...num, status: nextStatus } : num
    );

    // If status becomes "caído", we trigger an instant alert in notifications as specified!
    let newAlerts = [...state.alerts];
    if (nextStatus === 'caído') {
      const fallenNum = state.numbers.find(n => n.id === id);
      const alertId = `alt-fallen-${Date.now()}`;
      const newAlert: AlertNotification = {
        id: alertId,
        conversaId: 'conv-2', // fallback or sample conversation
        leadName: 'ALERTA TÉCNICO',
        campaignName: fallenNum ? fallenNum.campaignName.split(' ')[0] : 'Butthead',
        messagePreview: `O número WhatsApp ${fallenNum ? fallenNum.number : 'vinculado'} parou de responder!`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      newAlerts = [newAlert, ...state.alerts];
    }

    setState(prev => ({ ...prev, numbers: updatedNumbers, alerts: newAlerts }));
  };

  // Delete line number
  const handleRemoveNumber = (id: string) => {
    setState(prev => ({ ...prev, numbers: prev.numbers.filter(n => n.id !== id) }));
  };

  // Change daily count limit
  const handleUpdateDailyLimit = (id: string, limit: number) => {
    const updated = state.numbers.map(num => 
      num.id === id ? { ...num, dailyLimit: limit } : num
    );
    setState(prev => ({ ...prev, numbers: updated }));
  };

  // Knowledge base addition
  const handleUploadDoc = (newDoc: KnowledgeDoc) => {
    setState(prev => ({ ...prev, docs: [newDoc, ...prev.docs] }));
  };

  // Delete document
  const handleDeleteDoc = (id: string) => {
    setState(prev => ({ ...prev, docs: prev.docs.filter(d => d.id !== id) }));
  };

  // Update embedding generation status
  const handleUpdateDocStatus = (id: string, status: 'processing' | 'indexed' | 'error', chunks: number) => {
    const updatedDocs = state.docs.map(doc => 
      doc.id === id ? { ...doc, status, chunks } : doc
    );
    setState(prev => ({ ...prev, docs: updatedDocs }));
  };

  // Unread active alerts count
  const unreadAlerts = state.alerts.filter(a => !a.read);

  // Render correct panel inside routing
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <Dashboard 
            campaigns={state.campaigns} 
            numbers={state.numbers} 
            conversations={state.conversations} 
            alerts={state.alerts}
            onNavigateToTab={handleNavigateToTab}
            onMarkAlertAsRead={handleMarkAlertAsRead}
          />
        );
      case 'Campanhas':
        return (
          <Campanhas 
            campaigns={state.campaigns} 
            numbers={state.numbers} 
            onToggleCampaignStatus={handleToggleCampaignStatus}
            onNavigateToCreateEdit={(id) => handleNavigateToTab('Criar/Editar Campanha', id)}
            onNavigateToTab={handleNavigateToTab}
          />
        );
      case 'Criar/Editar Campanha':
        return (
          <CriarCampanha 
            campaigns={state.campaigns} 
            numbers={state.numbers} 
            editingCampaignId={editingCampaignId}
            onSaveCampaign={handleSaveCampaign}
            onNavigateBack={() => setActiveTab('Campanhas')}
          />
        );
      case 'Conversas':
        return (
          <Conversas 
            conversations={state.conversations}
            campaigns={state.campaigns}
            activeConversationId={activeConversationId}
            onSelectConversation={setActiveConversationId}
            onUpdateConversation={handleUpdateConversation}
            onRemoveConversationAlert={handleRemoveConversationAlert}
            campaignFilterId={activeCampaignFilterId}
            onClearCampaignFilter={() => setActiveCampaignFilterId(null)}
          />
        );
      case 'Agenda':
        return (
          <Agenda 
            conversations={state.conversations}
            onUpdateConversation={handleUpdateConversation}
          />
        );
      case 'Números':
        return (
          <Numeros 
            numbers={state.numbers}
            campaigns={state.campaigns}
            onAddNumber={handleAddNumber}
            onUpdateNumberStatus={handleUpdateNumberStatus}
            onRemoveNumber={handleRemoveNumber}
            onUpdateDailyLimit={handleUpdateDailyLimit}
          />
        );
      case 'Base de Conhecimento':
        return (
          <BaseConhecimento 
            documents={state.docs}
            onUploadDoc={handleUploadDoc}
            onDeleteDoc={handleDeleteDoc}
            onUpdateDocStatus={handleUpdateDocStatus}
          />
        );
      case 'Configurações':
        return (
          <Configuracoes />
        );
      default:
        return (
          <Dashboard 
            campaigns={state.campaigns} 
            numbers={state.numbers} 
            conversations={state.conversations} 
            alerts={state.alerts}
            onNavigateToTab={handleNavigateToTab}
            onMarkAlertAsRead={handleMarkAlertAsRead}
          />
        );
    }
  };

  // Navigation Items info
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Campanhas', icon: Rocket },
    { name: 'Conversas', icon: MessageSquare },
    { name: 'Agenda', icon: Calendar },
    { name: 'Números', icon: Smartphone },
    { name: 'Base de Conhecimento', icon: Database },
    { name: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased cyber-grid" id="butthead-root-layout">
      
      {/* LEFT SIDEBAR - Desktop view */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 select-none relative z-20">
        
        {/* Brand App Branding Icon */}
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800/90 bg-slate-900/80">
          <div className="h-8.5 w-8.5 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-600/30 font-black text-xs flex items-center justify-center font-display tracking-wider border border-indigo-400/25 animate-pulse-glow">
            Ω
          </div>
          <div>
            <h2 className="text-sm font-black tracking-widest text-slate-100 font-display flex items-center gap-1.5 leading-none">
              BUTTHEAD
              <span className="text-[8px] px-1 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/25 uppercase tracking-widest font-black font-sans leading-none">
                PRO
              </span>
            </h2>
            <p className="text-[9px] text-slate-500 font-medium font-sans mt-1 tracking-wide uppercase">Ops Intelligence</p>
          </div>
        </div>

        {/* Live Operational Status Pulse Indicator */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-semibold text-slate-400 font-sans">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm animate-pulse-dot glow-success"></span>
            <span>OPERADORES IA</span>
          </div>
          <span className="text-indigo-400 font-mono font-bold">ONLINE</span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isTabActive = activeTab === item.name || (item.name === 'Campanhas' && activeTab === 'Criar/Editar Campanha');
            
            // Unread indicators calculations
            const hasIndicator = item.name === 'Conversas' && unreadAlerts.length > 0;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigateToTab(item.name)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isTabActive 
                    ? 'bg-slate-850 text-indigo-400 border border-indigo-500/20 shadow-glow' 
                    : 'text-slate-400 hover:bg-slate-850/50 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 transition-colors ${isTabActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className={`${isTabActive ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
                </div>
                
                {hasIndicator ? (
                  <span className="h-4.5 min-w-4.5 px-1 bg-red-500/10 text-red-400 border border-red-500/25 font-bold text-[9px] font-mono rounded-full flex items-center justify-center leading-none animate-pulse">
                    {unreadAlerts.length}
                  </span>
                ) : (
                  isTabActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 glow-purple"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer help card */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
            <HeartHandshake className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-100 font-display block">Ohm Control Suite</span>
              <span className="text-[10px] text-slate-500 block mt-1 leading-relaxed font-sans">
                Seus agentes autônomos operam em escala contínua na nuvem.
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE MAIN SECTION (HEADER TOPBAR + SCROLLER WINDOW) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOPBAR HEADER ACTIONS */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between select-none shrink-0 relative z-10">
          
          <div className="flex items-center gap-3 flex-1">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Global search simulation bar */}
            <div className="relative max-w-xs w-full hidden sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Busca global de leads e campanhas..."
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  // Dynamic query feedback if in Conversas tab
                  if (activeTab === 'Conversas') {
                    // let inner handle search behavior
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Alerts Center Bell Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setAlertsDropdownOpen(!alertsDropdownOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors relative cursor-pointer"
                title="Alertas Activos"
              >
                <Bell className="h-5 w-5" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
                )}
              </button>

              {/* Real Alerts Dropdown Menu */}
              {alertsDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl z-50 p-1 divide-y divide-slate-800 overflow-hidden">
                  <div className="p-3">
                    <span className="text-xs font-bold text-white flex items-center justify-between">
                      Notificações do Operador
                      <span className="text-2xs font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/10 px-2 py-0.5 rounded">
                        {unreadAlerts.length} novas
                      </span>
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {unreadAlerts.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        Nenhuma notificação crítica pendente.
                      </div>
                    ) : (
                      unreadAlerts.map(alt => (
                        <button
                          key={alt.id}
                          onClick={() => {
                            handleMarkAlertAsRead(alt.id);
                            handleNavigateToTab('Conversas', alt.conversaId);
                            setAlertsDropdownOpen(false);
                          }}
                          className="w-full text-left p-3 hover:bg-slate-800/60 flex flex-col gap-1 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-400">{alt.leadName}</span>
                            <span className="text-4xs text-slate-550 font-mono">{alt.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 italic line-clamp-1">
                            "{alt.messagePreview}"
                          </p>
                        </button>
                      ))
                    )}
                  </div>

                  <div className="p-2 text-center">
                    <button
                      onClick={() => {
                        handleNavigateToTab('Dashboard');
                        setAlertsDropdownOpen(false);
                      }}
                      className="text-3xs text-indigo-400 font-bold hover:text-white"
                    >
                      Ver Tudo no Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Operator profile card avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
              <div className="relative">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-slate-800 to-indigo-900 border border-slate-750 flex items-center justify-center font-bold text-indigo-300 text-xs font-mono uppercase shadow-inner">
                  OP
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div className="hidden lg:block">
                <span className="text-xs font-bold text-white block">Atendimento Ohm</span>
                <span className="text-[10px] text-slate-500 block">Supervisor</span>
              </div>
            </div>

          </div>
        </header>

        {/* MOBILE SLIDE-IN SIDEBAR */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-950/80 z-50 md:hidden flex" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="h-16 flex items-center px-6 gap-2 justify-between border-b border-slate-800">
                <span className="text-md font-black tracking-tight text-white font-mono uppercase">BUTTHEAD</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigateToTab(item.name)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                        activeTab === item.name ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* CONTAINER SCROLL SUITE WINDOW FOR EACH TABVIEW */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>

      </div>
    </div>
  );
}
