import { useEffect, useState } from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/Confetti';

interface SuccessPageProps {
  onReset: () => void;
}

export default function SuccessPage({ onReset }: SuccessPageProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
        style={{ backgroundImage: 'url(/assets/generated/valentine-background.dim_1920x1080.png)' }}
      />

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center space-y-8 max-w-3xl">
          {/* Heart explosion image */}
          <div className="flex justify-center mb-8 animate-bounce">
            <img 
              src="/assets/generated/heart-explosion-transparent.dim_400x400.png" 
              alt="Hearts"
              className="w-48 h-48 md:w-64 md:h-64 drop-shadow-2xl"
            />
          </div>

          {/* Success message */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 dark:from-rose-400 dark:via-pink-400 dark:to-purple-400">
                YES!!!
              </h1>
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
            </div>

            <p className="text-2xl md:text-4xl font-semibold text-rose-700 dark:text-rose-300 leading-relaxed">
              Yay! You've made me the happiest person alive! 💕
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-4xl md:text-6xl mt-8">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>💖</span>
              <span className="animate-bounce" style={{ animationDelay: '100ms' }}>💕</span>
              <span className="animate-bounce" style={{ animationDelay: '200ms' }}>💗</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>💓</span>
              <span className="animate-bounce" style={{ animationDelay: '400ms' }}>💝</span>
            </div>
          </div>

          {/* Reset button */}
          <div className="mt-12">
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-full border-2 border-rose-400 hover:border-rose-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
