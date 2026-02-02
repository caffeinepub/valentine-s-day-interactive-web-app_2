import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/FloatingHearts';

interface ValentinePageProps {
  onAccept: () => void;
}

const funnyMessages = [
  "Pleaseee 😭",
  "Don't break my heart 💘",
  "Think about it! 🥺",
  "Are you sure? 💔",
  "Give me a chance! 🙏",
  "Pretty please? 🌹",
  "I'll be sad forever 😢",
  "You're killing me! 💀",
  "Just one chance? 🎁",
  "My heart can't take this 💗"
];

export default function ValentinePage({ onAccept }: ValentinePageProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);

  const handleNoClick = () => {
    const newIndex = (messageIndex + 1) % funnyMessages.length;
    setMessageIndex(newIndex);
    setShowMessage(true);
    setYesButtonSize(prev => Math.min(prev + 0.15, 2.5));
  };

  const handleNoHover = () => {
    setShowMessage(true);
  };

  const handleNoLeave = () => {
    setShowMessage(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
        style={{ backgroundImage: 'url(/assets/generated/valentine-background.dim_1920x1080.png)' }}
      />

      <FloatingHearts />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 dark:from-rose-400 dark:via-pink-400 dark:to-purple-400">
              Hey Pallavi!
            </h1>
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold text-rose-700 dark:text-rose-300">
            Will you be my Valentine?
          </h2>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            <div 
              className="transition-transform duration-300"
              style={{ transform: `scale(${yesButtonSize})` }}
            >
              <Button
                onClick={onAccept}
                size="lg"
                className="text-xl md:text-2xl px-12 py-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 font-bold"
              >
                <Heart className="w-6 h-6 mr-2 fill-white" />
                Yes! 💖
              </Button>
            </div>

            <Button
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              onMouseLeave={handleNoLeave}
              variant="outline"
              size="lg"
              className="text-lg md:text-xl px-8 py-6 rounded-full border-2 border-gray-400 hover:border-gray-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-200 font-semibold"
            >
              No
            </Button>
          </div>

          {showMessage && (
            <div className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400 animate-bounce text-center">
              {funnyMessages[messageIndex]}
            </div>
          )}
        </div>

        <p className="mt-12 text-lg text-rose-600/70 dark:text-rose-400/70 font-medium animate-pulse">
          Choose wisely... 💕
        </p>
      </div>
    </div>
  );
}
