import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Courses', href: '#courses' },
    { name: 'Programs', href: '#programs' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.nav
            animate={{
              scale: isScrolled ? 0.95 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Pill-shaped border that appears on scroll */}
            <motion.div
              animate={{
                opacity: isScrolled ? 1 : 0,
                scale: isScrolled ? 1 : 0.8,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-gray-200 bg-white/80 backdrop-blur-xl shadow-lg"
            />
            
            <div className="relative flex items-center justify-between h-16 px-8">
              
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer group"
              >
                <div className="relative mr-4">
                  {/* Main logo circle */}
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full border-2 border-gray-900 relative overflow-hidden bg-white"
                  >
                    {/* Inner animated elements */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360]
                      }}
                      transition={{ 
                        scale: { duration: 2, repeat: Infinity },
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute inset-2 border border-gray-300 rounded-full"
                    />
                    
                    {/* Center dot */}
                    <motion.div
                      animate={{ 
                        backgroundColor: ['#1f2937', '#f59e0b', '#1f2937']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </motion.div>
                  
                  {/* Orbiting dots */}
                  {[0, 120, 240].map((angle, index) => (
                    <motion.div
                      key={index}
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 6 + index, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="absolute inset-0"
                    >
                      <div 
                        className="absolute w-1 h-1 bg-gray-400 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${angle}deg) translateY(-15px) translateX(-50%)`,
                          transformOrigin: '50% 15px'
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                <div className="font-bold text-xl tracking-tight">
                  <span className="text-gray-900">GLA</span>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <motion.a
                      href={item.href}
                      whileHover={{ y: -2 }}
                      className="relative px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 block"
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gray-100"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: hoveredItem === item.name ? 1 : 0,
                          opacity: hoveredItem === item.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Dot indicator */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-gray-900 rounded-full"
                        initial={{ scale: 0, x: '-50%' }}
                        animate={{
                          scale: hoveredItem === item.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-3">
                {/* Language selector */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-200 bg-white/50"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
                  <span className="text-sm font-medium text-gray-700">EN</span>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-gray-400"
                  >
                    ⌄
                  </motion.div>
                </motion.div>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block relative px-6 py-2 text-white font-medium rounded-full bg-gray-900 hover:bg-gray-800 transition-all duration-300 overflow-hidden group"
                >
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative z-10">Get Started</span>
                </motion.a>

                {/* Mobile menu button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMobileMenu}
                  className="lg:hidden relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5 text-gray-900" />
                    ) : (
                      <div className="space-y-1">
                        <motion.div
                          animate={{ 
                            width: isMobileMenuOpen ? '0px' : '16px',
                            opacity: isMobileMenuOpen ? 0 : 1
                          }}
                          className="h-0.5 bg-gray-900 rounded"
                        />
                        <motion.div
                          animate={{ 
                            width: isMobileMenuOpen ? '0px' : '12px',
                            opacity: isMobileMenuOpen ? 0 : 1
                          }}
                          className="h-0.5 bg-gray-900 rounded"
                        />
                        <motion.div
                          animate={{ 
                            width: isMobileMenuOpen ? '0px' : '10px',
                            opacity: isMobileMenuOpen ? 0 : 1
                          }}
                          className="h-0.5 bg-gray-900 rounded"
                        />
                      </div>
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden"
            >
              <div className="p-8 h-full flex flex-col">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </motion.button>
                </div>

                {/* Navigation items */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                      onClick={toggleMobileMenu}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gray-300 mr-4 group-hover:bg-gray-900"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="font-medium text-lg">{item.name}</span>
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-8"
                >
                  <a
                    href="#contact"
                    className="block w-full text-center py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Get Started
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;