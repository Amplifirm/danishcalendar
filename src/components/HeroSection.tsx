import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-yellow-400 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0" 
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'reverse',
            ease: 'linear'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, black 2px, transparent 2px)',
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-black/20 rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${20 + Math.sin(i) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center space-y-12">
          
          {/* Main heading with staggered animation */}
          <div className="space-y-6">
            {['SPEAK', 'THE', 'WORLD'].map((word, index) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none tracking-tight"
                >
                  <motion.span
                    animate={{ 
                      textShadow: [
                        '0px 0px 0px rgba(0,0,0,0.3)',
                        '3px 3px 0px rgba(0,0,0,0.3)',
                        '0px 0px 0px rgba(0,0,0,0.3)',
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {word}
                  </motion.span>
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subtitle with typewriter effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative"
          >
            <p className="text-xl md:text-2xl text-black/80 max-w-3xl mx-auto font-medium">
              Learn languages from native speakers worldwide. 
              Get 5 months free online courses and join 50,000+ students.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-black/30 max-w-3xl"
            />
          </motion.div>

          {/* CTA buttons with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 0 rgba(0,0,0,0.3)',
                  '0 5px 15px rgba(0,0,0,0.3)',
                  '0 0 0 rgba(0,0,0,0.3)',
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              className="group px-8 py-4 bg-black text-yellow-400 text-lg font-bold rounded-full flex items-center gap-2 hover:bg-black/90 transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <span className="relative z-10">Start Learning Free</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                backgroundColor: 'rgba(0,0,0,1)',
                color: 'rgb(251, 191, 36)'
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 border-2 border-black text-black text-lg font-bold rounded-full flex items-center gap-2 transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="relative z-10"
              >
                <Play size={20} />
              </motion.div>
              <span className="relative z-10">Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats with counter animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16"
          >
            {[
              { number: '50K+', label: 'Active Students', delay: 0 },
              { number: '25+', label: 'Languages', delay: 0.2 },
              { number: '50+', label: 'Countries', delay: 0.4 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.6 + stat.delay,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center cursor-pointer"
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-black text-black mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-black/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <motion.span 
            className="text-black/50 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <div className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-black/50 rounded-full mt-2"
            />
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;