import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  BookOpen, CheckCircle, AlertCircle, GraduationCap, Users, Scale,
  Clock, Sparkles, Star, BookMarked, Globe, ArrowRight, ChevronDown,
  Heart, Compass, Shield, Gift, BookOpen as BookIcon,
  DollarSign, HandHeart, Loader, Menu, X
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://fsfrxllzwywtkximmhwb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZnJ4bGx6d3l3dGt4aW1taHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjM0MTIsImV4cCI6MjA0ODEzOTQxMn0.VlvM23-l0l1o1xXRGGyAo6U-auR0ClTaCdxc2S2WdEc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

//change for jai

console.log(supabase)
// Form state type
type FormState = {
  fullName: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
  acceptTerms: boolean;
};

// Form submission states
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

// Navigation items
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "courses", label: "Courses" },
  { id: "donate", label: "Donate" },
  { id: "benefits", label: "Benefits" }
];

// Donation purposes displayed in the section
const donationPurposes = [
  {
    title: "Feed the Hungry",
    description: "Provide nutritious meals to those in need, especially during Eid festivities and Ramadan.",
    icon: <Gift className="w-6 h-6" />
  },
  {
    title: "Support War-Torn Regions",
    description: "Aid those in conflict zones who face the compounded stresses of poverty and displacement.",
    icon: <HandHeart className="w-6 h-6" />
  },
  {
    title: "Help Orphans & Families",
    description: "Reach out to the most vulnerable people, showing them that others around the world care.",
    icon: <Users className="w-6 h-6" />
  }
];

// Potential course offerings
const potentialCourses = [
  {
    id: 'foundations-islamic-ethics',
    title: 'Foundations of Islamic Ethics',
    description: 'Dive deep into the ethical framework that guides Islamic thought and practice, exploring both classical and contemporary applications.',
    duration: '8 weeks',
    level: 'All Levels',
    icon: <BookOpen className="w-full h-full" />
  },
  {
    id: 'quran-interpretation',
    title: 'Quranic Interpretation & Analysis',
    description: 'Discover the rich tapestry of Quranic exegesis through a balanced approach that honors tradition while engaging modern scholarship.',
    duration: '10 weeks',
    level: 'Intermediate',
    icon: <BookMarked className="w-full h-full" />
  },
  {
    id: 'ahlul-bayt-teachings',
    title: 'Teachings of Ahlul Bayt',
    description: 'Explore the profound spiritual and intellectual legacy of the Prophet\'s household and their enduring influence on Islamic thought.',
    duration: '12 weeks',
    level: 'All Levels',
    icon: <Star className="w-full h-full" />
  },
  {
    id: 'islamic-philosophy',
    title: 'Islamic Philosophy',
    description: 'Journey through the golden age of Islamic philosophical thought and its dialogue with other intellectual traditions throughout history.',
    duration: '10 weeks',
    level: 'Advanced',
    icon: <Sparkles className="w-full h-full" />
  },
  {
    id: 'interfaith-dialogue',
    title: 'Interfaith Dialogue & Understanding',
    description: 'Develop the knowledge and skills needed for meaningful engagement across religious boundaries in our diverse global society.',
    duration: '6 weeks',
    level: 'All Levels',
    icon: <Globe className="w-full h-full" />
  }
];

// Educational principles based on Islamic teachings
const educationalPrinciples = [
  {
    title: "Seeking Knowledge",
    description: "Education is the highest blessing after the blessing of life itself",
    icon: <BookIcon className="w-full h-full" />
  },
  {
    title: "Practice What You Learn",
    description: "Knowledge without action is like a tree without fruit",
    icon: <Scale className="w-full h-full" />
  },
  {
    title: "Pure Intentions",
    description: "Seek knowledge with the intention of drawing closer to Allah",
    icon: <Heart className="w-full h-full" />
  },
  {
    title: "Respect for Teachers",
    description: "Honor those who guide you in knowledge as they are in the place of your father",
    icon: <GraduationCap className="w-full h-full" />
  },
  {
    title: "Continuous Learning",
    description: "The path of knowledge is a lifelong journey of growth and understanding",
    icon: <Compass className="w-full h-full" />
  },
  {
    title: "Ethical Character",
    description: "True knowledge leads to humility and refinement of character",
    icon: <Shield className="w-full h-full" />
  }
];

// Islamic quotes
const islamicQuotes = [
  {
    quote: "It is the education which differentiates a man from an animal. After the blessing of life, blessing of education is mentioned.",
    author: "Wasiyatnama, Abdullah al-Mamaqani"
  },
  {
    quote: "Knowledge without practice is like a tree without fruits.",
    author: "Sayed Mahdi Modarresi"
  },
  {
    quote: "The status of an Alim is more than that of a person who is fasting, one who prays the whole night and one who fights in the way of Allah.",
    author: "Imam Ja'far as-Sadiq (a.s.)"
  },
  {
    quote: "O people! The completion of religion is to obtain knowledge and to act on it. It is more compulsory to obtain knowledge than to obtain wealth.",
    author: "Hazrat 'Ali (a.s.)"
  }
];

