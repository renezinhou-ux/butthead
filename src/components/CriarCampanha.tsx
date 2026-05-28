import React, { useState, useEffect } from 'react';
import { ChevronLeft, Save, Sparkles, Smartphone, Instagram, Image, ChevronRight, Percent, Award, FileText, X, Plus } from 'lucide-react';
import { Campaign, NumberPool } from '../types';

interface CriarCampanhaProps {
  campaigns: Campaign[];
  numbers: NumberPool[];
  editingCampaignId: string | null;
  onSaveCampaign: (campaign: Campaign) => void;
  onNavigateBack: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
];

const OHM_CAMPAIGN_OPTIONS = [
  { value: 'NichoChat Jan 2026', label: 'NichoChat Jan 2026' },
  { value: 'Consórcio Empresário', label: 'Consórcio Empresário' },
  { value: 'BarberChat SP', label: 'BarberChat SP' },
];

const BENEFIT_OPTIONS = ['Mês grátis', 'Frete grátis', 'Bônus exclusivo'];

export function CriarCampanha({
  campaigns,
  numbers,
  editingCampaignId,
  onSaveCampaign,
  onNavigateBack
}: CriarCampanhaProps) {
  
  const isEditing = !!editingCampaignId;
  const currentCampaign = campaigns.find(c => c.id === editingCampaignId);

  // Form states
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [photoUrl, setPhotoUrl] = useState(PRESET_AVATARS[0]);
  const [productName, setProductName] = useState('Ohm Slim Pro');
  const [instagramAccount, setInstagramAccount] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [channels, setChannels] = useState<('whatsapp' | 'instagram')[]>(['whatsapp']);

  // New states for added features
  const [ticketValue, setTicketValue] = useState(50);
  const [ohmCampaignId, setOhmCampaignId] = useState('');
  const [maxDiscount, setMaxDiscount] = useState<number>(10);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [discountRule, setDiscountRule] = useState('');

  // Local inputs to add a campaign strategic media asset
  const [campaignMedia, setCampaignMedia] = useState<{ type: 'audio' | 'image' | 'video' | 'document'; label: string; url: string }[]>([]);
  const [newMediaLabel, setNewMediaLabel] = useState('');
  const [newMediaType, setNewMediaType] = useState<'audio' | 'image' | 'video' | 'document'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  // Handle Loading of Campaign details if in edit mode
  useEffect(() => {
    if (isEditing && currentCampaign) {
      setName(currentCampaign.name);
      setPersonality(currentCampaign.personality);
      setPhotoUrl(currentCampaign.photoUrl || PRESET_AVATARS[0]);
      setProductName(currentCampaign.productName);
      setInstagramAccount(currentCampaign.instagramAccount || '');
      setSelectedNumbers(currentCampaign.whatsappNumbers || []);
      setChannels(currentCampaign.channels || ['whatsapp']);
      
      // Load new fields
      setTicketValue(currentCampaign.ticketValue !== undefined ? currentCampaign.ticketValue : 50);
      setOhmCampaignId(currentCampaign.ohmCampaignId || '');
      setMaxDiscount(currentCampaign.maxDiscount !== undefined ? currentCampaign.maxDiscount : 10);
      setBenefits(currentCampaign.benefits || []);
      setDiscountRule(currentCampaign.discountRule || '');
      setCampaignMedia(currentCampaign.campaignMedia || []);
    } else {
      // Default reset for new
      setName('');
      setPersonality('');
      setPhotoUrl(PRESET_AVATARS[0]);
      setProductName('Ohm Slim Pro');
      setInstagramAccount('');
      setSelectedNumbers([]);
      setChannels(['whatsapp']);
      
      // Default reset new fields
      setTicketValue(50);
      setOhmCampaignId('');
      setMaxDiscount(10);
      setBenefits([]);
      setDiscountRule('');
      setCampaignMedia([]);
    }
  }, [editingCampaignId, currentCampaign, isEditing]);

  const handleChannelToggle = (channel: 'whatsapp' | 'instagram') => {
    if (channels.includes(channel)) {
      if (channels.length > 1) {
        setChannels(channels.filter(c => c !== channel));
      }
    } else {
      setChannels([...channels, channel]);
    }
  };

  const handleNumberToggle = (numberId: string) => {
    if (selectedNumbers.includes(numberId)) {
      setSelectedNumbers(selectedNumbers.filter(id => id !== numberId));
    } else {
      setSelectedNumbers([...selectedNumbers, numberId]);
    }
  };

  const handleSimulateLogoUpload = () => {
    const currentIndex = PRESET_AVATARS.indexOf(photoUrl);
    const nextIndex = (currentIndex + 1) % PRESET_AVATARS.length;
    setPhotoUrl(PRESET_AVATARS[nextIndex]);
  };

  const handleBenefitToggle = (benefit: string) => {
    if (benefits.includes(benefit)) {
      setBenefits(benefits.filter(b => b !== benefit));
    } else {
      setBenefits([...benefits, benefit]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert('Insira o nome da campanha.');
    if (!personality.trim()) return alert('Forneça a descrição da personalidade do bot.');

    const savedCampaign: Campaign = {
      id: isEditing && currentCampaign ? currentCampaign.id : `camp-${Date.now()}`,
      name: name.trim(),
      personality: personality.trim(),
      photoUrl,
      productName,
      instagramAccount: instagramAccount.trim() || undefined,
      whatsappNumbers: selectedNumbers,
      channels,
      status: isEditing && currentCampaign ? currentCampaign.status : 'active',
      leadsQueue: isEditing && currentCampaign ? currentCampaign.leadsQueue : 12,
      leadsContacted: isEditing && currentCampaign ? currentCampaign.leadsContacted : 0,
      leadsResponded: isEditing && currentCampaign ? currentCampaign.leadsResponded : 0,
      leadsConverted: isEditing && currentCampaign ? currentCampaign.leadsConverted : 0,
      
      // Added parameters
      ticketValue,
      ohmCampaignId: ohmCampaignId || undefined,
      maxDiscount,
      benefits,
      discountRule: discountRule.trim() || undefined,
      campaignMedia
    };

    onSaveCampaign(savedCampaign);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans text-slate-100" id="criar-campanha-container">
      {/* Back Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer font-display"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar para Campanhas
        </button>
        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded-full border border-indigo-500/20 font-mono uppercase tracking-wider text-center">
          {isEditing ? 'Configuração' : 'Configurar Novo Assistente'}
        </span>
      </div>

      {/* Main configuration Card */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-glow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-650/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 bg-indigo-500/5 text-indigo-400 rounded-xl border border-indigo-500/15">
            <Sparkles className="h-5 w-5 animate-pulse-glow" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-white font-display">
              {isEditing ? 'Configurar Campanha Operacional' : 'Criar Novo Painel de Guerra'}
            </h2>
            <p className="text-xs text-slate-450 mt-1 font-medium leading-relaxed">
              {isEditing ? 'Ajuste os canais ativos, pooling de números e instruções de personalidades do bot.' : 'Crie a personalidade virtual de vendas e amarre aos canais de tráfego ativos.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Persona General Identification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
                Nome da Campanha
              </label>
              <input
                type="text"
                placeholder="Ex: Campanha Maya Wellness"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
                Personalidade do Assistente (IA)
              </label>
              <input
                type="text"
                placeholder="Ex: Maya (Influencer alegre de fitness)"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Persona Avatar picker - Upload simulation */}
          <div className="bg-slate-950/45 p-5 rounded-2xl border border-slate-850 space-y-4 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img 
                  src={photoUrl} 
                  alt="Personality profile" 
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-xl object-cover ring-2 ring-indigo-500/20 bg-slate-900"
                />
                <div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest font-display">Foto de Perfil do Bot</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Selecione uma imagem de identidade ou alterne presets.</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSimulateLogoUpload}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-bold py-2.5 px-3.5 rounded-lg border border-slate-800 uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Image className="h-3.5 w-3.5 text-indigo-400" />
                  Girar Preset
                </button>
              </div>
            </div>

            {/* Avatar preset circles */}
            <div className="flex gap-2.5 pt-3.5 border-t border-slate-900">
              {PRESET_AVATARS.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPhotoUrl(url)}
                  className={`relative p-0.5 rounded-xl border-2 transition-all overflow-hidden cursor-pointer ${
                    photoUrl === url ? 'border-indigo-650 bg-indigo-500/10' : 'border-transparent hover:border-slate-800'
                  }`}
                >
                  <img src={url} alt="Preset selector" referrerPolicy="no-referrer" className="h-10 w-10 object-cover rounded-lg" />
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-800/60" />

          {/* Ohm Product and Instagram business channel binding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
                Vincular Produto Ohm
              </label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none cursor-pointer"
                required
              >
                <option value="Ohm Slim Pro">Ohm Slim Pro (Emagrecimento & Energia)</option>
                <option value="Ohm Dev Core">Ohm Dev Core (Foco extremo & Código)</option>
                <option value="Ohm Life Balance">Ohm Life Balance (Produtividade no Trabalho)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display flex items-center gap-1.5">
                <Instagram className="h-3.5 w-3.5 text-pink-400" />
                Conta Instagram Business
              </label>
              <input
                type="text"
                placeholder="Ex: maya.ohm.wellness"
                value={instagramAccount}
                onChange={(e) => setInstagramAccount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-650 focus:outline-none"
              />
            </div>
          </div>

          <hr className="border-slate-800/60" />

          {/* NEW SECTION: Offer Strategy & Ohm Campaign connection (Gatilhos, Descontos, etc) */}
          <div className="bg-slate-950/20 border border-slate-800/80 p-5 rounded-2xl space-y-5">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest font-display flex items-center gap-1.5">
              <Percent className="h-4 w-4 text-emerald-400" />
              Estratégia de Venda, Descontos & Ohm API
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ohm Campaign Selection dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
                  Vincular Campanha Ohm
                </label>
                <select
                  value={ohmCampaignId}
                  onChange={(e) => setOhmCampaignId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-250 cursor-pointer focus:outline-none"
                >
                  <option value="">Nenhuma integrada</option>
                  {OHM_CAMPAIGN_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Ticket value */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
                  Valor do Ticket Médio (R$)
                </label>
                <input
                  type="number"
                  min={1}
                  value={ticketValue}
                  onChange={(e) => setTicketValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none"
                  required
                />
              </div>

              {/* Maximum Discount Allowable */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
                  Desconto Máximo (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 pr-8 text-xs text-slate-100 focus:outline-none"
                    required
                  />
                  <span className="absolute right-3.5 top-3 text-xs font-mono text-slate-500 font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Perks & Benefits Checkboxes */}
            <div className="space-y-2.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-indigo-400" />
                Benefícios Disponíveis para Oferecer
              </label>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {BENEFIT_OPTIONS.map((benefit) => {
                  const isSelected = benefits.includes(benefit);
                  return (
                    <button
                      key={benefit}
                      type="button"
                      onClick={() => handleBenefitToggle(benefit)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        isSelected 
                          ? 'bg-indigo-650/15 border-indigo-500/40 text-slate-100 shadow-glow' 
                          : 'bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-900'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-indigo-400' : 'bg-slate-700'}`}></span>
                      {benefit}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Discount rule instruction text block */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-indigo-400" />
                Regra Especial de Desconto por IA (Gatilho)
              </label>
              <textarea
                placeholder="Ex e.g., Após 3 dias sem resposta na etapa Negociando, aplicar cupom de 10% de desconto ou oferecer Frete grátis."
                value={discountRule}
                onChange={(e) => setDiscountRule(e.target.value)}
                className="w-full h-20 bg-slate-950 border border-slate-850 rounded-xl p-3.5 text-xs text-slate-105 placeholder-slate-600 focus:outline-none resize-none font-mono"
              />
            </div>
          </div>

          <hr className="border-slate-800/60" />

          {/* Channel choices select buttons */}
          <div className="space-y-2.5">
            <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
              Canais Ativos na Campanha
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChannelToggle('whatsapp')}
                className={`flex items-center justify-between p-4.5 rounded-xl border text-left transition-all cursor-pointer ${
                  channels.includes('whatsapp')
                    ? 'bg-emerald-500/5 border-emerald-500/25 text-white shadow-emerald-500/5'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${channels.includes('whatsapp') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 border border-slate-850 text-slate-600'}`}>
                    <Smartphone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block font-display text-white">Conversas WhatsApp</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Abordagens diretas operando em escala no zap.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={channels.includes('whatsapp')}
                  readOnly
                  className="rounded border-slate-700 text-emerald-550 accent-emerald-500 pointer-events-none"
                />
              </button>

              <button
                type="button"
                onClick={() => handleChannelToggle('instagram')}
                className={`flex items-center justify-between p-4.5 rounded-xl border text-left transition-all cursor-pointer ${
                  channels.includes('instagram')
                    ? 'bg-pink-500/5 border-pink-500/20 text-white shadow-pink-500/5'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${channels.includes('instagram') ? 'bg-pink-500/10 text-pink-400' : 'bg-slate-900 border border-slate-850 text-slate-600'}`}>
                    <Instagram className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block font-display text-white">Promo Direct Message</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Disparos automáticos por direct stories e posts.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={channels.includes('instagram')}
                  readOnly
                  className="rounded border-slate-700 text-pink-550 accent-pink-500 pointer-events-none"
                />
              </button>
            </div>
          </div>

          {/* Links numbers from the global pool */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block font-display">
              Vincular Pool de Números (WhatsApp)
            </label>
            
            <p className="text-[10px] text-slate-500 leading-relaxed mb-3 font-medium">
              Selecione quais telefones rotativos do seu pool processarão esta campanha integradamente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {numbers.map((num) => {
                const isSelected = selectedNumbers.includes(num.id);
                return (
                  <button
                    key={num.id}
                    type="button"
                    onClick={() => handleNumberToggle(num.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-500/5 border-indigo-500/40 text-slate-100 shadow-low'
                        : 'bg-slate-950 border-slate-850 text-slate-450 hover:border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${
                        num.status === 'active' 
                          ? 'bg-emerald-500 shadow-glow-emerald' 
                          : num.status === 'standby' 
                            ? 'bg-amber-400 shadow-glow-amber' 
                            : 'bg-red-500 animate-pulse'
                      }`}></span>
                      <div>
                        <span className="font-bold font-mono text-xs block text-slate-105">{num.number}</span>
                        <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide mt-1 font-mono">
                          STATUS: {num.status}
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="rounded border-slate-750 text-indigo-500 accent-indigo-500 pointer-events-none font-mono"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campaign Media Library Asset Section */}
          <div className="bg-slate-950/20 border border-slate-800/80 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest font-display flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-indigo-400" />
              Biblioteca de Mídias Estratégicas (Material Comercial)
            </h3>
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
              Cadastre áudios, imagens, vídeos ou PDF que seus bots e operadores humanos terão acesso na central em tempo real para despachar aos leads com facilidade.
            </p>

            {/* List current media */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-36 overflow-y-auto scrollbar-thin">
              {campaignMedia.length === 0 ? (
                <p className="text-3xs text-slate-500 italic text-center py-4 col-span-2">Nenhum criativo estratégico cadastrado ainda.</p>
              ) : (
                campaignMedia.map((med, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 flex items-center justify-between text-2xs font-mono">
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="font-bold text-slate-300 block truncate" title={med.label}>{med.label}</span>
                      <span className="text-[9px] text-slate-500 truncate block mt-0.5" title={med.url}>{med.url}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[8px] bg-indigo-500/10 text-indigo-400 font-bold px-1.5 py-0.5 rounded font-sans uppercase">
                        {med.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCampaignMedia(prev => prev.filter((_, i) => i !== idx))}
                        className="text-slate-500 hover:text-red-400 p-1 cursor-pointer font-sans text-xs shrink-0"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Add Form nested inside campaign creation */}
            <div className="border-t border-slate-850 pt-4 flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Rótulo (Ex: Áudio Depoimento 1)"
                value={newMediaLabel}
                onChange={(e) => setNewMediaLabel(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs focus:outline-none"
              />
              <select
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value as any)}
                className="bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="image">Imagem</option>
                <option value="audio">Áudio</option>
                <option value="video">Vídeo</option>
                <option value="document">PDF / Doc</option>
              </select>
              <input
                type="text"
                placeholder="URL (Opcional - link mockup)"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs focus:outline-none placeholder-slate-600"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newMediaLabel.trim()) return alert('Insira um rótulo identificador para a mídia.');
                  const defaultLinks = {
                    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
                    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    document: 'https://pdf-sample-files.com/wp-content/uploads/2022/11/sample-1.pdf'
                  };
                  const finalUrl = newMediaUrl.trim() || defaultLinks[newMediaType];
                  setCampaignMedia(prev => [...prev, { type: newMediaType, label: newMediaLabel.trim(), url: finalUrl }]);
                  setNewMediaLabel('');
                  setNewMediaUrl('');
                }}
                className="bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl cursor-pointer shrink-0 transition-colors"
              >
                Incluir Mídia
              </button>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-850">
            <button
              type="button"
              onClick={onNavigateBack}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer font-display"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-650 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-glow-premium flex items-center gap-2 cursor-pointer font-display"
            >
              <Save className="h-4 w-4" />
              {isEditing ? 'Salvar Painel' : 'Concluir Setup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
