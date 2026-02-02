export default function FloatingHearts() {
  // Generate 15 hearts with random properties
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${8 + Math.random() * 4}s`,
    size: 20 + Math.random() * 30,
    opacity: 0.3 + Math.random() * 0.4
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: heart.left,
            bottom: '-50px',
            animationDelay: heart.animationDelay,
            animationDuration: heart.animationDuration,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
