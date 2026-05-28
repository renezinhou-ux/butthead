import React from 'react';
import { LeadConversation } from '../types';

interface ContextCardProps {
  conversation: LeadConversation;
}

export function ContextCard({ conversation }: ContextCardProps) {
  const getContextSummary = (chat: LeadConversation) => {
    const stageLabels: Record<string, string> = {
      frio: 'Lead Frio (Passivo)',
      engajado: 'Alto Engajamento Detectado',
      negociando: 'Negociação Ativa (Interesse Comercial)',
      convertido: 'Conversão Comercial Concluída',
      onboarding: 'Onboarding (Checklist Inicial)',
      ativo: 'Cliente Recorrente / Saudável',
      suporte: 'Suporte Técnico Solicitado',
      churn_risk: 'Alerta de Evasão (Churn Risk)'
    };
    
    const stageLabel = stageLabels[chat.stage] || 'Interação no CRM';
    const lastSeenStr = chat.lastSeen === 'online' ? 'Lead Online Agora 🟢' : `Visto: ${chat.lastSeen}`;
    const nextTask = chat.botPaused ? 'Controle Manual Ativado (IA Congelada)' : `Gatilho Autônomo: "${chat.nextBotAction}"`;

    return `${stageLabel} · ${lastSeenStr} · ${nextTask}`;
  };

  const getStageColorClass = (stage: string) => {
    switch (stage) {
      case 'convertido':
      case 'ativo':
        return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400';
      case 'negociando':
      case 'engajado':
        return 'bg-amber-500/10 border-amber-550/25 text-amber-400';
      case 'suporte':
      case 'churn_risk':
        return 'bg-red-500/10 border-red-500/25 text-red-450';
      case 'onboarding':
        return 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400';
      default:
        return 'bg-slate-900 border-slate-800 text-slate-400';
    }
  };

  return (
    <div 
      className={`px-4 py-3 rounded-xl border flex items-center justify-between text-2xs font-medium leading-relaxed font-sans shadow-sm ${getStageColorClass(conversation.stage)}`}
      id="chat-context-card"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          {conversation.lastSeen === 'online' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
        <span className="tracking-wide">{getContextSummary(conversation)}</span>
      </div>
      
      {conversation.avgResponseTime && (
        <span className="text-[10px] font-mono opacity-85 shrink-0">
          TMR: {conversation.avgResponseTime}
        </span>
      )}
    </div>
  );
}
