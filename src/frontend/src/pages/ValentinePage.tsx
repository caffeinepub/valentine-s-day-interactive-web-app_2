import { useState, useRef, useEffect, useMemo } from 'react';
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

interface MessagePosition {
  x: number;
  y: number;
}

export default function ValentinePage({ onAccept }: ValentinePageProps) {
  const [noButtonText, setNoButtonText] = useState("No");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
  const [angle, setAngle] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Generate unique fixed positions for each message once on mount
  const messagePositions = useMemo<Map<string, MessagePosition>>(() => {
    const positions = new Map<string, MessagePosition>();
    
    funnyMessages.forEach((message) => {
      // Generate random position relative to container center
      // These are offset percentages from center
      const xOffset = (Math.random() - 0.5) * 60; // -30% to +30%
      const yOffset = (Math.random() - 0.5) * 60; // -30% to +30%
      
      positions.set(message, { x: xOffset, y: yOffset });
    });
    
    return positions;
  }, []);

  // Calculate safe orbit radius based on viewport size
  const calculateSafeOrbitRadius = (): number => {
    if (!containerRef.current || !noButtonRef.current || !yesButtonRef.current) {
      return 120;
    }

    const container = containerRef.current.getBoundingClientRect();
    const noButton = noButtonRef.current.getBoundingClientRect();
    const yesButton = yesButtonRef.current.getBoundingClientRect();

    const centerX = container.width / 2;
    const centerY = container.height / 2;

    const padding = 30;
    const noButtonHalfWidth = noButton.width / 2;
    const noButtonHalfHeight = noButton.height / 2;
    const yesButtonHalfWidth = (yesButton.width * yesButtonSize) / 2;

    const maxRadiusLeft = centerX - noButtonHalfWidth - padding;
    const maxRadiusRight = centerX - noButtonHalfWidth - padding;
    const maxRadiusTop = centerY - noButtonHalfHeight - padding;
    const maxRadiusBottom = centerY - noButtonHalfHeight - padding;

    const safeRadius = Math.min(
      maxRadiusLeft,
      maxRadiusRight,
      maxRadiusTop,
      maxRadiusBottom,
      180
    );

    const minRadius = yesButtonHalfWidth + noButtonHalfWidth + 40;
    
    return Math.max(safeRadius, minRadius);
  };

  // Position No button in orbit around Yes button
  const positionNoButtonInOrbit = (targetAngle: number) => {
    if (!containerRef.current || !noButtonRef.current || !yesButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const noButton = noButtonRef.current.getBoundingClientRect();

    const orbitRadius = calculateSafeOrbitRadius();

    const offsetX = Math.cos(targetAngle) * orbitRadius;
    const offsetY = Math.sin(targetAngle) * orbitRadius;

    const yesCenterX = container.width / 2;
    const yesCenterY = container.height / 2;

    const noButtonWidth = noButton.width;
    const noButtonHeight = noButton.height;

    let newX = yesCenterX + offsetX - (noButtonWidth / 2);
    let newY = yesCenterY + offsetY - (noButtonHeight / 2);

    const padding = 20;
    const minX = padding;
    const minY = padding;
    const maxX = container.width - noButtonWidth - padding;
    const maxY = container.height - noButtonHeight - padding;

    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    setNoButtonPosition({ x: newX, y: newY });
  };

  // Calculate message position based on pre-assigned coordinates
  const getMessagePosition = (): { left: number; top: number } => {
    if (!containerRef.current || !messageRef.current || !isNoButtonMoving) {
      return { left: 0, top: 0 };
    }

    const container = containerRef.current.getBoundingClientRect();
    const message = messageRef.current.getBoundingClientRect();
    const currentMessage = funnyMessages[messageIndex];
    const assignedPosition = messagePositions.get(currentMessage);

    if (!assignedPosition) {
      return { left: 0, top: 0 };
    }

    // Calculate position based on assigned percentages from center
    const centerX = container.width / 2;
    const centerY = container.height / 2;
    
    const targetX = centerX + (assignedPosition.x / 100) * container.width;
    const targetY = centerY + (assignedPosition.y / 100) * container.height;

    // Ensure message stays within boundaries
    const padding = 20;
    const messageWidth = message.width;
    const messageHeight = message.height;

    let finalX = targetX - messageWidth / 2;
    let finalY = targetY - messageHeight / 2;

    // Clamp to viewport boundaries
    finalX = Math.max(padding, Math.min(finalX, container.width - messageWidth - padding));
    finalY = Math.max(padding, Math.min(finalY, container.height - messageHeight - padding));

    return { left: finalX, top: finalY };
  };

  // Handle window resize to recalculate orbit
  useEffect(() => {
    if (!isNoButtonMoving) return;

    const handleResize = () => {
      positionNoButtonInOrbit(angle);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNoButtonMoving, angle, yesButtonSize]);

  const handleNoClick = () => {
    if (!containerRef.current || !noButtonRef.current || !yesButtonRef.current) return;

    const angleIncrement = Math.PI / 4;
    const newAngle = angle + angleIncrement;
    setAngle(newAngle);

    positionNoButtonInOrbit(newAngle);
    setIsNoButtonMoving(true);
    
    const newIndex = (messageIndex + 1) % funnyMessages.length;
    setMessageIndex(newIndex);
    setNoButtonText(funnyMessages[newIndex]);

    setYesButtonSize(prev => Math.min(prev + 0.15, 2.5));
  };

  const handleNoHover = () => {
    if (isNoButtonMoving) {
      handleNoClick();
    }
  };

  const messagePosition = getMessagePosition();

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950"
    >
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

        <div className="relative w-full max-w-2xl h-64 md:h-80">
          {!isNoButtonMoving ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
              <div 
                ref={yesButtonRef}
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
                ref={noButtonRef}
                onClick={handleNoClick}
                variant="outline"
                size="lg"
                className="text-lg md:text-xl px-8 py-6 rounded-full border-2 border-gray-400 hover:border-gray-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-200 font-semibold"
              >
                {noButtonText}
              </Button>
            </div>
          ) : (
            <>
              <div 
                ref={yesButtonRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                style={{ transform: `translate(-50%, -50%) scale(${yesButtonSize})` }}
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
                ref={noButtonRef}
                onClick={handleNoClick}
                onMouseEnter={handleNoHover}
                variant="outline"
                size="lg"
                className="absolute text-lg md:text-xl px-8 py-6 rounded-full border-2 border-gray-400 hover:border-gray-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm font-semibold whitespace-nowrap"
                style={{
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                  transition: 'left 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), top 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
              >
                {noButtonText}
              </Button>

              {/* Message displayed at fixed assigned position */}
              <div
                ref={messageRef}
                className="absolute text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400 pointer-events-none whitespace-nowrap"
                style={{
                  left: `${messagePosition.left}px`,
                  top: `${messagePosition.top}px`,
                  transition: 'left 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), top 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s ease-in-out',
                  opacity: isNoButtonMoving ? 1 : 0,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {funnyMessages[messageIndex]}
              </div>
            </>
          )}
        </div>

        <p className="mt-12 text-lg text-rose-600/70 dark:text-rose-400/70 font-medium animate-pulse">
          Choose wisely... 💕
        </p>
      </div>
    </div>
  );
}
