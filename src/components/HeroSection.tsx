import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Learn Languages in the 
                <span className="relative">
                  <span className="text-slate-900"> UK, Malta, or Kuwait</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute -bottom-2 left-0 w-full h-1 bg-teal-600 origin-left"
                  />
                </span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-600 leading-relaxed max-w-lg"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Improve your English speaking, listening, reading, and writing skills. Our expert teachers can help you learn English professionally.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors duration-300"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                <span>English Lessons for Adults</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors duration-300"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                <span>Young Learners</span>
              </motion.button>
            </motion.div>

            {/* Professional Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200"
            >
              {[
                { number: '50K+', label: 'Students Worldwide' },
                { number: '25+', label: 'Languages Offered' },
                { number: '50+', label: 'Global Locations' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                    className="text-3xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-slate-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="aspect-[4/5] bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
                      backgroundSize: '40px 40px'
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center p-8">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm"
                  >
                    <Play className="w-10 h-10 text-white ml-1" />
                  </motion.div>
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Watch Our Story
                  </h3>
                  <p className="text-white/90 text-lg">
                    See how we make lifelong connections through language learning
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
              >
                🌍
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500 rounded-full shadow-lg flex items-center justify-center text-white"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                GLA
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-slate-400 text-sm font-medium"
        >
          <div className="flex flex-col items-center space-y-2">
            <span>Scroll</span>
            <div className="w-px h-8 bg-slate-300"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;