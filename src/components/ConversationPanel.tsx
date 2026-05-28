import React, { useState } from 'react';
import { 
  Clipboard, Calendar, Clock, DollarSign, Plus, X, Tag, 
  HeartHandshake, Eye, Sparkles, BookOpen, Volume2, Info, Activity, 
  History, FileEdit, Smartphone, Instagram, Star
} from 'lucide-react';
import { LeadConversation, Campaign } from '../types';

interface ConversationPanelProps {
  conversation: LeadConversation;
  campaigns: Campaign[];
  onUpdateConversation: (conversa: LeadConversation) => void;
}

export function ConversationPanel({
  conversation,
  campaigns,
  onUpdateConversation
}: ConversationPanelProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'timeline' | 'history' | 'notes'>('info');
  const [newTagInput, setNewTagInput] = useState('');
  const [notesText, setNotesText] = useState(conversation.notes || '');

  const handleStageChange = (newStage: any) => {
    const updated: LeadConversation = {
      ...conversation,
      stage: newStage
    };
    onUpdateConversation(updated);
  };

  const handleSentimentChange = (newSentiment: any) => {
    const updated: LeadConversation = {
      ...conversation,
      sentiment: newSentiment
    };
    onUpdateConversation(updated);
  };

  const handleUrgencyChange = (newUrgency: any) => {
    const updated: LeadConversation = {
      ...conversation,
      urgency: newUrgency
    };
    onUpdateConversation(updated);
  };

  const handleAddManualTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const tags = conversation.manualTags || [];
    if (!tags.includes(newTagInput.trim())) {
      const updated: LeadConversation = {
        ...conversation,
        manualTags: [...tags, newTagInput.trim()]
      };
      onUpdateConversation(updated);
    }
    setNewTagInput('');
  };

  const handleRemoveManualTag = (tagToRemove: string) => {
    const tags = conversation.manualTags || [];
    const updated: LeadConversation = {
      ...conversation,
      manualTags: tags.filter(t => t !== tagToRemove)
    };
    onUpdateConversation(updated);
  };

  const handleSaveNotes = () => {
    const updated: LeadConversation = {
      ...conversation,
      notes: notesText
    };
    onUpdateConversation(updated);
  };

  const handleToggleOnboardingStep = (stepText: string) => {
    if (!conversation.onboardingSteps) return;
    const updatedSteps = conversation.onboardingSteps.map(step => 
      step.name === stepText ? { ...step, completed: !step.completed } : step
    );
    const updated: LeadConversation = {
      ...conversation,
      onboardingSteps: updatedSteps
    };
    onUpdateConversation(updated);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/20 font-sans" id="conversation-right-dossier">
      
      {/* Abas Header */}
      <div className="grid grid-cols-4 border-b border-slate-800 text-[10px] font-bold font-display uppercase tracking-wider select-none bg-slate-900/40">
        <button
          onClick={() => setActiveTab('info')}
          className={`py-3 text-center border-b-2 transition flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'info' ? 'border-indigo-500 text-white bg-slate-950/10' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
          title="Ficha do Lead"
        >
          <Info className="h-4 w-4" />
          Ficha
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-3 text-center border-b-2 transition flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'timeline' ? 'border-indigo-500 text-white bg-slate-950/10' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
          title="Timeline de Comportamento"
        >
          <Activity className="h-4 w-4" />
          Rastro
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 text-center border-b-2 transition flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'history' ? 'border-indigo-500 text-white bg-slate-950/10' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
          title="Histórico de Vendas"
        >
          <History className="h-4 w-4" />
          Compras
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`py-3 text-center border-b-2 transition flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'notes' ? 'border-indigo-500 text-white bg-slate-950/10' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
          title="Notas & Operador"
        >
          <FileEdit className="h-4 w-4" />
          Notas
        </button>
      </div>

      {/* Abas Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        
        {/* TAB 1: INFO */}
        {activeTab === 'info' && (
          <div className="space-y-5 animate-fade-in text-slate-300 text-xs">
            {/* Lead Meta Data Header */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-850 space-y-1">
              <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <span>INTEL DATA</span>
                <span className="bg-indigo-550/10 text-indigo-400 border border-indigo-500/20 rounded px-1.5 py-0.2 font-mono font-bold">
                  SCORE: {conversation.ohmScore || 85}%
                </span>
              </div>
              <h4 className="text-white text-sm font-black uppercase tracking-wide font-display mt-1">{conversation.name}</h4>
              <p className="text-slate-400 text-2xs font-mono">{conversation.phoneOrHandle}</p>
            </div>

            {/* Stage Selector */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 font-display">Estágio Comercial (CRM)</label>
              <select
                value={conversation.stage}
                onChange={(e) => handleStageChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans cursor-pointer focus:ring-1 focus:ring-indigo-500"
              >
                <option value="frio">❄️ Frio (Abordagem)</option>
                <option value="engajado">🔥 Engajado (Interesse)</option>
                <option value="negociando">💬 Negociando (Objeções)</option>
                <option value="convertido">💰 Convertido (Comprou)</option>
                <option value="onboarding">🚀 Onboarding (Guia Ativo)</option>
                <option value="ativo">🌟 Ativo (Consumo Regular)</option>
                <option value="suporte">🔧 Suporte (Chamados)</option>
                <option value="churn_risk">🚨 Churn Risk (Instabilidade)</option>
              </select>
            </div>

            {/* Sentimento & Urgency Selectors */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 font-display">Sentimento</label>
                <select
                  value={conversation.sentiment || 'neutral'}
                  onChange={(e) => handleSentimentChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-2xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="positive">😊 Positivo</option>
                  <option value="neutral">😐 Neutro</option>
                  <option value="resistant">😒 Resistente</option>
                  <option value="urgent">🚨 Crítico</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 font-display">Urgência</label>
                <select
                  value={conversation.urgency || 'normal'}
                  onChange={(e) => handleUrgencyChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-2xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="urgent">🔴 Crítico</option>
                  <option value="attention">🟡 Atenção</option>
                  <option value="normal">🔵 Normal</option>
                  <option value="auto">🟣 Automático</option>
                </select>
              </div>
            </div>

            {/* Tags Manuais */}
            <div className="space-y-2.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 font-display flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Destaques / Tags do Operador
              </label>
              
              <div className="flex flex-wrap gap-1.5">
                {(conversation.manualTags || []).map(tag => (
                  <span 
                    key={tag} 
                    className="bg-slate-900 text-slate-300 pl-2 pr-1 py-1 rounded-lg border border-slate-800 text-[9px] font-bold font-sans flex items-center gap-1 hover:border-red-500/30 hover:text-white"
                  >
                    {tag}
                    <button onClick={() => handleRemoveManualTag(tag)} className="text-slate-500 hover:text-red-400 p-0.5 rounded cursor-pointer shrink-0">
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddManualTag} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escrever tag..."
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  className="flex-grow bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-2xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="bg-indigo-600/20 hover:bg-indigo-600 hover:text-white border border-indigo-600/30 text-indigo-450 p-1.5 rounded-lg text-2xs cursor-pointer transition">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

            {/* Enriched Context parameters (Ohm Datos Intelligence) */}
            <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-850 space-y-3.5">
              <h5 className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-display">Parâmetros de Match (Ohm Context)</h5>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-sans text-2xs">
                <div>
                  <span className="text-slate-500 block uppercase tracking-wide font-bold">Nicho Cadastrado:</span>
                  <p className="text-white font-medium mt-0.5">{conversation.searchTag || 'Fitness / Saúde'}</p>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase tracking-wide font-bold">Seguidores Insta:</span>
                  <p className="text-white font-medium mt-0.5">{(conversation.instagramFollowers || 1500).toLocaleString()}</p>
                </div>
                {conversation.cnpjAtividade && (
                  <div className="col-span-2">
                    <span className="text-slate-500 block uppercase tracking-wide font-bold">Atividade / CNAE:</span>
                    <p className="text-white font-medium mt-0.5 truncate">{conversation.cnpjAtividade}</p>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block uppercase tracking-wide font-bold">Tom Recomendado:</span>
                  <p className="text-white font-medium mt-0.5 capitalize">{conversation.recommendedTone || 'informal/educativo'}</p>
                </div>
                <div>
                  <span className="text-slate-505 block uppercase tracking-wide font-bold">Horário Ideal:</span>
                  <p className="text-white font-medium mt-0.5">{conversation.idealTime || 'Tarde (15:00)'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 animate-fade-in text-slate-300 text-xs">
            <h4 className="text-[10px] font-black uppercase text-slate-550 tracking-widest mb-2 font-display">Caminho de Integração (Ohm Event Logs)</h4>
            
            {!conversation.events || conversation.events.length === 0 ? (
              <p className="text-slate-500 text-center py-8">Nenhum gatilho ou evento registrado para este lead.</p>
            ) : (
              <div className="relative pl-5 border-l border-slate-800 space-y-4 font-sans text-2xs">
                {conversation.events.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle bulb indicator connecting timeline items */}
                    <span className="absolute -left-[24.5px] top-1 h-2 w-2 rounded-full bg-indigo-500 border border-slate-950 group-hover:scale-125 transition-transform"></span>
                    
                    <div className="flex justify-between font-mono text-slate-500 leading-none">
                      <span>{evt.app.toUpperCase()}</span>
                      <span>{evt.date}</span>
                    </div>
                    <p className="text-white mt-1 font-medium leading-relaxed font-sans">{evt.event}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4 animate-fade-in text-slate-300 text-xs text-sans">
            <h4 className="text-[10px] font-black uppercase text-slate-550 tracking-widest mb-3 font-display">Compras Cadastradas</h4>
            
            {!conversation.purchases || conversation.purchases.length === 0 ? (
              <p className="text-slate-550 text-center py-8 italic font-sans">Nenhuma conversão comercial identificada.</p>
            ) : (
              <div className="space-y-2">
                {conversation.purchases.map((pur, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 flex items-center justify-between font-sans text-2xs leading-relaxed">
                    <div>
                      <p className="text-white font-black leading-snug">{pur.product}</p>
                      <span className="text-slate-500 font-mono text-[9px] mt-0.5 block">{pur.date}</span>
                    </div>
                    <span className="text-emerald-450 font-mono font-bold shrink-0">
                      R$ {pur.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Offer labels from all campaigns lead has traversed */}
            <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-850 space-y-3.5 mt-4">
              <h5 className="text-[10px] font-black tracking-widest text-slate-400 font-display uppercase">Interesses de Ofertas (Ohm Analytics)</h5>
              {!conversation.ohmOfferTags || conversation.ohmOfferTags.length === 0 ? (
                <p className="text-slate-500 text-center py-3 text-[10px]">Sem dados adicionais.</p>
              ) : (
                <div className="space-y-2.5 text-2xs">
                  {conversation.ohmOfferTags.map((tagOpt, idx) => (
                    <div key={idx} className="flex justify-between border-b border-slate-900 pb-1.5 last:border-0 last:pb-0">
                      <div>
                        <span className="text-white font-bold block">{tagOpt.offer}</span>
                        <span className="text-[9px] text-slate-500 font-mono">Via: {tagOpt.channel} · Tom: {tagOpt.tone}</span>
                      </div>
                      <span className="bg-indigo-550/10 text-indigo-400 border border-indigo-500/15 px-1.5 py-0.2 h-max rounded text-[9px] font-mono font-bold shrink-0 self-center">
                        {tagOpt.score}% Match
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4 animate-fade-in text-slate-300 text-xs">
            {/* Operator Notepad notes block */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-bold font-display">
                <span>Bloco de Notas (Humano)</span>
                <button 
                  onClick={handleSaveNotes}
                  className="text-indigo-400 hover:text-white transition cursor-pointer font-bold lowercase tracking-normal text-[9.5px]"
                >
                  gravar notas
                </button>
              </div>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Memo livre para registrar objeções, preferências, acordos de rastreamento de postagem ou dados de despacho comercial..."
                className="w-full h-32 bg-slate-950 border border-slate-850 rounded-xl p-3 text-2xs text-white placeholder-slate-650 focus:outline-none resize-none font-sans"
              />
            </div>

            {/* Next AI scheduled target action */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850 space-y-1 text-2xs font-sans">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black font-display font-bold">Ação Próxima da IA</span>
              <p className="text-white font-medium mt-1 leading-relaxed">"{conversation.nextBotAction}"</p>
              {conversation.nextActionTime && (
                <p className="text-[10px] text-indigo-400 font-mono font-medium mt-1">Disparo em: {new Date(conversation.nextActionTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
              )}
            </div>

            {/* Onboarding Steps Checklist (only for onboarding stage) */}
            {conversation.stage === 'onboarding' && conversation.onboardingSteps && (
              <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-850 space-y-3.5 mt-2">
                <h5 className="text-[10px] font-black tracking-widest text-slate-400 font-display uppercase">Onboarding Rastreável</h5>
                
                <div className="space-y-2">
                  {conversation.onboardingSteps.map((step) => (
                    <button
                      key={step.name}
                      onClick={() => handleToggleOnboardingStep(step.name)}
                      className="w-full flex items-center gap-2.5 text-left p-1 rounded hover:bg-slate-900 transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={step.completed}
                        readOnly
                        className="rounded border-slate-700 text-indigo-650 accent-indigo-500 pointer-events-none shrink-0"
                      />
                      <span className={`text-[11px] leading-tight ${step.completed ? 'text-slate-500 line-through font-normal' : 'text-slate-350 font-medium'}`}>
                        {step.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
