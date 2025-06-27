// Add this to your index.css file:
/*
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800,900&display=swap');

* {
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
}
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Brain, 
  Sparkles, 
  Target, 
  Users, 
  TrendingUp,
  Play,
  Star,
  ChevronRight,
  ChevronDown,
  Building,
  Search,
  Zap,
  BarChart3,
  Shield,
  Globe,
  Rocket,
  MessageSquare,
  Award,
  CheckCircle,
  Clock,
  DollarSign,

  Calendar,

  FileText
} from 'lucide-react';

const AmpliFirmHubHomepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

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

  const buyersMenu = [
    { name: 'Find Marketing Partners', href: '#', icon: Search },
    { name: 'How It Works', href: '#', icon: Play },
    { name: 'Success Stories', href: '#', icon: Award },
    { name: 'Pricing', href: '#', icon: Zap }
  ];

  const sellersMenu = [
    { name: 'Join as Agency', href: '#', icon: Building },
    { name: 'Agency Dashboard', href: '#', icon: BarChart3 },
    { name: 'Resources', href: '#', icon: Globe },
    { name: 'Partner Support', href: '#', icon: MessageSquare }
  ];

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.5
  }));

  const trustedCompanies = [
    'Stripe', 'Notion', 'Linear', 'Figma', 'Vercel', 'Supabase', 'Clerk', 'Framer',
    'OpenAI', 'Anthropic', 'Perplexity', 'Replicate', 'Hugging Face', 'Runway'
  ];

  const howItWorksSteps = [
    {
      number: '01',
      title: 'Tell us about your business',
      description: 'Our AI analyzes your company profile, budget, goals, and marketing needs in just 2 minutes.',
      icon: Building,
      color: 'from-blue-500 to-teal-600'
    },
    {
      number: '02', 
      title: 'Get matched instantly',
      description: 'Advanced algorithms match you with pre-vetted agencies that specialize in your industry and budget range.',
      icon: Brain,
      color: 'from-blue-500 to-teal-600'
    },
    {
      number: '03',
      title: 'Start your campaign',
      description: 'Connect directly with your matches, compare proposals, and launch campaigns with built-in project management.',
      icon: Rocket,
      color: 'from-blue-500 to-teal-600'
    }
  ];

  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Our advanced algorithms analyze 47+ data points to find your perfect marketing partner.',
      icon: Brain,
      stats: '98% accuracy rate',
      preview: 'Real-time compatibility scoring'
    },
    {
      title: 'Instant Proposals',
      description: 'Get custom proposals from top agencies within 24 hours, not weeks.',
      icon: Zap,
      stats: '< 24 hour response',
      preview: 'Automated proposal generation'
    },
    {
      title: 'Project Management',
      description: 'Built-in tools to track progress, manage deliverables, and ensure on-time delivery.',
      icon: Calendar,
      stats: '94% on-time delivery',
      preview: 'Collaborative workspace'
    },
    {
      title: 'Performance Analytics',
      description: 'Real-time dashboards showing ROI, campaign performance, and actionable insights.',
      icon: BarChart3,
      stats: '340% avg ROI increase',
      preview: 'Live performance tracking'
    }
  ];

  const businessFeatures = [
    {
      title: 'Smart Matching Algorithm',
      description: 'Get matched with agencies that have proven success in your exact industry and budget range.',
      icon: Target,
      benefits: ['Industry expertise verification', 'Budget-optimized matches', 'Success rate tracking']
    },
    {
      title: 'Transparent Pricing', 
      description: 'See upfront costs, compare proposals side-by-side, and never worry about hidden fees.',
      icon: DollarSign,
      benefits: ['Fixed-price projects', 'Cost comparison tools', 'No hidden fees']
    },
    {
      title: 'Quality Assurance',
      description: 'Every agency is pre-vetted with verified case studies, client reviews, and performance metrics.',
      icon: Shield,
      benefits: ['Verified track records', 'Client testimonials', 'Performance guarantees']
    }
  ];

  const agencyFeatures = [
    {
      title: 'Qualified Lead Generation',
      description: 'Only get matched with serious businesses that fit your ideal client profile.',
      icon: Users,
      benefits: ['Pre-qualified prospects', 'Perfect-fit clients', 'Higher conversion rates']
    },
    {
      title: 'Automated Proposals',
      description: 'Our AI helps create compelling proposals that win more business in less time.',
      icon: FileText,
      benefits: ['Template automation', 'Success rate optimization', 'Time-saving tools']
    },
    {
      title: 'Performance Showcase',
      description: 'Highlight your best work with verified case studies and client success metrics.',
      icon: Award,
      benefits: ['Verified case studies', 'Client testimonials', 'Performance metrics']
    }
  ];

  const stats = [
    { value: '12K+', label: 'Successful Matches', icon: Target },
    { value: '96.4%', label: 'Success Rate', icon: TrendingUp },
    { value: '$45M+', label: 'Revenue Generated', icon: DollarSign },
    { value: '2.3 hrs', label: 'Avg Match Time', icon: Clock }
  ];

  const pricingPlans = [
    {
      name: 'For Businesses',
      price: 'Free',
      description: 'Find your perfect marketing partner',
      features: [
        'AI-powered matching',
        'Unlimited searches',
        'Direct agency contact',
        'Project management tools',
        'Performance tracking'
      ],
      cta: 'Speak to Our AI',
      popular: false
    },
    {
      name: 'For Agencies',
      price: '$99',
      period: '/month',
      description: 'Grow your agency with quality leads',
      features: [
        'Qualified lead matching',
        'Automated proposals',
        'Performance showcase',
        'Client communication tools',
        'Analytics dashboard'
      ],
      cta: 'Start Free Trial',
      popular: true
    }
  ];

  const faqs = [
    {
      question: 'How does the AI matching work?',
      answer: 'Our AI analyzes 47+ data points including your industry, budget, company size, goals, and previous marketing performance to match you with agencies that have proven success with similar businesses.'
    },
    {
      question: 'What if I\'m not satisfied with my matches?',
      answer: 'We guarantee satisfaction. If you\'re not happy with your initial matches, our team will personally review your requirements and provide new recommendations within 24 hours.'
    },
    {
      question: 'How are agencies vetted?',
      answer: 'Every agency goes through a rigorous 5-step verification process including portfolio review, client reference checks, case study validation, and performance metric verification.'
    },
    {
      question: 'Is there really no cost for businesses?',
      answer: 'Absolutely free for businesses. We only charge agencies for access to qualified leads. This ensures agencies are motivated to provide exceptional results to maintain their platform access.'
    },
    {
      question: 'How quickly can I start a campaign?',
      answer: 'Most businesses receive their first proposals within 24 hours and can start campaigns within a week. Our streamlined process eliminates the typical 4-6 week agency search timeline.'
    },
    {
      question: 'What industries do you support?',
      answer: 'We support all industries but specialize in SaaS, E-commerce, FinTech, HealthTech, and B2B services. Our AI has the deepest expertise in these high-growth sectors.'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Enhanced floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-300/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Mouse gradient effect */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 40%)`
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
                  className="w-9 h-9 bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Brain className="w-4 h-4 text-white" />
                </motion.div>
                <div>
                  <span className="text-lg font-bold text-gray-900">AmpliFirm</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Hub</span>
                </div>
              </motion.div>
              
              <div className="hidden lg:flex items-center space-x-1">
                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown('buyers')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <motion.button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="w-4 h-4" />
                    <span>For Businesses</span>
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {hoveredDropdown === 'buyers' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {buyersMenu.map((item, index) => (
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
                  onMouseEnter={() => setHoveredDropdown('sellers')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <motion.button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Building className="w-4 h-4" />
                    <span>For Agencies</span>
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {hoveredDropdown === 'sellers' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {sellersMenu.map((item, index) => (
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

                {['About', 'Contact'].map((item, index) => (
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
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Speak to Our AI
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-40 max-w-5xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
        <motion.div 
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm font-semibold text-blue-700">New</span>
          <span className="text-sm text-blue-600">AI Matchmaking 2.0 is live 🚀</span>
          <ChevronRight className="w-4 h-4 text-blue-400" />
        </motion.div>

        <div className="mb-10">
          <motion.h1 
            className="text-8xl font-bold text-gray-900"
            style={{ lineHeight: '1' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Find your
              <motion.span 
                className="inline-flex items-center mx-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.span 
                  className="w-24 h-24 md:w-28 md:h-28 bg-green-500 rounded-2xl flex items-center justify-center mx-2 shadow-xl"
                  style={{ transform: 'rotate(-8deg)' }}
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [-8, -3, -8],
                    boxShadow: [
                      "0 10px 30px rgba(34, 197, 94, 0.3)",
                      "0 20px 50px rgba(34, 197, 94, 0.5)",
                      "0 10px 30px rgba(34, 197, 94, 0.3)"
                    ]
                  }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Brain className="w-12 h-12 md:w-14 md:h-14 text-white" style={{ transform: 'rotate(8deg)' }} />
                </motion.span>
              </motion.span>
              perfect
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              marketing
              <motion.span 
                className="inline-flex items-center mx-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.span 
                  className="w-24 h-24 md:w-28 md:h-28 bg-red-500 rounded-2xl flex items-center justify-center mx-2 shadow-xl"
                  style={{ transform: 'rotate(12deg)' }}
                  animate={{ 
                    rotate: [12, 25, -5, 12],
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 10px 30px rgba(239, 68, 68, 0.3)",
                      "0 20px 50px rgba(239, 68, 68, 0.5)",
                      "0 10px 30px rgba(239, 68, 68, 0.3)"
                    ]
                  }}
                  transition={{ 
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3, repeat: Infinity, delay: 1 }
                  }}
                  whileHover={{ rotate: -5, scale: 1.15 }}
                >
                  <Target className="w-12 h-12 md:w-14 md:h-14 text-white" style={{ transform: 'rotate(-12deg)' }} />
                </motion.span>
              </motion.span>
              partner
            </motion.div>
          </motion.h1>
        </div>
        
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          Stop wasting time and money on mismatched partnerships. Our AI analyzes your business, 
          budget, and goals to connect you with <span className="font-semibold text-blue-600">marketing experts who deliver results</span>.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button 
            className="group bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.02, 
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Speak to Our AI</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
          
          <motion.button 
            className="group flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200 group-hover:shadow-xl group-hover:border-blue-200 transition-all duration-300"
              whileHover={{ rotate: 10 }}
            >
              <Play className="w-5 h-5 text-gray-700 group-hover:text-blue-600 ml-1" />
            </motion.div>
            <div className="text-left">
              <div className="text-lg font-semibold">See how it works</div>
              <div className="text-sm text-gray-500">3 min demo</div>
            </div>
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-center space-x-6 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -1 }}
          >
            <Shield className="w-4 h-4 text-blue-500" />
            <span>No credit card required</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -1 }}
          >
            <Zap className="w-4 h-4 text-blue-500" />
            <span>Setup in 5 minutes</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -1 }}
          >
            <Award className="w-4 h-4 text-blue-500" />
            <span>94% success rate</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Dashboard Preview */}
      <motion.div 
        className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 pb-32"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.4 }}
      >
        <motion.div 
          className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center px-8 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex gap-3">
              <motion.div 
                className="w-4 h-4 rounded-full bg-red-400"
                whileHover={{ scale: 1.3 }}
              />
              <motion.div 
                className="w-4 h-4 rounded-full bg-yellow-400"
                whileHover={{ scale: 1.3 }}
              />
              <motion.div 
                className="w-4 h-4 rounded-full bg-green-400"
                whileHover={{ scale: 1.3 }}
              />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white px-6 py-2 rounded-xl text-sm text-gray-600 border shadow-sm">
                app.amplifirmhub.ai
              </div>
            </div>
          </div>
          
          <div className="p-10 min-h-[700px] bg-gradient-to-br from-gray-50/50 to-white">
            <motion.div 
              className="flex items-center justify-between mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">AI Matchmaking Dashboard</h3>
                <div className="flex items-center space-x-4">
                  <p className="text-gray-600">Real-time marketing intelligence</p>
                  <motion.div 
                    className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-blue-700">Live</span>
                  </motion.div>
                </div>
              </div>
              <motion.div 
                className="text-right bg-white rounded-2xl p-6 shadow-lg border"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <h3 className="text-sm font-medium text-gray-600 mb-1">Overall Success Rate</h3>
                <motion.p 
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  96.4%
                </motion.p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "96.4%" }}
                    transition={{ duration: 2, delay: 3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { 
                  title: 'Active Matches', 
                  value: '3,247', 
                  icon: Target, 
                  change: '+23%', 
                  color: 'from-blue-500 to-teal-600',
                  chart: [20, 45, 28, 80, 99, 43, 85]
                },
                { 
                  title: 'Live Projects', 
                  value: '1,856', 
                  icon: Rocket, 
                  change: '+18%', 
                  color: 'from-blue-500 to-teal-600',
                  chart: [30, 55, 38, 70, 89, 53, 75]
                },
                { 
                  title: 'Success Stories', 
                  value: '2,891', 
                  icon: Star, 
                  change: '+31%', 
                  color: 'from-blue-500 to-teal-600',
                  chart: [40, 65, 48, 90, 79, 63, 95]
                },
                { 
                  title: 'Revenue Generated', 
                  value: '$4.2M', 
                  icon: TrendingUp, 
                  change: '+45%', 
                  color: 'from-blue-500 to-teal-600',
                  chart: [25, 50, 35, 85, 92, 58, 88]
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{stat.title}</p>
                      <motion.p 
                        className="text-3xl font-bold text-gray-900"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm text-blue-600 font-semibold mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="flex items-end space-x-1 h-12">
                    {stat.chart.map((height, chartIndex) => (
                      <motion.div
                        key={chartIndex}
                        className={`flex-1 bg-gradient-to-t ${stat.color} rounded-sm opacity-70`}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: 3 + chartIndex * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-10">
              <div className="lg:col-span-2">
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-lg border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 3.2 }}
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Recent Matches</h4>
                  <div className="space-y-4">
                    {[
                      { company: 'TechFlow Inc.', agency: 'Digital Dynamo', budget: '$25k', match: '98%' },
                      { company: 'StartupX', agency: 'Growth Partners', budget: '$15k', match: '95%' },
                      { company: 'ScaleUp Co.', agency: 'Marketing Mavens', budget: '$50k', match: '97%' }
                    ].map((match, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 3.4 + index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center">
                            <Building className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{match.company}</p>
                            <p className="text-sm text-gray-600">matched with {match.agency}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{match.budget}</p>
                          <p className="text-sm text-blue-600">{match.match} match</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 3.2 }}
              >
                <h4 className="text-xl font-bold text-gray-900 mb-4">Market Trends</h4>
                <div className="space-y-4">
                  {[
                    { trend: 'SaaS Marketing', growth: '+45%', color: 'text-blue-600' },
                    { trend: 'E-commerce', growth: '+32%', color: 'text-blue-600' },
                    { trend: 'FinTech', growth: '+28%', color: 'text-blue-600' }
                  ].map((trend, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 3.6 + index * 0.1 }}
                    >
                      <span className="font-medium text-gray-700">{trend.trend}</span>
                      <span className={`font-bold ${trend.color}`}>{trend.growth}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3.8 }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.div 
                className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="flex items-start space-x-6 relative z-10">
                <motion.div 
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(255, 255, 255, 0.3)", 
                      "0 0 0 15px rgba(255, 255, 255, 0)", 
                      "0 0 0 0 rgba(255, 255, 255, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="w-8 h-8" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-bold text-2xl mb-2">AI Marketing Intelligence</h4>
                  <p className="text-blue-100 mb-4">Powered by advanced machine learning algorithms</p>
                  <motion.p 
                    className="text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                  >
                    "Based on your SaaS profile, $75k annual budget, and Series A growth stage, our AI has identified 
                    <span className="font-semibold"> 5 specialized agencies</span> with proven B2B SaaS results in your vertical. 
                    Predicted ROI improvement: <span className="font-bold text-yellow-300 text-xl">+340%</span> within 6 months."
                  </motion.p>
                  <motion.div 
                    className="flex items-center space-x-4 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.2 }}
                  >
                    <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg font-semibold transition-colors">
                      View Matches
                    </button>
                    <button className="border border-white/30 hover:border-white/50 px-6 py-2 rounded-lg font-semibold transition-colors">
                      Learn More
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Trusted By Section */}
      <section className="py-20 bg-gray-50 overflow-hidden relative">
        {/* Floating background elements */}
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-16 h-16 bg-red-200/30 rounded-full blur-xl"
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
              Trusted by leading companies worldwide
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
              {/* Duplicate array for seamless loop */}
              {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                <motion.div 
                  key={`${company}-${index}`}
                  className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    color: index % 3 === 0 ? "#ef4444" : index % 3 === 1 ? "#22c55e" : "#3b82f6"
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
        
        {/* Enhanced Awards Section - Make it MASSIVE */}
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
              {/* Floating award icons */}
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
              <motion.div 
                className="absolute bottom-5 left-5 text-3xl"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                🎖️
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
                  🏆 Multiple Award Winning Platform 🏆
                </motion.div>
                <motion.h3 
                  className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    AI Startup of the Year
                  </motion.span>
                  <span className="mx-3 text-gray-400">•</span> 
                  <motion.span 
                    className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
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
                  Recognized by industry leaders as the UK's most innovative AI-powered marketing platform
                </motion.p>
                
                {/* Award badges */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-6">
                  <motion.div 
                    className="flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-lg border-2 border-yellow-200"
                    whileHover={{ scale: 1.05, y: -3 }}
                    animate={{ 
                      boxShadow: [
                        "0 4px 20px rgba(251, 191, 36, 0.3)",
                        "0 8px 30px rgba(251, 191, 36, 0.5)",
                        "0 4px 20px rgba(251, 191, 36, 0.3)"
                      ]
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-900">AI Startup Finalist</div>
                      <div className="text-xs text-yellow-600 font-semibold">Innovation Excellence</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-lg border-2 border-red-200"
                    whileHover={{ scale: 1.05, y: -3 }}
                    animate={{ 
                      boxShadow: [
                        "0 4px 20px rgba(239, 68, 68, 0.3)",
                        "0 8px 30px rgba(239, 68, 68, 0.5)",
                        "0 4px 20px rgba(239, 68, 68, 0.3)"
                      ]
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity, delay: 1 } }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center"
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    >
                      <Award className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-900">Equity Backed Finalist</div>
                      <div className="text-xs text-red-600 font-semibold">Growth Leadership</div>
                    </div>
                  </motion.div>
                </div>
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
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to campaign launch, our AI-powered platform 
              streamlines the entire process in just three simple steps.
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
                      className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mr-4`}
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

      {/* Features Overview Section */}
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
              Powerful features that deliver results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with human expertise 
              to ensure every marketing partnership succeeds.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-white shadow-lg border-l-4 border-blue-500' 
                      : 'bg-transparent hover:bg-white/50'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {feature.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-blue-600">
                          {feature.stats}
                        </span>
                        <span className="text-sm text-gray-500">
                          {feature.preview}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-8">
                  <motion.div 
                    className="text-center"
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      {React.createElement(features[activeFeature].icon, { className: "w-10 h-10 text-white" })}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {features[activeFeature].title}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      {features[activeFeature].description}
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {features[activeFeature].stats}
                      </div>
                      <div className="text-sm text-gray-500">
                        {features[activeFeature].preview}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Businesses Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  For growing businesses
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Stop wasting time and money on agencies that don't understand your business. 
                  Get matched with experts who have proven success in your exact industry.
                </p>
              </div>

              <div className="space-y-6">
                {businessFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {feature.description}
                        </p>
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-gray-600">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Speak to Our AI</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-teal-100 rounded-3xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { metric: '2.3 hrs', label: 'Average match time', icon: Clock },
                    { metric: '340%', label: 'ROI increase', icon: TrendingUp },
                    { metric: '94%', label: 'Success rate', icon: Target },
                    { metric: '$2.4M', label: 'Revenue generated', icon: DollarSign }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-2xl p-6 text-center shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {item.metric}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Agencies Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-teal-100 rounded-3xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Agency Success Metrics
                    </h3>
                  </div>
                  
                  {[
                    { label: 'Lead Quality Score', value: 94, color: 'from-blue-500 to-teal-600' },
                    { label: 'Client Retention Rate', value: 87, color: 'from-blue-500 to-teal-600' },
                    { label: 'Proposal Win Rate', value: 76, color: 'from-blue-500 to-teal-600' }
                  ].map((metric, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">{metric.label}</span>
                        <span className="text-2xl font-bold text-gray-900">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div 
                          className={`bg-gradient-to-r ${metric.color} h-3 rounded-full`}
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-8 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  For marketing agencies
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Stop chasing unqualified leads. Get matched with serious businesses 
                  that fit your expertise and are ready to invest in growth.
                </p>
              </div>

              <div className="space-y-6">
                {agencyFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {feature.description}
                        </p>
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Join as Agency Partner</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
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
              The numbers speak for themselves
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of successful partnerships, millions in revenue generated, 
              and countless businesses transformed through AI-powered matching.
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
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
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

      {/* Testimonials Section */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What our <span className="text-blue-600">clients</span> are saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about using our AI matchmaking platform, from setup to 
              success. Still curious? Drop us a message and we'll get right back to you.
            </p>
          </motion.div>

          {/* Top row - moving right */}
          <div className="relative mb-8">
            <motion.div 
              className="flex space-x-8 items-center"
              animate={{ x: [0, -100 * 6] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Duplicate array for seamless loop */}
              {[
                {
                  content: "The AI matching is incredible. Found an agency that understood our B2B SaaS needs perfectly.",
                  name: "Marcus Williams",
                  role: "Founder & CEO",
                  company: "StartupX",
                  avatar: "👨‍💻"
                },
                {
                  content: "AmpliFirmHub matched us with the perfect agency in 2 hours. Our conversion rate increased 340%.",
                  name: "Sarah Chen", 
                  role: "Head of Marketing",
                  company: "TechFlow Inc.",
                  avatar: "👩‍💼"
                },
                {
                  content: "Previously spent months finding agencies. AmpliFirmHub delivered 3 perfect matches instantly.",
                  name: "Emily Rodriguez",
                  role: "Marketing Director", 
                  company: "ScaleUp Co.",
                  avatar: "👩‍🚀"
                },
                {
                  content: "Quality of leads is outstanding. Every match is a perfect fit for our services.",
                  name: "David Park",
                  role: "Agency Owner",
                  company: "Growth Partners", 
                  avatar: "👨‍🎯"
                },
                {
                  content: "The platform handles everything - matching, proposals, project management. Game-changing.",
                  name: "Lisa Thompson",
                  role: "CMO",
                  company: "RetailTech",
                  avatar: "👩‍⚡"
                },
                {
                  content: "Transparent pricing, verified results, perfect matches. Finally, a platform that delivers.",
                  name: "Alex Kumar",
                  role: "Digital Marketing Lead",
                  company: "FinanceFlow",
                  avatar: "👨‍📊"
                }
              ].concat([
                {
                  content: "The AI matching is incredible. Found an agency that understood our B2B SaaS needs perfectly.",
                  name: "Marcus Williams",
                  role: "Founder & CEO",
                  company: "StartupX",
                  avatar: "👨‍💻"
                },
                {
                  content: "AmpliFirmHub matched us with the perfect agency in 2 hours. Our conversion rate increased 340%.",
                  name: "Sarah Chen", 
                  role: "Head of Marketing",
                  company: "TechFlow Inc.",
                  avatar: "👩‍💼"
                },
                {
                  content: "Previously spent months finding agencies. AmpliFirmHub delivered 3 perfect matches instantly.",
                  name: "Emily Rodriguez",
                  role: "Marketing Director", 
                  company: "ScaleUp Co.",
                  avatar: "👩‍🚀"
                },
                {
                  content: "Quality of leads is outstanding. Every match is a perfect fit for our services.",
                  name: "David Park",
                  role: "Agency Owner",
                  company: "Growth Partners", 
                  avatar: "👨‍🎯"
                },
                {
                  content: "The platform handles everything - matching, proposals, project management. Game-changing.",
                  name: "Lisa Thompson",
                  role: "CMO",
                  company: "RetailTech",
                  avatar: "👩‍⚡"
                },
                {
                  content: "Transparent pricing, verified results, perfect matches. Finally, a platform that delivers.",
                  name: "Alex Kumar",
                  role: "Digital Marketing Lead",
                  company: "FinanceFlow",
                  avatar: "👨‍📊"
                }
              ]).map((testimonial, index) => (
                <motion.div 
                  key={`top-${index}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-96 hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom row - moving left */}
          <div className="relative">
            <motion.div 
              className="flex space-x-8 items-center"
              animate={{ x: [-100 * 6, 0] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Different set of testimonials for bottom row */}
              {[
                {
                  content: "Best investment we've made for our marketing efforts. The ROI has been incredible.",
                  name: "Jennifer Walsh",
                  role: "VP Marketing",
                  company: "CloudTech",
                  avatar: "👩‍💻"
                },
                {
                  content: "Found our dream agency partner in under 24 hours. The matching accuracy is unreal.",
                  name: "Robert Kim",
                  role: "Marketing Lead",
                  company: "GrowthCorp",
                  avatar: "👨‍💼"
                },
                {
                  content: "Streamlined our entire agency search process. Saved us months of back and forth.",
                  name: "Amanda Foster",
                  role: "Brand Director",
                  company: "InnovateLab",
                  avatar: "👩‍🎨"
                },
                {
                  content: "The quality of agencies on this platform is exceptional. Highly recommend.",
                  name: "Michael Chen",
                  role: "Co-Founder",
                  company: "TechStart",
                  avatar: "👨‍🚀"
                },
                {
                  content: "Revolutionary platform for marketing partnerships. Changed how we do business.",
                  name: "Rachel Green",
                  role: "Marketing Manager",
                  company: "EcommPlus",
                  avatar: "👩‍🔬"
                },
                {
                  content: "From initial match to campaign launch - everything was seamless and professional.",
                  name: "James Wilson",
                  role: "Growth Director",
                  company: "ScaleFast",
                  avatar: "👨‍🎯"
                }
              ].concat([
                {
                  content: "Best investment we've made for our marketing efforts. The ROI has been incredible.",
                  name: "Jennifer Walsh",
                  role: "VP Marketing",
                  company: "CloudTech",
                  avatar: "👩‍💻"
                },
                {
                  content: "Found our dream agency partner in under 24 hours. The matching accuracy is unreal.",
                  name: "Robert Kim",
                  role: "Marketing Lead",
                  company: "GrowthCorp",
                  avatar: "👨‍💼"
                },
                {
                  content: "Streamlined our entire agency search process. Saved us months of back and forth.",
                  name: "Amanda Foster",
                  role: "Brand Director",
                  company: "InnovateLab",
                  avatar: "👩‍🎨"
                },
                {
                  content: "The quality of agencies on this platform is exceptional. Highly recommend.",
                  name: "Michael Chen",
                  role: "Co-Founder",
                  company: "TechStart",
                  avatar: "👨‍🚀"
                },
                {
                  content: "Revolutionary platform for marketing partnerships. Changed how we do business.",
                  name: "Rachel Green",
                  role: "Marketing Manager",
                  company: "EcommPlus",
                  avatar: "👩‍🔬"
                },
                {
                  content: "From initial match to campaign launch - everything was seamless and professional.",
                  name: "James Wilson",
                  role: "Growth Director",
                  company: "ScaleFast",
                  avatar: "👨‍🎯"
                }
              ]).map((testimonial, index) => (
                <motion.div 
                  key={`bottom-${index}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-96 hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No hidden fees, no long-term contracts. Get started for free and 
              scale as your business grows.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-blue-500 ring-2 ring-blue-200 scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xl text-gray-600">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {plan.description}
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button 
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.cta}
                </motion.button>
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
              Everything you need to know about AmpliFirmHub and how it works.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border"
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
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to find your perfect marketing partner?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of businesses and agencies who've transformed their 
              marketing partnerships with AI-powered matching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Speak to Our AI</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              No credit card required • 14-day free trial • Cancel anytime
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">AmpliFirm</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Hub</span>
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-6">
                AI-powered marketplace connecting businesses with their perfect marketing partners. 
                Transforming partnerships, delivering results.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'YouTube', 'Instagram'].map((social) => (
                  <motion.a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <span className="text-sm font-medium">
                      {social.charAt(0)}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {[
              { 
                title: 'For Businesses', 
                links: ['Find Agencies', 'How It Works', 'Success Stories', 'Pricing', 'Case Studies'] 
              },
              { 
                title: 'For Agencies', 
                links: ['Join Platform', 'Agency Dashboard', 'Resources', 'Support', 'Partner Program'] 
              },
              { 
                title: 'Company', 
                links: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'] 
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
              © 2024 AmpliFirmHub Inc. All rights reserved.
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

export default AmpliFirmHubHomepage;