import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp,
  Play,
  Star,
  ChevronDown,
  Building,
  Search,
  Shield,
  Globe,
  Rocket,
  MessageSquare,
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  Settings,
  Lightbulb,
  PieChart,
  Smartphone,
  Code,
  Megaphone
} from 'lucide-react';
import HeroSection from '../components/HeroSection';

const AmplifirmHomepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [, setActiveFeature] = useState(0);

  useEffect(() => {
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const servicesMenu = [
    { name: 'Business Consultancy', href: '#', icon: Building },
    { name: 'Marketing Solutions', href: '#', icon: Megaphone },
    { name: 'Website Development', href: '#', icon: Code },
    { name: 'Platform Development', href: '#', icon: Smartphone }
  ];

  const aboutMenu = [
    { name: 'Our Story', href: '#', icon: Star },
    { name: 'Meet the Team', href: '#', icon: Users },
    { name: 'Awards & Recognition', href: '#', icon: Award },
    { name: 'Case Studies', href: '#', icon: FileText }
  ];



  const trustedCompanies = [
    'TechStart', 'GrowthCorp', 'ScaleUp', 'InnovateLab', 'CloudFlow', 'RetailTech', 
    'FinanceFlow', 'StartupX', 'BuildFast', 'MarketLeap', 'TechFlow', 'VentureBase'
  ];

  const howItWorksSteps = [
    {
      number: '01',
      title: 'Book Your Discovery Call',
      description: 'Schedule a free consultation via Calendly. We\'ll dive deep into your business challenges and growth goals.',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '02', 
      title: 'Problem Analysis & Strategy',
      description: 'Our experts analyze your operations, marketing, and financials to identify opportunities and create tailored solutions.',
      icon: Search,
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '03',
      title: 'Implement & Scale',
      description: 'We implement the solutions, whether it\'s marketing campaigns, operational systems, or custom development.',
      icon: Rocket,
      color: 'from-blue-500 to-blue-600'
    }
  ];



  const stats = [
    { value: '150+', label: 'Clients Served', icon: Users },
    { value: '300+', label: 'Websites Built', icon: Code },
    { value: '3+', label: 'Years Experience', icon: Clock },
    { value: '100%', label: 'Tailored Solutions', icon: Target }
  ];


  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      {/* Enhanced background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(33,106,217,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(33,106,217,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Subtle background enhancement */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-blue-100/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Mouse gradient effect */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(33, 106, 217, 0.3), transparent 40%)`
        }}
      />

      {/* Navbar */}
      <motion.nav 
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="bg-white/85 backdrop-blur-2xl border border-gray-200/40 rounded-3xl shadow-xl px-8 py-4 max-w-6xl w-full"
          whileHover={{ scale: 1.01, y: -1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-8">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Lightbulb className="w-4 h-4 text-white" />
                </motion.div>
                <div>
                  <span className="text-lg font-bold text-gray-900">Amplifirm</span>
                </div>
              </motion.div>
              
              <div className="hidden lg:flex items-center space-x-1">
                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown('services')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <motion.button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Building className="w-4 h-4" />
                    <span>Services</span>
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {hoveredDropdown === 'services' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {servicesMenu.map((item, index) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown('about')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <motion.button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="w-4 h-4" />
                    <span>About</span>
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {hoveredDropdown === 'about' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {aboutMenu.map((item, index) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {['Pricing', 'Contact'].map((item, index) => (
                  <motion.a 
                    key={item}
                    href="#" 
                    className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <motion.button 
              className="text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#216ad9' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 40px rgba(33, 106, 217, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      <HeroSection/>


      {/* Client Success Showcase */}
      <motion.div 
        className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 pb-32"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.4 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Problems. Real Solutions. Real Results.</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've transformed businesses across industries with our tailored approach
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              problem: "E-commerce store struggling with 0.8% conversion rate",
              solution: "Implemented conversion optimization strategy + new checkout flow",
              result: "Increased to 4.2% conversion rate (+425% improvement)",
              industry: "E-commerce",
              timeframe: "3 months",
              color: "from-green-500 to-emerald-600"
            },
            {
              type: "video",
              videoId: "pOgzx82g0SU",
              caption: "Julian Schöffrman at Saviour",
              title: "Client Success Story",
              description: "See how we helped transform Saviour's business operations and growth strategy."
            },
            {
              problem: "Local service business relying only on word-of-mouth",
              solution: "Built digital presence + local SEO + automated lead system",
              result: "Generated 150+ qualified leads monthly",
              industry: "Local Services",
              timeframe: "4 months",
              color: "from-purple-500 to-pink-600"
            }
          ].map((story, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.8 + index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {story.type === "video" ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h4>
                    <p className="text-gray-600">{story.description}</p>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${story.videoId}`}
                      title="Client Success Story"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 italic">
                      "{story.caption}"
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {story.industry}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{story.timeframe}</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-red-600 mb-2 uppercase tracking-wider">The Problem</h4>
                      <p className="text-gray-700 leading-relaxed">{story.problem}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Our Solution</h4>
                      <p className="text-gray-700 leading-relaxed">{story.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-green-600 mb-2 uppercase tracking-wider">The Result</h4>
                      <p className="text-gray-900 font-semibold leading-relaxed">{story.result}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className={`mt-6 h-1 bg-gradient-to-r ${story.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 3 + index * 0.3 }}
                  />
                </>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          <motion.button 
            className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
            style={{ backgroundColor: '#216ad9' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>See More Success Stories</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Trusted By Section */}
      <section className="py-20 bg-gray-50 overflow-hidden relative">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Trusted by businesses across industries
            </motion.p>
          </motion.div>
          
          {/* Moving companies carousel */}
          <div className="relative">
            <motion.div 
              className="flex space-x-12 items-center"
              animate={{ x: [0, -50 * trustedCompanies.length] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                <motion.div 
                  key={`${company}-${index}`}
                  className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    color: '#216ad9'
                  }}
                  animate={{
                    y: [0, -3, 0]
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, delay: index * 0.2 }
                  }}
                >
                  {company}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Awards Section */}
        <motion.div 
          className="mt-20 px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-300 rounded-3xl p-10 relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
              animate={{ 
                borderColor: ["#fcd34d", "#f59e0b", "#ef4444", "#fcd34d"],
                boxShadow: [
                  "0 0 0 0 rgba(251, 191, 36, 0.5)",
                  "0 0 0 25px rgba(251, 191, 36, 0)",
                  "0 0 0 0 rgba(251, 191, 36, 0)"
                ]
              }}
              transition={{ 
                borderColor: { duration: 4, repeat: Infinity },
                boxShadow: { duration: 3, repeat: Infinity },
                scale: { duration: 0.3 },
                y: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="absolute top-5 right-5 text-4xl"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🏆
              </motion.div>
              
              <div className="text-center relative z-10">
                <motion.div 
                  className="text-yellow-600 text-lg font-bold uppercase tracking-wider mb-4"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 10px rgba(251,191,36,0.5)", "0 0 0px rgba(0,0,0,0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏆 Award Winning Consultancy 🏆
                </motion.div>
                <motion.h3 
                  className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
                  >
                    AI Startup of the Year
                  </motion.span>
                  <span className="mx-3 text-gray-400">•</span> 
                  <motion.span 
                    className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                  >
                    Equity Backed Startup
                  </motion.span>
                  <div className="text-2xl md:text-3xl mt-2 font-semibold text-gray-700">
                    Finalist (UK)
                  </div>
                </motion.h3>
                <motion.p 
                  className="text-xl text-gray-600 font-medium max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Recognized for excellence in business transformation and innovative solutions
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How we transform your business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven three-step process takes you from consultation to implementation, 
              with tailored solutions designed specifically for your business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {howItWorksSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4"
                      style={{ backgroundColor: '#216ad9' }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-6xl font-bold text-gray-200">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
                
                {index < howItWorksSteps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solution Approach */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              We solve the problems that hold you back
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every business faces unique challenges. We identify yours and implement solutions that work.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Problems Side */}
            <div className="space-y-8">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-red-600 mb-4">Common Business Problems</h3>
                <p className="text-gray-600">Sound familiar? We've solved these before.</p>
              </motion.div>

              {[
                {
                  icon: TrendingUp,
                  title: "Stagnant Growth",
                  description: "Revenue plateaued, can't break through to the next level, unclear growth strategy"
                },
                {
                  icon: Megaphone,
                  title: "Ineffective Marketing", 
                  description: "Marketing spend not generating ROI, low conversion rates, poor lead quality"
                },
                {
                  icon: Settings,
                  title: "Operational Chaos",
                  description: "Manual processes, team inefficiencies, no clear systems or workflows"
                },
                {
                  icon: DollarSign,
                  title: "Cash Flow Issues",
                  description: "Unpredictable revenue, poor financial planning, difficulty securing funding"
                },
                {
                  icon: Code,
                  title: "Outdated Technology",
                  description: "Website doesn't convert, no digital presence, manual systems holding you back"
                }
              ].map((problem, index) => (
                <motion.div 
                  key={index}
                  className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <problem.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{problem.title}</h4>
                      <p className="text-gray-600">{problem.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Solutions Side */}
            <div className="space-y-8">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#216ad9' }}>Our Tailored Solutions</h3>
                <p className="text-gray-600">Designed specifically for your business.</p>
              </motion.div>

              {[
                {
                  icon: Rocket,
                  title: "Growth Strategy & Implementation",
                  description: "Data-driven growth plans, market expansion strategies, revenue optimization systems"
                },
                {
                  icon: Target,
                  title: "Marketing That Actually Works", 
                  description: "Our proven 4-phase marketing approach: Research → Create → Test → Scale"
                },
                {
                  icon: Building,
                  title: "Operational Excellence",
                  description: "Process automation, team optimization, workflow systemization, efficiency improvements"
                },
                {
                  icon: PieChart,
                  title: "Financial Optimization",
                  description: "Cash flow management, financial planning, funding preparation, budget optimization"
                },
                {
                  icon: Globe,
                  title: "Digital Transformation",
                  description: "Website development, platform creation, digital systems, online presence optimization"
                }
              ].map((solution, index) => (
                <motion.div 
                  key={index}
                  className="bg-blue-50 border-l-4 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  style={{ borderColor: '#216ad9' }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: -4 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#216ad9' }}>
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{solution.title}</h4>
                      <p className="text-gray-600">{solution.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Don't see your specific problem?
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                We've worked across 25+ industries solving unique challenges. Book a free consultation to discuss your specific situation.
              </p>
              <motion.button 
                className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                style={{ backgroundColor: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Proven track record of success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3+ years of helping businesses across industries achieve their goals 
              with tailored solutions and expert guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div 
                  className="text-5xl font-bold text-gray-900 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xl text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Industry Expertise */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Proven expertise across <span style={{ color: '#216ad9' }}>diverse industries</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From cutting-edge tech startups to established traditional businesses - 
              we understand the unique challenges of every sector and create solutions that work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                category: "Technology & Software",
                industries: ["SaaS Platforms", "E-commerce", "FinTech", "EdTech", "Artificial Intelligence"],
                icon: Code,
                color: "from-blue-500 to-cyan-600"
              },
              {
                category: "Professional Services",
                industries: ["Consulting", "Legal Services", "Accounting", "Real Estate", "Financial Advisory"],
                icon: Building,
                color: "from-purple-500 to-pink-600"
              },
              {
                category: "Healthcare & Wellness",
                industries: ["Medical Practices", "Dental Clinics", "Fitness Centers", "Mental Health", "Pharmaceuticals"],
                icon: Shield,
                color: "from-green-500 to-emerald-600"
              },
              {
                category: "Manufacturing & Production",
                industries: ["Industrial Manufacturing", "Food Production", "Automotive", "Construction", "Energy"],
                icon: Settings,
                color: "from-orange-500 to-red-600"
              },
              {
                category: "Hospitality & Retail",
                industries: ["Restaurants & Cafes", "Hotels & Travel", "Retail Stores", "Entertainment", "Fashion"],
                icon: Globe,
                color: "from-teal-500 to-blue-600"
              },
              {
                category: "Education & Non-Profit",
                industries: ["Educational Institutions", "Training Organizations", "Non-Profit Organizations", "Government", "Associations"],
                icon: Users,
                color: "from-yellow-500 to-orange-600"
              }
            ].map((sector, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${sector.color} rounded-2xl flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <sector.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{sector.category}</h3>
                
                <div className="space-y-2">
                  {sector.industries.map((industry, industryIndex) => (
                    <div key={industryIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#216ad9' }} />
                      <span className="text-gray-600 text-sm">{industry}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Your industry not listed?
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                We've successfully worked with businesses across many more sectors. 
                Every industry has unique challenges, and we create solutions that work specifically for your market.
              </p>
              <motion.button 
                className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                style={{ backgroundColor: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Discuss Your Industry</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Transparent, tailored pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No fixed pricing because no two businesses are the same. We create custom solutions 
              that fit your budget and deliver maximum value.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:border-blue-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Discovery Call
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    Free
                  </span>
                </div>
                <p className="text-gray-600">
                  Start with a comprehensive business analysis
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  'Complete business analysis',
                  'Problem identification', 
                  'Strategic recommendations',
                  'Custom quote preparation',
                  'Early bird discount eligibility'
                ].map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button 
                className="w-full py-4 rounded-2xl font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#216ad9' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Free Consultation
              </motion.button>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-500 ring-2 ring-blue-200 scale-105 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="text-white px-6 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#216ad9' }}>
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Budget
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    Any Size
                  </span>
                </div>
                <p className="text-gray-600">
                  Solutions designed for your specific budget
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  'Completely customized approach',
                  'Budget-conscious planning',
                  'Scalable solutions',
                  'Payment plans available',
                  'Early bird discounts included'
                ].map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button 
                className="w-full py-4 rounded-2xl font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#216ad9' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Custom Quote
              </motion.button>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-300 hover:border-blue-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    Custom
                  </span>
                </div>
                <p className="text-gray-600">
                  Full-scale business transformation
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  'Multi-department solutions',
                  'Dedicated project team',
                  'Ongoing support & optimization',
                  'Performance guarantees',
                  'Priority support'
                ].map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button 
                className="w-full py-4 rounded-2xl font-semibold transition-all duration-300 bg-gray-100 text-gray-900 hover:bg-gray-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Early Bird Discounts Available</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#216ad9' }}>Super Early Bird</div>
                  <p className="text-gray-600">Sign within 24 hours of consultation for maximum savings</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#216ad9' }}>Early Bird</div>
                  <p className="text-gray-600">Sign within 3 days of consultation for great savings</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button 
                  className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.a 
                  href="/pricing"
                  className="border-2 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center space-x-2"
                  style={{ borderColor: '#216ad9' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Find Out More</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marketing 4-Phase Approach */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-200 rounded-full px-5 py-3 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Megaphone className="w-4 h-4" style={{ color: '#216ad9' }} />
              <span className="text-sm font-semibold" style={{ color: '#216ad9' }}>Marketing Excellence</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our proven <span style={{ color: '#216ad9' }}>4-phase marketing</span> approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't waste your budget. Every campaign is strategically planned, 
              carefully executed, and continuously optimized for maximum ROI.
            </p>
          </motion.div>

          {/* Visual Process Flow */}
          <div className="relative mb-16">
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 hidden lg:block"
              style={{ background: 'linear-gradient(90deg, #216ad9 0%, #10b981 100%)' }}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
            />
            
            <div className="grid lg:grid-cols-4 gap-8 relative">
              {[
                {
                  phase: "01",
                  title: "Research & Strategy",
                  description: "Deep market analysis, competitor research, and strategic planning. No budget wasted on guesswork.",
                  icon: Search,
                  color: "from-red-500 to-pink-600",
                  features: ["Market analysis", "Competitor research", "Audience profiling", "Strategy development"],
                  highlight: "Industry benchmarks analysis"
                },
                {
                  phase: "02", 
                  title: "Create & Develop",
                  description: "Creative development, video production, and asset creation that resonates with your audience.",
                  icon: Lightbulb,
                  color: "from-orange-500 to-yellow-600",
                  features: ["Creative development", "Video production", "Copy writing", "Asset creation"],
                  highlight: "Professional creative assets"
                },
                {
                  phase: "03",
                  title: "Test & Launch",
                  description: "Strategic campaign launch with built-in A/B testing. Data guides every decision we make.",
                  icon: Rocket,
                  color: "from-blue-500 to-cyan-600",
                  features: ["Campaign launch", "A/B testing", "Performance monitoring", "Real-time optimization"],
                  highlight: "A/B testing protocols"
                },
                {
                  phase: "04",
                  title: "Scale & Optimize",
                  description: "Scale winning campaigns while continuously optimizing for better results and lower costs.",
                  icon: TrendingUp,
                  color: "from-green-500 to-emerald-600",
                  features: ["Performance scaling", "Cost optimization", "ROI maximization", "Continuous improvement"],
                  highlight: "ROI optimization"
                }
              ].map((phase, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Phase Circle */}
                  <motion.div 
                    className="relative mb-8 mx-auto w-24 h-24 lg:w-32 lg:h-32"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className={`w-full h-full bg-gradient-to-r ${phase.color} rounded-full flex items-center justify-center shadow-xl relative z-10`}
                      animate={{ 
                        boxShadow: [
                          "0 10px 30px rgba(0,0,0,0.2)",
                          "0 20px 50px rgba(0,0,0,0.3)",
                          "0 10px 30px rgba(0,0,0,0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <phase.icon className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-2 -right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm font-bold text-gray-700">{phase.phase}</span>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {phase.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-sm font-bold mb-2" style={{ color: '#216ad9' }}>
                        Key Focus: {phase.highlight}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {phase.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call-to-Action Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200 max-w-5xl mx-auto relative overflow-hidden">
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  Ready to transform your marketing?
                </h3>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  From VSL funnels and email marketing to pixel optimization and landing pages - 
                  we build everything you need for marketing success, tailored to your specific goals and budget.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "VSL Funnels", icon: Play },
                    { label: "Email Marketing", icon: MessageSquare },
                    { label: "Landing Pages", icon: Globe }
                  ].map((service, index) => (
                    <motion.div 
                      key={index}
                      className="bg-blue-50 rounded-2xl p-4 flex items-center space-x-3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <service.icon className="w-6 h-6" style={{ color: '#216ad9' }} />
                      <span className="font-semibold text-gray-700">{service.label}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a 
                    href="/marketing-solutions"
                    className="text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                    style={{ backgroundColor: '#216ad9' }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore Marketing Solutions</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                  
                  <motion.button 
                    className="border-2 text-gray-700 hover:text-blue-600 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center space-x-2"
                    style={{ borderColor: '#216ad9' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Book Marketing Consultation</span>
                    <Calendar className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why businesses choose Amplifirm
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another consultancy. We're partners in your success, 
              with a proven track record and approach that delivers real results.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "No Cookie-Cutter Solutions",
                description: "Every solution is designed specifically for your business, industry, and budget. We don't believe in one-size-fits-all approaches.",
                icon: Target,
                benefits: ["Tailored strategies", "Industry-specific solutions", "Budget-conscious planning"]
              },
              {
                title: "Proven Track Record", 
                description: "150+ successful projects, 300+ websites built, and recognition as AI Startup Finalist. Our results speak for themselves.",
                icon: Award,
                benefits: ["Award-winning team", "150+ clients served", "Verified success stories"]
              },
              {
                title: "End-to-End Support",
                description: "From initial consultation to ongoing optimization, we're with you every step of the way. No handoffs, no confusion.",
                icon: Shield,
                benefits: ["Complete support", "Ongoing optimization", "Single point of contact"]
              }
            ].map((reason, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <reason.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{reason.description}</p>
                <div className="space-y-3">
                  {reason.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What our <span style={{ color: '#216ad9' }}>clients</span> say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real businesses who've transformed their operations 
              with our tailored solutions.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                content: "Amplifirm transformed our entire marketing approach. Our conversion rate went from 1.2% to 4.8% in just 3 months. The ROI has been incredible.",
                name: "Sarah Mitchell",
                role: "Founder",
                company: "TechFlow Solutions",
                rating: 5
              },
              {
                content: "We were struggling with operational inefficiencies. Amplifirm streamlined our processes and saved us 15 hours per week. Game-changing.",
                name: "James Wilson",
                role: "Operations Director", 
                company: "ScaleUp Manufacturing",
                rating: 5
              },
              {
                content: "Their tailored approach to our industry was exactly what we needed. They understood our challenges and delivered solutions that actually work.",
                name: "Emily Rodriguez",
                role: "CEO",
                company: "Healthcare Innovations",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: '#216ad9', color: 'white' }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about working with Amplifirm.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do you determine pricing for each project?",
                answer: "We don't have fixed pricing because every business is unique. After our free consultation, we understand your specific needs, budget, and goals, then create a custom quote that delivers maximum value within your budget range."
              },
              {
                question: "What industries do you work with?",
                answer: "We work with businesses across all industries - from tech startups to traditional manufacturing, healthcare to hospitality. Our approach is to understand your specific industry challenges and create solutions that work for your market."
              },
              {
                question: "How long does it typically take to see results?",
                answer: "This depends on the type of solution, but most clients see initial improvements within 4-6 weeks. Marketing campaigns can show results even faster, while operational changes may take 2-3 months to fully implement and optimize."
              },
              {
                question: "Do you work with small businesses or just large companies?",
                answer: "We work with businesses of all sizes - from startups just getting off the ground to established companies generating millions. Our solutions are tailored to your current size and growth stage."
              },
              {
                question: "What's included in the free consultation?",
                answer: "A comprehensive business analysis where we identify problems, discuss your goals, and provide strategic recommendations. You'll leave with actionable insights regardless of whether you choose to work with us."
              },
              {
                question: "How do the early bird discounts work?",
                answer: "Super Early Bird (24-hour decision): Maximum discount on your custom quote. Early Bird (3-day decision): Significant discount on your custom quote. These incentives reward quick decision-making after our consultation."
              },
              {
                question: "What makes your 4-phase marketing approach different?",
                answer: "Unlike agencies that jump straight into campaigns, we start with deep research and strategy. This ensures no budget is wasted on guesswork. Our systematic approach of Research → Create → Test → Scale has consistently delivered better ROI for our clients."
              },
              {
                question: "Can you handle both consultancy and marketing for the same business?",
                answer: "Absolutely! Many of our clients benefit from our integrated approach. We can optimize your operations while simultaneously improving your marketing, creating synergies that amplify results across your entire business."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Book a free consultation and we'll answer all your questions while analyzing your business.
              </p>
              <motion.button 
                className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                style={{ backgroundColor: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #216ad9 0%, #1e5cb3 100%)' }}>
        <motion.div 
          className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book your free consultation today and discover how our tailored solutions 
              can solve your business challenges and accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Free consultation • No obligations • Custom solutions designed for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#216ad9' }}>
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Amplifirm</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-6">
                Award-winning business consultancy specializing in tailored solutions for operational, 
                marketing, and financial challenges. Transforming businesses across all industries.
              </p>
              <div className="text-sm text-gray-500">
                <p>AMPLIFIRM LTD</p>
                <p>Company Number: 15426833</p>
                <p>Registered in England & Wales</p>
              </div>
            </div>
            
            {[
              { 
                title: 'Services', 
                links: ['Business Consultancy', 'Marketing Solutions', 'Website Development', 'Platform Development', 'Custom Solutions'] 
              },
              { 
                title: 'Company', 
                links: ['About Us', 'Our Team', 'Case Studies', 'Awards', 'Careers'] 
              },
              { 
                title: 'Support', 
                links: ['Contact Us', 'Book Consultation', 'FAQ', 'Resources', 'Blog'] 
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-lg mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a 
                        href="#" 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 Amplifirm Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AmplifirmHomepage;