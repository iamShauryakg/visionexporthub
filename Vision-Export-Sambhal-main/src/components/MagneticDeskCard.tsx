import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticDeskCardProps {
  children: React.ReactNode;
  className?: string;
  theme: "dark" | "light";
}

// Lazy-loaded, shared audio context for subtle haptic effects
let hapticAudioCtx: AudioContext | null = null;

const playHapticTick = () => {
  try {
    if (!hapticAudioCtx) {
      hapticAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (hapticAudioCtx.state === "suspended") {
      hapticAudioCtx.resume();
    }

    const ctx = hapticAudioCtx;
    const now = ctx.currentTime;

    // Create custom oscillator and gain node for clean tactile feedback
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Pure, warm sine wave for a physical button/haptic motor click sensation
    osc.type = "sine";
    
    // Quick frequency sweep downward gives the acoustic illusion of mass/weight
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.015);

    // High-precision volume envelope: near-instant 1.5ms attack, 18ms smooth exponential decay to zero
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.012, now + 0.0015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Play immediate transient burst
    osc.start(now);
    osc.stop(now + 0.022);
  } catch (e) {
    // Safe fallback if audio is not permitted or supported
  }
};

export const MagneticDeskCard: React.FC<MagneticDeskCardProps> = ({
  children,
  className = "",
  theme,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Motion values for translation (magnetic pull)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for rotation (3D tilt)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring configurations for smooth organic movement
  const springConfig = { damping: 15, stiffness: 120, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Mouse position relative to card center
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;
    
    // Calculate distance from center (-1 to 1)
    const distanceX = (e.clientX - centerX) / (cardWidth / 2);
    const distanceY = (e.clientY - centerY) / (cardHeight / 2);

    // Magnetic pull: offset up to 8px
    x.set(distanceX * 8);
    y.set(distanceY * 8);

    // 3D tilt: rotate up to 5 degrees
    rotateX.set(-distanceY * 5);
    rotateY.set(distanceX * 5);

    // Spotlight coordinates (relative to card top-left)
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    setSpotlightPos({ x: xPos, y: yPos });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHapticTick();
  };

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          x: springX,
          y: springY,
          rotateX: springRotateX,
          rotateY: springRotateY,
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className={`relative overflow-hidden rounded-none border transition-all duration-300 ${
          isHovered 
            ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]" 
            : theme === "dark" 
              ? "border-zinc-800 bg-zinc-950/30" 
              : "border-zinc-200 bg-zinc-50"
        } ${className}`}
      >
        {/* Dynamic spotlight tracking the cursor */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(150px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(245, 158, 11, 0.15), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Dynamic amber/gold border highlight on hover */}
        <div 
          className={`pointer-events-none absolute inset-0 z-20 border transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          } border-amber-500/40`}
        />

        {/* Content wrapper with translateZ to separate elements slightly in 3D */}
        <div 
          style={{ transform: "translateZ(10px)" }} 
          className="relative z-30 h-full flex flex-col justify-between"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
