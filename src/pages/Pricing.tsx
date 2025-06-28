import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp,
  Star,
  ChevronRight,
  ChevronDown,
  Building,
  Zap,
  Rocket,
  Award,
  CheckCircle,
  DollarSign,
  FileText,
  Lightbulb,
  Smartphone,
  Code,
  Megaphone,
  Calculator,
  Heart
} from 'lucide-react';

const AmplifirmPricingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('foundation');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  const budgetTiers = [
    {
      id: 'foundation',
      title: 'Getting Started',
      range: '£0 - £1K',
      description: 'Perfect for businesses taking their first steps',
      color: 'from-emerald-500 to-green-600',
      icon: Heart,
      solutions: [
        'Business consultation & roadmap',
        'Problem identification session',
        'Strategic recommendations',
        'Action plan development',
        'Resource guidance'
      ],
      guidance: [
        'We\'ll assess your current situation',
        'Identify your biggest opportunities',
        'Create a prioritized action plan',
        'Guide you on next steps to take',
        'Provide templates and resources'
      ],
      caseStudy: {
        business: 'Local Bakery',
        challenge: 'Just starting out, minimal budget but big dreams',
        result: 'Gained clarity on business direction + 50% revenue increase in 3 months'
      }
    },
    {
      id: 'startup',
      title: 'Startup Growth',
      range: '£1K - £5K',
      description: 'For early-stage businesses ready to establish foundations',
      color: 'from-blue-500 to-cyan-600',
      icon: Rocket,
      solutions: [
        'Complete business foundation setup',
        'Basic website development',
        'Initial marketing strategy',
        'Social media establishment',
        'Process optimization basics'
      ],
      guidance: [
        'We\'ll build your digital foundation',
        'Set up essential business systems',
        'Create your first marketing campaigns',
        'Establish your online presence',
        'Train you on managing everything'
      ],
      caseStudy: {
        business: 'Tech Startup',
        challenge: 'Needed professional presence and initial customer acquisition',
        result: 'Professional website + first 100 customers within 2 months'
      }
    },
    {
      id: 'growing',
      title: 'Scaling Business',
      range: '£5K - £25K',
      description: 'For businesses ready to scale and expand operations',
      color: 'from-purple-500 to-pink-600',
      icon: TrendingUp,
      solutions: [
        'Comprehensive business optimization',
        'Advanced website with features',
        'Multi-channel marketing campaigns',
        'Sales funnel development',
        'Team & process scaling'
      ],
      guidance: [
        'We\'ll optimize your entire operation',
        'Scale your marketing efforts effectively',
        'Implement advanced systems and automation',
        'Build processes that support growth',
        'Guide your team through transformation'
      ],
      caseStudy: {
        business: 'SaaS Platform',
        challenge: 'Needed growth strategy and user acquisition at scale',
        result: '300% user growth + £180K funding secured'
      }
    },
    {
      id: 'established',
      title: 'Enterprise Level',
      range: '£25K - £100K+',
      description: 'Comprehensive transformation for serious growth',
      color: 'from-orange-500 to-red-600',
      icon: Building,
      solutions: [
        'Complete business transformation',
        'Custom platform development',
        'Advanced marketing automation',
        'Multi-department optimization',
        'Ongoing strategic partnership'
      ],
      guidance: [
        'We\'ll transform your entire business',
        'Implement enterprise-level solutions',
        'Guide you through complex integrations',
        'Optimize across all departments',
        'Provide ongoing strategic direction'
      ],
      caseStudy: {
        business: 'Manufacturing Corp',
        challenge: 'Digital transformation across all departments needed',
        result: '40% operational efficiency + £2M revenue increase'
      }
    }
  ];

  const pricingPrinciples = [
    {
      icon: Heart,
      title: 'Budget-First Approach',
      description: 'We start with your budget and design the maximum value solution within that range.'
    },
    {
      icon: Target,
      title: 'Outcome-Focused',
      description: 'Every solution is designed to deliver specific, measurable results for your business.'
    },
    {
      icon: Zap,
      title: 'Transparent Process',
      description: 'Clear breakdown of what you get, timeline, and expected outcomes before you commit.'
    },
    {
      icon: Rocket,
      title: 'Scalable Solutions',
      description: 'Start small and grow. Our solutions scale with your business and budget.'
    }
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
              <motion.a 
                href="/"
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
              </motion.a>
              
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
                            onClick={(e) => {
                              e.preventDefault();
                              // Add navigation logic here
                              console.log(`Navigate to ${item.name}`);
                            }}
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
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(`Navigate to ${item.name}`);
                            }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.a 
                  href="/pricing"
                  className="text-blue-600 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                >
                  Pricing
                </motion.a>

                <motion.a 
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact
                </motion.a>
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
              onClick={() => {
                console.log('Navigate to consultation booking');
                // Add booking logic here
              }}
            >
              Book Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-40 max-w-6xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
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
          onClick={() => {
            console.log('Navigate to consultation booking');
            // Add booking logic here
          }}
        >
          <span>Get Your Custom Quote</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Pricing Principles */}
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
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
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
                      className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                      style={{ backgroundColor: '#216ad9' }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log(`Discuss ${tier.title} budget range`);
                        // Add consultation booking logic here
                      }}
                    >
                      <span>Discuss This Budget Range</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="space-y-8">
                    {/* Guidance Box */}
                    <div className="bg-gray-50 rounded-3xl p-8">
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
              className="text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3"
              style={{ backgroundColor: '#216ad9' }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
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
                answer: "We work with businesses of all sizes, from startups with £1K budgets to enterprises investing £100K+. We'll design a solution that fits your budget and delivers real value, even if it means starting with the basics and scaling over time."
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
                View Case Studies
              </motion.button>
            </div>
            
            <p className="text-sm text-blue-200">
              Free consultation • Custom quote within 24 hours • Early bird discounts available
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

export default AmplifirmPricingPage;