import React from 'react';
import { LeadConversation } from '../types';

interface QuickRepliesProps {
  conversation: LeadConversation;
  onSelectReply: (replyText: string) => void;
}

export function QuickReplies({ conversation, onSelectReply }: QuickRepliesProps) {
  const getQuickRepliesForStage = (chat: LeadConversation) => {
    const name = chat.name.split(' ')[0];
    const targetTag = chat.searchTag || 'bem-estar';

    switch (chat.stage) {
      case 'frio':
      case 'engajado':
        return [
          `Oi ${name}! Vi que você atua com seu foco voltado a ${targetTag}. Posso te apresentar nosso blend adaptógeno?`,
          "Temos uma janela de experimentação válida apenas para fechar essa semana!",
          "Gostaria de receber uma demonstração prática em áudio curto?"
        ];
      case 'negociando':
        return [
          `Consigo liberar 10% OFF cumulativo no cartão e frete grátis nacional para fechar seu Kit hoje, ${name}!`,
          "O Ohm Slim Pro ajuda exatamente no metabolismo diário sem criar tremedeira de cafeína tradicional.",
          "Deseja que eu envie o link de checkout PJ com boleto?",
          "Assisti seu insta e acho que o combo Slim é perfeito para sua rotina esportiva."
        ];
      case 'suporte':
        return [
          `Desculpe a demora, ${name}! Vou consultar nossa planilha logística agora e te envio o código Melhor Envio em 5 minutinhos.`,
          "Estou encaminhando nossa conversa diretamente para o setor de expedição revisar seu pedido.",
          "Quer que eu libere um cupom de desconto em forma de desculpas pelo contratempo?"
        ];
      case 'onboarding':
        return [
          `Olá ${name}! Seja super bem-vinda ao onboarding! Você conseguiu configurar seu guia alimentar oficial?`,
          "Aqui estão as orientações de primeiro preparo matinal para otimizar os picos de foco.",
          "Você concluiu a segunda etapa do roteiro? Se precisar de ajuda me avise."
        ];
      case 'ativo':
      case 'churn_risk':
      default:
        return [
          `Olá ${name}! Lucas passando para perguntar: como tem se sentido ao longo desses últimos períodos úteis?`,
          "Renovando seu combo esta semana conseguimos o desconto de fidelidade exclusivo nível prata!",
          "Temos uma tabela comparativa com outras soluções para te mostrar a pureza de nossos compostos fitoterápicos."
        ];
    }
  };

  const replies = getQuickRepliesForStage(conversation);

  return (
    <div className="flex flex-wrap gap-1.5 py-1.5 max-h-24 overflow-y-auto" id="quick-replies-panel">
      {replies.map((reply, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectReply(reply)}
          className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-full border border-slate-800 cursor-pointer transition-all truncate max-w-[200px] font-sans font-medium"
          title={reply}
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
