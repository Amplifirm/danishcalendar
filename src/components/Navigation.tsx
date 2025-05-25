import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Learn English', href: '#learn' },
    { name: 'Courses', href: '#courses' },
    { name: 'Colleges', href: '#colleges' },
    { name: 'Get 35% off', href: '#offer' },
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
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.nav
            animate={{
              scale: isScrolled ? 0.98 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Pill-shaped background */}
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/50' 
                : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`} />
            
            <div className="relative flex items-center justify-between h-16 px-8">
              
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  {/* Professional logo */}
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                    <span 
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      GLA
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div 
                      className={`font-bold text-lg transition-colors duration-300 ${
                        isScrolled ? 'text-slate-900' : 'text-slate-900'
                      }`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Global Language Academy
                    </div>
                    <div className="text-xs text-teal-600 font-medium tracking-wider">
                      Great Things Start Here
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -1 }}
                    className="font-medium transition-colors duration-300 relative group text-slate-700 hover:text-teal-600 px-3 py-2"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
                  </motion.a>
                ))}
              </div>

              {/* Right side - CTA Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 border border-orange-500 text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 text-sm"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Book Adults
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors duration-300 text-sm"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Book Young Learners
                </motion.button>
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg transition-colors duration-300 text-slate-900 hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 lg:hidden border border-slate-200"
            >
              <div className="p-6">
                {/* Navigation items */}
                <nav className="space-y-4 mb-6">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="block py-3 px-4 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 font-medium"
                      onClick={toggleMobileMenu}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-3 pt-4 border-t border-slate-200"
                >
                  <button
                    className="w-full py-3 border border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors"
                    onClick={toggleMobileMenu}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Book Adults
                  </button>
                  <button
                    className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                    onClick={toggleMobileMenu}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Book Young Learners
                  </button>
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