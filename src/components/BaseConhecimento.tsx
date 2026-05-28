import React, { useState } from 'react';
import { Database, FileText, Upload, Trash2, Eye, ShieldAlert, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { KnowledgeDoc } from '../types';

interface BaseConhecimentoProps {
  documents: KnowledgeDoc[];
  onUploadDoc: (doc: KnowledgeDoc) => void;
  onDeleteDoc: (id: string) => void;
  onUpdateDocStatus: (id: string, status: 'processing' | 'indexed' | 'error', chunks: number) => void;
}

export function BaseConhecimento({
  documents,
  onUploadDoc,
  onDeleteDoc,
  onUpdateDocStatus
}: BaseConhecimentoProps) {
  
  // Create state to simulate upload
  const [fakeFileName, setFakeFileName] = useState('');
  const [fakeFileType, setFakeFileType] = useState('pdf');
  const [fakeContent, setFakeContent] = useState('');
  const [activePreviewDoc, setActivePreviewDoc] = useState<KnowledgeDoc | null>(null);

  const [dragActive, setDragActive] = useState(false);

  // Totals
  const indexDocs = documents.filter(d => d.status === 'indexed').length;
  const errorDocs = documents.filter(d => d.status === 'error').length;
  const processingDocs = documents.filter(d => d.status === 'processing').length;
  const totalChunks = documents.reduce((acc, d) => acc + d.chunks, 0);

  const handleFakeUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fakeFileName.trim()) return alert('Insira o nome do arquivo.');
    if (!fakeContent.trim()) return alert('Insira o conteúdo ou regras do material.');

    // Append extension to make it authentic
    const fullName = fakeFileName.includes('.') 
      ? fakeFileName 
      : `${fakeFileName}.${fakeFileType}`;

    const newDocId = `doc-${Date.now()}`;
    const newDoc: KnowledgeDoc = {
      id: newDocId,
      name: fullName,
      type: fakeFileType,
      status: 'processing',
      chunks: 0,
      contentPreview: fakeContent.trim(),
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    onUploadDoc(newDoc);
    setFakeFileName('');
    setFakeContent('');

    // Simulate vector embedding processing time!
    setTimeout(() => {
      // Pick random chunk count between 12 and 150
      const generatedChunks = Math.floor(Math.random() * 120) + 15;
      onUpdateDocStatus(newDocId, 'indexed', generatedChunks);
    }, 4000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFakeFileName(file.name);
      
      const ext = file.name.split('.').pop() || 'pdf';
      setFakeFileType(ext === 'docx' || ext === 'txt' ? ext : 'pdf');
      
      setFakeContent(`Documento carregado via Drag-and-Drop: ${file.name}.\nTamanho: ${Math.round(file.size / 1024)} KB.\nContém materiais de treinamento de objeções e roteiros de nutrição do Ohm.`);
    }
  };

  return (
    <div className="space-y-6 font-sans" id="base-conhecimento-container">
      {/* High-level status bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800/85 shadow-glow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-400 animate-pulse-glow" />
            Base de Conhecimento IA
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
            Treine seus robôs Butthead indexando arquivos de produtos, scripts de contorno de objeções com embeddings inteligentes.
          </p>
        </div>

        <div className="flex gap-3 self-start sm:self-auto font-mono text-center">
          <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800/80">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-display">Materiais Ativos</p>
            <p className="text-xs font-black text-slate-150 font-mono mt-0.5">{indexDocs} PDFs</p>
          </div>
          <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800/80">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-display font-mono">Chunks de Busca</p>
            <p className="text-xs font-black text-indigo-400 font-mono mt-0.5">{totalChunks}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Upload Form */}
        <div className="lg:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
            <h4 className="text-sm font-bold text-white font-display">Indexar Novo Material</h4>
          </div>

          {/* Simulated Drag-and-Drop dropzone */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`cursor-pointer group relative p-6 rounded-xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-2.5 transition-all ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-500/5' 
                : 'border-slate-800 hover:border-indigo-500/30 hover:bg-slate-950/40'
            }`}
          >
            <div className="p-3 bg-indigo-500/5 text-indigo-400 rounded-xl border border-indigo-500/10 group-hover:scale-105 transition-transform">
              <Upload className="h-5 w-5 animate-pulse-glow" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Arraste seus PDFs ou DOCX aqui</p>
              <p className="text-[10px] text-slate-500 mt-1 font-sans">Limite recomendado de 15MB por arquivo</p>
            </div>
          </div>

          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">Ou use o formulário manual</p>

          <form onSubmit={handleFakeUploadSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block font-display">Nome do Documento</label>
              <input
                type="text"
                placeholder="Ex. FAQ_Promo_Dia_Das_Maes"
                value={fakeFileName}
                onChange={(e) => setFakeFileName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-650 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 font-sans">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block font-display">Formato</label>
                <select
                  value={fakeFileType}
                  onChange={(e) => setFakeFileType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="txt">TXT (.txt)</option>
                  <option value="docx">DOCX (.docx)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block font-display">Motor Vectorial</label>
                <div className="w-full bg-slate-950 px-2 py-2.5 text-[9px] font-bold text-indigo-400 rounded-xl border border-slate-800 font-mono text-center select-none shadow-glow">
                  GEMINI-EMB
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block font-display">Conteúdo ou Instruções</label>
              <textarea
                placeholder="Insira as perguntas, respostas ou scripts comerciais para as quais o bot usará embeddings de busca..."
                value={fakeContent}
                onChange={(e) => setFakeContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider font-display"
            >
              <Database className="h-4 w-4" />
              Indexar no Butthead
            </button>
          </form>
        </div>

        {/* Right Side: Documents List & Preview */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-display mb-4">Arquivos Indexados e Coleções de Embeddings</h4>

            <div className="space-y-3 max-h-[380px] overflow-y-auto">
              {documents.map((doc) => {
                const isProcessing = doc.status === 'processing';
                const isError = doc.status === 'error';
                const isIndexed = doc.status === 'indexed';

                return (
                  <div 
                    key={doc.id}
                    className="p-4 bg-slate-950/45 rounded-xl border border-slate-850 hover:border-slate-805 transition-all flex items-center justify-between flex-wrap gap-4 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400 flex items-center shadow-inner">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap font-sans">
                          <h5 className="text-xs font-bold text-slate-250 font-display">{doc.name}</h5>
                          <span className="text-[9px] font-bold uppercase text-slate-500 font-mono">
                            {doc.createdAt}
                          </span>
                        </div>

                        {/* Status tag */}
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          {isIndexed && (
                            <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 py-0.5 px-2 rounded-lg font-bold flex items-center gap-1 font-mono">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              INDEXADO • {doc.chunks} CHUNKS
                            </span>
                          )}

                          {isProcessing && (
                            <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/15 py-0.5 px-2 rounded-lg font-bold flex items-center gap-1 font-mono animate-pulse">
                              <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                              GERANDO EMBEDDINGS...
                            </span>
                          )}

                          {isError && (
                            <span className="text-[8px] bg-red-500/10 text-red-505 border border-red-500/15 py-0.5 px-2 rounded-lg font-bold flex items-center gap-1 font-mono">
                              <AlertCircle className="h-2.5 w-2.5" />
                              ERRO NA CODIFICAÇÃO
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1.5 items-center ml-auto">
                      {isIndexed && (
                        <button
                          onClick={() => setActivePreviewDoc(doc)}
                          className="bg-slate-900 hover:bg-slate-800 hover:text-white px-3 py-1.5 text-slate-400 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider font-display cursor-pointer"
                          title="Visualizar Chunks"
                        >
                          <Eye className="h-3 w-3 text-indigo-400" />
                          Prever
                        </button>
                      )}
                      
                      <button
                        onClick={() => onDeleteDoc(doc.id)}
                        className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-950 transition-colors cursor-pointer"
                        title="Deletar Documento"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Preview Area */}
          {activePreviewDoc && (
            <div className="bg-slate-900 p-5 rounded-2xl border border-indigo-500/20 shadow-lg animate-fade-in relative">
              <button 
                onClick={() => setActivePreviewDoc(null)}
                className="absolute top-4 right-4 text-xs font-bold text-slate-500 hover:text-white"
              >
                Fechar Preview
              </button>
              
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4.5 w-4.5 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Preview de Embbedings: {activePreviewDoc.name}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                <p className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                  {activePreviewDoc.contentPreview}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-3xs text-slate-500 font-mono mt-3">
                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>Armazenado com sucesso na coleção '{activePreviewDoc.name.replace(/[^a-z0-9]/gi, '_')}' no banco de vetores Butthead.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