// Main App Component
const App: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    courseInterest: '',
    message: '',
    acceptTerms: false
  });

  // Random quote selection
  const [randomQuote, setRandomQuote] = useState(islamicQuotes[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * islamicQuotes.length);
    setRandomQuote(islamicQuotes[randomIndex]);
  }, []);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Submission status
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Active section tracking
  const [activeSection, setActiveSection] = useState("home");
  
  // Track if we're over a white section for navbar styling
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);

  // Scroll progress
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  
  // References to white sections for navbar styling
  const aboutSectionRef = useRef(null);
  const coursesSectionRef = useRef(null);
  const benefitsSectionRef = useRef(null);
  
  // Check if about section is in view
  const isAboutInView = useInView(aboutSectionRef, { amount: 0.3 });
  const isCoursesInView = useInView(coursesSectionRef, { amount: 0.3 });
  const isBenefitsInView = useInView(benefitsSectionRef, { amount: 0.3 });
  
  // Update navbar styling based on which section is in view
  useEffect(() => {
    setIsOverWhiteSection(isAboutInView || isCoursesInView || isBenefitsInView);
  }, [isAboutInView, isCoursesInView, isBenefitsInView]);

  // Monitor scroll position
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setHasScrolled(latest > 50);
    });
  }, [scrollY]);

  // Handle intersection observation for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth"
      });
      setMobileMenuOpen(false); // Close mobile menu when navigating
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission with Supabase integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.courseInterest || !formData.acceptTerms) {
      setErrorMessage('Please complete all required fields and accept the terms.');
      setSubmissionStatus('error');
      return;
    }
    
    setSubmissionStatus('submitting');
    
    try {
      // Submit to Supabase via anonymous REST endpoint to bypass RLS issues
      const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          course_interest: formData.courseInterest,
          message: formData.message || null,
          status: 'pending'
        })
      });
      
      if (!response.ok) {
        // Handle specific HTTP error responses
        if (response.status === 409) {
          throw new Error('This email is already registered. Please use a different email address.');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error submitting your application.');
        }
      }
      
      // Store a local copy for backup - can be removed in production
      const storedSubmissions = localStorage.getItem('courseSubmissions');
      const submissions = storedSubmissions ? JSON.parse(storedSubmissions) : [];
      submissions.push({
        ...formData,
        id: `submission-${Date.now()}`,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('courseSubmissions', JSON.stringify(submissions));
      
      // Success state
      setSubmissionStatus('success');
      
      // Scroll to success message
      const successElement = document.getElementById('success-message');
      if (successElement) {
        successElement.scrollIntoView({ behavior: 'smooth' });
      }
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || 'There was an error submitting your application. Please try again later.');
      setSubmissionStatus('error');
    }
  };

  // Go directly to donation page
  const goToDonationPage = () => {
    window.open("https://gofund.me/eb3d31df", "_blank");
  };
  
  // Brand colors based on screenshot
  const colors = {
    background: "#0B1121", // Slightly darker than original
    cardBg: "#102035", 
    accent: "#34B77A", // More professional green shade
    accentHover: "#2A9D68",
    darkSection: "#070E1B",
    text: "#FFFFFF",
    textSecondary: "#94A3B8",
    border: "rgba(52, 183, 122, 0.2)"
  };

  return (
    <div className="relative min-h-screen font-['Inter'] text-white" style={{ background: colors.background }}>
      {/* Add Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12]"></div>
        {/* Dynamic animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: colors.accent,
                opacity: 0.1
              }}
              animate={{
                y: [0, Math.random() * 300 - 150],
                x: [0, Math.random() * 300 - 150],
                opacity: [0.05, 0.15, 0.05],
                scale: [1, Math.random() * 1.5 + 0.5, 1]
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced Navbar */}
      <header className="fixed top-0 left-0 w-full z-40 py-6">
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.nav 
            className={`
              ${hasScrolled ? (isOverWhiteSection ? `bg-${colors.background}/90 backdrop-blur-xl shadow-xl` : 'bg-white/5 backdrop-blur-xl shadow-xl') : 'bg-transparent'} 
              rounded-xl py-3 px-6 transition-all duration-500 
              border border-${colors.border}
              flex items-center justify-between
            `}
            animate={{
              padding: hasScrolled ? "0.75rem 1.5rem" : "1rem 2rem",
              backgroundColor: hasScrolled ? (isOverWhiteSection ? `rgba(11, 17, 33, 0.9)` : "rgba(255, 255, 255, 0.05)") : "transparent",
              backdropFilter: hasScrolled ? "blur(16px)" : "blur(0px)"
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Logo */}
            <motion.a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} 
              className="text-2xl font-bold flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <span className="hidden sm:block text-white tracking-wide">SMM</span>
            </motion.a>
            
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? `text-white bg-${colors.accent} shadow-lg shadow-${colors.accent}/20`
                      : isOverWhiteSection 
                        ? `text-${colors.accent} hover:bg-${colors.accent}/10 hover:text-white` 
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: activeSection === item.id ? colors.accent : 'transparent',
                    color: activeSection === item.id ? 'white' : isOverWhiteSection ? colors.accent : '#E2E8F0'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.a
                href="#join"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("join");
                }}
                className="ml-1 px-6 py-2 rounded-lg font-medium transition-colors shadow-lg"
                style={{ 
                  backgroundColor: colors.accent, 
                  color: 'white',
                  boxShadow: `0 10px 15px -3px ${colors.accent}20`
                }}
                whileHover={{ scale: 1.05, backgroundColor: colors.accentHover }}
                whileTap={{ scale: 0.95 }}
              >
                Join
              </motion.a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button 
                className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </motion.nav>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-2 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
                style={{ 
                  backgroundColor: `${colors.background}e6`,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <div className="py-4 px-2 space-y-1">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`block mx-2 px-4 py-3 rounded-lg text-base font-medium`}
                      style={{
                        backgroundColor: activeSection === item.id ? colors.accent : 'transparent',
                        color: activeSection === item.id ? 'white' : '#E2E8F0'
                      }}
                      whileHover={{ x: 8, backgroundColor: activeSection === item.id ? colors.accent : 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  
                  <motion.a
                    href="#join"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("join");
                    }}
                    className="block mx-2 mt-4 px-4 py-3 rounded-lg font-medium transition-colors text-center shadow-lg"
                    style={{
                      backgroundColor: colors.accent,
                      color: 'white',
                      boxShadow: `0 10px 15px -3px ${colors.accent}30`
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: colors.accentHover }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Now
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
      
      {/* Main Content */}
      <div className="pt-32">
        {/* SECTION 1: Hero Section */}
        <section id="home" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-6 py-2 mb-8 rounded-full backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${colors.accent}10`, 
                    borderWidth: 1, 
                    borderColor: `${colors.accent}30` 
                  }}
                >
                  <span className="text-base font-medium" style={{ color: colors.accent }}>✨ Exclusive Pre-Registration Open</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white tracking-tight"
                >
                  Welcome to the 
                  <span className="block mt-3" style={{ color: colors.accent }}>
                    Official Website of
                  </span>
                  <span className="block mt-3" style={{ color: colors.accent }}>
                    Sayed Mahdi Modarresi
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 text-xl text-gray-300 leading-relaxed"
                >
                  Dedicated to spreading knowledge and understanding through education and interfaith dialogue. Join us in exploring Islamic teachings and wisdom.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 flex flex-col sm:flex-row gap-6"
                >
                  <motion.button
                    onClick={() => scrollToSection("join")}
                    className="px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center shadow-xl"
                    style={{ 
                      backgroundColor: colors.accent, 
                      color: 'white',
                      boxShadow: `0 10px 15px -3px ${colors.accent}30`,
                      borderWidth: 1,
                      borderColor: colors.accent
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: colors.accentHover }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">Secure Your Spot</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => scrollToSection("donate")}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg text-white
                      font-medium transition-all flex items-center justify-center shadow-lg"
                    style={{ 
                      borderWidth: 1,
                      borderColor: `${colors.accent}30` 
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">Donate Now</span>
                    <Heart className="w-5 h-5 ml-2" />
                  </motion.button>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pl-6 py-3"
                  style={{ borderLeftWidth: 4, borderColor: colors.accent }}
                >
                  <p className="text-xl text-gray-200 italic">"{randomQuote.quote}"</p>
                  <p className="font-medium mt-3" style={{ color: colors.accent }}>— {randomQuote.author}</p>
                </motion.div>
              </div>
              
              {/* Hero Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-2xl backdrop-blur-xl p-10 
                  shadow-2xl aspect-square max-w-md mx-auto flex flex-col items-center justify-center text-center"
                  style={{ 
                    backgroundColor: colors.darkSection,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "mirror",
                      repeatDelay: 3
                    }}
                  >
                    <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-8"
                      style={{ background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})` }}
                    >
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Sayed Mahdi Modarresi
                  </h3>
                  
                  <p className="text-lg mb-6" style={{ color: colors.accent }}>Islamic Scholar & Speaker</p>
                  
                  <p className="text-gray-200 mb-10 text-lg">
                    "Knowledge illuminates the path of those who seek it with sincere hearts."
                  </p>
                  
                  <motion.button
                    onClick={() => scrollToSection("about")}
                    className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10
                      text-white transition-all flex items-center text-lg font-medium"
                    style={{ 
                      borderWidth: 1,
                      borderColor: `${colors.accent}20`
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronDown className="w-5 h-5 ml-2" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Decorative floating elements */}
                <motion.div 
                  className="absolute -top-10 -left-10 w-20 h-20 rounded-full backdrop-blur-xl z-10"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${colors.accent}10, ${colors.accentHover}10)`,
                    borderWidth: 1,
                    borderColor: `${colors.accent}10`
                  }}
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 45, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full backdrop-blur-xl z-10"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${colors.accent}10, ${colors.accentHover}10)`,
                    borderWidth: 1,
                    borderColor: `${colors.accent}10`
                  }}
                  animate={{ 
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    rotate: [0, -30, 0]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
                <motion.div 
                  className="absolute top-1/3 -right-8 w-12 h-12 rounded-lg backdrop-blur-xl z-10"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${colors.accent}10, ${colors.accentHover}10)`,
                    borderWidth: 1,
                    borderColor: `${colors.accent}10`
                  }}
                  animate={{ 
                    y: [0, 30, 0],
                    rotate: [0, 90, 0]
                  }}
                  transition={{ 
                    duration: 9, 
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* SECTION 2: About */}
        <section id="about" ref={aboutSectionRef} className="py-24 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4"
                style={{ color: colors.accent }}
              >
                About the Scholar
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6"
              >
                Meet Sayed Mahdi <span style={{ color: colors.accent }}>Modarresi</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                A distinguished Islamic scholar dedicated to making profound wisdom accessible to all seekers of knowledge.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Profile Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-lg p-8 rounded-lg shadow-xl h-full relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.cardBg,
                  borderWidth: 1,
                  borderColor: `${colors.accent}20`
                }}>
                  {/* Decorative shapes */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  
                  <div className="relative">
                    <div className="aspect-square rounded-lg relative overflow-hidden mb-8 shadow-lg"
                      style={{ 
                        backgroundColor: colors.darkSection,
                        borderWidth: 1,
                        borderColor: `${colors.accent}20`
                      }}>
                      
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-8">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 1.5 }}
                          >
                            <div className="w-24 h-24 rounded-lg flex items-center justify-center mx-auto mb-6"
                              style={{ background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})` }}
                            >
                              <GraduationCap className="w-12 h-12 text-white" />
                            </div>
                          </motion.div>
                          
                          <div className="text-2xl font-bold text-white">
                            Sayed Mahdi Modarresi
                          </div>
                          
                          <div className="mt-2 text-lg" style={{ color: colors.accent }}>
                            Islamic Scholar & Speaker
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-center">
                      <h3 className="text-2xl font-bold text-white">Academic Background</h3>
                      <div className="flex flex-col space-y-4 mt-6">
                        {[
                          "Extensive Classical Islamic Education",
                          "PhD in Islamic Studies",
                          "Author of Multiple Publications",
                          "International Speaker & Lecturer"
                        ].map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center p-3 rounded-lg shadow-md"
                            style={{ 
                              backgroundColor: colors.darkSection,
                              borderWidth: 1,
                              borderColor: `${colors.accent}10`
                            }}
                            whileHover={{ x: 5, backgroundColor: "#14213D" }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <div className="w-3 h-3 rounded-full mr-3" 
                              style={{ background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})` }}></div>
                            <span className="text-gray-300 font-medium">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Bio/Philosophy Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-lg p-8 rounded-lg shadow-xl h-full relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.cardBg,
                  borderWidth: 1,
                  borderColor: `${colors.accent}20`
                }}>
                  {/* Decorative shapes */}
                  <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  
                  <div className="relative">
                    <h3 className="text-3xl font-bold text-white mb-6">
                      Teaching Philosophy
                    </h3>
                    
                    <div className="space-y-6 text-gray-300">
                      <p className="text-xl">
                        My approach bridges classical Islamic scholarship with contemporary understanding, making timeless wisdom relevant to modern life.
                      </p>
                      
                      <p className="italic text-xl p-4 rounded-lg shadow-md"
                        style={{ 
                          color: colors.accent,
                          backgroundColor: colors.darkSection,
                          borderWidth: 1,
                          borderColor: `${colors.accent}10`
                        }}>
                        "Knowledge without practice is like a tree without fruit. Our goal is not merely to learn, but to transform through what we learn."
                      </p>
                      
                      <div className="space-y-6 mt-8">
                        <h4 className="text-2xl font-semibold text-white">Core Principles:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Authenticity",
                              description: "Grounding all teaching in authoritative Islamic sources"
                            },
                            {
                              title: "Accessibility",
                              description: "Making complex concepts understandable to diverse audiences"
                            },
                            {
                              title: "Critical Thinking",
                              description: "Encouraging thoughtful engagement rather than uncritical acceptance"
                            },
                            {
                              title: "Contemporary Relevance",
                              description: "Connecting classical wisdom to modern challenges"
                            }
                          ].map((principle, index) => (
                            <motion.div 
                              key={index} 
                              className="flex p-4 rounded-lg shadow-md"
                              style={{ 
                                backgroundColor: colors.darkSection,
                                borderWidth: 1,
                                borderColor: `${colors.accent}10`
                              }}
                              whileHover={{ scale: 1.02, backgroundColor: "#14213D" }}
                            >
                              <div className="mt-1 mr-4 flex-shrink-0">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                                  style={{ background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})` }}
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-lg" style={{ color: colors.accent }}>{principle.title}</p>
                                <p className="text-gray-300">{principle.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Featured Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="px-10 py-10 rounded-lg shadow-2xl"
              style={{ 
                backgroundColor: colors.darkSection,
                borderWidth: 1,
                borderColor: `${colors.accent}20`
              }}
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="text-6xl font-serif" style={{ color: `${colors.accent}30` }}>"</div>
                <p className="text-3xl text-white italic mb-4 font-light">
                  It is the education which differentiates a man from an animal. After the blessing of life, blessing of education is mentioned.
                </p>
                <p className="font-medium" style={{ color: colors.accent }}>
                  — Wasiyatnama, Abdullah al-Mamaqani
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* SECTION 3: Islamic Education */}
        <section id="education" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4"
                style={{ color: colors.accent }}
              >
                The Importance of Knowledge
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6"
              >
                Islamic <span style={{ color: colors.accent }}>Educational Principles</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                "The completion of religion is to obtain knowledge and to act on it. It is more compulsory to obtain knowledge than to obtain wealth."
              </motion.p>
            </div>
            
            {/* Educational Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {educationalPrinciples.map((principle, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-lg p-8 rounded-lg shadow-xl flex flex-col items-center text-center"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: `0 25px 50px -12px ${colors.accent}15`,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                      boxShadow: `0 10px 15px -3px ${colors.accent}20`
                    }}
                  >
                    {principle.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {principle.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Wisdom Quotes Section */}
            <div className="my-16 py-16" style={{ 
              borderTopWidth: 1, 
              borderBottomWidth: 1,
              borderColor: `${colors.accent}10`
            }}>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center text-white mb-12"
              >
                Words of Wisdom from Islamic Scholars
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {islamicQuotes.map((quote, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="backdrop-blur-lg p-8 rounded-lg shadow-xl"
                    style={{ 
                      backgroundColor: colors.cardBg,
                      borderWidth: 1,
                      borderColor: `${colors.accent}20`
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { type: 'spring', stiffness: 300 }
                    }}
                  >
                    <div className="pl-6 py-3" style={{ borderLeftWidth: 4, borderColor: colors.accent }}>
                      <p className="text-xl text-gray-200 italic">"{quote.quote}"</p>
                      <p className="font-medium mt-3" style={{ color: colors.accent }}>— {quote.author}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* SECTION 4: Courses */}
        <section id="courses" ref={coursesSectionRef} className="py-24 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]"></div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-64 overflow-hidden z-0">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4"
                style={{ color: colors.accent }}
              >
                Upcoming Courses
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6"
              >
                Transformative <span style={{ color: colors.accent }}>Learning Experiences</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                These comprehensive courses are designed to deepen your understanding and provide practical insights into Islamic thought and practice.
              </motion.p>
            </div>
            
            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              {potentialCourses.map((course, index) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg shadow-xl overflow-hidden h-full"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}
                  whileHover={{ 
                    y: -15, 
                    boxShadow: `0 25px 50px -12px ${colors.accent}15`,
                    transition: { type: 'spring', stiffness: 200 }
                  }}
                >
                  {/* Decorative top pattern */}
                  <div className="h-3" style={{ background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})` }}></div>
                  
                  {/* Course Icon */}
                  <div className="p-6 pb-0">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center text-white shadow-lg"
                      style={{ 
                        background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                        boxShadow: `0 10px 15px -3px ${colors.accent}20`
                      }}
                    >
                      {course.icon}
                    </div>
                  </div>
                  
                  {/* Course Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {course.title}
                      </h3>
                      
                      <div className="px-4 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: `${colors.accent}10`,
                          borderWidth: 1,
                          borderColor: `${colors.accent}20`,
                          color: colors.accent
                        }}
                      >
                        {course.level}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-lg">
                      {course.description}
                    </p>
                    
                    {/* Course Features */}
                    <div className="mb-8">
                      <div className="flex items-center text-gray-400 mb-3">
                        <Clock className="w-5 h-5 mr-2" style={{ color: colors.accent }} />
                        <span className="text-base">{course.duration}</span>
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <motion.button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, courseInterest: course.id }));
                        scrollToSection("join");
                      }}
                      className="w-full py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-base font-medium shadow-lg"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: 'white',
                        boxShadow: `0 10px 15px -3px ${colors.accent}20`
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: colors.accentHover }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Express Interest</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* SECTION 5: Donation Section */}
        <section id="donate" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4"
                style={{ color: colors.accent }}
              >
                Support Our Cause
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6"
              >
                Give <span style={{ color: colors.accent }}>Sadaqah</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                "Truly, poverty humiliates the soul, stuns the mind, and brings about endless anxieties." 
                Help us provide for those in need and bring relief to vulnerable communities.
              </motion.p>
            </div>
            
            {/* Donation Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Left Column - Information about donation */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                {/* How Your Donation Helps */}
                <div className="backdrop-blur-lg p-8 rounded-lg shadow-xl"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}>
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Heart className="w-6 h-6 mr-3" style={{ color: colors.accent }} /> How Your Donation Helps
                  </h3>
                  
                  <div className="space-y-8">
                    {donationPurposes.map((purpose, index) => (
                      <motion.div 
                        key={index} 
                        className="flex"
                        whileHover={{ x: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="mr-5 flex-shrink-0">
                          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-white shadow-lg"
                            style={{ 
                              background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                              boxShadow: `0 10px 15px -3px ${colors.accent}20`
                            }}
                          >
                            {purpose.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-medium text-white mb-2">{purpose.title}</h4>
                          <p className="text-gray-300 text-lg">{purpose.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Our Donation Mission */}
                <div className="backdrop-blur-lg p-8 rounded-lg shadow-xl"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3" style={{ color: colors.accent }} /> Our Donation Mission
                  </h3>
                  
                  <p className="text-gray-300 mb-6 text-lg">
                    All funds will be transferred to Imam Ali Center, which then distributes them in accordance with the campaign running at the time. Our current campaign is the Ramadan Food Basket Appeal, where basic necessities will be handed out to families in dire need.
                  </p>
                  
                  <div className="p-6 rounded-lg"
                    style={{ 
                      backgroundColor: colors.darkSection,
                      borderWidth: 1,
                      borderColor: `${colors.accent}10`
                    }}>
                    <p className="text-xl text-gray-200 italic">
                      "The likeness of those who spend their wealth in the way of Allah is as the likeness of a grain which grows seven spikes; in each spike is a hundred grains, and Allah multiplies for whom He wills."
                    </p>
                    <p className="font-medium mt-3" style={{ color: colors.accent }}>— Surah Al-Baqarah, 2:261</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Column - Donation */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-lg p-8 rounded-lg shadow-xl h-full relative overflow-hidden"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}>
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                      <Gift className="w-6 h-6 mr-3" style={{ color: colors.accent }} /> Donate to Ahlulbayt's Fundraiser
                    </h3>
                    
                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center mb-10">
                      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 relative overflow-hidden">
                        {/* Actual QR code image */}
                        <img src="qr-code.png" alt="Donation QR Code" className="w-56 h-56 object-contain" />
                        
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: colors.accent }}></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: colors.accent }}></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: colors.accent }}></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: colors.accent }}></div>
                      </div>
                      
                      <p className="text-center font-medium text-xl mb-3" style={{ color: colors.accent }}>
                        "Ahlulbayt Sadaqah Drive"
                      </p>
                      
                      <p className="text-gray-300 text-center text-lg mb-8">
                        Scan with your phone camera to donate
                      </p>
                      
                      <div className="w-full text-center">
                        <motion.button 
                          onClick={goToDonationPage}
                          className="inline-block px-8 py-4 rounded-lg transition-all shadow-xl font-medium text-lg"
                          style={{ 
                            backgroundColor: colors.accent,
                            color: 'white',
                            boxShadow: `0 10px 15px -3px ${colors.accent}30`
                          }}
                          whileHover={{ scale: 1.05, backgroundColor: colors.accentHover }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <DollarSign className="w-5 h-5 inline-block mr-2" />
                          Donate Now
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="text-center text-gray-300 text-lg p-6 rounded-lg"
                      style={{ 
                        backgroundColor: colors.darkSection,
                        borderWidth: 1,
                        borderColor: `${colors.accent}10`
                      }}>
                      All donations are processed securely through GoFundMe.
                      <a 
                        href="https://gofund.me/eb3d31df" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block mt-3 hover:underline"
                        style={{ color: colors.accent }}
                      >
                        https://gofund.me/eb3d31df
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* SECTION 6: Benefits */}
        <section id="benefits" ref={benefitsSectionRef} className="py-24 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]"></div>
          
          {/* Decorative background */}
          <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden z-0">
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
            <div className="absolute -bottom-16 left-1/4 w-64 h-64 rounded-full" style={{ backgroundColor: `${colors.accent}05` }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4"
                style={{ color: colors.accent }}
              >
                Why Join Now
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6"
              >
                Benefits of <span style={{ color: colors.accent }}>Early Registration</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Secure your position on our waitlist and enjoy these exclusive advantages when courses launch.
              </motion.p>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
              {[
                {
                  title: "Priority Access",
                  description: "Be first in line when enrollment opens, guaranteeing your spot in these limited-capacity courses.",
                  icon: "🔑"
                },
                {
                  title: "Early Bird Pricing",
                  description: "Receive special pricing exclusively available to waitlist members—a benefit of showing early interest.",
                  icon: "💰"
                },
                {
                  title: "Influence Course Content",
                  description: "Your feedback will directly shape the curriculum, ensuring it addresses your specific interests and questions.",
                  icon: "✏️"
                },
                {
                  title: "Exclusive Resources",
                  description: "Access preparatory materials and recommended readings before courses officially begin.",
                  icon: "📚"
                },
                {
                  title: "Community Connection",
                  description: "Join a select group of dedicated learners with shared interests in Islamic studies.",
                  icon: "👥"
                },
                {
                  title: "Direct Communication",
                  description: "Receive personal updates and insights from Sayed Modarresi as courses develop.",
                  icon: "📩"
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-lg p-8 rounded-lg shadow-xl relative overflow-hidden"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: `0 25px 50px -12px ${colors.accent}15`,
                    transition: { type: 'spring', stiffness: 200 }
                  }}
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-2" 
                    style={{ background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})` }}></div>
                  
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-8 shadow-lg"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                      boxShadow: `0 10px 15px -3px ${colors.accent}20`
                    }}
                  >
                    {benefit.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="flex justify-center">
              <motion.button
                onClick={() => scrollToSection("join")}
                className="px-10 py-5 rounded-lg transition-all shadow-xl
                  flex items-center justify-center text-xl font-medium"
                style={{ 
                  backgroundColor: colors.accent,
                  color: 'white',
                  boxShadow: `0 10px 15px -3px ${colors.accent}30`
                }}
                whileHover={{ scale: 1.05, backgroundColor: colors.accentHover }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Secure Your Spot Now</span>
                <ArrowRight className="w-6 h-6 ml-2" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* SECTION 7: Registration Form */}
        <section id="join" className="py-24 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]"></div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4 tracking-wide"
                style={{ color: colors.accent }}
              >
                Join the Waitlist
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight"
              >
                Secure Your <span style={{ color: colors.accent }}>Priority Spot</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Complete the form below to be among the first to know when these transformative courses launch and enjoy exclusive benefits.
              </motion.p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {submissionStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  id="success-message" 
                  className="backdrop-blur-lg p-10 rounded-lg shadow-xl"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 10,
                        delay: 0.2
                      }}
                      className="w-28 h-28 rounded-full mx-auto flex items-center justify-center mb-10 shadow-lg"
                      style={{ 
                        background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                        boxShadow: `0 10px 15px -3px ${colors.accent}30`
                      }}
                    >
                      <CheckCircle className="w-14 h-14 text-white" />
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl md:text-5xl font-bold text-white mb-8"
                    >
                      Your Spot is Reserved!
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl text-gray-300 mb-10"
                    >
                      Thank you for your interest in Sayed Mahdi Modarresi's upcoming courses. You're now on our priority waitlist.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="rounded-lg p-8 mb-10"
                      style={{ 
                        backgroundColor: colors.darkSection,
                        borderWidth: 1,
                        borderColor: `${colors.accent}10`
                      }}
                    >
                      <h3 className="text-2xl font-bold mb-6" style={{ color: colors.accent }}>What Happens Next?</h3>
                      <ul className="text-left space-y-5 text-gray-300 text-lg">
                        <li className="flex items-start">
                          <div className="mr-4 mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md"
                              style={{ 
                                background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                                boxShadow: `0 4px 6px -1px ${colors.accent}30`
                              }}>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span>You'll receive a confirmation email shortly</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md"
                              style={{ 
                                background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                                boxShadow: `0 4px 6px -1px ${colors.accent}30`
                              }}>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span>We'll send you exclusive updates about course development</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md"
                              style={{ 
                                background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.accentHover})`,
                                boxShadow: `0 4px 6px -1px ${colors.accent}30`
                              }}>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span>You'll get early access when enrollment opens</span>
                        </li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <motion.button
                        onClick={() => {
                          setSubmissionStatus('idle');
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            courseInterest: '',
                            message: '',
                            acceptTerms: false
                          });
                        }}
                        className="px-6 py-4 backdrop-blur-sm rounded-lg text-white 
                          transition-all text-lg font-medium"
                        style={{ 
                          backgroundColor: colors.darkSection,
                          borderWidth: 1,
                          borderColor: `${colors.accent}20`
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: '#14213D' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Register for Another Course
                      </motion.button>
                      
                      <motion.button
                        onClick={() => scrollToSection("home")}
                        className="px-6 py-4 rounded-lg transition-all shadow-lg text-lg font-medium"
                        style={{ 
                          backgroundColor: colors.accent,
                          color: 'white',
                          boxShadow: `0 10px 15px -3px ${colors.accent}30`
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: colors.accentHover }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Return to Top
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-lg p-10 rounded-lg shadow-xl relative overflow-hidden"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderWidth: 1,
                    borderColor: `${colors.accent}20`
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
                  
                  {/* Form Header */}
                  <div className="pb-8 mb-8 relative" style={{ borderBottomWidth: 1, borderColor: `${colors.accent}10` }}>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Join Our Priority Waitlist
                    </h3>
                    <p className="text-gray-300 text-xl">
                      Be among the first to access these transformative courses
                    </p>
                  </div>
                  
                  {/* Form Body */}
                  <form onSubmit={handleSubmit} className="space-y-8 relative">
                    {submissionStatus === 'error' && (
                      <div className="p-4 rounded-lg text-red-400" 
                        style={{ 
                          backgroundColor: 'rgba(220,38,38,0.2)',
                          borderWidth: 1,
                          borderColor: 'rgba(220,38,38,0.3)'
                        }}>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                          <span>{errorMessage || 'There was an error with your submission. Please try again.'}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Full Name Field */}
                      <div>
                        <label htmlFor="fullName" className="block text-base font-medium text-gray-300 mb-2">
                          Full Name <span style={{ color: colors.accent }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg text-white transition-all text-lg"
                          style={{ 
                            backgroundColor: colors.darkSection,
                            borderWidth: 1,
                            borderColor: `${colors.accent}20`,
                          }}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-300 mb-2">
                          Email Address <span style={{ color: colors.accent }}>*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg text-white transition-all text-lg"
                          style={{ 
                            backgroundColor: colors.darkSection,
                            borderWidth: 1,
                            borderColor: `${colors.accent}20`
                          }}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block text-base font-medium text-gray-300 mb-2">
                          Phone Number <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg text-white transition-all text-lg"
                          style={{ 
                            backgroundColor: colors.darkSection,
                            borderWidth: 1,
                            borderColor: `${colors.accent}20`
                          }}
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                      
                      {/* Course Interest Field */}
                      <div>
                        <label htmlFor="courseInterest" className="block text-base font-medium text-gray-300 mb-2">
                          Course Interest <span style={{ color: colors.accent }}>*</span>
                        </label>
                        <select
                          id="courseInterest"
                          name="courseInterest"
                          value={formData.courseInterest}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg text-white transition-all text-lg"
                          style={{ 
                            backgroundColor: colors.darkSection,
                            borderWidth: 1,
                            borderColor: `${colors.accent}20`
                          }}
                        >
                          <option value="">Select a course</option>
                          {potentialCourses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-base font-medium text-gray-300 mb-2">
                        Additional Information <span className="text-gray-500">(Optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg text-white transition-all text-lg"
                        style={{ 
                          backgroundColor: colors.darkSection,
                          borderWidth: 1,
                          borderColor: `${colors.accent}20`
                        }}
                        placeholder="Tell us about your background, specific topics you're interested in, or any questions..."
                      />
                    </div>
                    
                    {/* Featured Quote */}
                    <div className="py-5 px-6 text-lg text-gray-300 rounded-lg"
                      style={{ 
                        backgroundColor: colors.darkSection,
                        borderWidth: 1,
                        borderColor: `${colors.accent}10`
                      }}>
                      <p className="text-xl text-gray-200 italic">
                        "Through education, you obey Allah's orders, you can understand the exalted position of Allah and his oneness."
                      </p>
                      <p className="font-medium mt-3" style={{ color: colors.accent }}>— Amirul Mu'mineen Hazrat 'Ali (a.s.)</p>
                    </div>
                    
                   {/* Terms Checkbox */}
                   <div className="flex items-start gap-4">
                      <div className="flex items-center h-6 mt-1">
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          required
                          className="h-5 w-5 rounded border-gray-300"
                          style={{ 
                            backgroundColor: formData.acceptTerms ? colors.accent : colors.darkSection,
                            borderWidth: 1,
                            borderColor: `${colors.accent}40`
                          }}
                        />
                      </div>
                      <label htmlFor="acceptTerms" className="text-lg text-gray-300">
                        I agree to receive communications about upcoming courses and events. 
                        I understand that expressing interest does not obligate me to enroll.
                      </label>
                    </div>
                    
                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={submissionStatus === 'submitting'}
                      className="w-full px-8 py-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-xl font-medium"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: 'white',
                        boxShadow: `0 10px 15px -3px ${colors.accent}30`
                      }}
                      whileHover={{ scale: submissionStatus !== 'submitting' ? 1.02 : 1, backgroundColor: colors.accentHover }}
                      whileTap={{ scale: submissionStatus !== 'submitting' ? 0.98 : 1 }}
                    >
                      {submissionStatus === 'submitting' ? (
                        <>
                          <Loader className="mr-3 w-6 h-6 animate-spin" />
                          <span>Processing submission...</span>
                        </>
                      ) : (
                        <span>Secure Your Spot Now</span>
                      )}
                    </motion.button>
                    
                    <p className="text-center text-gray-400 text-lg">
                      Your information is kept confidential and will only be used for course-related communications.
                    </p>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8 text-white relative" style={{ 
          backgroundColor: colors.darkSection,
          borderTopWidth: 1,
          borderColor: `${colors.accent}10`
        }}>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${colors.accent}05` }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <motion.a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} 
                  className="text-3xl font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-white">
                    Sayed Mahdi
                  </span>
                  <span className="ml-1" style={{ color: colors.accent }}>
                    Modarresi
                  </span>
                </motion.a>
                <p className="text-gray-400 mt-3 text-lg">Islamic Scholar & Speaker</p>
              </div>
              
              <nav className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="text-gray-300 transition-colors text-lg"
                    style={{ 
                      
                    }}
                    whileHover={{ scale: 1.1, color: colors.accent }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#join"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("join");
                  }}
                  className="text-gray-300 transition-colors text-lg"
                  whileHover={{ scale: 1.1, color: colors.accent }}
                >
                  Join
                </motion.a>
              </nav>
            </div>
            
            <div className="mt-10 pt-10" style={{ borderTopWidth: 1, borderColor: `${colors.accent}10` }}>
              <div className="text-center mb-10 mx-auto max-w-3xl">
                <p className="text-xl text-gray-200 italic">
                  "It is the education which differentiates a man from an animal... After the blessing of life, blessing of education is mentioned."
                </p>
                <p className="font-medium mt-3" style={{ color: colors.accent }}>— Abdullah al-Mamaqani, Wasiyatnama</p>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-lg mb-4 md:mb-0">
                  &copy; {new Date().getFullYear()} Sayed Mahdi Modarresi. All rights reserved.
                </p>
                
                <div className="flex gap-8">
                  <motion.a 
                    href="#" 
                    className="text-gray-400 transition-colors"
                    whileHover={{ scale: 1.1, color: colors.accent }}
                  >
                    Privacy Policy
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-gray-400 transition-colors"
                    whileHover={{ scale: 1.1, color: colors.accent }}
                  >
                    Terms of Service
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to top button */}
        <AnimatePresence>
          {hasScrolled && (
            <motion.button
              onClick={() => scrollToSection("home")}
              className="fixed bottom-10 right-10 p-4 rounded-full shadow-xl border z-50"
              style={{ 
                backgroundColor: colors.accent,
                color: 'white', 
                borderColor: colors.accent,
                boxShadow: `0 10px 15px -3px ${colors.accent}30`
              }}
              aria-label="Back to top"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ y: -5, backgroundColor: colors.accentHover }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;