import React from 'react';
import { 
  LayoutDashboard, AlertCircle, TrendingUp, CheckCircle2, DollarSign, 
  MessageSquare, Smartphone, Activity, Server, ShieldAlert, Star, 
  ArrowRight, ShieldCheck, Zap, Sparkles, Award, Calendar
} from 'lucide-react';
import { Campaign, NumberPool, LeadConversation, AlertNotification } from '../types';

interface DashboardProps {
  campaigns: Campaign[];
  numbers: NumberPool[];
  conversations: LeadConversation[];
  alerts: AlertNotification[];
  onNavigateToTab: (tab: string, arg?: string, filterCamId?: string) => void;
  onMarkAlertAsRead: (id: string) => void;
}

export function Dashboard({
  campaigns,
  numbers,
  conversations,
  alerts,
  onNavigateToTab,
  onMarkAlertAsRead
}: DashboardProps) {
  
  // Real-Time Calculations
  const totalLeadsApproached = campaigns.reduce((acc, c) => acc + c.leadsContacted, 0);
  const activeQueue = campaigns.reduce((acc, c) => acc + c.leadsQueue, 0);
  
  const totalContacted = campaigns.reduce((acc, c) => acc + c.leadsContacted, 0) || 1;
  const totalResponded = campaigns.reduce((acc, c) => acc + c.leadsResponded, 0);
  const responseRate = Math.round((totalResponded / totalContacted) * 100);

  const totalConverted = campaigns.reduce((acc, c) => acc + c.leadsConverted, 0);
  const conversionRate = Math.round((totalConverted / totalContacted) * 100);

  const onlineLeadsCount = conversations.filter(c => 
    c.lastSeen === 'online' || 
    (c.lastSeen && c.lastSeen.includes('minuto') && parseInt(c.lastSeen) <= 15)
  ).length;

  // Revenue math with dynamic Campaign-level ticketValue and fallback to R$ 50
  const totalMonthlyRevenue = conversations.reduce((acc, conv) => {
    if (conv.purchases && conv.purchases.length > 0) {
      return acc + conv.purchases.reduce((sum, p) => sum + p.value, 0);
    }
    return acc;
  }, 0) || campaigns.reduce((acc, c) => {
    const tVal = c.ticketValue !== undefined ? c.ticketValue : 50;
    return acc + (c.leadsConverted * tVal);
  }, 0);

  const averageTicketValue = totalConverted > 0 ? (totalMonthlyRevenue / totalConverted) : 50;

  // Active alerts (unread)
  const activeAlerts = alerts.filter(a => !a.read);

  // Line pool status
  const totalNumbers = numbers.length;
  const activeNumbers = numbers.filter(n => n.status === 'active').length;
  const healthPercent = totalNumbers ? Math.round((activeNumbers / totalNumbers) * 100) : 0;

  // Mock NPS Data
  const averageNps = 8.5;
  const reviews = [
    { name: 'Ana Beatriz', score: 10, comment: 'A Maya respondeu minhas dúvidas e comprei em 5 minutos! Muito bom.', date: 'Hoje' },
    { name: 'Ricardo Martins', score: 8, comment: 'Foco do robô é incrível nas ofertas, tirou as principais objeções de preço.', date: 'Ontem' },
    { name: 'Gisele Souza', score: 9, comment: 'Gostei bastante do pós-venda que configuraram. Super atenciosa!', date: '25/05/2026' },
  ];

  // SVG Chart Mock Data - Last 7 days conversions
  const conversionData = [
    { day: 'Qui', val: 12 },
    { day: 'Sex', val: 18 },
    { day: 'Sáb', val: 8 },
    { day: 'Dom', val: 15 },
    { day: 'Seg', val: 24 },
    { day: 'Ter', val: 21 },
    { day: 'Qua', val: 28 },
  ];

  const maxVal = Math.max(...conversionData.map(d => d.val)) || 30;

  // Next upcoming tasks for the inline agenda listing
  const upcomingActions = conversations
    .filter(c => !!c.nextActionTime && !!c.nextBotAction)
    .slice(0, 3);

  // Top 5 urgent conversations needing attention
  const urgentConversations = conversations
    .filter(c => c.urgency === 'urgent' || c.urgency === 'attention' || (c.unreadCount !== undefined && c.unreadCount > 0))
    .sort((a, b) => {
      const weightA = (a.urgency === 'urgent' ? 10 : a.urgency === 'attention' ? 5 : 0) + ((a.unreadCount || 0) * 2);
      const weightB = (b.urgency === 'urgent' ? 10 : b.urgency === 'attention' ? 5 : 0) + ((b.unreadCount || 0) * 2);
      return weightB - weightA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6 font-sans text-slate-100" id="dashboard-wrapper">
      
      {/* 1. Welcome and Health Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800/80 shadow-glow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display flex items-center gap-2.5">
            <LayoutDashboard className="h-5.5 w-5.5 text-indigo-400 animate-pulse-glow" />
            Visão Geral Butthead
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed font-sans">
            Mapeamento e controle em tempo real dos fluxos de CRM automatizados por inteligência artificial.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-850 flex items-center gap-2.5 font-display">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-emerald animate-pulse"></span>
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Saúde do Pool</p>
              <span className="text-xs font-black text-slate-205 font-mono">{healthPercent}% Ativos</span>
            </div>
          </div>
          <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-850 flex items-center gap-2.5 font-display">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-emerald animate-pulse"></span>
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Leads Online</p>
              <span className="text-xs font-black text-emerald-400 font-mono">{onlineLeadsCount} ativos</span>
            </div>
          </div>
          <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-850 font-display">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Disparo Pendente</p>
            <span className="text-xs font-black text-indigo-400 font-mono block mt-0.5">{activeQueue} leads</span>
          </div>
        </div>
      </div>

      {/* 2. Metric Cards Grid (including monthly income and ticket average) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Approach leads count */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/10 transition-all duration-300 flex items-start justify-between group cursor-default shadow-sm hover:shadow-glow-premium">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Leads Abordados</p>
            <p className="text-3xl font-black text-white font-mono tracking-tight group-hover:text-indigo-400 transition-colors">
              {totalLeadsApproached}
            </p>
            <p className="text-[10px] text-slate-505 font-medium font-sans flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-pulse-dot"></span>
              <span>{activeQueue} na fila de disparo</span>
            </p>
          </div>
          <div className="p-3 bg-indigo-500/5 text-indigo-400 rounded-xl border border-indigo-500/10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <MessageSquare className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Metric 2: Conversions counter */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/10 transition-all duration-300 flex items-start justify-between group cursor-default shadow-sm hover:shadow-glow-success">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Conversão Geral</p>
            <p className="text-3xl font-black text-emerald-550 font-mono tracking-tight">{conversionRate}%</p>
            <p className="text-[10px] text-slate-505 font-medium font-sans flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{totalConverted} vendas finalizadas</span>
            </p>
          </div>
          <div className="p-3 bg-emerald-500/5 text-emerald-400 rounded-xl border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
            <CheckCircle2 className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Metric 3: Generated revenue */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80 hover:border-amber-500/10 transition-all duration-300 flex items-start justify-between group cursor-default shadow-sm hover:shadow-glow-amber">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Receita do Mês</p>
            <p className="text-3xl font-black text-white font-mono tracking-tight">
              R$ {totalMonthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-slate-505 font-medium font-sans flex items-center gap-1.5">
              <DollarSign className="h-3 w-3 text-emerald-400" />
              <span>Soma de todo o funil operacional</span>
            </p>
          </div>
          <div className="p-3 bg-amber-500/5 text-amber-500 rounded-xl border border-amber-500/10 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
            <DollarSign className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Metric 4: Ticket average calculation */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/10 transition-all duration-300 flex items-start justify-between group cursor-default shadow-sm hover:shadow-glow-premium">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Ticket Médio (AOM)</p>
            <p className="text-3xl font-black text-indigo-400 font-mono tracking-tight">
              R$ {averageTicketValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-slate-505 font-medium font-sans">
              Média ponderada por campanha
            </p>
          </div>
          <div className="p-3 bg-indigo-500/5 text-indigo-400 rounded-xl border border-indigo-500/10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Award className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>

      {/* 3. Main Split Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column dashboard content stats */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Chart performance */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Desempenho Diário de Vendas</h3>
                  <p className="text-xs text-slate-500 mt-1">Conversões concluídas por IA nas últimas janelas de tempo.</p>
                </div>
                <span className="text-[9px] bg-slate-950 text-indigo-400 font-bold px-2.5 py-1 rounded-lg border border-slate-850 font-mono uppercase tracking-wider">
                  Volume Recente
                </span>
              </div>

              {/* Chart columns svg styling */}
              <div className="mt-8 relative h-48 flex items-end justify-between font-mono pt-4 select-none">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-t border-slate-800/40 w-full h-0"></div>
                  <div className="border-t border-slate-800/40 w-full h-0"></div>
                  <div className="border-t border-slate-800/40 w-full h-0"></div>
                  <div className="border-b border-slate-800 w-full h-0"></div>
                </div>

                {conversionData.map((d, i) => {
                  const heightPercent = Math.max(10, Math.min(100, (d.val / maxVal) * 100));
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 h-full relative group">
                      <div className="absolute -top-7 bg-indigo-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-max z-20">
                        {d.val} conversões
                      </div>
                      <div className="w-8 sm:w-11 bg-slate-950 hover:bg-slate-850 rounded-t-lg transition-all duration-300 flex items-end overflow-hidden cursor-pointer h-full border border-slate-850">
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-750 to-indigo-500 rounded-t-lg group-hover:from-indigo-600 group-hover:to-indigo-400 transition-all duration-300 ring-1 ring-indigo-400/20 shadow-glow" 
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-500 text-[10px] font-bold mt-3 font-sans">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Revenue By Campaign list & Visuais Funnel (combined beautifully) */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Receita por Campanha & Funis Ativos</h3>
              <p className="text-xs text-slate-550 mt-1">Geração de receita faturada e barras de proporção de leads por etapa do CRM.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-1">
              {campaigns.map((camp) => {
                const cRevenue = conversations
                  .filter(conv => conv.campaignId === camp.id && conv.purchases)
                  .reduce((acc, conv) => acc + (conv.purchases?.reduce((sum, p) => sum + p.value, 0) || 0), 0) || (camp.leadsConverted * (camp.ticketValue || 50));
                const progressWidth = camp.leadsContacted ? Math.round((camp.leadsConverted / camp.leadsContacted) * 100) : 0;
                
                return (
                  <div key={camp.id} className="bg-slate-950/45 p-4 rounded-xl border border-slate-850 hover:border-slate-800 transition-all space-y-3.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`h-2 w-2 rounded-full ${camp.status === 'active' ? 'bg-emerald-500 animate-pulse-dot' : 'bg-slate-700'}`}></span>
                        <span className="text-xs font-black text-white font-display uppercase tracking-wide">{camp.name}</span>
                      </div>
                      <div className="flex items-center gap-2.5 font-mono">
                        <button
                          onClick={() => onNavigateToTab('Conversas', undefined, camp.id)}
                          className="px-2 py-1 bg-indigo-500/15 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-400 hover:text-white rounded-lg text-3xs font-black uppercase tracking-widest flex items-center gap-1 transition-all cursor-pointer font-sans"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                          Ver Conversas
                        </button>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-bold">RENDA:</span>
                        <span className="text-xs font-black text-emerald-400">R$ {cRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/15 font-bold">Ticket: R$ {camp.ticketValue || 50}</span>
                      </div>
                    </div>

                    {/* Integrated horizontal compact funnel bars */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] text-slate-450 font-mono">
                        <span>Funil: {camp.leadsQueue} na fila → {camp.leadsContacted} abordados → {camp.leadsResponded} responderam → {camp.leadsConverted} converteram</span>
                        <span className="text-emerald-400 font-bold">{progressWidth}% Conversão</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full flex overflow-hidden">
                        {/* Abordados color segment - Blue */}
                        <div className="h-full bg-blue-500/75" style={{ width: '100%' }} title="Abordados"></div>
                        {/* Responderam segment - Violet */}
                        <div className="h-full bg-violet-500/80 border-l border-slate-950" style={{ width: `${camp.leadsContacted ? (camp.leadsResponded / camp.leadsContacted) * 100 : 0}%` }} title="Responderam"></div>
                        {/* Converted segment - Emerald green */}
                        <div className="h-full bg-emerald-500/85 border-l border-slate-950 shadow-glow-success" style={{ width: `${camp.leadsContacted ? (camp.leadsConverted / camp.leadsContacted) * 105 : 0}%` }} title="Conversões"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bot conversational metrics dashboard section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Conversational Performance stats */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80 space-y-4">
              <h3 className="text-xs font-black text-slate-205 uppercase tracking-widest font-display flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-indigo-400 shrink-0" />
                Performance Conversacional da IA
              </h3>
              
              <div className="space-y-2.5 text-xs font-sans">
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850">
                  <span className="text-slate-450 font-medium font-display">Tempo de Fechamento (Conversão)</span>
                  <span className="font-bold text-white font-mono">2.8 Dias</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850">
                  <span className="text-slate-450 font-medium font-display">Contagem Mágica de Mensagens</span>
                  <span className="font-bold text-white font-mono">7.4 por lead</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850">
                  <span className="text-slate-450 font-medium font-display">Gatilho de Venda Líder</span>
                  <span className="font-bold text-indigo-400 font-mono uppercase text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15">
                    prova_social (Antes/Dep)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850">
                  <span className="text-slate-450 font-medium font-display">Taxa de Desistência Coletada</span>
                  <span className="font-bold text-red-400 font-mono">11.6% (Estágio Frio)</span>
                </div>
              </div>
            </div>

            {/* Client satisfactions and Net Promoter scores (NPS) */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xs font-black text-slate-205 uppercase tracking-widest font-display flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-400 shrink-0" />
                  NPS & Satisfação dos Clientes
                </h3>
                <span className="text-xs font-black font-mono text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  NPS: {averageNps} / 10
                </span>
              </div>

              {/* Feedbacks loops reviews list */}
              <div className="space-y-3 pt-0.5">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 text-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-200 uppercase tracking-wider font-display">{rev.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-2.5 w-2.5 text-amber-400 fill-current" />
                        <span className="font-bold font-mono text-slate-300">{rev.score}</span>
                      </div>
                    </div>
                    <p className="text-slate-450 italic leading-normal font-medium">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right column dashboard widgets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 3A. Agents microservices health status network (Hermes IP, GPT, Evolution API, Ohm) */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80 space-y-4 shadow-sm relative">
            <h3 className="text-xs font-black text-white font-display uppercase tracking-widest flex items-center gap-2">
              <Server className="h-4 w-4 text-indigo-400" />
              Saúde Integrada dos Agentes
            </h3>

            <div className="space-y-2.5 font-sans font-medium text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850/80">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-emerald block animate-pulse"></span>
                  <span className="text-slate-300">Hermes Local (Agent VM)</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">ONLINE</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850/80">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-emerald block animate-pulse"></span>
                  <span className="text-slate-300">GPT-4o (OpenAI API)</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850/80">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-emerald block animate-pulse"></span>
                  <span className="text-slate-300">Evolution API (Zap Cluster)</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850/80">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-emerald block animate-pulse"></span>
                  <span className="text-slate-300">Ohm ERP Connector</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">CONNECTED</span>
              </div>
            </div>
          </div>

          {/* Numbers health segment */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80 shadow-sm relative">
            <h3 className="text-xs font-black text-white font-display uppercase tracking-widest mb-4 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-slate-500" />
              Pool de Números WhatsApp
            </h3>
            
            <div className="space-y-2.5 font-sans font-medium text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-emerald block animate-pulse"></span>
                  <span className="text-slate-300">Ativos em Atendimento</span>
                </div>
                <span className="text-xs font-bold text-slate-200 font-mono">
                  {activeNumbers} / {totalNumbers}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 block"></span>
                  <span className="text-slate-400">Standby / Aquecendo</span>
                </div>
                <span className="text-xs font-bold text-slate-300 font-mono">
                  {numbers.filter(n => n.status === 'standby').length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse block"></span>
                  <span className="text-slate-400">Linhas Caídas</span>
                </div>
                <span className="text-xs font-bold text-orange-400 font-mono bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  {numbers.filter(n => n.status === 'caído').length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-855">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 block"></span>
                  <span className="text-slate-400">Banidos Permanente</span>
                </div>
                <span className="text-xs font-bold text-red-400 font-mono bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  {numbers.filter(n => n.status === 'banido').length}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => onNavigateToTab('Números')} 
              className="mt-4 w-full bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-[10px] py-3 px-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-all uppercase tracking-wider cursor-pointer"
            >
              Gerenciar Pool de Disparos
            </button>
          </div>

          {/* Quick Agenda Upcoming schedule */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-white font-display uppercase tracking-widest flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-400" />
                Próximos Disparos (Agenda)
              </h3>
              <button 
                onClick={() => onNavigateToTab('Agenda')}
                className="text-3xs font-black uppercase text-indigo-400 hover:text-white flex items-center gap-1"
              >
                Ver Agenda
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingActions.length === 0 ? (
                <p className="text-[11px] text-slate-500 text-center py-4">Nenhum follow-up na fila de disparos para hoje.</p>
              ) : (
                upcomingActions.map(act => (
                  <div key={act.id} className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 text-2xs space-y-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="font-extrabold text-slate-200 uppercase tracking-widest font-display">{act.name}</span>
                      <span className="font-mono text-indigo-400 font-bold">
                        {act.nextActionTime ? new Date(act.nextActionTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Em fila'}
                      </span>
                    </div>
                    <p className="text-slate-450 italic leading-relaxed truncate px-1 bg-slate-900 py-1 rounded border border-slate-850/60">"{act.nextBotAction}"</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 4. Conversations Needing Attention & Critical Warnings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 4A. Conversations Needing Attention */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80 shadow-sm relative space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Conversas com Atenção Requerida</h3>
            </div>
            <span className="text-[9px] bg-slate-950 text-slate-400 font-black px-2.5 py-1 rounded-full border border-slate-850 uppercase tracking-widest font-mono">
              Top 5 Casos
            </span>
          </div>

          {urgentConversations.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">Nenhuma conversa urgente ou com pendência de resposta manual. Excelente trabalho! ✨</p>
          ) : (
            <div className="divide-y divide-slate-850/50">
              {urgentConversations.map((conv) => {
                const isUrgent = conv.urgency === 'urgent';
                return (
                  <div key={conv.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-200">{conv.name}</span>
                        {conv.unreadCount && conv.unreadCount > 0 ? (
                          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[8px] font-black px-1.5 py-0.2 rounded font-mono">
                            {conv.unreadCount} REPS
                          </span>
                        ) : null}
                        <span className={`text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded border ${
                          isUrgent ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {isUrgent ? 'Crítico' : 'Atenção'}
                        </span>
                      </div>
                      <p className="text-2xs text-slate-400 truncate italic mt-1 font-medium select-none">"{conv.lastMessage}"</p>
                    </div>

                    <button
                      onClick={() => onNavigateToTab('Conversas', conv.id)}
                      className="bg-indigo-650/15 border border-indigo-600/35 hover:bg-indigo-600 text-indigo-400 hover:text-white transition-all text-[9px] font-bold px-3 py-1.5 rounded-lg shrink-0 uppercase tracking-wider cursor-pointer"
                    >
                      Intervir
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4B. Critical Warnings Notifications panel */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80 shadow-sm relative">
          <div className="flex items-center justify-between mb-5 border-b border-slate-800/80 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Notificações Críticas de Suporte</h3>
            </div>
            <span className="text-[9px] bg-slate-950 text-slate-400 font-black px-2.5 py-1 rounded-full border border-slate-850 uppercase tracking-widest font-mono">
              {activeAlerts.length} pendentes
            </span>
          </div>

          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <span className="text-xs font-medium font-sans">Todos os pipelines de leads conversando estão sob controle e automotivos. ✨</span>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-60 overflow-y-auto scrollbar-thin">
              {activeAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex flex-col xl:flex-row items-start xl:items-center justify-between p-3.5 bg-slate-950/45 rounded-xl border border-slate-850 hover:border-slate-850 transition-all gap-3 shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-250 font-display uppercase tracking-wider">{alert.leadName}</span>
                      <span className="text-[10px] text-slate-505 font-mono font-medium">{alert.timestamp}</span>
                    </div>
                    <p className="text-2xs text-slate-400 mt-1 truncate italic leading-relaxed">
                      "{alert.messagePreview}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full xl:w-auto justify-end shrink-0">
                    <button 
                      onClick={() => onMarkAlertAsRead(alert.id)}
                      className="text-[9px] font-bold text-slate-500 hover:text-slate-300 px-2 py-1.5 rounded-lg hover:bg-slate-850/65 transition-colors uppercase tracking-wider cursor-pointer font-sans"
                    >
                      Lido
                    </button>
                    <button 
                      onClick={() => onNavigateToTab('Conversas', alert.conversaId)}
                      className="text-[9px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1 uppercase tracking-wider cursor-pointer font-display"
                    >
                      Intervir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>


    </div>
  );
}
