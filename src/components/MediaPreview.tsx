import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, FileText, Download, Image as ImageIcon, Video } from 'lucide-react';

interface MediaPreviewProps {
  type: 'audio' | 'image' | 'video' | 'document';
  url: string;
  label?: string;
  onLightboxOpen: (url: string) => void;
}

export function MediaPreview({ type, url, label, onLightboxOpen }: MediaPreviewProps) {
  // Mini Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState('0:30');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (type === 'audio') {
      audioRef.current = new Audio(url);
      
      const updateProgress = () => {
        if (audioRef.current) {
          const current = audioRef.current.currentTime;
          const total = audioRef.current.duration || 30;
          setProgress((current / total) * 100);
          
          // Format duration elegantly
          const mins = Math.floor(current / 60);
          const secs = Math.floor(current % 60);
          setDuration(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', updateProgress);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [url, type]);

  const toggleAudioPlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.error("Audio play failed:", err));
      setIsPlaying(true);
    }
  };

  if (type === 'audio') {
    return (
      <div className="bg-slate-950/65 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3 w-60 mt-1 font-sans">
        <button
          onClick={toggleAudioPlay}
          className="h-8 w-8 bg-indigo-600 hover:bg-indigo-550 rounded-full flex items-center justify-center text-white cursor-pointer shrink-0 shadow-sm transition"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-slate-350 font-bold truncate leading-none">{label || 'Explicativo de Venda'}</p>
          {/* Custom micro slider track */}
          <div className="h-1 bg-slate-800 rounded-full mt-2 relative overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1 leading-none">
            <span>{isPlaying ? duration : '0:00'}</span>
            <span>0:30</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div className="mt-1.5 relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-950/35 max-w-[180px] cursor-zoom-in" onClick={() => onLightboxOpen(url)}>
        <img 
          src={url} 
          alt={label || 'Imagem stratégica'} 
          className="h-28 w-44 object-cover rounded-xl transition duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="p-1.5 bg-slate-900/80 border border-slate-700 text-white rounded-full">
            <ImageIcon className="h-3.5 w-3.5" />
          </span>
        </div>
        {label && (
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 px-2 py-1 text-[8px] text-slate-300 truncate font-semibold border-t border-slate-850">
            {label}
          </div>
        )}
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className="mt-1.5 relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-950/35 max-w-[180px] cursor-default">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80" 
            alt={label || 'Roteiro estratégica'} 
            className="h-28 w-44 object-cover rounded-xl filter brightness-[0.70]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 bg-slate-900/90 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-400 text-white rounded-full flex items-center justify-center shadow-lg transition duration-200 cursor-pointer"
              title="Abrir Demonstração de Vídeo"
            >
              <Video className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        {label && (
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 px-2 py-1 text-[8px] text-slate-300 truncate font-semibold border-t border-slate-850">
            {label}
          </div>
        )}
      </div>
    );
  }

  // Document type
  return (
    <div className="bg-slate-950/65 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2.5 w-60 mt-1 font-sans">
      <div className="h-8 w-8 bg-slate-900 border border-slate-800 text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
        <FileText className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-300 font-bold truncate leading-tight">{label || 'Documento Técnico'}</p>
        <p className="text-[8px] text-slate-500 font-mono font-bold uppercase mt-0.5">PDF · 3.2 MB</p>
      </div>
      <a
        href={url}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="h-7 w-7 bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400 border border-slate-800 rounded-lg flex items-center justify-center cursor-pointer transition shrink-0"
        title="Baixar Arquivo"
      >
        <Download className="h-3 w-3" />
      </a>
    </div>
  );
}
