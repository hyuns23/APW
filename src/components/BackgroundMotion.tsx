import React from 'react';
import { motion } from 'motion/react';

export const BackgroundMotion = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic 3D Floating Elements */}
      <div className="absolute inset-0 [perspective:1000px]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              z: Math.random() * -500,
              rotateX: Math.random() * 360,
              rotateY: Math.random() * 360 
            }}
            animate={{
              y: ["-10%", "110%"],
              rotateX: [0, 360],
              rotateY: [0, 360],
              z: [Math.random() * -500, Math.random() * 200]
            }}
            transition={{
              duration: 20 + Math.random() * 40,
              repeat: Infinity,
              ease: "linear",
              delay: i * -5
            }}
            className="absolute w-12 h-12 border border-brand-blue/20 bg-brand-blue/5 backdrop-blur-[2px]"
            style={{ transformStyle: 'preserve-3d' }}
          />
        ))}
      </div>

      {/* Connectivity Lines / Neural Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#2E5BFF" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 10 10 L 90 90 M 10 90 L 90 10"
          stroke="url(#lineGrad)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Abstract Data Streams */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1="0" y1={15 * i + "%"} x2="100%" y2={15 * i + 5 + "%"}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            strokeDasharray="40 160"
            animate={{ strokeDashoffset: [-200, 200] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      {/* Pulse Nodes */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-blue rounded-full"
            style={{ 
              left: (25 + Math.random() * 50) + "%", 
              top: (25 + Math.random() * 50) + "%" 
            }}
            animate={{
              scale: [1, 15, 1],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Global Ambient Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
      
      {/* Floating Blobs (Large Glows) */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 40, 0],
          rotate: [0, 45, -45, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] bg-brand-blue/10 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 60, -20, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -left-1/4 w-[70vw] h-[70vw] bg-blue-500/5 rounded-full blur-[100px]"
      />
    </div>
  );
};
