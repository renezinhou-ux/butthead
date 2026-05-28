import React, { useState, useEffect } from 'react';
import { LeadConversation, Message, Campaign } from '../types';
import { ConversationList } from './ConversationList';
import { ConversationChat } from './ConversationChat';
import { ConversationPanel } from './ConversationPanel';
import { X } from 'lucide-react';

interface ConversasProps {
  conversations: LeadConversation[];
  campaigns: Campaign[];
  activeConversationId: string | null;
  onSelectConversation: (id: string | null) => void;
  onUpdateConversation: (conversa: LeadConversation) => void;
  onRemoveConversationAlert: (conversaId: string) => void;
  campaignFilterId: string | null;
  onClearCampaignFilter?: () => void;
}

export function Conversas({
  conversations,
  campaigns,
  activeConversationId,
  onSelectConversation,
  onUpdateConversation,
  onRemoveConversationAlert,
  campaignFilterId,
  onClearCampaignFilter
}: ConversasProps) {
  const [activeSection, setActiveSection] = useState<'sales' | 'retention'>('sales');
  const [filterStage, setFilterStage] = useState('all');
  const [filterChannel, setFilterChannel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Sync section with active conversation stage upon mount or change
  const selectedChat = conversations.find(c => c.id === activeConversationId) || null;

  useEffect(() => {
    if (selectedChat) {
      const salesStages = ['frio', 'engajado', 'negociando', 'convertido'];
      if (salesStages.includes(selectedChat.stage)) {
        setActiveSection('sales');
      } else {
        setActiveSection('retention');
      }
      // Remove alert indicator since operator is in active view
      onRemoveConversationAlert(selectedChat.id);
    }
  }, [activeConversationId]);

  // Handle operator sending a message manually
  const handleSendMessage = (text: string, mediaType?: 'audio' | 'image' | 'video' | 'document', mediaUrl?: string) => {
    if (!selectedChat) return;

    const opMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'operator',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      mediaType,
      mediaUrl
    };

    const updatedMessages = [...selectedChat.messages, opMsg];
    const updatedChat: LeadConversation = {
      ...selectedChat,
      messages: updatedMessages,
      lastMessage: text,
      lastMessageTime: opMsg.timestamp,
      unreadCount: 0
    };

    onUpdateConversation(updatedChat);

    // If the bot is active (NOT paused), trigger an automated system response after 1.5s
    if (!selectedChat.botPaused) {
      setTimeout(() => {
        const sysLog: Message = {
          id: `msg-${Date.now() + 1}`,
          sender: 'system',
          text: 'Butthead avaliou o envio humano. Sequência autônoma temporariamente em espera (aguardando retorno espontâneo do lead).',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        
        // Fetch up-to-date conversation state
        const currentChat = conversations.find(c => c.id === selectedChat.id);
        if (currentChat) {
          onUpdateConversation({
            ...currentChat,
            messages: [...currentChat.messages, sysLog]
          });
        }
      }, 1500);
    }
  };

  // Handle simulation of a lead replying (Ohm Simulator Actions)
  const handleSimulateReply = (text: string) => {
    if (!selectedChat) return;

    const leadMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'lead',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...selectedChat.messages, leadMsg];
    let nextStage = selectedChat.stage;
    let nextAction = selectedChat.nextBotAction;
    let sentiment: 'positive' | 'neutral' | 'resistant' | 'urgent' = selectedChat.sentiment || 'neutral';
    let urgency: 'urgent' | 'attention' | 'normal' | 'auto' = selectedChat.urgency || 'normal';

    const t = text.toLowerCase();

    // Contextual evaluation simulation triggers
    if (t.includes('quero comprar') || t.includes('comprar') || t.includes('checkout') || t.includes('link')) {
      nextStage = 'negociando';
      nextAction = 'Enviar Pix com Desconto Adicional';
      sentiment = 'positive';
      urgency = 'attention';
    } else if (t.includes('desconto') || t.includes('cupom') || t.includes('caro')) {
      nextStage = 'negociando';
      nextAction = 'Disparar Contorno com Tom Negociador';
      sentiment = 'resistant';
      urgency = 'attention';
    } else if (t.includes('atrasou') || t.includes('reclamacao') || t.includes('falhou')) {
      nextStage = 'suporte';
      nextAction = 'Acionar Alerta Humano Geral (Escalação)';
      sentiment = 'urgent';
      urgency = 'urgent';
    } else if (t.includes('obrigado') || t.includes('perfeito') || t.includes('valeu')) {
      sentiment = 'positive';
    }

    const updatedChat: LeadConversation = {
      ...selectedChat,
      stage: nextStage,
      sentiment,
      urgency,
      nextBotAction: nextAction,
      messages: updatedMessages,
      lastMessage: text,
      lastMessageTime: leadMsg.timestamp,
      unreadCount: (selectedChat.unreadCount || 0) + 1
    };

    onUpdateConversation(updatedChat);

    // If bot isn't paused, trigger automated AI core decision flow
    if (!selectedChat.botPaused) {
      setTimeout(() => {
        const decisionLog: Message = {
          id: `msg-${Date.now() + 1}`,
          sender: 'system',
          text: `Butthead-IA analisou a resposta do lead. Classificação de humor: ${sentiment.toUpperCase()} & Prioridade comercial: ${urgency.toUpperCase()}.`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        const aiResponseText = t.includes('desconto')
          ? "Entendi perfeitamente sua preocupação! Consigo sim liberar um cupom exclusivo de 10% OFF com Frete Grátis se fecharmos agora."
          : t.includes('comprar')
            ? "Excelente escolha! Estou gerando seu link de pagamento seguro via checkout Ohm Slim Pro. Só um minutinho..."
            : "Muito obrigado pelo retorno! Nossa equipe de expedição está avaliando tudo. Tem algo a mais que eu possa te ajudar?";

        const aiMsg: Message = {
          id: `msg-${Date.now() + 2}`,
          sender: 'bot',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        // Fetch up-to-date state again before dispatching response
        const liveChat = conversations.find(c => c.id === selectedChat.id);
        if (liveChat) {
          onUpdateConversation({
            ...liveChat,
            unreadCount: 0, // AI answered, clears unread state
            messages: [...liveChat.messages, decisionLog, aiMsg],
            lastMessage: aiResponseText,
            lastMessageTime: aiMsg.timestamp
          });
        }
      }, 1500);
    }
  };

  const handleToggleBotPause = () => {
    if (!selectedChat) return;
    const updated: LeadConversation = {
      ...selectedChat,
      botPaused: !selectedChat.botPaused
    };
    onUpdateConversation(updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-[580px] lg:h-[660px] shadow-glow-premium relative font-sans" id="conversas-gerencial-workspace">
      
      {/* LEFT COLUMN: Sidebar list of conversations (4 cols) */}
      <div className="lg:col-span-4 h-full">
        <ConversationList
          conversations={conversations}
          selectedChatId={activeConversationId}
          onSelectConversation={onSelectConversation}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          filterStage={filterStage}
          setFilterStage={setFilterStage}
          filterChannel={filterChannel}
          setFilterChannel={setFilterChannel}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          campaignFilterId={campaignFilterId}
          onClearCampaignFilter={onClearCampaignFilter}
        />
      </div>

      {/* MID COLUMN: Chat Messages Arena (5 cols) */}
      <div className="lg:col-span-5 h-full">
        {selectedChat ? (
          <ConversationChat
            conversation={selectedChat}
            campaigns={campaigns}
            onSendMessage={handleSendMessage}
            onToggleBotPause={handleToggleBotPause}
            onSimulateReply={handleSimulateReply}
            onLightboxOpen={setLightboxImage}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-950/10">
            <span className="h-2 w-2 rounded-full bg-indigo-505 animate-ping-slow mb-4"></span>
            <p className="text-slate-550 text-xs font-medium font-sans max-w-xs">
              Selecione uma conversa ativa do painel de guerra para monitorar ou intervir.
            </p>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Dossier context tags panel (3 cols) */}
      <div className="lg:col-span-3 border-l border-slate-800 h-full bg-slate-900">
        {selectedChat ? (
          <ConversationPanel
            conversation={selectedChat}
            campaigns={campaigns}
            onUpdateConversation={onUpdateConversation}
          />
        ) : (
          <div className="h-full flex items-center justify-center p-6 text-2xs uppercase tracking-widest font-black text-slate-600 font-display select-none">
            Análise Operacional Ohm
          </div>
        )}
      </div>

      {/* Expanded Click Image Lightbox Modal Overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 cursor-default animate-fade-in"
          onClick={() => setLightboxImage(null)}
          id="lightbox-backdrop"
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2.5 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Asset ampliado" 
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-slate-800"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()} // Stop propagation from closing when clicking image itself
          />
        </div>
      )}

    </div>
  );
}
