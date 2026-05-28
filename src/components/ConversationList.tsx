import React, { useState } from 'react';
import { Smartphone, Instagram, Search, Plus } from 'lucide-react';
import { LeadConversation } from '../types';

interface ConversationListProps {
  conversations: LeadConversation[];
  selectedChatId: string | null;
  onSelectConversation: (id: string) => void;
  activeSection: 'sales' | 'retention';
  setActiveSection: (section: 'sales' | 'retention') => void;
  filterStage: string;
  setFilterStage: (stage: string) => void;
  filterChannel: string;
  setFilterChannel: (channel: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  campaignFilterId: string | null;
  onClearCampaignFilter?: () => void;
}

export function ConversationList({
  conversations,
  selectedChatId,
  onSelectConversation,
  activeSection,
  setActiveSection,
  filterStage,
  setFilterStage,
  filterChannel,
  setFilterChannel,
  searchQuery,
  setSearchQuery,
  campaignFilterId,
  onClearCampaignFilter
}: ConversationListProps) {
  
  // Filtering and sorting logic
  const filteredConversations = conversations.filter((conv) => {
    // Section filter
    const salesStages = ['frio', 'engajado', 'negociando', 'convertido'];
    const retentionStages = ['onboarding', 'ativo', 'suporte', 'churn_risk'];
    if (activeSection === 'sales' && !salesStages.includes(conv.stage)) return false;
    if (activeSection === 'retention' && !retentionStages.includes(conv.stage)) return false;

    // Stage dropdown filter
    if (filterStage !== 'all' && conv.stage !== filterStage) return false;

    // Channel dropdown filter
    if (filterChannel !== 'all' && conv.channel !== filterChannel) return false;

    // Campaign filter (custom from Dashboard Ver Conversas link or active select)
    if (campaignFilterId && conv.campaignId !== campaignFilterId) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = conv.name.toLowerCase().includes(q);
      const phoneMatch = conv.phoneOrHandle.toLowerCase().includes(q);
      const msgMatch = conv.lastMessage.toLowerCase().includes(q);
      const tagMatch = conv.searchTag?.toLowerCase().includes(q);
      const manualTagMatch = conv.manualTags?.some(t => t.toLowerCase().includes(q));
      if (!nameMatch && !phoneMatch && !msgMatch && !tagMatch && !manualTagMatch) return false;
    }

    return true;
  });

  // Urgência/Priorização: Sort by urgent / attention first, then newest timestamp
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    const isAUrgent = a.urgency === 'urgent' || a.urgency === 'attention' || (a.unreadCount && a.unreadCount > 0);
    const isBUrgent = b.urgency === 'urgent' || b.urgency === 'attention' || (b.unreadCount && b.unreadCount > 0);
    
    if (isAUrgent && !isBUrgent) return -1;
    if (!isAUrgent && isBUrgent) return 1;

