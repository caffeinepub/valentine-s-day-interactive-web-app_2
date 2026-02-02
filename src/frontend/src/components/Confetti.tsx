import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  animationDelay: number;
  color: string;
  rotation: number;
  size: number;
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Generate confetti pieces
    const colors = ['#ff69b4', '#ff1493', '#ff6b9d', '#c71585', '#db7093', '#ffc0cb', '#ffb6c1'];
    const newPieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: 8 + Math.random() * 8
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            animationDelay: `${piece.animationDelay}s`,
            transform: `rotate(${piece.rotation}deg)`
          }}
        >
          <div
            className="rounded-sm"
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color
            }}
          />
        </div>
      ))}
    </div>
  );
}
