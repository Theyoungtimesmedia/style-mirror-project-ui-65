
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  artist: string;
  thumbnail: string;
}

const AudioPlayer = ({ audioUrl, title, artist, thumbnail }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [beats, setBeats] = useState<number[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate random beat visualization data
  useEffect(() => {
    const generateBeats = () => {
      const newBeats = Array.from({ length: 32 }, () => Math.random() * 100);
      setBeats(newBeats);
    };

    generateBeats();
    const interval = setInterval(generateBeats, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 text-white shadow-2xl">
      <audio ref={audioRef} src={audioUrl} />
      
      {/* Track Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-16 h-16 rounded-lg object-cover shadow-lg"
        />
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-gray-300">{artist}</p>
        </div>
      </div>

      {/* Beat Visualization */}
      <div className="mb-6 h-16 flex items-end justify-center space-x-1">
        {beats.map((height, index) => (
          <div
            key={index}
            className={`w-2 bg-gradient-to-t transition-all duration-200 rounded-t ${
              isPlaying 
                ? 'from-red-500 to-orange-400 animate-pulse' 
                : 'from-gray-600 to-gray-500'
            }`}
            style={{ 
              height: `${isPlaying ? height * 0.4 + 10 : 20}px`,
              animationDelay: `${index * 0.05}s`
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => skipTime(-10)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={() => skipTime(10)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
