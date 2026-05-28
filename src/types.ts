export interface Campaign {
  id: string;
  name: string;
  personality: string;
  photoUrl: string;
  productName: string;
  instagramAccount?: string;
  whatsappNumbers: string[]; // phone numbers references
  channels: ('whatsapp' | 'instagram')[];
  status: 'active' | 'paused';
  leadsQueue: number;
  leadsContacted: number;
  leadsResponded: number;
  leadsConverted: number;

  // New fields
  ticketValue?: number; // Value per conversion
  ohmCampaignId?: string; // Ohm marketing campaign bind
  maxDiscount?: number; // Max allowed discount
  benefits?: string[]; // Allowed sales perks
  discountRule?: string; // Discount rule instructions
  campaignMedia?: { type: 'audio' | 'image' | 'video' | 'document'; label: string; url: string; }[]; // Uploaded media library for the campaign
}

export interface NumberPool {
  id: string;
  number: string;
  campaignId: string;
  campaignName: string;
  status: 'active' | 'standby' | 'caído' | 'banido';
  dailyLimit: number;
  sentToday: number;
}

export interface Message {
  id: string;
  sender: 'bot' | 'lead' | 'operator' | 'system'; // 'system' added for decision logs
  text: string;
  timestamp: string;
  mediaType?: 'audio' | 'image' | 'video' | 'document';
  mediaUrl?: string;
}

export interface LeadConversation {
  id: string;
  name: string;
  phoneOrHandle: string;
  campaignId: string;
  campaignName: string;
  channel: 'whatsapp' | 'instagram';
  stage: 'frio' | 'engajado' | 'negociando' | 'convertido' | 'onboarding' | 'ativo' | 'suporte' | 'churn_risk'; // onboarding/ativo/suporte/churn_risk added
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
  botPaused: boolean;
  nextBotAction: string;
  avatarSeed: string;
  notes?: string;

  // New fields
  nextActionTime?: string; // Follow-up timer as string (e.g., '10:00' or '19:00' or datetime)
  sentiment?: 'positive' | 'neutral' | 'resistant' | 'urgent'; // Lead sentiment indicator
  avgResponseTime?: string; // Average response time
  onboardingSteps?: { name: string; completed: boolean }[]; // Onboarding progress list
  events?: { app: string; event: string; date: string }[]; // Integrations logs (Ohm)
  manualTags?: string[]; // Manually inputted labels
  purchases?: { product: string; date: string; value: number }[]; // Previous purchases
  urgency?: 'urgent' | 'attention' | 'normal' | 'auto'; // Escalation urgency status

  // Ohm Dados enriched context
  ohmScore?: number;           // Score de compatibilidade 0-100
  ohmOfferTags?: {
    offer: string;
    score: number;
    channel: string;
    tone: string;
    time: string;
  }[];
  searchTag?: string;           // Tag de pesquisa original
  instagramFollowers?: number;
  instagramEngagement?: number;
  instagramBio?: string;
  instagramAccountType?: string;
  mapsRating?: number;
  mapsReviews?: number;
  cnpjStatus?: string;
  cnpjPorte?: string;
  cnpjAtividade?: string;
  recommendedChannel?: string;
  recommendedTone?: string;
  idealTime?: string;
  lastSeen?: string;
  unreadCount?: number;
}

export interface KnowledgeDoc {
  id: string;
  name: string;
  type: string;
  status: 'processing' | 'indexed' | 'error';
  chunks: number;
  contentPreview: string;
  createdAt: string;
}

export interface AlertNotification {
  id: string;
  conversaId: string;
  leadName: string;
  campaignName: string;
  messagePreview: string;
  timestamp: string;
  read: boolean;
}
