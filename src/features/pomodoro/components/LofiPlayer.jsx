import { PLAYLIST } from '../data/lofiData'

export default function LofiPlayer({
  colors,
  currentTrack,
  isAudioPlaying,
  volume,
  audioError,
  onTrackChange,
  onToggleAudio,
  onVolumeChange
}) {
  // ambil warna tema aktif dari props, kalo kosong pake default ungu
  const activeBorder = colors?.border || 'border-purple-500'
  const strokeColor = colors?.stroke || '#8B5CF6'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100/50 dark:border-gray-700/50 relative">
      
      {/* benerin warna css tombol bulat volume biar sesuai sama tema pomodoro */}
      <style>{`
        @keyframes eqBar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        input[type="range"]::-webkit-slider-thumb { background-color: var(--thumb-color) !important; }
        input[type="range"]::-moz-range-thumb { background-color: var(--thumb-color) !important; border: none; width: 14px; height: 14px; border-radius: 50%; }
      `}</style>

      {/* header lofi player dan animasi balok equalizer pas musik nyala */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Lo-Fi Player</h2>
        {isAudioPlaying && (
          <div className="flex items-end gap-0.5 h-4 mb-1">
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.8s ease-in-out infinite 100ms' }}></div>
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.5s ease-in-out infinite 300ms' }}></div>
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.7s ease-in-out infinite 0ms' }}></div>
            <div className="w-0.5 rounded-full" style={{ backgroundColor: strokeColor, animation: 'eqBar 0.6s ease-in-out infinite 200ms' }}></div>
          </div>
        )}
      </div>
      
      {/* looping list playlist buat nampilin semua tombol pilihan musik */}
      <div className="flex flex-wrap gap-2.5 mb-4">
        {PLAYLIST.map((track, i) => {
          const isActive = i === currentTrack
          return (
            <button
              key={track.id}
              onClick={() => onTrackChange(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? `${activeBorder} shadow-sm scale-[1.02]`
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500'
              }`}
              style={isActive ? { backgroundColor: `${strokeColor}26`, color: strokeColor } : {}}
            >
              <span className="text-base">{track.icon}</span>
              <span>{track.name}</span>
            </button>
          )
        })}
      </div>

      {/* nampilin deskripsi lagu yang lagi aktif / dipilih */}
      <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-2 min-h-[20px] px-0.5">
        {PLAYLIST[currentTrack]?.desc || 'Nature ambience'}
      </p>

      {/* error handling otomatis kalo lagu gabisa nyala */}
      {audioError && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400 mb-4 px-0.5">
          ⚠️ {audioError}
        </p>
      )}
      
      {/* kontrol utama tombol play/pause dan geseran slider volume suara */}
      <div className={`flex items-center gap-4 ${audioError ? '' : 'mt-4'}`}>
        
        {/* tombol play bulat, warnanya otomatis ikut tema activeTab pomodoro */}
        <button 
          onClick={onToggleAudio} 
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer shadow-sm text-white hover:opacity-90"
          style={{ backgroundColor: strokeColor }}
        >
          {isAudioPlaying ? (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <rect x="5" y="4" width="4" height="16" rx="1" /><rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* slider volume ngikutin warna fill kiri (pake css linear gradient) */}
        <div className="flex-1 flex items-center gap-2.5 bg-[#fcfbfa] dark:bg-gray-700 px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-600">
          <span className="text-xs opacity-60 select-none">🔈</span>
          <div className="flex-1 flex items-center">
            <input
              type="range" min="0" max="1" step="0.01" value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer outline-none transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full"
              style={{ 
                background: `linear-gradient(to right, ${strokeColor} 0%, ${strokeColor} ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                WebkitAppearance: 'none', appearance: 'none', '--thumb-color': strokeColor
              }}
            />
          </div>
          <span className="text-xs opacity-60 select-none">🔊</span>
        </div>
      </div>

    </div>
  )
}