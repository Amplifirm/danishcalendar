import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Global Language Academy",
    "Connecting Cultures",
    "Professional Learning",
    "Excellence in Education"
  ];

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // Change text every 1.25 seconds
    const textTimer = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1250);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <div className="text-center relative">
        
        {/* Professional logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Modern GLA logo */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-7xl font-bold text-slate-900 mb-4 tracking-wider"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              GLA
            </motion.div>
            
            {/* Subtle underline animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-teal-600 mx-auto origin-center"
              style={{ width: '120px' }}
            />
          </div>
        </motion.div>

        {/* Professional text animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12 h-8"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-lg text-slate-600 font-medium tracking-wide"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {loadingTexts[currentText]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Professional progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-80 max-w-sm mx-auto"
        >
          <div className="relative">
            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal-600 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Progress percentage */}
            <motion.div
              className="text-center mt-6 text-slate-500 font-medium text-sm tracking-wider"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>

        {/* Minimal geometric elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border border-teal-600 rounded-full"
          />
        </div>
        
        <div className="absolute -bottom-20 -left-20 w-32 h-32 opacity-5">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border border-slate-400"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;