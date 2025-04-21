import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import {
  BookOpen, CheckCircle, AlertCircle, GraduationCap, Users, Scale,
  Clock, Sparkles, Star, BookMarked, Globe, ArrowRight, ChevronDown,
  Heart, Compass, Shield, Gift, BookIcon, MessageSquare, Award,
  DollarSign, HandHeart, Loader, Menu, X
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://fsfrxllzwywtkximmhwb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZnJ4bGx6d3l3dGt4aW1taHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjM0MTIsImV4cCI6MjA0ODEzOTQxMn0.VlvM23-l0l1o1xXRGGyAo6U-auR0ClTaCdxc2S2WdEc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log(supabase)
const App = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseInterest: '',
    message: '',
    acceptTerms: false
  });

  // Islamic quotes from Imams only
  const islamicQuotes = [
    {
      quote: "The status of an Alim is more than that of a person who is fasting, one who prays the whole night and one who fights in the way of Allah.",
      author: "Imam Ja'far as-Sadiq (a.s.)"
    },
    {
      quote: "O people! The completion of religion is to obtain knowledge and to act on it. It is more compulsory to obtain knowledge than to obtain wealth.",
      author: "Imam Ali (a.s.)"
    },
    {
      quote: "Through education, you obey Allah's orders, you can understand the exalted position of Allah and his oneness.",
      author: "Imam Ali (a.s.)"
    },
    {
      quote: "Knowledge without practice is like a tree without fruits.",
      author: "Imam Ja'far as-Sadiq (a.s.)"
    },
    {
      quote: "Knowledge is the root of all good, while ignorance is the root of all evil.",
      author: "Imam Ali (a.s.)"
    },
    {
      quote: "The best legacy a father can leave for his son is education and good manners.",
      author: "Imam Hussein (a.s.)"
    },
    {
      quote: "He who walks in the quest of knowledge, walks in the path of Allah.",
      author: "Imam Ali (a.s.)"
    },
    {
      quote: "The ink of a scholar is more holy than the blood of a martyr.",
      author: "Imam Muhammad al-Baqir (a.s.)"
    }
  ];

  // Random quote selection
  const [randomQuote, setRandomQuote] = useState(islamicQuotes[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * islamicQuotes.length);
    setRandomQuote(islamicQuotes[randomIndex]);
  }, []);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Submission status
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Active section tracking
  const [activeSection, setActiveSection] = useState("home");
  
  // Scroll progress
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // References to sections for styling
  const aboutSectionRef = useRef(null);
  const coursesSectionRef = useRef(null);
  const benefitsSectionRef = useRef(null);
  
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

  // Navigation items
  const navItems = [
    { id: "home", label: "Home", icon: <BookIcon className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <Users className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "courses", label: "Courses", icon: <BookOpen className="w-4 h-4" /> },
    { id: "donate", label: "Donate", icon: <Heart className="w-4 h-4" /> },
    { id: "benefits", label: "Benefits", icon: <Award className="w-4 h-4" /> }
  ];

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // Use type assertion to tell TypeScript this is definitely an HTMLInputElement
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
      setErrorMessage((error as Error).message || 'An error occurred while submitting your application. Please try again later.');
    }
  };

  // Potential course offerings - enhanced with more details
  const potentialCourses = [
    {
      id: 'foundations-islamic-ethics',
      title: 'Foundations of Islamic Ethics',
      description: 'Dive deep into the ethical framework that guides Islamic thought and practice, exploring both classical and contemporary applications.',
      duration: '8 weeks',
      level: 'All Levels',
      features: ['Live weekly sessions', 'Interactive discussions', 'Comprehensive readings'],
      startDate: 'September 2023',
      icon: <Scale className="w-full h-full" />,
      color: 'emerald'
    },
    {
      id: 'quran-interpretation',
      title: 'Quranic Interpretation & Analysis',
      description: 'Discover the rich tapestry of Quranic exegesis through a balanced approach that honors tradition while engaging modern scholarship.',
      duration: '10 weeks',
      level: 'Intermediate',
      features: ['In-depth textual analysis', 'Historical context studies', 'Contemporary applications'],
      startDate: 'October 2023',
      icon: <BookMarked className="w-full h-full" />,
      color: 'cyan'
    },
    {
      id: 'ahlul-bayt-teachings',
      title: 'Teachings of Ahlul Bayt',
      description: 'Explore the profound spiritual and intellectual legacy of the Prophet\'s household and their enduring influence on Islamic thought.',
      duration: '12 weeks',
      level: 'All Levels',
      features: ['Biographical studies', 'Hadith collections', 'Ethical teachings'],
      startDate: 'August 2023',
      icon: <Star className="w-full h-full" />,
      color: 'amber'
    },
    {
      id: 'islamic-philosophy',
      title: 'Islamic Philosophy',
      description: 'Journey through the golden age of Islamic philosophical thought and its dialogue with other intellectual traditions throughout history.',
      duration: '10 weeks',
      level: 'Advanced',
      features: ['Metaphysical concepts', 'Logical reasoning', 'Comparative philosophy'],
      startDate: 'November 2023',
      icon: <Sparkles className="w-full h-full" />,
      color: 'purple'
    },
    {
      id: 'interfaith-dialogue',
      title: 'Interfaith Dialogue & Understanding',
      description: 'Develop the knowledge and skills needed for meaningful engagement across religious boundaries in our diverse global society.',
      duration: '6 weeks',
      level: 'All Levels',
      features: ['Dialogue techniques', 'Comparative theology', 'Case studies'],
      startDate: 'December 2023',
      icon: <Globe className="w-full h-full" />,
      color: 'blue'
    }
  ];

  // Educational principles based on Islamic teachings
  const educationalPrinciples = [
    {
      title: "Seeking Knowledge",
      description: "Education is the highest blessing after the blessing of life itself",
      icon: <BookOpen className="w-full h-full" />
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

  // Donation purposes
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

  // Go directly to donation page
  const goToDonationPage = () => {
    window.open("https://gofund.me/eb3d31df", "_blank");
  };

  // Get color classes for course
  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: {
        bg: 'bg-emerald-600',
        light: 'bg-emerald-500/20',
        border: 'border-emerald-500/40',
        text: 'text-emerald-400'
      },
      amber: {
        bg: 'bg-amber-600',
        light: 'bg-amber-500/20',
        border: 'border-amber-500/40',
        text: 'text-amber-400'
      },
      cyan: {
        bg: 'bg-cyan-600',
        light: 'bg-cyan-500/20',
        border: 'border-cyan-500/40',
        text: 'text-cyan-400'
      },
      purple: {
        bg: 'bg-purple-600',
        light: 'bg-purple-500/20',
        border: 'border-purple-500/40',
        text: 'text-purple-400'
      },
      blue: {
        bg: 'bg-blue-600',
        light: 'bg-blue-500/20',
        border: 'border-blue-500/40',
        text: 'text-blue-400'
      }
    };
    
    return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
  };

  return (
    <div className="relative min-h-screen font-['Inter'] overflow-x-hidden">
      {/* Add Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      
      {/* Enhanced Navbar with Hover Effects */}
      <header className="fixed top-0 left-0 w-full z-40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className={`
              ${hasScrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl border border-emerald-100' : 'bg-transparent'} 
              rounded-xl py-3 px-6 transition-all duration-500 
              flex items-center justify-between
            `}
          >
            {/* Logo */}
            <motion.a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} 
              className="text-2xl font-bold flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/Logo.svg" alt="SMM Logo" className="w-10 h-10 mr-3" />
              <span className="hidden sm:block text-emerald-700 tracking-wide">
                Sayed Mahdi Modarresi
              </span>
            </motion.a>
            
            {/* Desktop Nav Items with Icons */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-colors flex items-center gap-2 ${
                    activeSection === item.id
                      ? 'text-white bg-emerald-600 shadow-lg shadow-emerald-600/20'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.label}
                </motion.a>
              ))}
              
              <motion.a
                href="#join"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("join");
                }}
                className="ml-1 px-6 py-2 rounded-lg font-medium transition-colors shadow-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Join</span>
              </motion.a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button 
                className="p-3 rounded-lg bg-emerald-50 text-emerald-700 focus:outline-none"
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
          
          {/* Mobile Menu with Improved Animation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-2 bg-white rounded-xl shadow-2xl overflow-hidden"
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
                      className={`flex items-center gap-3 mx-2 px-4 py-3 rounded-lg text-base font-medium
                        ${activeSection === item.id 
                          ? 'bg-emerald-600 text-white' 
                          : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                        }`}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                      {item.label}
                    </motion.a>
                  ))}
                  
                  <motion.a
                    href="#join"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("join");
                    }}
                    className="flex items-center gap-3 mx-2 mt-4 px-4 py-3 rounded-lg font-medium transition-colors text-center shadow-lg bg-emerald-600 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Join Now
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      
      {/* Main Content */}
      <div>
        {/* SECTION 1: Hero Section - WHITE with Enhanced Design */}
        <section id="home" className="pt-32 pb-20 bg-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-emerald-50 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-emerald-50 to-transparent pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/5 w-64 h-64 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content with Enhanced Typography */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-6 py-2 mb-8 rounded-full bg-emerald-50 border border-emerald-100"
                >
                  <span className="text-base font-medium text-emerald-700 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Exclusive Pre-Registration Open
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 tracking-tight font-['Playfair_Display']"
                >
                  Welcome to 
                  <span className="block mt-3 text-emerald-600">
                    Our Waitlist For
                  </span>
                  <span className="block mt-3 text-emerald-700 relative">
                    Sayed Mahdi Modarresi
                    <svg className="absolute -bottom-2 left-0 w-2/3 h-2 text-emerald-600" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 text-xl text-gray-700 leading-relaxed"
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
                    className="px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center shadow-lg bg-emerald-600 text-white hover:bg-emerald-700 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">Secure Your Spot</span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => scrollToSection("donate")}
                    className="px-8 py-4 border border-emerald-200 rounded-lg 
                      text-emerald-700 bg-white hover:bg-emerald-50 
                      font-medium transition-all flex items-center justify-center shadow-lg group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">Donate Now</span>
                    <Heart className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
                  </motion.button>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pl-6 py-3 border-l-4 border-emerald-600 bg-emerald-50/50 rounded-r-lg"
                >
                  <p className="text-xl text-gray-800 italic font-['Playfair_Display']">"{randomQuote.quote}"</p>
                  <p className="font-medium mt-3 text-emerald-700">— {randomQuote.author}</p>
                </motion.div>
              </div>
              
              {/* Hero Visual with Enhanced Animation */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-2xl bg-white p-10 
                  shadow-2xl aspect-square max-w-md mx-auto flex flex-col items-center justify-center text-center
                  border border-emerald-100 overflow-hidden"
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
                    className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg mb-6 relative"
                  >
                    <img 
                      src="/Mod.jpg" 
                      alt="Sayed Mahdi Modarresi" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent"></div>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 font-['Playfair_Display']">
                    Sayed Mahdi Modarresi
                  </h3>
                  
                  <p className="text-lg mb-6 text-emerald-600">Islamic Scholar & Speaker</p>
                  
                  <p className="text-gray-700 mb-10 text-lg italic font-['Playfair_Display']">
                    "Knowledge illuminates the path of those who seek it with sincere hearts."
                  </p>
                  
                  <motion.button
                    onClick={() => scrollToSection("about")}
                    className="px-6 py-3 rounded-lg bg-emerald-50 hover:bg-emerald-100
                      text-emerald-700 transition-all flex items-center text-lg font-medium"
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

                {/* Enhanced decorative floating elements */}
                <motion.div 
                  className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 z-10"
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
                  className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 z-10"
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
                  className="absolute top-1/3 -right-8 w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 z-10"
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
        
        {/* SECTION 2: About - DARK with Enhanced Design */}
        <section id="about" ref={aboutSectionRef} className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-white to-transparent opacity-5 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-emerald-900/20 to-transparent pointer-events-none"></div>
          <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4 text-emerald-400"
              >
                About the Scholar
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6 font-['Playfair_Display']"
              >
                Meet Sayed Mahdi <span className="text-emerald-400">Modarresi</span>
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
              {/* Profile Column with Enhanced Styling */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-lg p-8 rounded-lg shadow-xl h-full relative overflow-hidden
                  bg-white/10 border border-white/20"
                >
                  {/* Main Image with Enhanced Effects */}
                  <div className="relative mb-8">
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src="/Mod.jpg" 
                        alt="Sayed Mahdi Modarresi" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Enhanced decorative overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent rounded-lg"></div>
                    
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <h3 className="text-2xl font-bold text-white font-['Playfair_Display']">Sayed Mahdi Modarresi</h3>
                      <p className="text-emerald-400">Islamic Scholar & Speaker</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white text-center font-['Playfair_Display']">Academic Background</h3>
                    <div className="flex flex-col space-y-4 mt-6">
                      {[
                        "Extensive Classical Islamic Education",
                        "PhD in Islamic Studies",
                        "Author of Multiple Publications",
                        "International Speaker & Lecturer"
                      ].map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center p-3 rounded-lg shadow-md
                            bg-white/10 border border-white/10"
                          whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.15)" }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div className="w-3 h-3 rounded-full mr-3 bg-emerald-400"></div>
                          <span className="text-gray-300 font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Bio/Philosophy Column with Enhanced Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-lg p-8 rounded-lg shadow-xl h-full relative overflow-hidden
                  bg-white/10 border border-white/20"
                >
                  <div className="relative">
                    <h3 className="text-3xl font-bold text-white mb-6 font-['Playfair_Display']">
                      Teaching Philosophy
                    </h3>
                    
                    <div className="space-y-6 text-gray-300">
                      <p className="text-xl">
                        My approach bridges classical Islamic scholarship with contemporary understanding, making timeless wisdom relevant to modern life.
                      </p>
                      
                      <p className="italic text-xl p-4 rounded-lg shadow-md
                        bg-white/10 border border-white/10 text-emerald-400 font-['Playfair_Display']"
                      >
                        "Knowledge without practice is like a tree without fruit. Our goal is not merely to learn, but to transform through what we learn."
                      </p>
                      
                      <div className="space-y-6 mt-8">
                        <h4 className="text-2xl font-semibold text-white font-['Playfair_Display']">Core Principles:</h4>
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
                              className="flex p-4 rounded-lg shadow-md
                                bg-white/10 border border-white/10"
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                            >
                              <div className="mt-1 mr-4 flex-shrink-0">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white
                                  bg-emerald-600"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-lg text-emerald-400">{principle.title}</p>
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
            
            {/* Featured Quote with New Imam Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="px-10 py-10 rounded-lg shadow-2xl
                bg-gray-800/50 backdrop-blur-sm border border-white/10"
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="text-6xl font-serif text-emerald-600/40">"</div>
                <p className="text-3xl text-white italic mb-4 font-light font-['Playfair_Display']">
                  He who walks in the quest of knowledge, walks in the path of Allah.
                </p>
                <p className="font-medium mt-3 text-emerald-400">
                  — Imam Ali (a.s.)
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* SECTION 3: Islamic Education - WHITE with Enhanced Design */}
        <section id="education" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
          <div className="absolute top-3/4 left-1/4 w-40 h-40 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4 text-emerald-600"
              >
                The Importance of Knowledge
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display']"
              >
                Islamic <span className="text-emerald-600">Educational Principles</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-700 max-w-3xl mx-auto"
              >
                "The completion of religion is to obtain knowledge and to act on it. It is more compulsory to obtain knowledge than to obtain wealth."
              </motion.p>
            </div>
            
            {/* Educational Principles Grid with Enhanced Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {educationalPrinciples.map((principle, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center text-center
                    border border-emerald-100 relative overflow-hidden"
                  whileHover={{ 
                    y: -10, 
                    boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.15)',
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  {/* Background accent */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-50 z-0"></div>
                  
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg
                    bg-emerald-600 relative z-10"
                  >
                    {principle.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Playfair_Display'] relative z-10">
                    {principle.title}
                  </h3>
                  
                  <p className="text-gray-700 text-lg relative z-10">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Wisdom Quotes Section with Enhanced Styling */}
            <div className="my-16 py-16 border-t border-b border-emerald-100 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-50 blur-3xl pointer-events-none opacity-70 z-0"></div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center text-gray-900 mb-12 font-['Playfair_Display'] relative z-10"
              >
                Words of Wisdom from Islamic Scholars
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                {islamicQuotes.slice(0, 4).map((quote, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-lg shadow-xl border border-emerald-100 relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.03,
                      transition: { type: 'spring', stiffness: 300 }
                    }}
                  >
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                    
                    <div className="pl-6 py-3 border-l-4 border-emerald-600">
                      <p className="text-xl text-gray-800 italic font-['Playfair_Display']">"{quote.quote}"</p>
                      <p className="font-medium mt-3 text-emerald-600">— {quote.author}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* SECTION 4: Courses - DARK with Enhanced Layout */}
        <section id="courses" ref={coursesSectionRef} className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 text-white relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4 text-emerald-400"
              >
                Upcoming Courses
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6 font-['Playfair_Display']"
              >
                Transformative <span className="text-emerald-400">Learning Experiences</span>
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

            {/* NEW: Featured Course - Highlight the top course */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-16 rounded-xl shadow-2xl overflow-hidden
                bg-gradient-to-br from-emerald-900/50 to-gray-900/80 backdrop-blur-sm border border-emerald-500/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left side - Image */}
                <div className="relative h-64 lg:h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Islamic Studies" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="px-4 py-2 rounded-full text-sm font-medium
                      bg-emerald-600 text-white shadow-lg"
                    >
                      Featured Course
                    </div>
                  </div>
                </div>
                
                {/* Right side - Content */}
                <div className="p-8 lg:p-10">
                  <h3 className="text-3xl font-bold text-white mb-4 font-['Playfair_Display']">
                    Foundations of Islamic Ethics
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                      8 weeks
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                      All Levels
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                      Coming Soon
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-8 text-lg">
                    Dive deep into the ethical framework that guides Islamic thought and practice, exploring both classical and contemporary applications. This comprehensive course offers a balanced perspective on moral principles.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="text-gray-300">Live weekly sessions</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="text-gray-300">Interactive discussions</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="text-gray-300">Comprehensive readings</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="text-gray-300">Practical applications</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, courseInterest: 'foundations-islamic-ethics' }));
                        scrollToSection("join");
                      }}
                      className="px-6 py-3 rounded-lg transition-all flex items-center justify-center text-base font-medium
                        bg-emerald-600 text-white hover:bg-emerald-500 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Express Interest</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Course Grid - IMPROVED LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {potentialCourses.slice(1).map((course, index) => {
                const colorClasses = getColorClasses(course.color);
                return (
                  <motion.div 
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-lg shadow-xl overflow-hidden h-full
                      bg-white/10 backdrop-blur-sm border border-white/20 group"
                    whileHover={{ 
                      y: -15, 
                      boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)',
                      transition: { type: 'spring', stiffness: 200 }
                    }}
                  >
                    {/* Decorative top pattern with dynamic color */}
                    <div className={`h-3 ${colorClasses.bg}`}></div>
                    
                    <div className="p-6">
                      {/* Course Header */}
                      <div className="flex items-start justify-between mb-6">
                        {/* Course Icon */}
                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-white shadow-lg ${colorClasses.bg}`}>
                          {course.icon}
                        </div>
                        
                        {/* Course Level Badge */}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.light} ${colorClasses.border} ${colorClasses.text}`}>
                          {course.level}
                        </div>
                      </div>
                      
                      {/* Course Title */}
                      <h3 className="text-2xl font-bold text-white mb-3 font-['Playfair_Display'] pr-8 group-hover:text-emerald-400 transition-colors">
                        {course.title}
                      </h3>
                      
                      {/* Duration */}
                      <div className="flex items-center text-gray-400 mb-4">
                        <Clock className="w-5 h-5 mr-2 text-emerald-400" />
                        <span className="text-base">{course.duration}</span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 mb-6">
                        {course.description}
                      </p>
                      
                      {/* Features List */}
                      <div className="mb-8">
                        <h4 className="text-lg font-medium text-white mb-3">Course Highlights:</h4>
                        <ul className="space-y-2">
                          {course.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="mt-1 mr-3 text-emerald-400">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* CTA */}
                      <motion.button
                        onClick={() => {
                          setFormData(prev => ({ ...prev, courseInterest: course.id }));
                          scrollToSection("join");
                        }}
                        className="w-full py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-base font-medium
                          bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Express Interest</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* SECTION 5: Donation Section - WHITE with Enhanced Design */}
        <section id="donate" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-emerald-200/30 blur-xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4 text-emerald-600"
              >
                Support Our Cause
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display']"
              >
                Give <span className="text-emerald-600">Sadaqah</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-700 max-w-3xl mx-auto"
              >
                "Truly, poverty humiliates the soul, stuns the mind, and brings about endless anxieties." 
                Help us provide for those in need and bring relief to vulnerable communities.
              </motion.p>
            </div>
            
            {/* Donation Content with Enhanced Layout */}
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
                <div className="bg-white p-8 rounded-lg shadow-xl border border-emerald-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center font-['Playfair_Display']">
                    <Heart className="w-6 h-6 mr-3 text-emerald-600" /> How Your Donation Helps
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
                          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-white shadow-lg
                            bg-emerald-600"
                          >
                            {purpose.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-medium text-gray-900 mb-2">{purpose.title}</h4>
                          <p className="text-gray-700 text-lg">{purpose.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Our Donation Mission */}
                <div className="bg-white p-8 rounded-lg shadow-xl border border-emerald-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center font-['Playfair_Display']">
                    <BookOpen className="w-6 h-6 mr-3 text-emerald-600" /> Our Donation Mission
                  </h3>
                  
                  <p className="text-gray-700 mb-6 text-lg">
                    All funds will be transferred to Imam Ali Center, which then distributes them in accordance with the campaign running at the time. Our current campaign is the Ramadan Food Basket Appeal, where basic necessities will be handed out to families in dire need.
                  </p>
                  
                  <div className="p-6 rounded-lg bg-gray-900 text-white shadow-inner">
                    <p className="text-xl text-gray-200 italic font-['Playfair_Display']">
                      "The likeness of those who spend their wealth in the way of Allah is as the likeness of a grain which grows seven spikes; in each spike is a hundred grains, and Allah multiplies for whom He wills."
                    </p>
                    <p className="font-medium mt-3 text-emerald-400">— Surah Al-Baqarah, 2:261</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Column - Donation with QR Code */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-8 rounded-lg shadow-xl h-full relative overflow-hidden border border-emerald-100">
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center font-['Playfair_Display']">
                      <Gift className="w-6 h-6 mr-3 text-emerald-600" /> Donate to Ahlulbayt's Fundraiser
                    </h3>
                    
                    {/* QR Code - Now with actual image */}
                    <div className="flex flex-col items-center justify-center mb-10">
                      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 relative overflow-hidden border border-emerald-100">
                        {/* Actual QR code image */}
                        <div className="w-56 h-56 border border-gray-200 rounded-md overflow-hidden">
                          <img src="/qr-code.png" alt="Donation QR Code" className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-600"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-600"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-600"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-600"></div>
                      </div>
                      
                      <p className="text-center font-medium text-xl mb-3 text-emerald-600">
                        "Ahlulbayt Sadaqah Drive"
                      </p>
                      
                      <p className="text-gray-700 text-center text-lg mb-8">
                        Scan with your phone camera to donate
                      </p>
                      
                      <div className="w-full text-center">
                        <motion.button 
                          onClick={goToDonationPage}
                          className="inline-block px-8 py-4 rounded-lg transition-all shadow-xl font-medium text-lg
                            bg-emerald-600 text-white hover:bg-emerald-500 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <DollarSign className="w-5 h-5 inline-block mr-2 group-hover:animate-pulse" />
                          Donate Now
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="text-center text-white text-lg p-6 rounded-lg bg-gray-900">
                      All donations are processed securely through GoFundMe.
                      <a 
                        href="https://gofund.me/eb3d31df" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block mt-3 hover:underline text-emerald-400"
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
        
        {/* SECTION 6: Benefits - DARK with Enhanced Design */}
        <section id="benefits" ref={benefitsSectionRef} className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none"></div>
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4 text-emerald-400"
              >
                Why Join Now
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-6 font-['Playfair_Display']"
              >
                Benefits of <span className="text-emerald-400">Early Registration</span>
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
            
            {/* Benefits Grid with Enhanced Hover States */}
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
                  className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-xl relative overflow-hidden
                    border border-white/20 group"
                  whileHover={{ 
                    y: -10, 
                    boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)',
                    transition: { type: 'spring', stiffness: 200 }
                  }}
                >
                  {/* Enhanced decorative accent with animation */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 transform origin-left transition-transform duration-300 group-hover:scale-x-[1.1]"></div>
                  
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-8 shadow-lg
                    bg-emerald-600 group-hover:scale-110 transition-transform duration-300"
                  >
                    {benefit.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display'] group-hover:text-emerald-400 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced Call to Action */}
            <div className="flex justify-center">
              <motion.button
                onClick={() => scrollToSection("join")}
                className="px-10 py-5 rounded-lg transition-all shadow-xl
                  flex items-center justify-center text-xl font-medium
                  bg-emerald-600 text-white hover:bg-emerald-500 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Secure Your Spot Now</span>
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* SECTION 7: Registration Form - WHITE with Enhanced Design */}
        <section id="join" className="py-24 bg-white relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-emerald-200/30 blur-xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-xl font-medium mb-4 tracking-wide text-emerald-600"
              >
                Join the Waitlist
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight font-['Playfair_Display']"
              >
                Secure Your <span className="text-emerald-600">Priority Spot</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
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
                  className="bg-white p-10 rounded-lg shadow-xl border border-emerald-100"
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
                      className="w-28 h-28 rounded-full mx-auto flex items-center justify-center mb-10 shadow-lg
                        bg-emerald-600"
                    >
                      <CheckCircle className="w-14 h-14 text-white" />
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-['Playfair_Display']"
                    >
                      Your Spot is Reserved!
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl text-gray-700 mb-10"
                    >
                      Thank you for your interest in Sayed Mahdi Modarresi's upcoming courses. You're now on our priority waitlist.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="rounded-lg p-8 mb-10 bg-gray-900 text-white"
                    >
                      <h3 className="text-2xl font-bold mb-6 text-emerald-400 font-['Playfair_Display']">What Happens Next?</h3>
                      <ul className="text-left space-y-5 text-gray-300 text-lg">
                        <li className="flex items-start">
                          <div className="mr-4 mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md
                              bg-emerald-600"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span>You'll receive a confirmation email shortly</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md
                              bg-emerald-600"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span>We'll send you exclusive updates about course development</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md
                              bg-emerald-600"
                            >
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
                        className="px-6 py-4 rounded-lg text-gray-700 
                          transition-all text-lg font-medium bg-gray-100 border border-gray-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Register for Another Course
                      </motion.button>
                      
                      <motion.button
                        onClick={() => scrollToSection("home")}
                        className="px-6 py-4 rounded-lg transition-all shadow-lg text-lg font-medium
                          bg-emerald-600 text-white hover:bg-emerald-500"
                        whileHover={{ scale: 1.05 }}
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
                  className="bg-white p-10 rounded-lg shadow-xl relative overflow-hidden border border-emerald-100"
                >
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-xl bg-emerald-100/50 pointer-events-none"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-xl bg-emerald-100/50 pointer-events-none"></div>
                  
                  {/* Form Header */}
                  <div className="pb-8 mb-8 relative border-b border-emerald-100">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 font-['Playfair_Display']">
                      Join Our Priority Waitlist
                    </h3>
                    <p className="text-gray-700 text-xl">
                      Be among the first to access these transformative courses
                    </p>
                  </div>
                  
                  {/* Form Body */}
                  <form onSubmit={handleSubmit} className="space-y-8 relative">
                    {submissionStatus === 'error' && (
                      <div className="p-4 rounded-lg text-red-700 bg-red-50 border border-red-200">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                          <span>{errorMessage || 'There was an error with your submission. Please try again.'}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Full Name Field with Enhanced Styling */}
                      <div>
                        <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-2">
                          Full Name <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg text-gray-900 transition-all text-lg
                            border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                          Email Address <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg text-gray-900 transition-all text-lg
                            border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Phone Field with Enhanced Input Masking */}
                      <div>
                        <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg text-gray-900 transition-all text-lg
                            border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                      
                      {/* Course Interest Field with Enhanced Styling */}
                      <div>
                        <label htmlFor="courseInterest" className="block text-base font-medium text-gray-700 mb-2">
                          Course Interest <span className="text-emerald-600">*</span>
                        </label>
                        <select
                          id="courseInterest"
                          name="courseInterest"
                          value={formData.courseInterest}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg text-gray-900 transition-all text-lg
                            border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 appearance-none bg-white"
                          style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem"
                          }}
                        >
                          <option value="">Select a course</option>
                          {potentialCourses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Message Field with Enhanced Text Area */}
                    <div>
                      <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-2">
                        Additional Information <span className="text-gray-500">(Optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg text-gray-900 transition-all text-lg
                          border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                        placeholder="Tell us about your background, specific topics you're interested in, or any questions..."
                      />
                    </div>
                    
                    {/* Featured Quote from Imam */}
                    <div className="py-5 px-6 text-lg text-white rounded-lg bg-gray-900">
                      <p className="text-xl text-gray-200 italic font-['Playfair_Display']">
                        "The ink of a scholar is more holy than the blood of a martyr."
                      </p>
                      <p className="font-medium mt-3 text-emerald-400">— Imam Muhammad al-Baqir (a.s.)</p>
                    </div>
                    
                   {/* Terms Checkbox with Enhanced Styling */}
                   <div className="flex items-start gap-4">
                      <div className="flex items-center h-6 mt-1">
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          required
                          className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                      <label htmlFor="acceptTerms" className="text-lg text-gray-700">
                        I agree to receive communications about upcoming courses and events. 
                        I understand that expressing interest does not obligate me to enroll.
                      </label>
                    </div>
                    
                    {/* Submit Button with Enhanced Animation */}
                    <motion.button
                      type="submit"
                      disabled={submissionStatus === 'submitting'}
                      className="w-full px-8 py-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed 
                        flex items-center justify-center text-xl font-medium
                        bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg disabled:bg-emerald-400 group"
                      whileHover={{ scale: submissionStatus !== 'submitting' ? 1.02 : 1 }}
                      whileTap={{ scale: submissionStatus !== 'submitting' ? 0.98 : 1 }}
                    >
                      {submissionStatus === 'submitting' ? (
                        <>
                          <Loader className="mr-3 w-6 h-6 animate-spin" />
                          <span>Processing submission...</span>
                        </>
                      ) : (
                        <>
                          <span>Secure Your Spot Now</span>
                          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                    
                    <p className="text-center text-gray-500 text-lg">
                      Your information is kept confidential and will only be used for course-related communications.
                    </p>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Enhanced Footer with Improved Design */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8 text-white relative bg-gray-900">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              {/* Logo and brief description */}
              <div className="md:col-span-2">
                <motion.a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} 
                  className="text-3xl font-bold inline-block mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-white font-['Playfair_Display']">
                    Sayed Mahdi
                  </span>
                  <span className="ml-1 text-emerald-400 font-['Playfair_Display']">
                    Modarresi
                  </span>
                </motion.a>
                <p className="text-gray-400 mb-4 text-lg">Islamic Scholar & Speaker</p>
                <p className="text-gray-400 mb-6">
                  Dedicated to spreading knowledge, wisdom, and understanding through education and interfaith dialogue.
                </p>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                    <motion.a 
                      key={social}
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="sr-only">{social}</span>
                      {social === 'facebook' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      )}
                      {social === 'twitter' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      )}
                      {social === 'instagram' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {social === 'youtube' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-white text-xl font-bold mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <motion.a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                        }}
                        className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        {item.label}
                      </motion.a>
                    </li>
                  ))}
                  <li>
                    <motion.a
                      href="#join"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("join");
                      }}
                      className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Join Waitlist
                    </motion.a>
                  </li>
                </ul>
              </div>
              
              {/* Contact Information */}
              <div>
                <h3 className="text-white text-xl font-bold mb-6">Contact Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-emerald-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-400">info@sayedmodarresi.org</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-emerald-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-gray-400">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-emerald-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-400">London, United Kingdom</span>
                  </li>
                </ul>
                
                {/* Newsletter Signup */}
                <div className="mt-8">
                  <h4 className="text-white text-lg font-medium mb-3">Subscribe to Newsletter</h4>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 py-2 px-3 rounded-l-md bg-white/10 border-gray-700 text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button className="bg-emerald-600 text-white py-2 px-4 rounded-r-md hover:bg-emerald-700 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Quote from Imam */}
            <div className="my-12 py-12 border-t border-b border-gray-800">
              <div className="text-center mx-auto max-w-3xl">
                <div className="text-6xl font-serif text-emerald-600/40">"</div>
                <p className="text-2xl text-gray-200 italic mb-4 font-light font-['Playfair_Display']">
                  The best legacy a father can leave for his son is education and good manners.
                </p>
                <p className="font-medium mt-3 text-emerald-400">— Imam Hussein (a.s.)</p>
              </div>
            </div>
            
            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-base mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Sayed Mahdi Modarresi. All rights reserved.
              </p>
              
              <div className="flex flex-wrap gap-4 md:gap-8">
                <motion.a 
                  href="#" 
                  className="text-gray-400 transition-colors hover:text-emerald-400 text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 transition-colors hover:text-emerald-400 text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  Terms of Service
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 transition-colors hover:text-emerald-400 text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  Accessibility
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 transition-colors hover:text-emerald-400 text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  Cookie Policy
                </motion.a>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to top button with Enhanced Animation */}
        <AnimatePresence>
          {hasScrolled && (
            <motion.button
              onClick={() => scrollToSection("home")}
              className="fixed bottom-10 right-10 p-4 rounded-full shadow-xl z-50
                bg-emerald-600 text-white hover:bg-emerald-500 border border-emerald-500 group"
              aria-label="Back to top"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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