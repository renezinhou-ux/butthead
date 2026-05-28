import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Mic, Image as ImageIcon, FileText, Clock, 
  Smile, BookOpen, Send, X, Shield, User, HelpCircle, CheckCheck, Sparkles 
} from 'lucide-react';
import { LeadConversation, Campaign, Message } from '../types';
import { ContextCard } from './ContextCard';
import { QuickReplies } from './QuickReplies';
import { MediaPreview } from './MediaPreview';

interface ConversationChatProps {
  conversation: LeadConversation;
  campaigns: Campaign[];
  onSendMessage: (text: string, mediaType?: 'audio' | 'image' | 'video' | 'document', mediaUrl?: string) => void;
  onToggleBotPause: () => void;
  onSimulateReply: (text: string) => void;
  onLightboxOpen: (url: string) => void;
}

export function ConversationChat({
  conversation,
  campaigns,
  onSendMessage,
  onToggleBotPause,
  onSimulateReply,
  onLightboxOpen
}: ConversationChatProps) {
  const [inputText, setInputText] = useState('');
  const [showEmojiBar, setShowEmojiBar] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  
  // Simulation and testing (Sandbox) state
  const [showSandbox, setShowSandbox] = useState(false);
  const [sandboxReplyText, setSandboxReplyText] = useState('');
  
  // Voice Recording simulation state
  const [isRecording, setIsRecording] = useState(false);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll anchor ref
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  // Find active campaign associated with active conversation
  const activeCampaign = campaigns.find(c => c.id === conversation.campaignId);
  const activeCampaignMedia = activeCampaign?.campaignMedia || [];

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
    setShowEmojiBar(false);
  };

  const handleApplyQuickReply = (text: string) => {
    setInputText(text);
  };

  const handleInsertEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  const handleScheduleActionGrid = (label: string, hoursAhead: number) => {
    const fireTime = new Date();
    fireTime.setHours(fireTime.getHours() + hoursAhead);
    
    // Dispatch system logs notifying operators & update schedule properties
    onSendMessage(
      `Agendamento de Follow-Up registrado: "${label}"`,
      undefined,
      undefined
    );
    
    setShowScheduler(false);
  };

  const handleSimulateAttachment = (type: 'image' | 'document') => {
    if (type === 'image') {
      onSendMessage(
        "Demonstração visual de nosso composto 100% regulamentado",
        "image",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=450&auto=format&fit=crop&q=80"
      );
    } else {
      onSendMessage(
        "Ficha técnica oficial e tabela nutricional completa em formato PDF",
        "document",
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      );
    }
  };

  const handleSimulateVoiceMessage = () => {
    if (isRecording) {
      if (recordingTimer.current) clearInterval(recordingTimer.current);
      setIsRecording(false);
      
      // Send simulated audio preview
      onSendMessage(
        "Apresentação de áudio curta explicando os benefícios do kit adaptógeno",
        "audio",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      );
    } else {
      setIsRecording(true);
      // Simulate stopping recording automatically in 10 seconds if user forgot
      recordingTimer.current = setTimeout(() => {
        setIsRecording(false);
        onSendMessage(
          "Apresentação de áudio curta explicando os benefícios do kit adaptógeno",
          "audio",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        );
      }, 10000);
    }
  };

  const handleSendCampaignMedia = (mediaItem: any) => {
    onSendMessage(
      `Disparo de Acervo Campanha: ${mediaItem.label}`,
      mediaItem.type,
      mediaItem.url
    );
    setShowMediaLibrary(false);
  };

  const handleSandboxFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxReplyText.trim()) return;
    onSimulateReply(sandboxReplyText.trim());
    setSandboxReplyText('');
  };

  const getSentimentEmoji = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return '😊 Positivo';
      case 'neutral': return '😐 Neutro';
      case 'resistant': return '😒 Resistente';
      case 'urgent': return '🚨 Crítico';
      default: return '😐 Neutro';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800" id="live-chat-viewport">
      
      {/* Upper Chat Header Area */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/20 select-none flex-wrap gap-2.5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-indigo-400 font-display text-xs uppercase relative select-none">
            {conversation.avatarSeed.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-black text-white font-display uppercase tracking-wider">{conversation.name}</h3>
              <span className="text-[9px] bg-slate-800 border border-slate-700/60 font-sans font-bold px-2 py-0.5 rounded-md text-slate-350 shrink-0">
                {getSentimentEmoji(conversation.sentiment)}
              </span>
            </div>
            <p className="text-[10px] text-slate-505 font-mono mt-0.5">
              {conversation.channel === 'whatsapp' ? 'Whatsapp' : 'Instagram DM'} &middot; {conversation.phoneOrHandle}
            </p>
          </div>
        </div>

        {/* 3. Simular resposta do lead no fluxo principal — mudado para um botão DISCRETO de proveta de testes */}
        <div className="flex items-center gap-2">
          {/* Beaker Lab icon trigger for simulation Sandbox */}
          <button
            onClick={() => setShowSandbox(!showSandbox)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              showSandbox
                ? 'bg-indigo-650/15 border-indigo-505 text-white shadow-glow'
                : 'bg-slate-950 border-slate-850 text-slate-500 hover:text-indigo-400 hover:border-slate-800'
            }`}
            title="Telemetria & Simulador de Conversa (Lab Mode)"
          >
            <HelpCircle className="h-4.5 w-4.5" />
          </button>

          {/* AI Status Toggle Switcher */}
          <button
            onClick={onToggleBotPause}
            className={`py-2 px-3.5 rounded-xl border text-2xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              conversation.botPaused
                ? 'bg-red-500/10 hover:bg-emerald-600/10 border-red-500/25 text-red-400 hover:text-emerald-400'
                : 'bg-emerald-500/10 hover:bg-red-600/10 border-emerald-500/25 text-emerald-405 hover:text-red-400'
            }`}
          >
            {conversation.botPaused ? (
              <>
                <Play className="h-3 w-3 fill-current shrink-0" />
                <span>Intervenção Humana Ativa</span>
              </>
            ) : (
              <>
                <Pause className="h-3 w-3 fill-current shrink-0" />
                <span>IA Autônoma Conectada</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* A. ContextCard (top of chat) */}
      <div className="px-4 pt-3.5">
        <ContextCard conversation={conversation} />
      </div>

      {/* Embedded Simulation Debug Sandbox Drawer */}
      {showSandbox && (
        <div className="mx-4 mt-3 p-3.5 bg-slate-950/95 border border-indigo-500/35 rounded-xl space-y-3 font-sans animate-fade-in relative shadow-glow">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-black text-indigo-400 uppercase tracking-widest font-display flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-spin-slow" />
              Simulador Comercial Ohm (Lab Telemetria)
            </span>
            <span className="text-[9px] text-slate-600 uppercase font-mono font-bold">Debug Sandbox</span>
          </div>
          
          <form onSubmit={handleSandboxFormSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Simule a fala do lead (Ex: 'Quero comprar agora', 'me dê desconto', 'estou com dúvida')..."
                value={sandboxReplyText}
                onChange={(e) => setSandboxReplyText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-2xs text-white placeholder-slate-550 focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1 bg-indigo-650 hover:bg-indigo-600 text-white text-[8.5px] font-bold uppercase py-1 px-2.5 rounded cursor-pointer transition"
              >
                Disparar Lab
              </button>
            </div>
            <p className="text-[8.5px] text-slate-500 leading-normal font-sans">
              Triggers comerciais: usar palavras como "desconto" ou "obrigado" simula reações de sentimento e transições automatizadas na IA respectiva em 1.5 segundos se ela não estiver bloqueada.
            </p>
          </form>
        </div>
      )}

      {/* Main message rendering scroll pane */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] lg:max-h-[440px] bg-slate-950/10 border-b border-slate-850/50 scrollbar-thin">
        {conversation.messages.length === 0 ? (
          <p className="text-center font-sans text-2xs text-slate-500 py-12">Nenhuma mensagem registrada.</p>
        ) : (
          conversation.messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            const isOperator = msg.sender === 'operator';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="w-full text-center py-1.5 select-none" id={`msg-sys-${msg.id}`}>
                  <div className="inline-block bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-850/70 text-[9px] text-slate-500 font-mono tracking-normal leading-relaxed max-w-[90%]">
                    ⚡ {msg.text} &middot; {msg.timestamp}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={msg.id}
                id={`msg-bubble-${msg.id}`}
                className={`flex flex-col max-w-[85%] ${
                  isBot ? 'mr-auto items-start' : 'ml-auto items-end'
                }`}
              >
                <span className="text-[8px] text-slate-550 font-mono font-bold mb-1 uppercase tracking-wide select-none flex items-center gap-1.5">
                  {isBot ? (
                    <>
                      <Shield className="h-3 w-3 text-indigo-400" />
                      Ohm AI Agent
                    </>
                  ) : isOperator ? (
                    <>
                      <User className="h-3 w-3 text-emerald-450" />
                      Humano (Você)
                    </>
                  ) : (
                    'Lead'
                  )}
                  &bull; {msg.timestamp}
                </span>

                <div className={`p-3 rounded-2xl text-xs leading-relaxed border space-y-2.5 ${
                  isBot 
                    ? 'bg-slate-855 border-slate-800 text-indigo-150 rounded-tl-none font-sans' 
                    : isOperator 
                      ? 'bg-indigo-600 border-indigo-505 text-white rounded-tr-none font-sans' 
                      : 'bg-slate-950 border-slate-850 text-slate-205 rounded-tr-none font-sans'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  {/* Attachment inline renderer */}
                  {msg.mediaType && msg.mediaUrl && (
                    <MediaPreview 
                      type={msg.mediaType} 
                      url={msg.mediaUrl} 
                      label={msg.text.includes("Ficha técnica") ? "Ficha_Técnica_Adaptógeno.pdf" : "Mídia Comercial Anexa"}
                      onLightboxOpen={onLightboxOpen}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Ready Suggestions - Quick replies panel */}
      <div className="px-4 pt-3 pb-1.5 border-t border-slate-850/65 bg-slate-950/5 flex flex-col gap-1 select-none">
        <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest pl-0.5">💡 Modelos Recomendados para {conversation.stage.toUpperCase()}:</span>
        <QuickReplies conversation={conversation} onSelectReply={handleApplyQuickReply} />
      </div>

      {/* Secondary dropdown toggles (Emoji, Scheduler, Acervo Library) */}
      {showEmojiBar && (
        <div className="mx-4 p-2 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-1.5 flex-wrap animate-fade-in select-none shadow-lg">
          {['👍', '🚀', '😊', '💡', '🔥', '💥', '📦', '👀', '🟢', '🚨', '❓', '✅', '❤️'].map(em => (
            <button 
              key={em} 
              onClick={() => handleInsertEmoji(em)}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 rounded text-xs cursor-pointer text-white font-sans font-bold"
            >
              {em}
            </button>
          ))}
        </div>
      )}

      {showScheduler && (
        <div className="mx-4 p-3 bg-slate-900 border border-indigo-500/20 rounded-xl space-y-2.5 animate-fade-in font-sans shadow-lg">
          <div className="flex justify-between items-center text-[10px] font-black text-indigo-400 uppercase tracking-widest font-display select-none">
            <span>Agendador de Follow-Up (CRM Automatizado)</span>
            <button onClick={() => setShowScheduler(false)} className="hover:text-red-400 cursor-pointer"><X className="h-3.5 w-3.5" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-2xs leading-relaxed">
            <button onClick={() => handleScheduleActionGrid('Agendado em 1 hora', 1)} className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded text-slate-300 transition shrink-0 cursor-pointer">Em 1 hora</button>
            <button onClick={() => handleScheduleActionGrid('Agendado Amanhã cedo', 16)} className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded text-slate-300 transition shrink-0 cursor-pointer">Amanhã de manhã</button>
            <button onClick={() => handleScheduleActionGrid('Oferta de incentivo extra', 48)} className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded text-slate-300 transition shrink-0 cursor-pointer">Em 2 dias</button>
            <button onClick={() => handleScheduleActionGrid('Feedback pós recepção produto', 120)} className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-indigo-550 rounded text-indigo-400 transition font-bold shrink-0 cursor-pointer">Pós 5 dias (Check)</button>
          </div>
        </div>
      )}

      {showMediaLibrary && (
        <div className="mx-4 p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5 animate-fade-in font-sans shadow-lg select-none">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
            <span>Acervo de mídias da Personalidade</span>
            <button onClick={() => setShowMediaLibrary(false)} className="hover:text-red-400 cursor-pointer"><X className="h-3.5 w-3.5" /></button>
          </div>
          {activeCampaignMedia.length === 0 ? (
            <p className="text-[10px] text-slate-550 py-1 italic font-sans text-center">Nenhum criativo cadastrado nesta campanha.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto scrollbar-thin">
              {activeCampaignMedia.map((med, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendCampaignMedia(med)}
                  className="p-2 bg-slate-905 border border-slate-850 hover:border-indigo-500 rounded-lg flex items-center justify-between gap-1.5 text-left text-2xs font-mono text-slate-300 hover:text-white transition w-full cursor-pointer"
                >
                  <span className="truncate max-w-[130px] font-bold">{med.label}</span>
                  <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-1 py-0.2 rounded font-sans font-bold shrink-0 uppercase tracking-widest">
                    {med.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Operational User Input area block */}
      <div className="p-4 bg-slate-950/25 border-t border-slate-850/65">
        
        {/* Attachment & triggers bar */}
        <div className="flex items-center gap-3.5 pb-3 border-b border-slate-850/30 mb-3 text-slate-500 text-2xs select-none">
          
          <button 
            type="button" 
            onClick={() => handleSimulateAttachment('image')}
            className="hover:text-indigo-450 cursor-pointer flex items-center gap-1 transition-colors"
            title="Simular anexo de imagem corporativa"
          >
            <ImageIcon className="h-4.5 w-4.5" />
            <span className="hidden sm:inline font-bold uppercase tracking-wide leading-none font-sans">Enviar Imagem</span>
          </button>

          <button 
            type="button" 
            onClick={() => handleSimulateAttachment('document')}
            className="hover:text-indigo-455 cursor-pointer flex items-center gap-1 transition-colors"
            title="Simular anexo de dossiê PDF"
          >
            <FileText className="h-4.5 w-4.5" />
            <span className="hidden sm:inline font-bold uppercase tracking-wide leading-none font-sans">Enviar PDF</span>
          </button>

          <button 
            type="button" 
            onClick={handleSimulateVoiceMessage}
            className={`cursor-pointer flex items-center gap-1.5 transition ${
              isRecording ? 'text-rose-500 animate-pulse font-extrabold' : 'hover:text-indigo-400'
            }`}
            title="Simular gravação de áudio em tempo real"
          >
            <Mic className="h-4.5 w-4.5" />
            <span className="uppercase font-bold tracking-wide leading-none font-sans">
              {isRecording ? 'Gravando (clique p/ enviar)...' : 'Gravar Voz'}
            </span>
          </button>

          <button 
            type="button" 
            onClick={() => setShowMediaLibrary(!showMediaLibrary)}
            className={`cursor-pointer flex items-center gap-1 transition ${
              showMediaLibrary ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'
            }`}
            title="Projetar acervo de arquivos salvos"
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span className="hidden sm:inline uppercase font-bold tracking-wide leading-none font-sans">Biblioteca</span>
          </button>

          <button 
            type="button" 
            onClick={() => setShowScheduler(!showScheduler)}
            className={`cursor-pointer flex items-center gap-1 transition-colors ${
              showScheduler ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'
            }`}
            title="Registrar timer de recall/follow-up"
          >
            <Clock className="h-4.5 w-4.5" />
            <span className="hidden sm:inline uppercase font-bold tracking-wide leading-none font-sans">Agendar</span>
          </button>
        </div>

        {/* Input box form */}
        <form onSubmit={handleSendText} className="flex gap-2 relative">
          <button
            type="button"
            onClick={() => setShowEmojiBar(!showEmojiBar)}
            className="absolute left-2.5 top-3 text-slate-500 hover:text-white transition cursor-pointer"
          >
            <Smile className="h-4.5 w-4.5" />
          </button>

          <input
            type="text"
            placeholder="Responder ao lead (IA pausará na sua digitação se desejar)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-12 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-505"
          />

          <button
            type="submit"
            className="absolute right-1.5 top-1.5 h-8 w-8 bg-indigo-600 hover:bg-indigo-550 text-white rounded-lg flex items-center justify-center cursor-pointer transition"
          >
            <Send className="h-3.5 w-3.5 fill-current ml-0.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
