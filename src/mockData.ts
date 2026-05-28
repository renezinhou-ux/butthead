import { Campaign, NumberPool, LeadConversation, KnowledgeDoc, AlertNotification } from './types';

export interface AppState {
  campaigns: Campaign[];
  numbers: NumberPool[];
  conversations: LeadConversation[];
  docs: KnowledgeDoc[];
  alerts: AlertNotification[];
}

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Campanha Maya Slim',
    personality: 'Maya (Especialista em bem-estar e influencer)',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    productName: 'Ohm Slim Pro',
    instagramAccount: 'maya.ohm.wellness',
    whatsappNumbers: ['num-2', 'num-5'],
    channels: ['whatsapp', 'instagram'],
    status: 'active',
    leadsQueue: 14,
    leadsContacted: 184,
    leadsResponded: 128,
    leadsConverted: 32,
    ticketValue: 149,
    ohmCampaignId: 'NichoChat Jan 2026',
    maxDiscount: 15,
    benefits: ['Bônus exclusivo', 'Mês grátis'],
    discountRule: 'Após 3 dias sem resposta do lead, oferecer 10% de desconto adicional.',
    campaignMedia: [
      { type: 'audio', label: 'Áudio Apresentação Maya', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { type: 'audio', label: 'Contorno de Preço Slim', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { type: 'image', label: 'Flyer Promo 3 Potes', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
      { type: 'image', label: 'Tabela Nutricional Slim', url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&auto=format&fit=crop&q=80' },
      { type: 'video', label: 'Depoimento 30 dias Antes/Depois', url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1240-large.mp4' }
    ]
  },
  {
    id: 'camp-2',
    name: 'Campanha Lucas Dev-Core',
    personality: 'Lucas (Consultor Tech e ex-Dev)',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    productName: 'Ohm Dev Core',
    instagramAccount: 'lucas.tech.performance',
    whatsappNumbers: ['num-1', 'num-4'],
    channels: ['whatsapp', 'instagram'],
    status: 'active',
    leadsQueue: 38,
    leadsContacted: 524,
    leadsResponded: 247,
    leadsConverted: 68,
    ticketValue: 199,
    ohmCampaignId: 'Consórcio Empresário',
    maxDiscount: 20,
    benefits: ['Bônus exclusivo', 'Frete grátis'],
    discountRule: 'Na terceira interação, se o lead demonstrar objeção de preço, liberar cupom FRETEPLUS.',
    campaignMedia: [
      { type: 'audio', label: 'Áudio Pitch Científico Lucas', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
      { type: 'image', label: 'Infográfico L-Teanina', url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400&auto=format&fit=crop&q=80' },
      { type: 'video', label: 'Demo Foco Prolongado', url: 'https://assets.mixkit.co/videos/preview/mixkit-taking-photos-on-a-gorgeous-beach-40150-large.mp4' }
    ]
  },
  {
    id: 'camp-3',
    name: 'Campanha Clara Balance',
    personality: 'Clara (Mentora de Produtividade)',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    productName: 'Ohm Life Balance',
    instagramAccount: 'clara.focus.balance',
    whatsappNumbers: ['num-3'],
    channels: ['whatsapp'],
    status: 'paused',
    leadsQueue: 0,
    leadsContacted: 85,
    leadsResponded: 45,
    leadsConverted: 12,
    ticketValue: 120,
    ohmCampaignId: 'BarberChat SP',
    maxDiscount: 10,
    benefits: ['Mês grátis'],
    discountRule: 'Oferecer 10% apenas se houver menção direta sobre cansaço extremo.',
    campaignMedia: [
      { type: 'audio', label: 'Boas-vindas Clara Meditação', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
    ]
  }
];

export const INITIAL_NUMBERS: NumberPool[] = [
  {
    id: 'num-1',
    number: '+55 (11) 98765-4321',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    status: 'active',
    dailyLimit: 250,
    sentToday: 184,
  },
  {
    id: 'num-2',
    number: '+55 (21) 91234-5678',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    status: 'active',
    dailyLimit: 150,
    sentToday: 98,
  },
  {
    id: 'num-3',
    number: '+55 (11) 99999-8888',
    campaignId: 'camp-3',
    campaignName: 'Campanha Clara Balance',
    status: 'standby',
    dailyLimit: 200,
    sentToday: 0,
  },
  {
    id: 'num-4',
    number: '+55 (31) 97777-6666',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    status: 'caído',
    dailyLimit: 250,
    sentToday: 123,
  },
  {
    id: 'num-5',
    number: '+55 (81) 94444-3333',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    status: 'banido',
    dailyLimit: 100,
    sentToday: 12,
  }
];

export const INITIAL_CONVERSATIONS: LeadConversation[] = [
  {
    id: 'conv-1',
    name: 'Thiago Silva',
    phoneOrHandle: '+55 (11) 96123-4567',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    channel: 'whatsapp',
    stage: 'engajado',
    lastMessage: 'Pô, isso me interessa bastante. Qual o preço final com esse desconto?',
    lastMessageTime: '19:42',
    avatarSeed: 'Thiago',
    botPaused: false,
    nextBotAction: 'Apresentar preço promocional de R$ 149 com link checkout Ohm Slim.',
    nextActionTime: '2026-05-27T23:55:00Z',
    avgResponseTime: '5min',
    sentiment: 'positive',
    urgency: 'attention',
    manualTags: ['Programador', 'Foco da Tarde'],
    notes: 'Programador front-end, sofre com sono e perda de produtividade após o almoço.',
    unreadCount: 3,
    lastSeen: 'online',
    // Ohm Context definitions
    ohmScore: 94,
    searchTag: '#reactdeveloper',
    instagramFollowers: 1240,
    instagramEngagement: 4.8,
    instagramBio: 'Software Eng | Coffee & Focus Hack. SP-Brazil.',
    instagramAccountType: 'creator',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'educativo',
    idealTime: '14:00 - 18:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MICRO',
    cnpjAtividade: 'Desenvolvimento de software sob encomenda',
    ohmOfferTags: [
      { offer: 'Dev Core Premium', score: 94, channel: 'WhatsApp', tone: 'direto', time: '14:00' },
      { offer: 'Suplemento Concentração', score: 88, channel: 'Instagram DM', tone: 'educativo', time: '16:00' }
    ],
    events: [
      { app: 'Ohm Store', event: 'trial_iniciado', date: '25/05/2026' },
      { app: 'Ohm Analytics', event: 'clicou_link_bio', date: '25/05/2026' }
    ],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Olá Thiago! Vi que você trabalha com desenvolvimento front-end e se interessou pelo Ohm Dev Core. Como estão seus níveis de energia durante o código da tarde?', timestamp: '19:30' },
      { id: '2', sender: 'lead', text: 'Cara, depois do almoço me dá um sono absurdo. Eu tomo uns 3 cafés mas não resolve muito, me dá tremedeira e o cansaço volta em dobro.', timestamp: '19:34' },
      { id: 'sys-1', sender: 'system', text: 'Bot decidiu focar no argumento de crash da cafeína e L-Teanina.', timestamp: '19:35' },
      { id: '3', sender: 'bot', text: 'Entendo perfeitamente, o crash do café é real! O Ohm Dev Core usa liberação prolongada de cafeína combinada com L-teanina, te dando foco limpo por 6 horas sem tremedeira ou ansiedade. Quer que eu te envie o link com 20% de desconto para testar?', timestamp: '19:38' },
      { id: '4', sender: 'lead', text: 'Pô, isso me interessa bastante. Qual o preço final com esse desconto?', timestamp: '19:42' },
      { id: 'sys-2', sender: 'system', text: 'Bot programou envio do checkout com desconto para as 19:45.', timestamp: '19:43' }
    ]
  },
  {
    id: 'conv-2',
    name: 'Mariana Ramos',
    phoneOrHandle: 'mari.ramos.wellness',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'instagram',
    stage: 'negociando',
    lastMessage: 'Mas me diz uma coisa, tem alguma contraindicação para quem tem problema cardíaco leve?',
    lastMessageTime: '18:15',
    avatarSeed: 'Mariana',
    botPaused: true,
    nextBotAction: 'Requer intervenção - Revisar dúvida do lead sobre saúde.',
    nextActionTime: '2026-05-28T09:30:00Z',
    avgResponseTime: '12min',
    sentiment: 'urgent',
    urgency: 'urgent',
    manualTags: ['Intervenção Manual', 'Dúvida Médica'],
    notes: 'Treina musculação há 2 anos, queixou-se de batedeira com termogênicos normais.',
    unreadCount: 1,
    lastSeen: 'há 5 minutos',
    ohmScore: 89,
    searchTag: '#wellnesssp',
    instagramFollowers: 15400,
    instagramEngagement: 5.2,
    instagramBio: 'Healthy lifestyle, yoga, mental health & biohacking 🌱',
    instagramAccountType: 'influencer',
    recommendedChannel: 'Instagram DM',
    recommendedTone: 'urgência',
    idealTime: '08:00 - 11:00',
    cnpjStatus: 'S/N',
    cnpjPorte: 'PESSOA FÍSICA',
    cnpjAtividade: 'Estudante / Influenciadora',
    ohmOfferTags: [
      { offer: 'Slim Pro Trial', score: 89, channel: 'Instagram DM', tone: 'urgência', time: '10:00' }
    ],
    events: [
      { app: 'Ohm Analytics', event: 'visita_pagina_produto', date: '27/05/2026' }
    ],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Oi Mariana! Que bom ter você por aqui no insta. O Ohm Slim Pro ajuda muito a acelerar o metabolismo de forma natural e sem agitação. Você já testou algum emagrecedor?', timestamp: '18:00' },
      { id: '2', sender: 'lead', text: 'Já tomei termogênicos de marcas normais, mas me dava muita batedeira na academia, aí acabei pegando trauma e parei.', timestamp: '18:05' },
      { id: 'sys-1', sender: 'system', text: 'Bot aplicou gatilho de diferenciação (ingredientes naturais vs sintéticos).', timestamp: '18:07' },
      { id: '3', sender: 'bot', text: 'Sim, compreendo super! Muitos termogênicos enchem de estimulantes sintéticos baratos. O Ohm Slim Pro usa picolinato de cromo, chá verde purificado e ativos naturais e suaves que dão energia limpa.', timestamp: '18:10' },
      { id: '4', sender: 'lead', text: 'Mas me diz uma coisa, tem alguma contraindicação para quem tem problema cardíaco leve?', timestamp: '18:15' },
      { id: 'sys-2', sender: 'system', text: 'Bot pausado automaticamente. Dúvida médica exige validação do operador humano.', timestamp: '18:16' }
    ]
  },
  {
    id: 'conv-3',
    name: 'Bruno Alencar',
    phoneOrHandle: '+55 (21) 95432-1098',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'whatsapp',
    stage: 'frio',
    lastMessage: 'Oi. Só de curiosidade mesmo.',
    lastMessageTime: 'Ontem',
    avatarSeed: 'Bruno',
    botPaused: false,
    nextBotAction: 'Enviar depoimento de antes/depois de clientes reais em 12 horas.',
    nextActionTime: '2026-05-28T14:30:00Z',
    avgResponseTime: '2h',
    sentiment: 'resistant',
    urgency: 'normal',
    manualTags: ['Frio', 'Curioso'],
    notes: 'Lead frio, clicou no link mas respondeu de forma monossilábica.',
    unreadCount: 0,
    lastSeen: 'há 2 dias',
    ohmScore: 61,
    searchTag: 'nail salon SP',
    instagramFollowers: 150,
    instagramEngagement: 1.1,
    instagramBio: 'Live the life you choose.',
    instagramAccountType: 'personal',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'prova_social',
    idealTime: '18:00 - 21:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MICRO',
    cnpjAtividade: 'Cabeleireiros e outras atividades de tratamento de beleza',
    ohmOfferTags: [
      { offer: 'Slim Pro Standard', score: 61, channel: 'WhatsApp', tone: 'prova_social', time: '19:00' }
    ],
    events: [
      { app: 'Ohm Store', event: 'trial_iniciado', date: '26/05/2026' }
    ],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Oi Bruno! Maya aqui. Tudo bem? Vi que você curtiu minha indicação do Ohm Slim. Está querendo dar um up no shape ou busca mais foco no dia a dia?', timestamp: 'Ontem 14:02' },
      { id: '2', sender: 'lead', text: 'Oi. Só de curiosidade mesmo.', timestamp: 'Ontem 14:15' },
      { id: 'sys-1', sender: 'system', text: 'Bot decidiu dar espaço e agendar follow-up passivo com prova social.', timestamp: 'Ontem 14:16' }
    ]
  },
  {
    id: 'conv-4',
    name: 'Camila Rocha',
    phoneOrHandle: '+55 (11) 93333-2222',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'whatsapp',
    stage: 'onboarding',
    lastMessage: 'Obrigada, ansiosa pra testar!',
    lastMessageTime: 'Terça',
    avatarSeed: 'Camila',
    botPaused: false,
    nextBotAction: 'Verificar status da configuração se pendente amanhã.',
    nextActionTime: '2026-05-28T10:00:00Z',
    avgResponseTime: '4min',
    sentiment: 'positive',
    urgency: 'auto',
    manualTags: ['VIP', 'Entusiasta'],
    notes: 'Comprou o Kit de 3 Potes. Super engajada.',
    unreadCount: 0,
    lastSeen: 'há 10 minutos',
    ohmScore: 98,
    searchTag: '#mamaefit',
    instagramFollowers: 4500,
    instagramEngagement: 6.8,
    instagramBio: 'Mãe de 2 | Fitness & Nutrição Familiar. Corridas de rua 🏃‍♀️',
    instagramAccountType: 'creator',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'educativo',
    idealTime: '06:00 - 09:00',
    cnpjStatus: 'S/N',
    cnpjPorte: 'PESSOA FÍSICA',
    cnpjAtividade: 'Funcional / Corrida',
    ohmOfferTags: [
      { offer: 'Slim Pro Kit 3', score: 98, channel: 'WhatsApp', tone: 'prova_social', time: '08:00' }
    ],
    onboardingSteps: [
      { name: 'Boas-vindas', completed: true },
      { name: 'Configurar conta', completed: false },
      { name: 'Primeiro uso', completed: false }
    ],
    events: [
      { app: 'Ohm Checkout', event: 'pagamento_aprovado', date: '26/05/2026' },
      { app: 'Ohm Store', event: 'trial_iniciado', date: '26/05/2026' }
    ],
    purchases: [
      { product: 'Ohm Slim Pro (Kit 3 Potes)', date: '26/05/2026', value: 349.00 }
    ],
    messages: [
      { id: '1', sender: 'bot', text: 'Maya aqui! O cupom de frete grátis expira em 2 horas, Camila. Conseguiu garantir o seu?', timestamp: 'Terça 10:00' },
      { id: '2', sender: 'lead', text: 'Comprei agorinha! Deu certo o cupom. Valeu dms!', timestamp: 'Terça 10:04' },
      { id: 'sys-1', sender: 'system', text: 'Bot registrou venda convertida no sistema Ohm (Código ohm-f921).', timestamp: 'Terça 10:05' },
      { id: '3', sender: 'bot', text: 'Uhuuul! Maravilhosa! Seja super bem-vinda ao Time Ohm! Em breve chega no seu e-mail o código de rastreamento do envio. Se precisar de qualquer coisa, me chama!', timestamp: 'Terça 10:06' },
      { id: '4', sender: 'lead', text: 'Obrigada, ansiosa pra testar!', timestamp: 'Terça 10:10' }
    ]
  },
  {
    id: 'conv-5',
    name: 'Felipe Menezes',
    phoneOrHandle: '+55 (15) 99112-2334',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    channel: 'whatsapp',
    stage: 'negociando',
    lastMessage: 'Acho que vou querer o combo de focalização, mas vocês dividem em quantas vezes no cartão?',
    lastMessageTime: '15:20',
    avatarSeed: 'Felipe',
    botPaused: false,
    nextBotAction: 'Informar parcelamento de até 12x sem juros.',
    nextActionTime: '2026-05-27T23:40:00Z',
    avgResponseTime: '8min',
    sentiment: 'positive',
    urgency: 'auto',
    manualTags: ['Interesse Combo', 'Cartão'],
    notes: 'Designer de Jogos, estuda à noite, quer foco para modelagem 3D.',
    unreadCount: 0,
    lastSeen: 'online',
    ohmScore: 91,
    searchTag: '#indiedev',
    instagramFollowers: 1390,
    instagramEngagement: 3.5,
    instagramBio: 'Game Dev & pixel art modeler 🎮 Unity / Blender expert.',
    instagramAccountType: 'creator',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'direto',
    idealTime: '10:00 - 13:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MEI',
    cnpjAtividade: 'Serviços de tratamento de dados e desenvolvimento de jogos',
    ohmOfferTags: [
      { offer: 'Dev Core Combo Anual', score: 91, channel: 'WhatsApp', tone: 'direto', time: '11:00' }
    ],
    events: [
      { app: 'Ohm Store', event: 'trial_iniciado', date: '27/05/2026' }
    ],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Salve Felipe! Como estão os estudos de renderização? O foco está em dia ou a mente está flutuando depois de 1 hora?', timestamp: '15:00' },
      { id: '2', sender: 'lead', text: 'Nossa cara, cansa demais. Fico na tela e me perco, acabo abrindo o youtube à toa.', timestamp: '15:05' },
      { id: 'sys-1', sender: 'system', text: 'Bot detectou dores de foco em modelagem e indicou Ohm Dev Core.', timestamp: '15:07' },
      { id: '3', sender: 'bot', text: 'Sim! É o déficit de modulação de acetilcolina. O Ohm Dev Core melhora a atenção seletiva justamente pra te prender na tarefa útil. Temos combos trimestrais com desconto progressivo.', timestamp: '15:12' },
      { id: '4', sender: 'lead', text: 'Acho que vou querer o combo de focalização, mas vocês dividem em quantas vezes no cartão?', timestamp: '15:20' }
    ]
  },
  {
    id: 'conv-6',
    name: 'Gustavo Mendes',
    phoneOrHandle: '+55 (19) 97711-2299',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    channel: 'whatsapp',
    stage: 'suporte',
    lastMessage: 'Oi, o produto é sensacional, mas o meu rastreio dos correios tá parado desde sexta... pode olhar?',
    lastMessageTime: '17:10',
    avatarSeed: 'Gustavo',
    botPaused: true,
    nextBotAction: 'Dar intervenção de suporte humano e fornecer link de rastreador.',
    nextActionTime: '2026-05-27T23:50:00Z',
    avgResponseTime: '6min',
    sentiment: 'neutral',
    urgency: 'attention',
    manualTags: ['Suporte', 'Atraso Entrega'],
    notes: 'Cliente comprou Combo Dev Master em 15/05. Gosta muito da energia do produto.',
    unreadCount: 2,
    lastSeen: 'online',
    ohmScore: 92,
    searchTag: '#codingbrasil',
    instagramFollowers: 320,
    instagramEngagement: 2.1,
    instagramBio: 'Tech student at USP. Keyboard collector.',
    instagramAccountType: 'personal',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'direto',
    idealTime: '15:00 - 19:00',
    cnpjStatus: 'S/N',
    cnpjPorte: 'PESSOA FÍSICA',
    cnpjAtividade: 'Estudante',
    ohmOfferTags: [
      { offer: 'Suplemento Master Combo', score: 92, channel: 'WhatsApp', tone: 'direto', time: '17:00' }
    ],
    onboardingSteps: [
      { name: 'Boas-vindas', completed: true },
      { name: 'Configurar conta', completed: true },
      { name: 'Primeiro uso', completed: true }
    ],
    events: [
      { app: 'Ohm Checkout', event: 'pagamento_aprovado', date: '15/05/2026' },
      { app: 'MelhorEnvio', event: 'objeto_postado', date: '16/05/2026' }
    ],
    purchases: [
      { product: 'Ohm Dev Core (Combo Master)', date: '15/05/2026', value: 299.00 }
    ],
    messages: [
      { id: '1', sender: 'bot', text: 'E aí Gustavo! Lucas na voz. Como estão rendendo os períodos de desenvolvimento essa semana com o Ohm Dev?', timestamp: '17:00' },
      { id: '2', sender: 'lead', text: 'Oi, o produto é sensacional, mas o meu rastreio dos correios tá parado desde sexta... pode olhar?', timestamp: '17:10' },
      { id: 'sys-1', sender: 'system', text: 'Bot encaminhou para fila de suporte humano devido à pergunta logística.', timestamp: '17:11' }
    ]
  },
  {
    id: 'conv-7',
    name: 'Paula Venturi',
    phoneOrHandle: 'paula.fitchef',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'instagram',
    stage: 'negociando',
    lastMessage: 'Vê pra mim se consegue passar o link com frete grátis que eu fecho agora.',
    lastMessageTime: '11:12',
    avatarSeed: 'Paula',
    botPaused: false,
    nextBotAction: 'Enviar checkout com cupom de Frete Grátis autorizado.',
    nextActionTime: '2026-05-28T10:00:00Z',
    avgResponseTime: '15s',
    sentiment: 'positive',
    urgency: 'attention',
    manualTags: ['Negociando', 'Frete Grátis'],
    notes: 'Fit Chef de SP. Pediu link adaptado.',
    unreadCount: 4,
    lastSeen: 'online',
    ohmScore: 95,
    searchTag: '#fitchefs',
    instagramFollowers: 8210,
    instagramEngagement: 5.6,
    instagramBio: 'Receitas lowcarb diárias • Parcerias inbox 💌 SP.',
    instagramAccountType: 'creator',
    recommendedChannel: 'Instagram DM',
    recommendedTone: 'direto',
    idealTime: '09:00 - 12:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MEIP',
    cnpjAtividade: 'Fabricação de alimentos prontos cong. e fit',
    ohmOfferTags: [
      { offer: 'Slim Pro Trial Premium', score: 95, channel: 'Instagram DM', tone: 'prova_social', time: '10:00' }
    ],
    events: [
      { app: 'Ohm Analytics', event: 'clicou_link_bio', date: '27/05/2026' }
    ],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Oi Paula! Super bem-vinda ao canal do Slim Pro. Seus pratos fitness são maravilhosos! Quer acelerar suas queimas diárias com foco natural?', timestamp: '10:55' },
      { id: '2', sender: 'lead', text: 'Nossa, adoraria! Meus dias na cozinha dão um cansaço absurdo. Vocês têm alguma promoção?', timestamp: '11:00' },
      { id: '3', sender: 'bot', text: 'Com certeza! Tenho o cupom FIT15 com 15% de desconto.', timestamp: '11:05' },
      { id: '4', sender: 'lead', text: 'Vê pra mim se consegue passar o link com frete grátis que eu fecho agora.', timestamp: '11:12' }
    ]
  },
  {
    id: 'conv-8',
    name: 'Rodrigo Antunes',
    phoneOrHandle: '+55 (41) 98877-6655',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    channel: 'whatsapp',
    stage: 'convertido',
    lastMessage: 'Nota fiscal recebida. Ansioso para receber o pack!',
    lastMessageTime: 'Ontem',
    avatarSeed: 'Rodrigo',
    botPaused: false,
    nextBotAction: 'Aguardar despacho da transportadora.',
    nextActionTime: undefined,
    avgResponseTime: '3min',
    sentiment: 'positive',
    urgency: 'normal',
    manualTags: ['Venda Aprovada', 'Dev Master'],
    notes: 'Comprador corporativo de 5 packs para seu time de desenvolvimento.',
    unreadCount: 0,
    lastSeen: 'há 1 dia',
    ohmScore: 99,
    searchTag: '#techsp',
    instagramFollowers: 220,
    instagramEngagement: 1.0,
    instagramBio: 'Manager at SoftCode. Tech enthusiast.',
    instagramAccountType: 'personal',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'direto',
     idealTime: '13:00 - 17:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MÉDIO',
    cnpjAtividade: 'Desenvolvimento e licenciamento de programas de computador',
    ohmOfferTags: [
      { offer: 'Dev Core Corp Team Pack', score: 99, channel: 'WhatsApp', tone: 'direto', time: '14:00' }
    ],
    events: [
      { app: 'Ohm Checkout', event: 'pagamento_aprovado', date: '26/05/2026' }
    ],
    purchases: [
      { product: 'Ohm Dev Core (Corporate Team Pack)', date: '26/05/2026', value: 899.00 }
    ],
    messages: [
      { id: '1', sender: 'bot', text: 'E aí Rodrigo! Lucas aqui. Garantiu o suprimento do seu time para os sprints finais?', timestamp: 'Anteontem 14:00' },
      { id: '2', sender: 'lead', text: 'Cara, vou fechar com o financeiro. Me passa o link para PJ?', timestamp: 'Anteontem 14:20' },
      { id: '3', sender: 'bot', text: 'Claro! Aqui está o link corporativo com desconto na NF-e.', timestamp: 'Anteontem 14:30' },
      { id: '4', sender: 'lead', text: 'Nota fiscal recebida. Ansioso para receber o pack!', timestamp: 'Ontem 11:00' }
    ]
  },
  {
    id: 'conv-9',
    name: 'Letícia Barbosa',
    phoneOrHandle: 'letbarbosa.fit',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'instagram',
    stage: 'suporte',
    lastMessage: 'Acho que me enviaram o sabor errado por engano. Como faço para trocar?',
    lastMessageTime: 'Ontem',
    avatarSeed: 'Leticia',
    botPaused: true,
    nextBotAction: 'Operator help - Resolver problema de sabor trocado na entrega.',
    nextActionTime: '2026-05-28T09:00:00Z',
    avgResponseTime: '1min',
    sentiment: 'resistant',
    urgency: 'urgent',
    manualTags: ['Suporte Crítico', 'Troca Sabor'],
    notes: 'Entrar em contato urgentemente para evitar postagens ruins no instagram.',
    unreadCount: 7,
    lastSeen: 'online',
    ohmScore: 82,
    searchTag: '#pilatesrecife',
    instagramFollowers: 34200,
    instagramEngagement: 4.1,
    instagramBio: 'Pilates instructor | Wellness blogger | Recife 🌊',
    instagramAccountType: 'influencer',
    recommendedChannel: 'Instagram DM',
    recommendedTone: 'prova_social',
    idealTime: '11:00 - 15:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MEI',
    cnpjAtividade: 'Atividades de condicionamento físico',
    ohmOfferTags: [
      { offer: 'Slim Pro Premium Fit', score: 82, channel: 'Instagram DM', tone: 'prova_social', time: '12:00' }
    ],
    events: [
      { app: 'Ohm Checkout', event: 'pagamento_aprovado', date: '24/05/2026' }
    ],
    purchases: [
      { product: 'Ohm Slim Pro (Sabor Abacaxi Mint)', date: '24/05/2026', value: 149.00 }
    ],
    messages: [
      { id: '1', sender: 'bot', text: 'Letícia! Maya aqui. Seu Slim Pro sabor Abacaxi Hortelã já foi entregue! Amou?', timestamp: 'Ontem 15:00' },
      { id: '2', sender: 'lead', text: 'Acho que me enviaram o sabor errado por engano. Veio sabor Limão. Como faço para trocar?', timestamp: 'Ontem 15:12' },
      { id: 'sys-1', sender: 'system', text: 'Fila de triagem manual acionada pelo Bot.', timestamp: 'Ontem 15:13' }
    ]
  },
  {
    id: 'conv-10',
    name: 'Renan Oliveira',
    phoneOrHandle: '+55 (21) 98012-3456',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    channel: 'whatsapp',
    stage: 'frio',
    lastMessage: 'Valeu, vou dar uma olhada e aviso.',
    lastMessageTime: '3 dias atrás',
    avatarSeed: 'Renan',
    botPaused: false,
    nextBotAction: 'Enviar mensagem passiva com o áudio pitch científico.',
    nextActionTime: '2026-05-29T11:00:00Z',
    avgResponseTime: '1h',
    sentiment: 'neutral',
    urgency: 'normal',
    manualTags: ['Frio', 'Não respondeu'],
    notes: 'Dev pleno, demonstrou preguiça de preencher checkout.',
    unreadCount: 0,
    lastSeen: 'há 3 dias',
    ohmScore: 78,
    searchTag: '#javascript',
    instagramFollowers: 890,
    instagramEngagement: 1.2,
    instagramBio: 'Web Developer. JS is life. Cats and games.',
    instagramAccountType: 'personal',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'educativo',
    idealTime: '14:00 - 18:00',
    cnpjStatus: 'S/N',
    cnpjPorte: 'PESSOA FÍSICA',
    cnpjAtividade: 'Desenvolvedor Pleno',
    ohmOfferTags: [
      { offer: 'Dev Core Standard', score: 78, channel: 'WhatsApp', tone: 'educativo', time: '15:00' }
    ],
    events: [],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Salve Renan! Lucas aqui. Ficou alguma dúvida sobre os compostos bioativos do Dev-Core que dão foco limpo por 6 horas?', timestamp: '3 dias atrás' },
      { id: '2', sender: 'lead', text: 'Valeu, vou dar uma olhada e aviso.', timestamp: '3 dias atrás' }
    ]
  },
  {
    id: 'conv-11',
    name: 'Gisele Souza',
    phoneOrHandle: '+55 (11) 97123-0099',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'whatsapp',
    stage: 'ativo',
    lastMessage: 'Gostei bastante do pós-venda que configuraram. Super atenciosa!',
    lastMessageTime: '25/05/2026',
    avatarSeed: 'Gisele',
    botPaused: false,
    nextBotAction: 'Pesquisa pós-venda em 7 dias.',
    nextActionTime: '2026-06-01T15:00:00Z',
    avgResponseTime: '2min',
    sentiment: 'positive',
    urgency: 'auto',
    manualTags: ['Ativo', 'NPS Alto'],
    notes: 'Avaliou o suporte e experiência inicial com nota 9.',
    unreadCount: 0,
    lastSeen: 'há 1 hora',
    ohmScore: 92,
    searchTag: '#pilatesbrasil',
    instagramFollowers: 1100,
    instagramEngagement: 3.2,
    instagramBio: 'Amo esportes, pilates e comidinhas saudáveis SP.',
    instagramAccountType: 'personal',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'educativo',
    idealTime: '12:00 - 15:00',
    cnpjStatus: 'S/N',
    cnpjPorte: 'PESSOA FÍSICA',
    cnpjAtividade: 'N/A',
    ohmOfferTags: [
      { offer: 'Slim Pro Multi-Kit', score: 92, channel: 'WhatsApp', tone: 'prova_social', time: '14:00' }
    ],
    events: [
      { app: 'Ohm Checkout', event: 'pagamento_aprovado', date: '20/05/2026' }
    ],
    purchases: [
      { product: 'Ohm Slim Pro (Sabor Abacaxi Hortelã)', date: '20/05/2026', value: 149.00 }
    ],
    messages: [
      { id: '1', sender: 'bot', text: 'Oi Gisele! Maya aqui. Já se passaram 5 dias do seu primeiro uso! Como você está sentindo seu metabolismo?', timestamp: '25/05' },
      { id: '2', sender: 'lead', text: 'Menina, já sinto menos inchaço pela manhã! E o sabor é ótimo.', timestamp: '25/05' },
      { id: '3', sender: 'bot', text: 'Que incrível! Fico muito feliz! Continue o cronograma e tire fotos para comparar. Se precisar de dicas nutricionais me fale.', timestamp: '25/05' },
      { id: '4', sender: 'lead', text: 'Gostei bastante do pós-venda que configuraram. Super atenciosa!', timestamp: '25/05' }
    ]
  },
  {
    id: 'conv-12',
    name: 'Henrique Lins',
    phoneOrHandle: '+55 (11) 94002-8922',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    channel: 'whatsapp',
    stage: 'churn_risk',
    lastMessage: 'Cara, acabou meu pote mas achei outra marca mais barata na internet.',
    lastMessageTime: 'Hoje',
    avatarSeed: 'Henrique',
    botPaused: true,
    nextBotAction: 'Requer intervenção - Combater concorrência barata com cupom Premium.',
    nextActionTime: '2026-05-28T10:00:00Z',
    avgResponseTime: '7min',
    sentiment: 'resistant',
    urgency: 'urgent',
    manualTags: ['Concorrência', 'Risco Churn'],
    notes: 'Cliente antigo de 3 compras. Propenso a sair por falsos termogênicos de baixa qualidade.',
    unreadCount: 5,
    lastSeen: 'online',
    ohmScore: 88,
    searchTag: '#reactnordeste',
    instagramFollowers: 940,
    instagramEngagement: 2.8,
    instagramBio: 'Tech lead at Nordex. JS/Go fan. Recife.',
    instagramAccountType: 'personal',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'prova_social',
    idealTime: '10:00 - 14:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MICRO',
    cnpjAtividade: 'Portais e provedores de conteúdo na internet',
    ohmOfferTags: [
      { offer: 'Dev Core Loyalty Discount', score: 88, channel: 'WhatsApp', tone: 'prova_social', time: '11:00' }
    ],
    events: [
      { app: 'Ohm Store', event: 'churn_warning_triggered', date: '27/05/2026' }
    ],
    purchases: [
      { product: 'Ohm Dev Core Single', date: '10/04/2026', value: 199.00 },
      { product: 'Ohm Dev Core Single', date: '05/03/2026', value: 199.00 }
    ],
    messages: [
      { id: '1', sender: 'bot', text: 'Henrique! Lucas aqui. Vi que seu pote já deve estar raspando o fundo! Vamos renovar seu suprimento mensal de foco para não quebrar seu ritmo?', timestamp: 'Hoje 13:00' },
      { id: '2', sender: 'lead', text: 'Cara, acabou meu pote mas achei outra marca mais barata na internet e que diz que faz a mesma coisa.', timestamp: 'Hoje 13:10' },
      { id: 'sys-1', sender: 'system', text: 'Bot identificou menção de concorrência e barateamento de insumo sintético. Pausado para salvaguarda.', timestamp: 'Hoje 13:11' }
    ]
  },
  {
    id: 'conv-13',
    name: 'Vanessa Pires',
    phoneOrHandle: 'vanessa.fitlaw',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'instagram',
    stage: 'frio',
    lastMessage: 'Ah, legal. Vou ver sim.',
    lastMessageTime: '4 dias atrás',
    avatarSeed: 'Vanessa',
    botPaused: false,
    nextBotAction: 'Tentar abordagem final em 48 horas com prova social.',
    nextActionTime: '2026-05-29T16:00:00Z',
    avgResponseTime: '5h',
    sentiment: 'resistant',
    urgency: 'normal',
    manualTags: ['Frio', 'Advogada'],
    notes: 'Advogada criminalista, rotina muito estressante. Sem tempo para responder.',
    unreadCount: 0,
    lastSeen: 'há 4 dias',
    ohmScore: 71,
    searchTag: '#advogadasp',
    instagramFollowers: 3100,
    instagramEngagement: 2.3,
    instagramBio: 'Advocacia Criminal | Direito Penal • São Paulo Capital ⚖️',
    instagramAccountType: 'creator',
    recommendedChannel: 'Instagram DM',
    recommendedTone: 'direto',
    idealTime: '17:00 - 20:00',
    cnpjStatus: 'ATIVA',
    cnpjPorte: 'MICRO',
    cnpjAtividade: 'Serviços de advocacia corporativa',
    ohmOfferTags: [
      { offer: 'Slim Pro Stress Relax', score: 71, channel: 'Instagram DM', tone: 'prova_social', time: '18:00' }
    ],
    events: [],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Olá doutora Vanessa! Maya aqui. Sei como a rotina do tribunal consome nossa queima calórica. Já pensou em otimizar sua energia sem perder foco?', timestamp: '4 dias atrás' },
      { id: '2', sender: 'lead', text: 'Ah, legal. Vou ver sim.', timestamp: '4 dias atrás' }
    ]
  },
  {
    id: 'conv-14',
    name: 'Alice Monteiro',
    phoneOrHandle: '+55 (21) 94812-7411',
    campaignId: 'camp-1',
    campaignName: 'Campanha Maya Slim',
    channel: 'whatsapp',
    stage: 'onboarding',
    lastMessage: 'Já recebi o e-mail com a tabela do guia alimentar! Muito bom.',
    lastMessageTime: 'Ontem',
    avatarSeed: 'Alice',
    botPaused: false,
    nextBotAction: 'Enviar áudio de acompanhamento nutricional no dia 3.',
    nextActionTime: '2026-05-29T10:00:00Z',
    avgResponseTime: '2min',
    sentiment: 'positive',
    urgency: 'auto',
    manualTags: ['Onboarding', 'Novo Ativo'],
    notes: 'Comprou o kit Slim duplo anteontem.',
    unreadCount: 0,
    lastSeen: 'há 18 minutos',
    ohmScore: 96,
    searchTag: '#nutriestetica',
    instagramFollowers: 9500,
    instagramEngagement: 6.2,
    instagramBio: 'Viver bem e comer limpo • Receitas low-carb e bem-estar.',
    instagramAccountType: 'creator',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'educativo',
    idealTime: '08:00 - 11:00',
    cnpjStatus: 'S/N',
    cnpjPorte: 'PESSOA FÍSICA',
    cnpjAtividade: 'Estética',
    ohmOfferTags: [
      { offer: 'Slim Pro Double Kit', score: 96, channel: 'WhatsApp', tone: 'prova_social', time: '09:00' }
    ],
    onboardingSteps: [
      { name: 'Boas-vindas', completed: true },
      { name: 'Configurar conta', completed: true },
      { name: 'Primeiro uso', completed: false }
    ],
    events: [
      { app: 'Ohm Checkout', event: 'pagamento_aprovado', date: '25/05/2026' }
    ],
    purchases: [
      { product: 'Slim Pro Double Pack', date: '25/05/2026', value: 249.00 }
    ],
    messages: [
      { id: '1', sender: 'bot', text: 'Alice! Sou o assistente de nutrição da Maya. Liberei seu checklist de boas-vindas com o Guia de Receitas Alquimia Slim no seu e-mail! Conseguiu baixar?', timestamp: 'Ontem 10:00' },
      { id: '2', sender: 'lead', text: 'Já recebi o e-mail com a tabela do guia alimentar! Muito bom.', timestamp: 'Ontem 10:15' }
    ]
  },
  {
    id: 'conv-15',
    name: 'Mateus Jordão',
    phoneOrHandle: '+55 (11) 99812-3211',
    campaignId: 'camp-2',
    campaignName: 'Campanha Lucas Dev-Core',
    channel: 'whatsapp',
    stage: 'engajado',
    lastMessage: 'Estou recebendo o áudio explicativo...',
    lastMessageTime: 'Hoje',
    avatarSeed: 'Mateus',
    botPaused: false,
    nextBotAction: 'Apresentar mídias complementares e combos disponíveis.',
    nextActionTime: '2026-05-27T23:58:00Z',
    avgResponseTime: '1min',
    sentiment: 'positive',
    urgency: 'attention',
    manualTags: ['Interessado', 'Mídia ativa'],
    notes: 'Interessado em ver como funciona a liberação de cafeína lenta.',
    unreadCount: 2,
    lastSeen: 'online',
    ohmScore: 89,
    searchTag: '#cybersecurity',
    instagramFollowers: 430,
    instagramEngagement: 1.8,
    instagramBio: 'NetSec Analyst. Linux lover. SP.',
    instagramAccountType: 'personal',
    recommendedChannel: 'WhatsApp',
    recommendedTone: 'direto',
    idealTime: '14:00 - 18:00',
    cnpjStatus: 'S/N',
    cnpjPorte: 'PESSOA FÍSICA',
    cnpjAtividade: 'Segurança cibernética',
    ohmOfferTags: [
      { offer: 'Dev Core Standard Plus', score: 89, channel: 'WhatsApp', tone: 'direto', time: '15:00' }
    ],
    events: [
      { app: 'Ohm Store', event: 'trial_iniciado', date: '27/05/2026' }
    ],
    purchases: [],
    messages: [
      { id: '1', sender: 'bot', text: 'Fala Mateus! Lucas aqui. Cara, gravei esse áudio explicando exatamente como formulamos o Dev-Core para tirar o cansaço mental sem dar palpitação. Dá uma ouvida de 30 segundos aí!', timestamp: 'Hoje 22:50' },
      { 
        id: '2', 
        sender: 'bot', 
        text: 'Abaixo segue a explicação detalhada do blend científico em áudio:', 
        timestamp: 'Hoje 22:51',
        mediaType: 'audio',
        mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
      },
      { id: '3', sender: 'lead', text: 'Estou recebendo o áudio explicativo... bem legal a explicação da L-teanina, não conhecia esse composto. Me manda uma foto do pote por favor para ver a tabela?', timestamp: 'Hoje 23:05' },
      {
        id: '4',
        sender: 'bot',
        text: 'Segue a foto do pote e da tabela nutricional oficial para sua análise:',
        timestamp: 'Hoje 23:07',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&auto=format&fit=crop&q=80'
      }
    ]
  }
];

