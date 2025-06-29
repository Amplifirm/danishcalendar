import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp,
  Star,
  ChevronRight,
  Building,
  Zap,
  Rocket,
  Award,
  CheckCircle,
  DollarSign,
  Calendar,
  Lightbulb,
  Calculator,
  Heart,
  ExternalLink,
  X
} from 'lucide-react';
import Navbar from '../components/Navbar';

const AmplifirmPricingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('foundation');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Load Calendly script when modal opens
    if (isModalOpen && !document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Handle escape key to close modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookConsultation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGetQuote = () => {
    scrollToSection('budget-tiers');
  };

 


  const handleDiscussBudget = (budgetRange: string) => {
    console.log(`Discussing ${budgetRange} budget...`);
    setIsModalOpen(true);
  };

  const handleViewCaseStudies = () => {
    console.log('Viewing case studies...');
    // Add navigation to case studies
  };


  const budgetTiers = [
    {
      id: 'foundation',
      title: 'Getting Started',
      range: '£500 - £2K',
      description: 'Perfect for small businesses taking their first steps',
      color: 'from-emerald-500 to-green-600',
      icon: Heart,
      solutions: [
        'Comprehensive business audit & consultation',
        'Problem identification & prioritization',
        'Strategic roadmap development',
        'Basic system recommendations',
        'Resource guidance & templates'
      ],
      guidance: [
        'We\'ll assess your current business operations',
        'Identify your biggest growth opportunities',
        'Create a prioritized action plan',
        'Provide step-by-step implementation guide',
        'Supply templates and resources to get started'
      ],
      caseStudy: {
        business: 'Local Restaurant Chain',
        challenge: 'Struggling with operational inefficiencies and low profit margins',
        result: 'Streamlined operations + 45% profit increase in 4 months'
      }
    },
    {
      id: 'growth',
      title: 'Business Growth',
      range: '£2K - £8K',
      description: 'For businesses ready to establish solid foundations and scale',
      color: 'from-blue-500 to-cyan-600',
      icon: Rocket,
      solutions: [
        'Complete operational system setup',
        'Professional website development',
        'Phase 1-2 marketing implementation',
        'Basic automation & processes',
        'Team training & guidance'
      ],
      guidance: [
        'We\'ll build your foundational systems',
        'Implement our proven 4-phase marketing approach',
        'Create professional digital presence',
        'Set up essential business automation',
        'Train your team on new processes'
      ],
      caseStudy: {
        business: 'Tech SaaS Startup',
        challenge: 'Needed professional presence and systematic customer acquisition',
        result: 'Professional platform + 200% user growth in 3 months'
      }
    },
    {
      id: 'scaling',
      title: 'Scaling Operations',
      range: '£8K - £25K',
      description: 'Comprehensive transformation for serious growth',
      color: 'from-purple-500 to-pink-600',
      icon: TrendingUp,
      solutions: [
        'Full business optimization & systemization',
        'Advanced website with custom features',
        'Complete 4-phase marketing implementation',
        'Advanced automation & AI integration',
        'Ongoing optimization & scaling'
      ],
      guidance: [
        'We\'ll transform your entire operation',
        'Implement advanced marketing funnels & campaigns',
        'Build custom platforms and integrations',
        'Create scalable processes and systems',
        'Provide ongoing strategic guidance'
      ],
      caseStudy: {
        business: 'E-commerce Brand',
        challenge: 'Needed complete digital transformation and scale strategy',
        result: '400% revenue growth + international expansion in 6 months'
      }
    },
    {
      id: 'enterprise',
      title: 'Enterprise Level',
      range: '£25K - £100K+',
      description: 'Complete business transformation with ongoing partnership',
      color: 'from-orange-500 to-red-600',
      icon: Building,
      solutions: [
        'Enterprise-level business transformation',
        'Custom platform & system development',
        'Advanced marketing automation & AI',
        'Multi-department optimization',
        'Dedicated strategic partnership'
      ],
      guidance: [
        'We\'ll become your strategic technology partner',
        'Implement enterprise-grade solutions',
        'Optimize across all business departments',
        'Provide ongoing innovation and development',
        'Ensure sustainable long-term growth'
      ],
      caseStudy: {
        business: 'Manufacturing Corporation',
        challenge: 'Complete digital transformation across all departments needed',
        result: '60% operational efficiency + £3.2M revenue increase annually'
      }
    }
  ];

  const pricingPrinciples = [
    {
      icon: Heart,
      title: 'Budget-First Approach',
      description: 'We start with your budget and design the maximum value solution within that range, ensuring no wastage.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every solution is designed to deliver specific, measurable results based on industry benchmarks.'
    },
    {
      icon: Zap,
      title: 'Transparent Process',
      description: 'Clear breakdown of deliverables, timeline, and expected outcomes before you commit to anything.'
    },
    {
      icon: Rocket,
      title: 'Scalable Solutions',
      description: 'Start with what fits your budget now, then scale as your business grows and succeeds.'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'AI Startup Finalist',
      description: 'Finalist for AI Startup of the Year Award'
    },
    {
      icon: Star,
      title: 'Equity Backed Finalist',
      description: 'Equity Backed Startup of the Year finalist'
    },
    {
      icon: Building,
      title: '300+ Websites Built',
      description: 'Successfully delivered 300+ websites and platforms'
    },
    {
      icon: Users,
      title: '150+ Clients Served',
      description: '150+ businesses transformed through our consultancy'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
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
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(33, 106, 217, 0.3), transparent 40%)`
        }}
      />

     <Navbar/>

      {/* Hero Section */}
      <section id="hero" className="relative z-40 max-w-6xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
        <motion.div 
          className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <Calculator className="w-4 h-4" style={{ color: '#216ad9' }} />
          <span className="text-sm font-semibold" style={{ color: '#216ad9' }}>Transparent Pricing</span>
          <span className="text-sm" style={{ color: '#216ad9' }}>Tailored to Your Budget</span>
          <ChevronRight className="w-4 h-4 text-blue-400" />
        </motion.div>

        <motion.h1 
          className="text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Pricing that works
          <br />
          <span style={{ color: '#216ad9' }}>for your budget</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          No fixed pricing because no two businesses are the same. We create custom solutions 
          that deliver maximum value within your specific budget range.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: DollarSign, text: 'Any budget size welcome', color: '#216ad9' },
            { icon: Target, text: 'Solutions designed for maximum ROI', color: '#10b981' },
            { icon: Zap, text: 'Early bird discounts available', color: '#f59e0b' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-lg border border-gray-200"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color }}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.button 
          className="text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3"
          style={{ backgroundColor: '#216ad9' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ 
            scale: 1.05, 
            y: -3,
            boxShadow: "0 25px 50px rgba(33, 106, 217, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGetQuote}
        >
          <span>Get Your Custom Quote</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by businesses, recognized by industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3 years of transforming businesses with award-winning solutions and proven results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Principles */}
      <section id="pricing-philosophy" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our pricing philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe great solutions shouldn't be out of reach. Our approach ensures 
              you get maximum value regardless of your budget size.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPrinciples.map((principle, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <principle.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                <p className="text-gray-600 leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Tiers */}
      <section id="budget-tiers" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What your budget can achieve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startup budgets to enterprise investments - see what's possible 
              at every level and how we maximize your return.
            </p>
          </motion.div>

          {/* Budget Tier Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {budgetTiers.map((tier) => (
              <motion.button
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tier.id
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={activeTab === tier.id ? { backgroundColor: '#216ad9' } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tier.title} • {tier.range}
              </motion.button>
            ))}
          </div>

          {/* Active Tier Content */}
          <AnimatePresence mode="wait">
            {budgetTiers.map((tier) => 
              activeTab === tier.id && (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="space-y-8">
                    <div>
                      <motion.div 
                        className={`w-20 h-20 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center mb-6`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <tier.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-4">{tier.title}</h3>
                      <p className="text-2xl font-bold mb-4" style={{ color: '#216ad9' }}>{tier.range}</p>
                      <p className="text-xl text-gray-600 leading-relaxed">{tier.description}</p>
                    </div>

                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-6">What's included:</h4>
                      <div className="space-y-3">
                        {tier.solutions.map((solution, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                            <span className="text-lg text-gray-700">{solution}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.button 
                      className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer"
                      style={{ backgroundColor: '#216ad9' }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDiscussBudget(tier.range)}
                    >
                      <span>Discuss This Budget Range</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="space-y-8">
                    {/* Guidance Box */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                      <h4 className="text-2xl font-bold text-gray-900 mb-6">How we'll guide you:</h4>
                      <div className="space-y-3">
                        {tier.guidance.map((guide, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-start space-x-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#216ad9' }} />
                            <span className="text-gray-700">{guide}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Case Study */}
                    <div className="bg-white border-2 rounded-3xl p-8 shadow-lg" style={{ borderColor: '#216ad9' }}>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Success Story</h4>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Client</span>
                          <p className="text-lg font-semibold text-gray-900">{tier.caseStudy.business}</p>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Challenge</span>
                          <p className="text-gray-700">{tier.caseStudy.challenge}</p>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Result</span>
                          <p className="text-lg font-semibold text-gray-900">{tier.caseStudy.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Early Bird Discounts */}
      <section className="py-32 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Early bird discounts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The faster you move, the more you save. We reward quick decision-making 
              with significant discounts on your custom quote.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-yellow-300 relative overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div 
                className="absolute top-4 right-4 text-3xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⚡
              </motion.div>
              
              <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-600 mb-4">Super Early Bird</h3>
                <p className="text-6xl font-bold text-gray-900 mb-4">24hrs</p>
                <p className="text-xl text-gray-600 mb-6">
                  Sign within 24 hours of your consultation call
                </p>
                <div className="bg-orange-100 rounded-2xl p-6 mb-6">
                  <p className="text-2xl font-bold text-orange-700">Maximum Savings</p>
                  <p className="text-gray-700">Our biggest discount available</p>
                </div>
                <ul className="space-y-3 text-left">
                  {[
                    'Highest possible discount on your quote',
                    'Priority project scheduling',
                    'Bonus strategy session included',
                    'Extended support period'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-300 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div 
                className="absolute top-4 right-4 text-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.div>
              
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#216ad9' }}>Early Bird</h3>
                <p className="text-6xl font-bold text-gray-900 mb-4">3 days</p>
                <p className="text-xl text-gray-600 mb-6">
                  Sign within 3 days of your consultation call
                </p>
                <div className="bg-blue-100 rounded-2xl p-6 mb-6">
                  <p className="text-2xl font-bold" style={{ color: '#216ad9' }}>Significant Savings</p>
                  <p className="text-gray-700">Substantial discount on your investment</p>
                </div>
                <ul className="space-y-3 text-left">
                  {[
                    'Generous discount on your quote',
                    'Fast-track project initiation',
                    'Complimentary progress reviews',
                    'Dedicated project manager'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3 cursor-pointer"
              style={{ backgroundColor: '#216ad9' }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookConsultation}
            >
              <span>Book Consultation & Save</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
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
              Pricing questions answered
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our custom pricing approach.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Why don't you have fixed pricing?",
                answer: "Every business is unique with different challenges, goals, and budgets. Fixed pricing would mean either overcharging small businesses or underdelivering for larger ones. Our custom approach ensures you get maximum value within your specific budget range."
              },
              {
                question: "How do you determine the price for my project?",
                answer: "During our free consultation, we analyze your business needs, desired outcomes, timeline, and budget. We then create a custom solution that delivers the maximum impact within your investment range, with clear deliverables and timelines."
              },
              {
                question: "What if my budget is very small?",
                answer: "We work with businesses of all sizes, from startups with £500 budgets to enterprises investing £100K+. We'll design a solution that fits your budget and delivers real value, even if it means starting with the basics and scaling over time."
              },
              {
                question: "Can I pay in installments?",
                answer: "Yes! We offer flexible payment plans for most projects. Typically we structure payments around project milestones, making it easier to manage cash flow while ensuring steady progress on your business transformation."
              },
              {
                question: "What's included in the free consultation?",
                answer: "A comprehensive 60-90 minute session where we analyze your business, identify opportunities, and provide strategic recommendations. You'll receive actionable insights regardless of whether you choose to work with us, plus a custom quote if you decide to proceed."
              },
              {
                question: "How do the early bird discounts work exactly?",
                answer: "After your consultation, you'll receive a custom quote. If you sign within 24 hours, you get our Super Early Bird discount (maximum savings). If you sign within 3 days, you get our Early Bird discount (significant savings). These rewards help us plan resources efficiently."
              },
              {
                question: "Do you guarantee results?",
                answer: "While we can't guarantee specific outcomes (as business success depends on many factors), we do guarantee our commitment to delivering exactly what we promise in your custom proposal. We also provide performance tracking and optimization to maximize your results."
              },
              {
                question: "Can I start small and scale up later?",
                answer: "Absolutely! Many clients start with smaller projects to test our approach, then expand as they see results. We design scalable solutions that can grow with your business and budget over time."
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
              Ready to get your custom quote?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book your free consultation today. We'll analyze your business, understand your budget, 
              and create a custom solution designed specifically for your success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <span>Book Free Consultation</span>
                <ExternalLink className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewCaseStudies}
              >
                View Case Studies
              </motion.button>
            </div>
            
            <p className="text-sm text-blue-200">
              Free consultation • Custom quote within 24 hours • Early bird discounts available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendly Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[800px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200" style={{ backgroundColor: '#216ad9' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Book Your Free Consultation</h3>
                    <p className="text-blue-100 text-sm">Get your custom quote in 24 hours</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Calendly Embed */}
              <div className="h-full pb-6">
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/amplifirm/done-with-you-program-booking" 
                  style={{ minWidth: '320px', height: '100%', width: '100%' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                marketing, and financial challenges. Transforming businesses across all industries since 2021.
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
                      <motion.button
                        className="text-gray-400 hover:text-white transition-colors text-left"
                        whileHover={{ x: 4 }}
                        onClick={() => console.log(`Navigate to ${link}`)}
                      >
                        {link}
                      </motion.button>
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
              <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
              <button className="text-gray-400 hover:text-white transition-colors">Terms of Service</button>
              <button className="text-gray-400 hover:text-white transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AmplifirmPricingPage;