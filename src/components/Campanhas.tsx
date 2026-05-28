import React from 'react';
import { Rocket, Play, Pause, Edit, Plus, MessageSquare, Smartphone, Instagram, Users } from 'lucide-react';
import { Campaign, NumberPool } from '../types';

interface CampanhasProps {
  campaigns: Campaign[];
  numbers: NumberPool[];
  onToggleCampaignStatus: (id: string) => void;
  onNavigateToCreateEdit: (id?: string) => void;
  onNavigateToTab: (tabName: string, arg?: string, filterCamId?: string) => void;
}

export function Campanhas({
  campaigns,
  numbers,
  onToggleCampaignStatus,
  onNavigateToCreateEdit,
  onNavigateToTab
}: CampanhasProps) {

  // Helper static placeholder image if custom fails
  const fallbackImg = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

  return (
    <div className="space-y-6 font-sans" id="campanhas-container">
      {/* Header section with CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800/85 shadow-glow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display flex items-center gap-2">
            <Rocket className="h-5 w-5 text-indigo-400 animate-pulse-glow" />
            Campanhas Operacionais
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
            Configure narrativas de IA, personas virtuais e acompanhe métricas de conversão segmentadas.
          </p>
        </div>
        
        <button
          onClick={() => onNavigateToCreateEdit()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-glow shadow-indigo-600/20 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Nova Campanha
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {campaigns.map((camp) => {
          // Get numbers associated with this campaign
          const associatedNumbers = numbers.filter(num => num.campaignId === camp.id);
          const isActive = camp.status === 'active';

          return (
            <div 
              key={camp.id}
              className={`bg-slate-900 p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isActive 
                  ? 'border-slate-800 hover:border-indigo-500/25 shadow-sm hover:shadow-glow-premium' 
                  : 'border-slate-805/40 opacity-70'
              }`}
            >
              {/* Card Title & General Info */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <img 
                      src={camp.photoUrl || fallbackImg} 
                      alt={camp.name}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-xl object-cover ring-2 ring-slate-800 bg-slate-800 shadow-md transform hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImg;
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest select-none ${
                          isActive 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-glow-success' 
                            : 'bg-slate-950 text-slate-500 border border-slate-800'
                        }`}>
                          {isActive ? '● ATIVA' : 'PAUSADA'}
                        </span>
                        
                        {/* Active Channels */}
                        <div className="flex gap-1">
                          {camp.channels.includes('whatsapp') && (
                            <span className="p-1 bg-emerald-600/10 text-emerald-400 rounded-md border border-emerald-500/10" title="WhatsApp Ativo">
                              <Smartphone className="h-3 w-3" />
                            </span>
                          )}
                          {camp.channels.includes('instagram') && (
                            <span className="p-1 bg-pink-600/10 text-pink-400 rounded-md border border-pink-500/10" title="Instagram Ativo">
                              <Instagram className="h-3 w-3" />
                            </span>
                          )}
                        </div>

                        {/* Media file items count */}
                        {camp.campaignMedia && camp.campaignMedia.length > 0 && (
                          <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-mono font-bold" title="Criativos estratégicos da campanha">
                            📁 {camp.campaignMedia.length} Mídias
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-base font-bold text-white mt-2 font-display">{camp.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Persona: <span className="text-slate-300 font-medium">{camp.personality}</span>
                      </p>
                    </div>
                  </div>

                  {/* Buttons controls */}
                  <div className="flex gap-1.5 shadow-sm shrink-0 items-center">
                    <button
                      onClick={() => onNavigateToTab('Conversas', undefined, camp.id)}
                      className="px-3 py-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-2xs font-extrabold uppercase tracking-widest font-sans"
                      title="Ver Conversas ativas deste funil"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Ver Conversas</span>
                    </button>
                    <button
                      onClick={() => onToggleCampaignStatus(camp.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-slate-950 hover:bg-amber-500/10 border-slate-800 text-amber-500 hover:border-amber-500/20 font-bold'
                          : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white shadow-md'
                      }`}
                      title={isActive ? 'Pausar Campanha' : 'Ativar Campanha'}
                    >
                      {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                    </button>
                    <button
                      onClick={() => onNavigateToCreateEdit(camp.id)}
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Editar Campanha"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Linked product information */}
                <div className="mt-4 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-850 flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-500">Produto Ohm Vinculado:</span>
                  <span className="text-slate-205 font-mono font-bold bg-slate-900 px-2.5 py-1 rounded border border-slate-800/80 text-[10px]">
                    {camp.productName}
                  </span>
                </div>

                {/* Numbers Status linked list */}
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-display">Números Conectados ({associatedNumbers.length})</p>
                  {associatedNumbers.length === 0 ? (
                    <p className="text-xs text-orange-400 italic bg-orange-500/5 px-3 py-2 rounded-xl border border-orange-500/10 font-medium">
                      Nenhum número WhatsApp ativo nesta campanha. Associe através da tela do Pool.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {associatedNumbers.map(num => (
                        <div 
                          key={num.id}
                          className="flex items-center gap-2 text-[10px] bg-slate-950/50 pl-2 pr-3 py-1 rounded-lg border border-slate-850"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            num.status === 'active' 
                              ? 'bg-emerald-500 animate-pulse-dot' 
                              : num.status === 'standby' 
                                ? 'bg-amber-400' 
                                : 'bg-red-500 animate-pulse'
                          }`}></span>
                          <span className="text-slate-350 font-mono font-medium">{num.number}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* High-Fidelity Visual Funnel Bar Segment */}
              <div className="mt-5 space-y-2 bg-slate-950/30 p-4 rounded-xl border border-slate-850/80">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
                  <span>Funil Operacional de Abordagem</span>
                  <span className="text-indigo-400 font-mono font-bold">
                    Estágio de Conversão: {camp.leadsContacted ? Math.round((camp.leadsConverted / camp.leadsContacted) * 100) : 0}%
                  </span>
                </div>
                <div className="space-y-2 pt-1">
                  {/* Fila */}
                  <div>
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono mb-1">
                      <span>Fila (Novos Aguardando)</span>
                      <span className="text-amber-500 font-bold font-mono">{camp.leadsQueue} leads</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500/70 rounded-full" style={{ width: `${Math.min(100, camp.leadsContacted ? (camp.leadsQueue / camp.leadsContacted) * 100 : 30)}%` }}></div>
                    </div>
                  </div>

                  {/* Abordados (Contacted) */}
                  <div>
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono mb-1">
                      <span>Abordados (Primeiro Contato)</span>
                      <span className="text-sky-400 font-bold font-mono">{camp.leadsContacted} leads</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500/80 rounded-full shadow-inner" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* Responderam (Responded) */}
                  <div>
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono mb-1">
                      <span>Responderam (Engajados)</span>
                      <span className="text-violet-400 font-bold font-mono">
                        {camp.leadsResponded} leads ({camp.leadsContacted ? Math.round((camp.leadsResponded / camp.leadsContacted) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500/80 rounded-full animate-pulse-glow" style={{ width: `${camp.leadsContacted ? (camp.leadsResponded / camp.leadsContacted) * 100 : 0}%` }}></div>
                    </div>
                  </div>

                  {/* Converteram (Converted) */}
                  <div>
                    <div className="flex justify-between text-[9px] text-slate-550 font-mono mb-1">
                      <span>Converteram (Vendas Coletadas)</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        {camp.leadsConverted} leads ({camp.leadsContacted ? Math.round((camp.leadsConverted / camp.leadsContacted) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500/85 rounded-full shadow-glow-success" style={{ width: `${camp.leadsContacted ? (camp.leadsConverted / camp.leadsContacted) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Metrics Section */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950/40 p-4 rounded-xl">
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider font-display">Fila atual</p>
                  <p className="text-base font-black text-white font-mono mt-0.5">{camp.leadsQueue}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider font-display">Abordandos</p>
                  <p className="text-base font-black text-slate-300 font-mono mt-0.5">{camp.leadsContacted}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider font-display">Respostas</p>
                  <p className="text-base font-black text-indigo-400 font-mono mt-0.5">
                    {camp.leadsResponded}
                    <span className="text-[10px] font-normal text-slate-500 ml-1">
                      ({camp.leadsContacted ? Math.round((camp.leadsResponded / camp.leadsContacted) * 100) : 0}%)
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider font-display text-emerald-400">Conversões</p>
                  <p className="text-base font-black text-emerald-500 font-mono mt-0.5 animate-pulse-dot">
                    {camp.leadsConverted}
                    <span className="text-[10px] font-normal text-slate-505 ml-1">
                      ({camp.leadsContacted ? Math.round((camp.leadsConverted / camp.leadsContacted) * 100) : 0}%)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
