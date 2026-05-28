import React, { useState, useEffect } from 'react';
import { Save, Settings, ShieldCheck, Key, Clock, Settings2 } from 'lucide-react';

interface AppConfig {
  ohmApiUrl: string;
  ohmApiKey: string;
  evolutionApiUrl: string;
  openaiApiKey: string;
  silenceStart: string;
  silenceEnd: string;
  globalMessageLimit: number;
}

const DEFAULT_CONFIG: AppConfig = {
  ohmApiUrl: 'https://api.ohm.sales/v1',
  ohmApiKey: 'ohm_ak_live_72bbda918ca10',
  evolutionApiUrl: 'https://evolution.ohm.sales/instance/butthead_01',
  openaiApiKey: 'sk-proj-••••••••••••••••••••••••8A39',
  silenceStart: '22:00',
  silenceEnd: '08:00',
  globalMessageLimit: 1500,
};

export function Configuracoes() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('butthead_app_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse app config:', e);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('butthead_app_config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans text-slate-100 animate-fade-in" id="configuracoes-container">
      {/* Overview stats header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-glow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display flex items-center gap-2.5">
            <Settings className="h-5.5 w-5.5 text-indigo-400 animate-spin-slow" />
            Configurações do Servidor & APIs
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
            Gerencie endpoints, chaves criptográficas do barramento Ohm e janelas operacionais de escopo de disparo.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core APIs Card */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-glow space-y-5">
          <h3 className="text-xs font-black text-slate-205 uppercase tracking-widest font-display flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-400" />
            Credenciais & Endpoints de Comunicação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5Col font-display">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">URL da API Ohm</label>
              <input
                type="text"
                value={config.ohmApiUrl}
                onChange={(e) => setConfig({ ...config, ohmApiUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5Col font-display">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">Chave de API Ohm (Secret Key)</label>
              <input
                type="password"
                value={config.ohmApiKey}
                onChange={(e) => setConfig({ ...config, ohmApiKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-205 mt-1.5 focus:outline-none placeholder-slate-600"
                required
              />
            </div>

            <div className="space-y-1.5Col font-display">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">URL Evolution API (WhatsApp Gateway)</label>
              <input
                type="text"
                value={config.evolutionApiUrl}
                onChange={(e) => setConfig({ ...config, evolutionApiUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5Col font-display">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">Chave OpenAI API (Modelos de Linguagem)</label>
              <input
                type="password"
                value={config.openaiApiKey}
                onChange={(e) => setConfig({ ...config, openaiApiKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-205 mt-1.5 focus:outline-none placeholder-slate-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Operational Limits / Silence Hours */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-glow space-y-5">
          <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest font-display flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-400" />
            Proteção Anti-Spam & Silenciamento Noturno
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5Col font-display">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">Início Horário de Silêncio</label>
              <input
                type="text"
                placeholder="Ex: 22:00"
                value={config.silenceStart}
                onChange={(e) => setConfig({ ...config, silenceStart: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none font-mono"
                required
              />
            </div>

            <div className="space-y-1.5Col font-display">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">Fim Horário de Silêncio</label>
              <input
                type="text"
                placeholder="Ex: 08:00"
                value={config.silenceEnd}
                onChange={(e) => setConfig({ ...config, silenceEnd: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-202 mt-1.5 focus:outline-none font-mono"
                required
              />
            </div>

            <div className="space-y-1.5Col font-display">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">Limite Global Diário (Mensagens/Dia)</label>
              <input
                type="number"
                min={100}
                max={10000}
                value={config.globalMessageLimit}
                onChange={(e) => setConfig({ ...config, globalMessageLimit: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-3 bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 text-[11px] text-slate-400 leading-relaxed font-medium">
            <ShieldCheck className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <p>
              <strong>Por que o horário de silêncio é obrigatório?</strong> Para emular o comportamento de vendedores humanos ativos no WhatsApp comercial e evitar que o algoritmo de banimento do WhatsApp detecte disparos automatizados repetitivos de madrugada. Durante esse intervalo, as ações agendadas serão acumuladas para as 08:00 do dia seguinte.
            </p>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between border-t border-slate-850 pt-5">
          <div>
            {isSaved && (
              <span className="text-xs text-emerald-450 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5 font-display">
                <ShieldCheck className="h-4 w-4" />
                Configurações gravadas com sucesso!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-650 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-glow-premium flex items-center gap-2 cursor-pointer font-display"
          >
            <Save className="h-4 w-4" />
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
