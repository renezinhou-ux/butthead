import React from 'react';
import { Calendar, Clock, User, ArrowRight, XCircle, AlertCircle, Play, Sparkles } from 'lucide-react';
import { LeadConversation } from '../types';

interface AgendaProps {
  conversations: LeadConversation[];
  onUpdateConversation: (updated: LeadConversation) => void;
}

export function Agenda({ conversations, onUpdateConversation }: AgendaProps) {
  // Filter conversations that have a scheduled nextActionTime
  const scheduledLeads = conversations
    .filter(lead => !!lead.nextActionTime && !!lead.nextBotAction)
    .sort((a, b) => {
      const timeA = new Date(a.nextActionTime!).getTime();
      const timeB = new Date(b.nextActionTime!).getTime();
      return timeA - timeB;
    });

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString; // fallback if string already formatted

      // Check if it is today
      const today = new Date();
      const isToday = date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear();

      const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      return isToday ? `Hoje às ${timeStr}` : `${date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} às ${timeStr}`;
    } catch {
      return isoString;
    }
  };

  const handleCancelAction = (lead: LeadConversation) => {
    const updated: LeadConversation = {
      ...lead,
      nextActionTime: undefined,
      nextBotAction: 'Ação automática suspensa pelo operador.',
    };
    onUpdateConversation(updated);
    alert(`Ação de follow-up para ${lead.name} foi suspensa com sucesso.`);
  };

  const handleExecuteActionNow = (lead: LeadConversation) => {
    // Simulate real action execution instantly by appending bot message and system message
    const botText = lead.nextBotAction;
    const now = new Date();
    const timestampStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const systemLog = {
      id: `sys-exec-${Date.now()}`,
      sender: 'system' as const,
      text: 'Ação automática antecipada e disparada pelo operador humano.',
      timestamp: timestampStr,
    };

    const newBotMsg = {
      id: `bot-exec-${Date.now()}`,
      sender: 'bot' as const,
      text: `[GATILHO ANTECIPADO]: ${botText}`,
      timestamp: timestampStr,
    };

    const updated: LeadConversation = {
      ...lead,
      messages: [...lead.messages, systemLog, newBotMsg],
      lastMessage: `[Disparo automático]: ${botText}`,
      lastMessageTime: timestampStr,
      nextActionTime: undefined,
      nextBotAction: 'Pesquisa pós-venda em 7 dias.', // Set up next future action
    };

    onUpdateConversation(updated);
    alert(`Ação executada com sucesso! Mensagem enviada para ${lead.name}.`);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 animate-fade-in" id="agenda-container">
      {/* Header and overview metric */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-glow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display flex items-center gap-2.5">
            <Calendar className="h-5.5 w-5.5 text-indigo-400" />
            Agenda Operacional do Bot
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed font-sans">
            Ações inteligentes automatizadas em modo de espera (follow-ups programados de leads).
          </p>
        </div>

        <div className="px-4 py-2.5 bg-slate-950/70 border border-slate-850 rounded-xl flex items-center gap-3 self-start sm:self-center font-display">
          <Clock className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-widest leading-none">Próximas ações</span>
            <span className="text-md font-extrabold text-white leading-none mt-1 block font-mono">
              {scheduledLeads.length} de prontidão
            </span>
          </div>
        </div>
      </div>

      {scheduledLeads.length === 0 ? (
        <div className="bg-slate-900 rounded-2xl p-12 text-center border border-slate-800 space-y-4 shadow-low">
          <div className="p-3 bg-slate-950 inline-block rounded-2xl border border-slate-850">
            <AlertCircle className="h-8 w-8 text-slate-550" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">Nenhuma Ação Agendada</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed pb-2 font-display">
              Todos os funis ativos de leads já foram processados nesta janela temporal. Novos agendamentos surgem conforme os leads responderem aos fluxos.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {scheduledLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-slate-900 border border-slate-800/90 rounded-2xl p-5 hover:border-slate-750 transition-all shadow-glow flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden"
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Visual state marker depending on channel */}
                <div className="relative shrink-0 mt-0.5">
                  <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-extrabold text-xs text-indigo-300 font-display uppercase tracking-wide">
                    {lead.name.substring(0, 2)}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 ${
                    lead.channel === 'whatsapp' ? 'bg-emerald-500' : 'bg-pink-500'
                  }`}></span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-white font-display uppercase tracking-wider">
                      {lead.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 font-mono border border-slate-850">
                      {lead.campaignName.split(' ')[1] || lead.campaignName}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 font-extrabold flex items-center gap-1">
                      <Clock className="h-3 w-3 inline" />
                      {formatDateTime(lead.nextActionTime)}
                    </span>
                  </div>

                  {/* Programmed statement description */}
                  <div className="flex items-center gap-1 text-xs text-slate-300 bg-slate-950/70 py-2 px-3 rounded-xl border border-slate-850/80 italic font-medium leading-relaxed">
                    <span className="text-indigo-400 font-bold shrink-0 not-italic uppercase tracking-widest text-[8px] border border-indigo-400/25 px-1 rounded-sm mr-1 font-display">Ação programada</span>
                    "{lead.nextBotAction}"
                  </div>
                </div>
              </div>

              {/* Interaction actions trigger */}
              <div className="flex items-center gap-2 md:self-center self-end pl-14 md:pl-0">
                <button
                  onClick={() => handleCancelAction(lead)}
                  className="bg-slate-950 hover:bg-red-950/20 hover:text-red-400 text-slate-400/80 px-3 py-2 rounded-xl text-4xs font-bold uppercase tracking-wider border border-slate-850 hover:border-red-500/25 transition-all flex items-center gap-1.5 cursor-pointer font-display"
                  title="Cancelar ação automática do bot"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Cancelar
                </button>
                <button
                  onClick={() => handleExecuteActionNow(lead)}
                  className="bg-indigo-650 hover:bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-4xs font-bold uppercase tracking-wider transition-all shadow-glow flex items-center gap-1.5 cursor-pointer font-display"
                  title="Executar de forma imediata"
                >
                  <Play className="h-3.5 w-3.5" />
                  Disparar Já
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