    // Fallback to time comparison
    return b.lastMessageTime.localeCompare(a.lastMessageTime);
  });

  const stageColors: Record<string, string> = {
    frio: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    engajado: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    negociando: 'bg-amber-500/10 text-amber-550 border-amber-550/20',
    convertido: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    onboarding: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    ativo: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    suporte: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    churn_risk: 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse'
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800" id="conversation-sidebar">
      
      {/* Sales / Retention Department Toggles */}
      <div className="grid grid-cols-2 border-b border-slate-800/80 p-2 gap-2 text-2xs font-extrabold font-display">
        <button
          onClick={() => {
            setActiveSection('sales');
            setFilterStage('all');
          }}
          className={`py-2 px-3 rounded-lg border text-center transition cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider ${
            activeSection === 'sales' 
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow' 
              : 'bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <span>💼 Comercial</span>
          <span className="h-1.5 w-1.5 rounded-full bg-white opacity-85"></span>
        </button>
        <button
          onClick={() => {
            setActiveSection('retention');
            setFilterStage('all');
          }}
          className={`py-2 px-3 rounded-lg border text-center transition cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider ${
            activeSection === 'retention' 
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow' 
              : 'bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <span>🌱 Suporte / Geral</span>
          <span className="h-1.5 w-1.5 rounded-full bg-white opacity-85"></span>
        </button>
      </div>

      {/* Sub header query input & dropdowns */}
      <div className="p-3 bg-slate-950/25 border-b border-slate-800 space-y-2">
        {campaignFilterId && (
          <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-2 flex items-center justify-between text-[10px] text-slate-300">
            <span className="font-medium truncate max-w-[85%]">Filtrando por Campanha ativa 🏷️</span>
            {onClearCampaignFilter && (
              <button onClick={onClearCampaignFilter} className="text-indigo-400 hover:text-red-400 font-bold font-sans cursor-pointer pl-1.5 uppercase text-3xs">
                Limpar
              </button>
            )}
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nome, tag, texto, telefone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white placeholder-slate-605 focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="bg-slate-950 border border-slate-850 rounded-lg p-2 focus:outline-none text-[10px] text-slate-350 cursor-pointer"
          >
            <option value="all">Fases ({activeSection === 'sales' ? 'Vendas' : 'Pós-Venda'})</option>
            {activeSection === 'sales' ? (
              <>
                <option value="frio">❄️ Frio</option>
                <option value="engajado">🔥 Engajado</option>
                <option value="negociando">💬 Negociando</option>
                <option value="convertido">💰 Convertido</option>
              </>
            ) : (
              <>
                <option value="onboarding">🚀 Onboarding</option>
                <option value="ativo">🌟 Ativo</option>
                <option value="suporte">🔧 Suporte</option>
                <option value="churn_risk">🚨 Risco Churn</option>
              </>
            )}
          </select>

          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="bg-slate-950 border border-slate-850 rounded-lg p-2 focus:outline-none text-[10px] text-slate-350 cursor-pointer"
          >
            <option value="all">Todos Canais</option>
            <option value="whatsapp">Smartphone Zap</option>
            <option value="instagram">Instagram Direct</option>
          </select>
        </div>
      </div>

      {/* Sorted lead nodes listing scroll grid */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-850/30 scrollbar-thin">
        {sortedConversations.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-2xs font-sans px-4">
            Nenhuma conversa corresponde aos filtros indicados.
          </div>
        ) : (() => {
          let lastUrgencyGroup: 'critical' | 'normal' | null = null;
          
          return sortedConversations.map((conv) => {
            const isSelected = selectedChatId === conv.id;
            const isCritical = conv.urgency === 'urgent' || conv.urgency === 'attention';
            const currentUrgencyGroup = isCritical ? 'critical' : 'normal';

            // Draw group header dividing case status dynamically
            let headerDivider = null;
            if (lastUrgencyGroup !== currentUrgencyGroup) {
              lastUrgencyGroup = currentUrgencyGroup;
              headerDivider = (
                <div className="px-3.5 py-2 bg-slate-950/90 text-[8.5px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-between border-y border-slate-850/40 font-sans select-none">
                  <span>{currentUrgencyGroup === 'critical' ? '🚨 Intervenções / Casos Críticos' : '🤖 Fluxo Autônomo Normal'}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${currentUrgencyGroup === 'critical' ? 'bg-red-400 shadow-glow-red animate-pulse' : 'bg-indigo-400 opacity-60'}`}></span>
                </div>
              );
            }

            const hasUnread = (conv.unreadCount || 0) > 0;
            const cardBgStyle = hasUnread
              ? 'bg-indigo-950/15 border-indigo-500/50 ring-1 ring-indigo-500/10'
              : isSelected
                ? 'bg-indigo-500/10 border-indigo-500'
                : 'hover:bg-slate-850/20 border-transparent';

            return (
              <div key={conv.id}>
                {headerDivider}
                <button
                  onClick={() => onSelectConversation(conv.id)}
                  className={`w-full text-left p-3.5 border-l-2 transition-all flex items-start gap-3 cursor-pointer ${cardBgStyle}`}
                >
                  {/* Message bubble indicators inside */}
                  <div className="relative shrink-0 select-none pt-0.5">
                    <div className="h-9 w-9 rounded-xl bg-slate-850 border border-slate-750 flex items-center justify-center font-bold font-display text-white text-xs uppercase relative select-none animate-fade-in">
                      {conv.avatarSeed.substring(0, 2)}
                      
                      <span className={`absolute -top-1 -left-1 h-3 w-3 rounded-full border border-slate-900 ${
                        conv.lastSeen === 'online' ? 'bg-emerald-500 shadow-glow-emerald animate-pulse' : 'bg-slate-650'
                      }`} title={conv.lastSeen || 'Offline'}></span>
                    </div>
                    <span className="absolute -bottom-1 -right-1 p-0.5 bg-slate-900 border border-slate-800 rounded-md shrink-0">
                      {conv.channel === 'whatsapp' ? (
                        <Smartphone className="h-2.5 w-2.5 text-emerald-400 fill-current" />
                      ) : (
                        <Instagram className="h-2.5 w-2.5 text-pink-400" />
                      )}
                    </span>
                  </div>

                  {/* Text meta details */}
                  <div className="flex-1 min-w-0 space-y-1 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-205 truncate font-display uppercase tracking-wider pr-10">{conv.name}</h4>
                      {hasUnread ? (
                        <span className="bg-red-500/15 border border-red-500/25 px-1.5 py-0.2 rounded font-mono text-[8px] text-red-400 font-bold select-none shrink-0 self-start">
                          {conv.unreadCount} novas
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-505 font-mono shrink-0 select-none pb-0.5">{conv.lastMessageTime}</span>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-400 italic truncate leading-snug">
                      "{conv.lastMessage}"
                    </p>

                    <div className="flex items-center justify-between pt-1.5 flex-wrap gap-1">
                      <span className="text-[8.5px] text-slate-500 font-bold uppercase truncate font-sans max-w-[80px]">
                        {conv.campaignName.replace('Campanha ', '').split(' ')[0]}
                      </span>

                      <div className="flex items-center gap-1 shrink-0 select-none">
                        {conv.sentiment && (
                          <span className="text-[9px]" title={`Feedback: ${conv.sentiment}`}>
                            {conv.sentiment === 'positive' ? '😊' : conv.sentiment === 'neutral' ? '😐' : conv.sentiment === 'resistant' ? '😒' : '🚨'}
                          </span>
                        )}
                        {conv.botPaused && (
                          <span className="text-[7.5px] bg-red-500/10 text-red-450 border border-red-500/20 px-1 py-0.2 rounded font-black font-mono">
                            PAUSA_IA
                          </span>
                        )}
                        <span className={`text-[7.5px] font-black uppercase px-1 py-0.2 rounded border leading-none tracking-wider ${stageColors[conv.stage] || 'bg-slate-800 border-slate-700'}`}>
                          {conv.stage}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          });
        })()}
      </div>

    </div>
  );
}