export const INITIAL_DOCS: KnowledgeDoc[] = [
  {
    id: 'doc-1',
    name: 'FAQ_Completo_Produtos_Ohm_v2.pdf',
    type: 'pdf',
    status: 'indexed',
    chunks: 148,
    contentPreview: 'Perguntas frequentes sobre o Ohm Pro, garantia de 12 meses, políticas de devolução e benefícios principais para energia prolongada. Contém tabelas nutricionais completas e restrições menores de uso.',
    createdAt: '24/05/2026'
  },
  {
    id: 'doc-2',
    name: 'Script_Vendas_E_Metodos_Contorno.txt',
    type: 'txt',
    status: 'indexed',
    chunks: 42,
    contentPreview: 'Gatilhos mentais de escassez e reciprocidade. Métodos de contorno de objeção: "R$ 149 está caro" -> Comparar com o preço de 1 café por dia durante o mês. Depoimentos recomendados para anexar por nicho (dev vs fitness).',
    createdAt: '25/05/2026'
  },
  {
    id: 'doc-3',
    name: 'Manual_Estilo_Maya_Persona.docx',
    type: 'docx',
    status: 'error',
    chunks: 0,
    contentPreview: 'Este documento não pôde ser lido pois a codificação está corrompida. Verifique o arquivo e reenvie.',
    createdAt: '26/05/2026'
  },
  {
    id: 'doc-4',
    name: 'Politica_Reembolso_e_Garantias.pdf',
    type: 'pdf',
    status: 'processing',
    chunks: 18,
    contentPreview: 'O cliente tem direito ao arrependimento de compra no prazo de até 7 dias corridos a partir da data de recebimento do item no endereço fornecido...',
    createdAt: '27/05/2026'
  }
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-1',
    conversaId: 'conv-2',
    leadName: 'Mariana Ramos',
    campaignName: 'Campanha Maya Slim',
    messagePreview: 'Tem alguma contraindicação para quem tem problema cardíaco leve?',
    timestamp: '18:15',
    read: false
  },
  {
    id: 'alt-2',
    conversaId: 'conv-5',
    leadName: 'Felipe Menezes',
    campaignName: 'Campanha Lucas Dev-Core',
    messagePreview: 'Acho que vou querer o combo de focalização... divides em quantas vezes?',
    timestamp: '15:20',
    read: true
  },
  {
    id: 'alt-3',
    conversaId: 'conv-12',
    leadName: 'Henrique Lins',
    campaignName: 'Campanha Lucas Dev-Core',
    messagePreview: 'Cara, acabou meu pote mas achei outra marca mais barata na internet.',
    timestamp: 'Hoje 13:10',
    read: false
  }
];

const LOCAL_STORAGE_KEY = 'butthead_mvp_state';

export function getAppState(): AppState {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      let updated = false;
      
      if (!parsed.campaigns || parsed.campaigns.length === 0) {
        parsed.campaigns = INITIAL_CAMPAIGNS;
        updated = true;
      }
      if (!parsed.conversations || parsed.conversations.length === 0) {
        parsed.conversations = INITIAL_CONVERSATIONS;
        updated = true;
      }
      if (updated) {
        saveAppState(parsed);
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading app state from localStorage:', e);
  }

  const state: AppState = {
    campaigns: INITIAL_CAMPAIGNS,
    numbers: INITIAL_NUMBERS,
    conversations: INITIAL_CONVERSATIONS,
    docs: INITIAL_DOCS,
    alerts: INITIAL_ALERTS,
  };
  saveAppState(state);
  return state;
}

export function saveAppState(state: AppState): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving app state to localStorage:', e);
  }
}
