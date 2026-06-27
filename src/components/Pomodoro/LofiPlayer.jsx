import { PLAYLIST } from '../../data/pomodoro/lofiData'

export default function LofiPlayer({
  colors,
  currentTrack,
  isAudioPlaying,
  volume,
  onTrackChange,
  onToggleAudio,
  onVolumeChange
}) {
  // Hitung persentase untuk slider volume
  const volumePercent = volume * 100

  // Fallback warna jika properti colors belum nge-load dengan benar
  const activeBorder = colors?.border || 'border-purple-500'
  const activeBg = colors?.bgLight || 'bg-purple-50'
  const activeText = colors?.text || 'text-purple-600'
  const strokeColor = colors?.stroke || '#8B5CF6' // Warna ungu/biru tema aktif

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100/50 relative">
      
      {/* JUDUL DAN AUDIO EQUALIZER MINI */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-900">Lo-Fi Player</h2>
        {isAudioPlaying && (
          <div className="flex items-end gap-0.5 h-4 mb-1">
            <style>{`
              @keyframes eqBar {
                0%, 100% { height: 4px; }
                50% { height: 16px; }
              }
            `}</style>
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.8s ease-in-out infinite 100ms' }}></div>
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.5s ease-in-out infinite 300ms' }}></div>
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.7s ease-in-out infinite 0ms' }}></div>
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.6s ease-in-out infinite 200ms' }}></div>
          </div>
        )}
      </div>
      
      {/* SELEKSI TRACK LAGU */}
      <div className="flex flex-wrap gap-2.5 mb-4">
        {PLAYLIST.map((track, i) => (
          <button
            key={track.id}
            onClick={() => onTrackChange(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
              i === currentTrack
                ? `${activeBorder} ${activeBg} ${activeText} shadow-sm scale-[1.02]`
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-base">{track.icon}</span>
            <span>{track.name}</span>
          </button>
        ))}
      </div>

      {/* DESKRIPSI AMBIENCE */}
      <p className="text-sm font-medium text-gray-400 mb-6 min-h-[20px] px-0.5">
        {PLAYLIST[currentTrack]?.desc || 'Nature ambience'}
      </p>
      
      {/* TOMBOL PLAY BULAT + SLIDER VOLUME */}
      <div className="flex items-center gap-4">
        
        {/* Tombol Play / Pause Bulat Mengikuti Warna Tema */}
        <button 
          onClick={onToggleAudio} 
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer shadow-sm text-white hover:opacity-90"
          style={{ backgroundColor: strokeColor }}
        >
          {isAudioPlaying ? (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Slider Volume dengan Isian Warna Sisi Kiri Simetris */}
        <div className="flex-1 flex items-center gap-2.5 bg-[#fcfbfa] px-4 py-2 rounded-2xl border border-gray-100">
          <span className="text-xs opacity-60 select-none">🔈</span>
          
          <div className="flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer outline-none transition-all"
              style={{ 
                background: `linear-gradient(to right, ${strokeColor} 0%, ${strokeColor} ${volumePercent}%, #e5e7eb ${volumePercent}%, #e5e7eb 100%)`,
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>
          
          <span className="text-xs opacity-60 select-none">🔊</span>
        </div>
      </div>

    </div>
  )
}