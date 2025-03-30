import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Heart, 
  ExternalLink, ChevronRight, Search, Pill, 
  Star, Clock, Gift, Droplet, Stethoscope, 
  Users, Building, GraduationCap, 
  Facebook, Instagram, Twitter, ArrowRight,
  Menu, X, Check, Copy, Shield, 
  Clipboard, CheckCircle, Info, ArrowUpCircle
} from 'lucide-react';

const App: React.FC = () => {
  // Section refs for scrolling
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const hospitalRef = useRef<HTMLElement>(null);
  const donateRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  // UI state
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeAboutTab, setActiveAboutTab] = useState<string>('mission');
  const [activeFacility, setActiveFacility] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Hospital section interaction states
  const [activeHospitalTab, setActiveHospitalTab] = useState<string>('facilities');
  
  
  // Facility images array for the hospital section
  const facilityImages = [
    { 
      id: 1, 
      src: "/IHHPHOTOS/887ecdc6-93dd-4970-8357-d36cb0292710.JPG", 
      title: "Operation Theatre",
      description: "State-of-the-art operation theatre equipped with advanced surgical technology"
    },
    { 
      id: 2, 
      src: "/IHHPHOTOS/905e53af-4647-40dc-90a4-9e599066734.JPG", 
      title: "ICU Ward",
      description: "Intensive Care Unit with 24/7 monitoring and specialized medical care"
    },
    { 
      id: 3, 
      src: "/IHHPHOTOS/0236fcbb-0a80-443b-8963-b38dfba2cdd8.JPG", 
      title: "Patient Rooms",
      description: "Comfortable patient rooms designed for healing and recovery"
    },
    { 
      id: 4, 
      src: "/IHHPHOTOS/2750c766-add9-4cc0-996b-e8c960ddc73e.JPG", 
      title: "Diagnostic Center",
      description: "Modern diagnostic equipment for accurate and timely diagnosis"
    },
    { 
      id: 5, 
      src: "/IHHPHOTOS/3c3d691d-cd1e-423e-b635-adda01699e8d.JPG", 
      title: "Outpatient Department",
      description: "Spacious OPD for patient consultations and routine check-ups"
    }
  ];

  // Bank details for the donation section
  const bankDetails = {
    accountName: "Imam Hussain Foundation",
    accountNumber: "0148010100004268",
    bank: "Jammu and Kashmir Bank",
    branch: "Karan Nagar, Goal Market, Srinagar 190010 (Kashmir) India",
    ifscCode: "JAKAOKARRAN",
    micrCode: "190051032",
    accountType: "General Current Account"
  };

  // Copy bank details to clipboard
  const copyToClipboard = () => {
    const detailsToCopy = `
    Account Name: ${bankDetails.accountName}
    Account Number: ${bankDetails.accountNumber}
    Bank: ${bankDetails.bank}
    Branch: ${bankDetails.branch}
    IFSC Code: ${bankDetails.ifscCode}
    MICR Code: ${bankDetails.micrCode}
    Account Type: ${bankDetails.accountType}
    `;
    
    navigator.clipboard.writeText(detailsToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  // Scroll to section implementation (with offset for header)
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    let targetRef: React.RefObject<HTMLElement> | null = null;
    
    switch(sectionId) {
      case 'home':
        targetRef = homeRef;
        break;
      case 'about':
        targetRef = aboutRef;
        break;
      case 'services':
        targetRef = servicesRef;
        break;
      case 'hospital':
        targetRef = hospitalRef;
        break;
      case 'donate':
        targetRef = donateRef;
        break;
      case 'contact':
        targetRef = contactRef;
        break;
      default:
        targetRef = null;
    }
    
    if (targetRef && targetRef.current) {
      const yOffset = -80; // Header height offset
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update navbar style when scrolled
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine which section is currently in view
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'services', ref: servicesRef },
        { id: 'hospital', ref: hospitalRef },
        { id: 'donate', ref: donateRef },
        { id: 'contact', ref: contactRef }
      ];
      
      for (const section of sections) {
        if (section.ref.current) {
          const element = section.ref.current;
          const rect = element.getBoundingClientRect();
          
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="font-inter text-gray-900 overflow-x-hidden bg-white">
      {/* Fixed Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={() => scrollToSection('home')}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpCircle size={24} />
        </motion.button>
      </div>

      {/* Toast Notification for Bank Details Copied */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="fixed top-24 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center space-x-3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="text-green-500" />
            <span>Bank details copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <motion.img 
              src="/IHHPHOTOS/imam-hussain-logo.jpg" 
              alt="Imam Hussain Foundation" 
              className="h-12 w-12 object-cover rounded-lg shadow-md" 
              whileHover={{ scale: 1.05 }}
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text">
                Imam Hussain A.S
              </h1>
              <p className="text-sm text-blue-600 font-medium">Foundation</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Hospital', id: 'hospital' },
                { label: 'Donate', id: 'donate' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <motion.li 
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-2 py-1 ${
                      activeSection === item.id
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    } transition-colors duration-300`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                        layoutId="navigationUnderline"
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <motion.button 
            className="lg:hidden z-50 text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.3 }}
              >
                <nav className="flex flex-col items-center">
                  <ul className="flex flex-col space-y-8 text-center">
                    {[
                      { label: 'Home', id: 'home' },
                      { label: 'About', id: 'about' },
                      { label: 'Services', id: 'services' },
                      { label: 'Hospital', id: 'hospital' },
                      { label: 'Donate', id: 'donate' },
                      { label: 'Contact', id: 'contact' }
                    ].map((item, i) => (
                      <motion.li 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`text-2xl font-medium ${
                            activeSection === item.id
                              ? 'text-blue-600'
                              : 'text-gray-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div
                  className="flex space-x-4 mt-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[
                    { icon: <Facebook size={20} />, label: 'Facebook' },
                    { icon: <Instagram size={20} />, label: 'Instagram' },
                    { icon: <Twitter size={20} />, label: 'Twitter' }
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white"
                      whileHover={{ y: -5 }}
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={homeRef}
        className="relative min-h-screen pt-32 pb-16 flex items-center"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
          
          {/* Animated circles */}
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 40, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 lg:pr-12 mb-16 lg:mb-0 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Healthcare for All
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Bringing <span className="text-blue-600">Hope</span> & <span className="text-blue-600">Healing</span> to Kashmir
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-700 mb-10 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                The Imam Hussain A.S Foundation is dedicated to providing quality healthcare services 
                to underserved communities through our state-of-the-art hospital in Bemina, Kashmir.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.button
                  onClick={() => scrollToSection('donate')}
                  className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Heart size={18} />
                    <span>Support Our Cause</span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-blue-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('hospital')}
                  className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Our Hospital</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative">
                {/* Main Hospital Image */}
                <motion.div
                  className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 0.78 }}
                >
                  <img 
                    src="/IHHPHOTOS/HOSPITAL.jpg" 
                    alt="Imam Hussain Hospital" 
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
                  
                  {/* Hospital Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold">Imam Hussain Hospital</h3>
                    <p className="text-white/80">Bemina, Srinagar, Kashmir</p>
                  </div>
                </motion.div>
                
                {/* Floating Card - Expert Care */}
                <motion.div
                  className="absolute -top-10 -left-10 bg-white rounded-xl shadow-xl p-4 z-20 flex items-center space-x-3 max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Stethoscope size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">Expert Care</h3>
                    <p className="text-sm text-gray-600">Experienced medical professionals</p>
                  </div>
                </motion.div>
                
                {/* Floating Card - Modern Facilities */}
                <motion.div
                  className="absolute -bottom-10 -right-10 bg-white rounded-xl shadow-xl p-4 z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Building size={20} className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-blue-900">Modern Facilities</h3>
                  </div>
                  <p className="text-sm text-gray-600">State-of-the-art equipment and infrastructure</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef}
        className="py-24 relative bg-white"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-50/50" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 20% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 70%), radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              About Us
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A Legacy of Compassion and Excellence
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Since our founding, the Imam Hussain A.S Foundation has been dedicated to providing 
              accessible, high-quality healthcare to the people of Kashmir, with a focus on serving 
              underserved and vulnerable communities.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Interactive Tabs Section */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Tab Selection */}
              <div className="flex space-x-2 mb-8">
                <LayoutGroup id="aboutTabs">
                  {[
                    { id: 'mission', label: 'Our Mission' },
                    { id: 'vision', label: 'Our Vision' },
                    { id: 'values', label: 'Our Values' },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveAboutTab(tab.id)}
                      className={`relative px-6 py-3 rounded-full text-sm font-medium ${
                        activeAboutTab === tab.id
                          ? 'text-white'
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeAboutTab === tab.id && (
                        <motion.div
                          className="absolute inset-0 bg-blue-600 rounded-full z-0"
                          layoutId="activeAboutTabBackground"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </motion.button>
                  ))}
                </LayoutGroup>
              </div>
              
              {/* Tab Content */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 min-h-[250px]">
                <AnimatePresence mode="wait">
                  {activeAboutTab === 'mission' && (
                    <motion.div
                      key="mission"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
                      <p className="text-gray-700 mb-4">
                        To provide accessible, high-quality healthcare services to all members of 
                        the community regardless of their socioeconomic status, with compassion 
                        and dignity, and to improve the overall health and wellbeing of the 
                        people of Kashmir.
                      </p>
                      <p className="text-gray-700">
                        We strive to create a healthcare system that is responsive to the needs 
                        of the community, offering both preventive and curative services while 
                        maintaining the highest standards of medical care.
                      </p>
                    </motion.div>
                  )}
                  
                  {activeAboutTab === 'vision' && (
                    <motion.div
                      key="vision"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
                      <p className="text-gray-700 mb-4">
                        To become the leading healthcare institution in Kashmir, known for excellence 
                        in patient care, medical education, and community service. We envision a 
                        future where quality healthcare is accessible to all residents of Kashmir.
                      </p>
                      <p className="text-gray-700">
                        Our long-term vision is to expand our services, develop specialized 
                        healthcare programs, and establish a network of healthcare facilities 
                        that reaches even the most remote areas of the region.
                      </p>
                    </motion.div>
                  )}
                  
                  {activeAboutTab === 'values' && (
                    <motion.div
                      key="values"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Values</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { 
                            title: "Compassion", 
                            description: "Treating all with kindness and empathy",
                            icon: <Heart className="text-blue-600" size={20} />
                          },
                          { 
                            title: "Excellence", 
                            description: "Maintaining the highest standards of care",
                            icon: <Star className="text-blue-600" size={20} />
                          },
                          { 
                            title: "Integrity", 
                            description: "Honesty and ethical behavior in all we do",
                            icon: <Shield className="text-blue-600" size={20} />
                          },
                          { 
                            title: "Accessibility", 
                            description: "Making healthcare available to all",
                            icon: <Users className="text-blue-600" size={20} />
                          },
                        ].map((value, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="mr-3 mt-1">{value.icon}</div>
                            <div>
                              <h4 className="font-bold text-blue-900">{value.title}</h4>
                              <p className="text-sm text-gray-700">{value.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {[
                  { value: "10+", label: "Years of Service" },
                  { value: "25,000+", label: "Patients Treated" },
                  { value: "50+", label: "Medical Professionals" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-4 bg-white rounded-xl shadow-md border border-blue-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.1)" }}
                  >
                    <h3 className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</h3>
                    <p className="text-gray-700 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Photo Gallery */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px]">
                {/* Overlapping Images Grid */}
                <motion.div 
                  className="col-span-8 row-span-3 rounded-2xl overflow-hidden shadow-lg relative group" 
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src="/IHHPHOTOS/bd7a87a6-0466-4530-8aeb-3d53379e565b.JPG" 
                    alt="Hospital Building" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h4 className="font-bold">Hospital Building</h4>
                      <p className="text-sm text-white/80">Main facility in Bemina</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="col-span-4 row-span-3 rounded-2xl overflow-hidden shadow-lg relative group" 
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src="/IHHPHOTOS/c5ed147d-c8ce-48f8-8864-1ba4394f1058.JPG" 
                    alt="Medical Staff" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h4 className="font-bold">Medical Staff</h4>
                      <p className="text-sm text-white/80">Our dedicated team</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-lg relative group" 
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src="/IHHPHOTOS/d7e6d34d-2282-4fe0-a4cb-cdcbb99c5cfb.JPG" 
                    alt="Hospital Facilities" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h4 className="font-bold">Modern Facilities</h4>
                      <p className="text-sm text-white/80">State-of-the-art equipment</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="col-span-7 row-span-3 rounded-2xl overflow-hidden shadow-lg relative group" 
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src="/IHHPHOTOS/e9f5769f-e285-481d-9bfa-75d8cd6b6e6c.JPG" 
                    alt="Patient Care" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h4 className="font-bold">Patient Care</h4>
                      <p className="text-sm text-white/80">Compassionate treatment</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef}
        className="py-24 relative bg-white"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-white" />
          <motion.div 
            className="absolute inset-0 opacity-30"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              backgroundSize: '100% 100%'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Comprehensive Healthcare Services
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              We offer a wide range of medical services with a focus on accessibility, 
              affordability, and excellence in patient care.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: <Stethoscope />,
                title: "General Medicine",
                description: "Comprehensive healthcare services for patients of all ages, focusing on diagnosis, treatment, and prevention of diseases.",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: <Users />,
                title: "Specialized Care",
                description: "Expert care across multiple specialties including cardiology, orthopedics, pediatrics, gynecology, and more.",
                color: "from-indigo-400 to-indigo-600"
              },
              {
                icon: <Droplet />,
                title: "Blood Bank",
                description: "24/7 blood bank services ensuring a safe blood supply for patients in need of transfusions.",
                color: "from-red-400 to-red-600"
              },
              {
                icon: <Clock />,
                title: "Emergency Services",
                description: "Round-the-clock emergency care for critical medical situations with rapid response times.",
                color: "from-amber-400 to-amber-600"
              },
              {
                icon: <GraduationCap />,
                title: "Medical Education",
                description: "Training programs for healthcare professionals, contributing to the development of medical expertise in the region.",
                color: "from-emerald-400 to-emerald-600"
              },
              {
                icon: <Gift />,
                title: "Charitable Care",
                description: "Free or subsidized healthcare services for underserved and economically disadvantaged individuals and families.",
                color: "from-purple-400 to-purple-600"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Gradient Background */}
                <div className={`absolute h-32 w-full bg-gradient-to-r ${service.color} opacity-10 top-0 left-0`} />
                
                {/* Content */}
                <div className="p-8 relative">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r ${service.color} text-white transform group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <motion.button 
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>Inquire about this service</span>
                    <ArrowRight size={16} className="ml-2" />
                  </motion.button>
                </div>
                
                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                  <div className={`absolute transform rotate-45 bg-gradient-to-r ${service.color} opacity-20 w-16 h-16 -bottom-8 -right-8`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Highlight */}
          <motion.div 
            className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <motion.span 
                  className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  Featured Service
                </motion.span>
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-blue-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Community Outreach Programs
                </motion.h3>
                
                <motion.p 
                  className="text-gray-700 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  We believe in proactive healthcare. Our teams regularly conduct health camps, 
                  awareness programs, and preventive care initiatives in remote and underserved 
                  areas across Kashmir.
                </motion.p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Free health check-ups",
                    "Disease prevention awareness",
                    "Women's health initiatives",
                    "Pediatric care programs",
                    "Elderly care support"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Check size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Join Our Next Health Camp</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>
              
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img 
                  src="/IHHPHOTOS/e8859b430-fd26-4cf7-8d0b-633b67afec91.JPG" 
                  alt="Community Outreach" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/20" />
                
                {/* Achievement Badges */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                  {[
                    { number: "100+", label: "Camps Organized" },
                    { number: "10,000+", label: "Lives Impacted" }
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg flex items-center space-x-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (index * 0.2) }}
                    >
                      <Star className="text-amber-500" size={16} />
                      <div>
                        <span className="block font-bold text-blue-900">{badge.number}</span>
                        <span className="text-xs text-gray-700">{badge.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospital Section */}
      <section 
        id="hospital" 
        ref={hospitalRef}
        className="py-24 relative bg-blue-50"
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Hospital
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Imam Hussain Hospital
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Our state-of-the-art hospital in Bemina, Kashmir, is equipped with modern facilities 
              and staffed by experienced healthcare professionals committed to providing 
              excellent patient care.
            </motion.p>
          </motion.div>

          {/* Hospital Content Tabs */}
          <div className="flex justify-center mb-12">
            <LayoutGroup id="hospitalTabs">
              {[
                { id: 'facilities', label: 'Our Facilities' },
                { id: 'staff', label: 'Medical Team' },
                { id: 'services', label: 'Hospital Services' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveHospitalTab(tab.id)}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium mx-1 ${
                    activeHospitalTab === tab.id
                      ? 'text-white'
                      : 'text-blue-600 hover:bg-blue-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeHospitalTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-blue-600 rounded-full z-0"
                      layoutId="activeHospitalTabBackground"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </LayoutGroup>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Facilities Tab Content */}
            {activeHospitalTab === 'facilities' && (
              <motion.div
                key="facilities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Facilities List */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">World-Class Facilities</h3>
                    <p className="text-gray-700 mb-8">
                      Our hospital is equipped with modern medical technology and offers a comfortable 
                      environment for patients and their families. Our facilities include:
                    </p>

                    <div className="space-y-6">
                      {[
                        {
                          title: "Modern Infrastructure",
                          description: "Spacious, well-maintained facilities designed for patient comfort and efficient healthcare delivery",
                          icon: <Building />
                        },
                        {
                          title: "Advanced Equipment",
                          description: "Latest medical technology and diagnostics for accurate and timely treatment",
                          icon: <Stethoscope />
                        },
                        {
                          title: "Specialized Departments",
                          description: "Dedicated units for emergency care, surgery, maternity, pediatrics, and more",
                          icon: <Users />
                        },
                        {
                          title: "Patient Support Services",
                          description: "Pharmacy, laboratory, imaging center, and rehabilitation services all in one location",
                          icon: <Shield />
                        }
                      ].map((facility, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                            {facility.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-900">{facility.title}</h4>
                            <p className="text-gray-700 text-sm">{facility.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => scrollToSection('contact')}
                      className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone size={18} />
                      <span>Schedule a Tour</span>
                    </motion.button>
                  </div>
                  
                  {/* Facility Gallery */}
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">Explore Our Facilities</h3>
                    
                    {/* Main Selected Facility Image */}
                    <motion.div
                      className="relative rounded-2xl overflow-hidden shadow-lg mb-6 aspect-video"
                      layoutId="selectedFacilityImage"
                    >
                      <img 
                        src={facilityImages[activeFacility].src} 
                        alt={facilityImages[activeFacility].title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-white font-bold text-xl">{facilityImages[activeFacility].title}</h4>
                        <p className="text-white/80">{facilityImages[activeFacility].description}</p>
                      </div>
                    </motion.div>
                    
                    {/* Facility Image Thumbnails */}
                    <div className="grid grid-cols-5 gap-2">
                      {facilityImages.map((facility, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setActiveFacility(index)}
                          className={`rounded-lg overflow-hidden relative ${
                            activeFacility === index 
                              ? 'ring-2 ring-blue-600' 
                              : 'hover:opacity-80'
                          } transition-all`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img 
                            src={facility.src} 
                            alt={facility.title} 
                            className="w-full h-16 object-cover"
                          />
                          {activeFacility === index && (
                            <motion.div 
                              className="absolute inset-0 bg-blue-600/20"
                              layoutId="selectedFacilityOverlay"
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Medical Team Tab Content */}
            {activeHospitalTab === 'staff' && (
              <motion.div
                key="staff"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">Our Medical Team</h3>
                    <p className="text-gray-700 mb-8">
                      Our hospital is staffed by a team of dedicated healthcare professionals, 
                      including experienced doctors, nurses, and support staff, committed to 
                      providing the highest quality of care to our patients.
                    </p>
                    
                    <div className="space-y-6">
                      {[
                        {
                          title: "Experienced Specialists",
                          description: "Doctors with years of experience and specialized training in various medical fields",
                          count: "20+ Specialists"
                        },
                        {
                          title: "Skilled Nursing Staff",
                          description: "Compassionate nurses providing round-the-clock patient care",
                          count: "50+ Nurses"
                        },
                        {
                          title: "Technical Support Team",
                          description: "Laboratory technicians, radiologists, and other technical staff",
                          count: "15+ Technicians"
                        },
                        {
                          title: "Administrative Personnel",
                          description: "Efficient administrative team ensuring smooth hospital operations",
                          count: "25+ Staff"
                        }
                      ].map((team, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start border-l-4 border-blue-600 pl-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-blue-900">{team.title}</h4>
                              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                {team.count}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">{team.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => scrollToSection('contact')}
                      className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone size={18} />
                      <span>Schedule an Appointment</span>
                    </motion.button>
                  </div>
                  
                  <div className="relative">
                    <motion.img 
                      src="/IHHPHOTOS/02e3fef2-dcdf-432f-beb7-d1cdb139094f.JPG"
                      alt="Medical Team" 
                      className="w-full h-auto rounded-2xl shadow-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    <motion.div
                      className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-lg font-bold text-blue-900 mb-2">Dedicated to Excellence</h4>
                      <p className="text-gray-700 text-sm">
                        Our medical professionals are committed to providing the highest standards 
                        of care while maintaining compassion and respect for every patient.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Hospital Services Tab Content */}
            {activeHospitalTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">Hospital Services</h3>
                    <p className="text-gray-700 mb-8">
                      Imam Hussain Hospital offers a comprehensive range of healthcare services 
                      to meet the diverse needs of our community:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Emergency Care",
                          description: "24/7 emergency services for immediate medical attention",
                          icon: <Clock className="text-blue-600" size={20} />
                        },
                        {
                          title: "Outpatient Department",
                          description: "Regular consultations with specialists across various fields",
                          icon: <Users className="text-blue-600" size={20} />
                        },
                        {
                          title: "Surgical Services",
                          description: "Modern operating theaters for various surgical procedures",
                          icon: <Stethoscope className="text-blue-600" size={20} />
                        },
                        {
                          title: "Diagnostic Services",
                          description: "Comprehensive testing and imaging facilities",
                          icon: <Search className="text-blue-600" size={20} />
                        },
                        {
                          title: "Maternal & Child Health",
                          description: "Specialized care for mothers and children",
                          icon: <Heart className="text-blue-600" size={20} />
                        },
                        {
                          title: "Pharmacy Services",
                          description: "On-site pharmacy for convenient medication access",
                          icon: <Pill className="text-blue-600" size={20} />
                        },
                      ].map((service, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="mt-1">{service.icon}</div>
                          <div>
                            <h4 className="font-bold text-blue-900">{service.title}</h4>
                            <p className="text-gray-700 text-sm">{service.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => scrollToSection('contact')}
                      className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Info size={18} />
                      <span>Request Service Information</span>
                    </motion.button>
                  </div>
                  
                  <div className="lg:col-span-5">
                    <div className="bg-blue-600 rounded-2xl shadow-lg overflow-hidden p-8 text-white mb-8">
                      <h3 className="text-xl font-bold mb-4">Hospital Hours</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Emergency Services</span>
                          <span className="font-bold">24/7</span>
                        </div>
                        <div className="border-t border-white/20"></div>
                        <div className="flex justify-between items-center">
                          <span>OPD Timing (Mon-Sat)</span>
                          <span className="font-bold">9:00 AM - 5:00 PM</span>
                        </div>
                        <div className="border-t border-white/20"></div>
                        <div className="flex justify-between items-center">
                          <span>Laboratory Services</span>
                          <span className="font-bold">8:00 AM - 8:00 PM</span>
                        </div>
                        <div className="border-t border-white/20"></div>
                        <div className="flex justify-between items-center">
                          <span>Pharmacy</span>
                          <span className="font-bold">24 Hours</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                      <h3 className="text-xl font-bold text-blue-900 mb-4">Patient Testimonials</h3>
                      <motion.div
                        className="bg-blue-50 p-4 rounded-lg mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-gray-700 italic mb-3">
                          "The care I received at Imam Hussain Hospital was exceptional. The doctors were knowledgeable and attentive, and the staff was incredibly supportive throughout my stay."
                        </p>
                        <p className="text-blue-900 font-medium text-sm">- Ahmed K., Srinagar</p>
                      </motion.div>
                      
                      <motion.div
                        className="bg-blue-50 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-gray-700 italic mb-3">
                          "I was impressed by the modern facilities and the cleanliness of the hospital. The doctors explained everything clearly and made me feel comfortable and confident in my treatment."
                        </p>
                        <p className="text-blue-900 font-medium text-sm">- Fatima S., Bemina</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Donation Section */}
      <section 
        id="donate" 
        ref={donateRef}
        className="py-24 relative"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
              backgroundSize: '100% 100%'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Support Our Cause
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Make a Difference Today
            </motion.h2>
            
            <motion.p 
              className="text-blue-100 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Your generous contribution helps us continue our mission of providing quality 
              healthcare services to those in need throughout Kashmir.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Impact Section */}
            <motion.div 
              className="lg:col-span-2 text-white"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6">Your Impact</h3>
              
              <div className="space-y-6 mb-8">
                {[
                  {
                    title: "Healthcare for the Underserved",
                    description: "Provides medical care to those who cannot afford it",
                    icon: <Users size={24} />
                  },
                  {
                    title: "Improved Facilities",
                    description: "Helps upgrade our equipment and infrastructure",
                    icon: <Building size={24} />
                  },
                  {
                    title: "Community Outreach",
                    description: "Supports health camps in remote areas",
                    icon: <Heart size={24} />
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-blue-100">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Testimonial */}
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <blockquote className="text-blue-50 italic mb-4">
                  "The generosity of our donors has enabled us to serve thousands of patients who 
                  would otherwise have no access to quality healthcare. Every contribution, 
                  no matter how small, makes a real difference in people's lives."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                    IH
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-white">Foundation Administrator</p>
                    <p className="text-sm text-blue-200">Imam Hussain A.S Foundation</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Bank Details Card */}
            <motion.div 
              className="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-blue-900">Bank Transfer Details</h3>
                  <motion.button
                    onClick={copyToClipboard}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                  </motion.button>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="mb-4 pb-4 border-b border-blue-100">
                      <div className="flex items-center space-x-2 text-blue-900 font-bold mb-2">
                        <Building size={20} />
                        <h4 className="text-lg">{bankDetails.accountName}</h4>
                      </div>
                      <p className="text-gray-700">
                        All donations are tax-exempt under section 80G of the Income Tax Act.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="group">
                        <p className="text-gray-600 font-medium mb-1">Account Number</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-blue-900 font-mono font-bold">{bankDetails.accountNumber}</p>
                          <motion.button
                            onClick={() => {
                              navigator.clipboard.writeText(bankDetails.accountNumber);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 3000);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Copy size={16} className="text-blue-600" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="group">
                        <p className="text-gray-600 font-medium mb-1">Account Type</p>
                        <p className="text-blue-900">{bankDetails.accountType}</p>
                      </div>
                      <div className="group">
                        <p className="text-gray-600 font-medium mb-1">Bank</p>
                        <p className="text-blue-900">{bankDetails.bank}</p>
                      </div>
                      <div className="group">
                        <p className="text-gray-600 font-medium mb-1">IFSC Code</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-blue-900 font-mono font-bold">{bankDetails.ifscCode}</p>
                          <motion.button
                            onClick={() => {
                              navigator.clipboard.writeText(bankDetails.ifscCode);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 3000);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Copy size={16} className="text-blue-600" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="group">
                        <p className="text-gray-600 font-medium mb-1">MICR Code</p>
                        <p className="text-blue-900">{bankDetails.micrCode}</p>
                      </div>
                      <div className="md:col-span-2 group">
                        <p className="text-gray-600 font-medium mb-1">Branch</p>
                        <p className="text-blue-900">{bankDetails.branch}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Copy All Details Button */}
                  <motion.button
                    onClick={copyToClipboard}
                    className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Clipboard size={18} />
                    <span>Copy All Bank Details</span>
                  </motion.button>
                </div>
                
                {/* Other Ways to Donate */}
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Other Ways to Support</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="font-bold text-blue-900 mb-2">Volunteer Your Time</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Join our team of dedicated volunteers supporting our healthcare initiatives.
                      </p>
                      <motion.button 
                        onClick={() => scrollToSection('contact')}
                        className="text-blue-600 font-medium text-sm flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <span>Contact us to volunteer</span>
                        <ArrowRight size={14} className="ml-1" />
                      </motion.button>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="font-bold text-blue-900 mb-2">Sponsor a Patient</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Cover medical expenses for those who cannot afford necessary treatments.
                      </p>
                      <motion.button 
                        onClick={() => scrollToSection('contact')} 
                        className="text-blue-600 font-medium text-sm flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <span>Learn about sponsorship</span>
                        <ArrowRight size={14} className="ml-1" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className="py-24 relative bg-blue-50"
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Get in Touch
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Contact Us
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Have questions about our services or wish to schedule an appointment? 
              Reach out to us and our team will be happy to assist you.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="How can we help you?"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Your message here..."
                      ></textarea>
                    </motion.div>
                    
                    <motion.button
                      type="button" // Changed from submit to prevent actual form submission
                      className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-8"
            >
              {/* Map Card */}
              <motion.div
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-64"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-blue-900/60 flex flex-col items-center justify-center p-6 text-center">
                  <MapPin size={40} className="text-white mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Our Location</h3>
                  <p className="text-blue-100">
                    Imam Hussain Hospital, <br />
                    Bemina, Srinagar, <br />
                    Kashmir 190010, India
                  </p>
                  <motion.a
                    href="https://maps.google.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.preventDefault()} // Prevent actual navigation
                    className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
              </motion.div>
              
              {/* Contact Details */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden p-8"
                whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <Phone size={24} />,
                      title: "Phone",
                      details: ["+91 2479131", "+91 2481635"],
                      action: "Call Now"
                    },
                    {
                      icon: <Mail size={24} />,
                      title: "Email",
                      details: ["ihfkashmir@gmail.com"],
                      action: "Send Email"
                    },
                    {
                      icon: <Clock size={24} />,
                      title: "Hours of Operation",
                      details: ["Monday - Saturday: 9am - 6pm", "Emergency: 24/7"],
                      action: "Schedule Visit"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-900 mb-1">{item.title}</h4>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-gray-700">{detail}</p>
                        ))}
                        <motion.button 
                          onClick={() => {
                            // Phone action would open phone, email would open email, etc.
                            // This is just a demo so we'll just scroll to the top
                            scrollToSection('home');
                          }}
                          className="text-blue-600 font-medium text-sm flex items-center mt-2"
                          whileHover={{ x: 5 }}
                        >
                          <span>{item.action}</span>
                          <ArrowRight size={14} className="ml-1" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Social Media */}
                <div className="mt-8">
                  <h4 className="font-bold text-blue-900 mb-4">Connect With Us</h4>
                  <div className="flex space-x-3">
                    {[
                      { icon: <Facebook size={18} />, label: "Facebook" },
                      { icon: <Instagram size={18} />, label: "Instagram" },
                      { icon: <Twitter size={18} />, label: "Twitter" }
                    ].map((social, index) => (
                      <motion.button
                        key={index}
                        onClick={() => scrollToSection('home')} // Just demo behavior
                        className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Foundation Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/IHHPHOTOS/imam-hussain-logo.jpg" 
                  alt="Imam Hussain Foundation Logo" 
                  className="h-10 w-10 object-cover rounded-md bg-white p-1"
                />
                <div>
                  <h3 className="font-bold">Imam Hussain A.S</h3>
                  <p className="text-sm text-blue-300">Foundation</p>
                </div>
              </div>
              
              <p className="text-blue-200 mb-6">
                Providing quality healthcare services to the people of Kashmir, 
                with a focus on serving underserved and vulnerable communities.
              </p>
              
              <div className="flex space-x-3">
                {[
                  { icon: <Facebook size={18} />, label: "Facebook" },
                  { icon: <Instagram size={18} />, label: "Instagram" },
                  { icon: <Twitter size={18} />, label: "Twitter" }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection('home')} // Just for demo
                    className="w-8 h-8 flex items-center justify-center bg-blue-800 rounded-full hover:bg-blue-700 transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: "Home", section: "home" },
                  { label: "About Us", section: "about" },
                  { label: "Services", section: "services" },
                  { label: "Hospital", section: "hospital" },
                  { label: "Donate", section: "donate" },
                  { label: "Contact Us", section: "contact" }
                ].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 3 }}>
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className="text-blue-200 hover:text-white transition-colors flex items-center"
                    >
                      <ChevronRight size={14} className="mr-2" />
                      <span>{item.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold text-lg mb-6">Our Services</h3>
              <ul className="space-y-3">
                {[
                  "General Medicine",
                  "Specialized Care",
                  "Blood Bank",
                  "Emergency Services",
                  "Community Outreach",
                  "Medical Education"
                ].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 3 }}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-blue-200 hover:text-white transition-colors flex items-center"
                    >
                      <ChevronRight size={14} className="mr-2" />
                      <span>{item}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: <MapPin size={18} />,
                    info: "Imam Hussain Hospital, Bemina, Srinagar, Kashmir 190010, India"
                  },
                  {
                    icon: <Phone size={18} />,
                    info: "+91 2479131, +91 2481635"
                  },
                  {
                    icon: <Mail size={18} />,
                    info: "ihfkashmir@gmail.com"
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-300 mr-3 mt-1 flex-shrink-0">{item.icon}</span>
                    <span className="text-blue-200">{item.info}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-blue-800 mt-12 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Imam Hussain A.S Foundation. All rights reserved.
              </p>
              
              <div className="flex space-x-6">
                {["Privacy Policy", "Terms of Service"].map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection('home')} // Just for demo
                    className="text-blue-200 text-sm hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Missing Pill and Search components */}
      {/* These were referenced but not defined, so adding them here */}
      {(() => {
        // Note: These are just dummy components to make the code compile
      //
        
        // Return null since we don't actually render these
        return null;
      })()}
    </div>
  );
};

export default App;
