import React, { useState } from 'react';
import { Smartphone, Hash, Plus, AlertTriangle, Play, Pause, Trash2, ShieldAlert, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { NumberPool, Campaign } from '../types';

interface NumerosProps {
  numbers: NumberPool[];
  campaigns: Campaign[];
  onAddNumber: (number: NumberPool) => void;
  onUpdateNumberStatus: (id: string, nextStatus: 'active' | 'standby' | 'caído' | 'banido') => void;
  onRemoveNumber: (id: string) => void;
  onUpdateDailyLimit: (id: string, limit: number) => void;
}

export function Numeros({
  numbers,
  campaigns,
  onAddNumber,
  onUpdateNumberStatus,
  onRemoveNumber,
  onUpdateDailyLimit
}: NumerosProps) {

  // Form states to add new number
  const [phoneNumber, setPhoneNumber] = useState('');
  const [targetCampaignId, setTargetCampaignId] = useState('');
  const [limit, setLimit] = useState(200);

  // Show status filter or modal toggler
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return alert('Insira o número de telefone.');
    if (!targetCampaignId) return alert('Selecione uma campanha para vincular o número.');

    const matchedCamp = campaigns.find(c => c.id === targetCampaignId);
    if (!matchedCamp) return alert('Campanha não correspondente encontrada.');

    const newNum: NumberPool = {
      id: `num-${Date.now()}`,
      number: phoneNumber.trim(),
      campaignId: targetCampaignId,
      campaignName: matchedCamp.name,
      status: 'standby', // Default standby for warming up
      dailyLimit: limit,
      sentToday: 0
    };

    onAddNumber(newNum);
    setPhoneNumber('');
    setLimit(200);
    setIsAddOpen(false);
  };

  const activeCount = numbers.filter(n => n.status === 'active').length;
  const fallenCount = numbers.filter(n => n.status === 'caído').length;

  return (
    <div className="space-y-6 font-sans" id="numeros-container">
      {/* Overview stats header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800/85 shadow-glow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-605/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-indigo-400 animate-pulse-glow" />
            Pool de WhatsApp de Guerra
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
            Monitore, aqueça e rotacione disparadores ativos. A automatização Butthead distribui a carga inteligentemente entre chips ativos.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="hidden md:flex gap-2 font-mono text-center">
            <div className="bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-slate-850/80">
              <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Ativos/Online</p>
              <p className="text-xs font-black text-emerald-400 mt-0.5">{activeCount} Chips</p>
            </div>
            {fallenCount > 0 && (
              <div className="bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-slate-850/80">
                <p className="text-[8px] text-orange-505 uppercase tracking-widest font-bold">Instáveis/Caídos</p>
                <p className="text-xs font-black text-orange-400 mt-0.5">{fallenCount} Caídos</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsAddOpen(!isAddOpen)}
            className="bg-indigo-650 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-glow-premium self-start sm:self-auto font-display"
          >
            <Plus className="h-4 w-4" />
            Adicionar Chip
          </button>
        </div>
      </div>

      {/* Form Overlay Modal or simple block */}
      {isAddOpen && (
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl mt-4 animate-fade-in space-y-4 shadow-glow">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-display flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              Novo Disparador WhatsApp
            </h4>
            <button 
              onClick={() => setIsAddOpen(false)}
              className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest bg-slate-950/60 px-2.1 py-1 rounded border border-slate-850 cursor-pointer"
            >
              Fechar
            </button>
          </div>

          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5 col-span-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block font-display">Número WhatsApp</label>
              <input
                type="text"
                placeholder="+55 (11) 98888-7777"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5 col-span-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block font-display">Vincular à Campanha</label>
              <select
                value={targetCampaignId}
                onChange={(e) => setTargetCampaignId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
                required
              >
                <option value="">Selecione...</option>
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 col-span-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block font-display">Limite de Mensagens/Dia</label>
              <input
                type="number"
                min={50}
                max={500}
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2 text-xs text-slate-100 focus:outline-none"
                required
              />
            </div>

            <div className="col-span-1">
              <button
                type="submit"
                className="w-full bg-indigo-605 hover:bg-indigo-600 text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-glow uppercase tracking-wider cursor-pointer font-display"
              >
                Registrar no Pool
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Roster of numbers pool */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {numbers.map((num) => {
          const isFallen = num.status === 'caído';
          const isBanned = num.status === 'banido';
          const isStandby = num.status === 'standby';
          const isActive = num.status === 'active';

          // Usage bar indicators
          const percentUsage = Math.min(100, Math.round((num.sentToday / num.dailyLimit) * 100));

          return (
            <div 
              key={num.id}
              className={`bg-slate-900 p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                isFallen 
                  ? 'border-orange-500/30 shadow-glow-amber' 
                  : isBanned 
                    ? 'border-red-950 opacity-70' 
                    : 'border-slate-800/80 hover:border-slate-755'
              }`}
            >
              {/* Fallen alert status background accent */}
              {isFallen && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-orange-600 to-amber-550 text-slate-950 font-black text-[9px] uppercase py-1 text-center font-mono flex items-center justify-center gap-1 leading-none">
                  <AlertTriangle className="h-3 w-3 animate-pulse" />
                  Conexão Caída: Requer Reescaneamento
                </div>
              )}

              {/* Main information card */}
              <div className={isFallen ? 'pt-5' : ''}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-xl border ${
                      isActive 
                        ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10 shadow-glow' 
                        : isStandby 
                          ? 'bg-amber-400/5 text-amber-400 border-amber-400/10' 
                          : isFallen 
                            ? 'bg-orange-500/10 text-orange-400 border-orange-500/10' 
                            : 'bg-red-500/5 text-red-550 border-red-500/10'
                    }`}>
                      <Hash className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-mono text-white tracking-tight">{num.number}</h3>
                      <p className="text-[10px] text-slate-500 leading-none mt-1">
                        Campanha: <span className="font-semibold text-slate-250 font-display">{num.campaignName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons delete */}
                  <button
                    onClick={() => onRemoveNumber(num.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-950 transition-colors cursor-pointer"
                    title="Remover Número do Pool"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Status Picker Selector buttons */}
                <div className="mt-5">
                  <span className="text-[9px] font-bold text-slate-505 uppercase tracking-widest block mb-2 font-display">Controles de Linha / Status</span>
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-center">
                    {(['active', 'standby', 'caído', 'banido'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => onUpdateNumberStatus(num.id, st)}
                        className={`py-1 rounded border uppercase font-mono tracking-tight cursor-pointer text-[8px] ${
                          num.status === st
                            ? st === 'active' 
                              ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/30' 
                              : st === 'standby'
                                ? 'bg-amber-400/10 text-amber-500 border-amber-400/35'
                                : st === 'caído'
                                  ? 'bg-orange-600/20 text-orange-400 border-orange-500/35'
                                  : 'bg-red-650/20 text-red-400 border-red-500/35'
                            : 'bg-slate-950 text-slate-500 border-slate-850 hover:bg-slate-900'
                        }`}
                      >
                        {st === 'caído' ? 'Caído' : st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Usage stats bars */}
              <div className="mt-5 pt-4 border-t border-slate-800/60 space-y-2">
                <div className="flex justify-between text-3xs font-mono text-slate-505">
                  <span>Enviadas: <span className="text-white font-bold">{num.sentToday} msgs</span></span>
                  <span>Teto: {num.dailyLimit}</span>
                </div>
                
                {/* Visual cap bar */}
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-850 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentUsage > 85 
                        ? 'bg-gradient-to-r from-red-650 to-red-500 glow shadow-glow' 
                        : percentUsage > 60 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-400' 
                          : 'bg-gradient-to-r from-indigo-550 to-indigo-400 shadow-glow'
                    }`}
                    style={{ width: `${percentUsage}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-bold font-mono text-slate-500 p-0.5">
                  <span>Carga: {percentUsage}%</span>
                  {percentUsage >= 90 && (
                    <span className="text-amber-500 animate-pulse flex items-center gap-0.5 font-sans font-medium uppercase text-[8px]">
                      <ShieldAlert className="h-2.5 w-2.5" />
                      Risco Banimento
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
