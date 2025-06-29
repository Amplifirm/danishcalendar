import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp,
  Megaphone,
  Settings,
  CheckCircle,
  BarChart3,
  Zap,
  Rocket,
  DollarSign,
  Calendar,
  X,
  Star,
  FileText,
  Smartphone,
  ChevronRight,
  Search,
  Play,
  Globe,
  Mail,
  Eye,
  Activity,
  Layers,
  Database,
  Camera,
  Monitor,
  Radio,
  Hash,
  Instagram,
  Youtube,
  Facebook
} from 'lucide-react';

// Import your Navbar and Footer components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MarketingSolutionsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePhase, setActivePhase] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

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

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBookConsultation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fourPhaseApproach = [
    {
      phase: '01',
      title: 'Research & Strategy',
      description: 'Deep market analysis and strategic planning to ensure no budget is wasted on guesswork.',
      icon: Search,
      color: 'from-red-500 to-pink-600',
      details: [
        'Comprehensive market analysis',
        'Competitor research and benchmarking',
        'Target audience profiling',
        'Industry benchmark analysis',
        'Strategic campaign planning',
        'Budget allocation optimization'
      ],
      outcome: 'Data-driven strategy that maximizes ROI from day one'
    },
    {
      phase: '02',
      title: 'Create & Develop',
      description: 'Professional creative development, video production, and asset creation that resonates with your audience.',
      icon: Camera,
      color: 'from-orange-500 to-yellow-600',
      details: [
        'Creative concept development',
        'Professional video production',
        'Compelling copywriting',
        'Graphic design and assets',
        'Landing page creation',
        'Brand messaging optimization'
      ],
      outcome: 'High-converting creative assets ready for deployment'
    },
    {
      phase: '03',
      title: 'Test & Launch',
      description: 'Strategic campaign launch with built-in A/B testing protocols. Data guides every decision we make.',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-600',
      details: [
        'Multi-channel campaign launch',
        'A/B testing implementation',
        'Performance monitoring setup',
        'Real-time optimization',
        'Conversion tracking',
        'ROI measurement systems'
      ],
      outcome: 'Campaigns optimized for peak performance and measurable results'
    },
    {
      phase: '04',
      title: 'Scale & Optimize',
      description: 'Scale winning campaigns while continuously optimizing for better results and lower costs.',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      details: [
        'Successful campaign scaling',
        'Cost per acquisition optimization',
        'Advanced audience targeting',
        'Performance analytics',
        'Continuous improvement',
        'ROI maximization strategies'
      ],
      outcome: 'Sustainable growth with improving performance metrics'
    }
  ];

  const marketingChannels = [
    {
      category: 'Digital Advertising',
      icon: Monitor,
      channels: [
        { name: 'Google Ads', description: 'Search, Display, Shopping campaigns', icon: Search },
        { name: 'Facebook Ads', description: 'Meta advertising across Facebook & Instagram', icon: Facebook },
        { name: 'Instagram Ads', description: 'Visual storytelling and engagement', icon: Instagram },
        { name: 'YouTube Ads', description: 'Video marketing and brand awareness', icon: Youtube },
        { name: 'LinkedIn Ads', description: 'B2B targeting and lead generation', icon: Users },
        { name: 'TikTok Ads', description: 'Short-form video engagement', icon: Smartphone }
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      category: 'Content & Email',
      icon: Mail,
      channels: [
        { name: 'Email Marketing', description: 'Automated sequences and campaigns', icon: Mail },
        { name: 'Content Marketing', description: 'Blog posts, articles, and SEO content', icon: FileText },
        { name: 'Video Marketing', description: 'VSL funnels and video content', icon: Play },
        { name: 'Social Media', description: 'Organic social media management', icon: Hash },
        { name: 'Influencer Marketing', description: 'Partnership and collaboration campaigns', icon: Star },
        { name: 'Podcast Advertising', description: 'Audio content and sponsorships', icon: Radio }
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      category: 'Advanced Systems',
      icon: Settings,
      channels: [
        { name: 'Marketing Automation', description: 'Lead nurturing and customer journeys', icon: Zap },
        { name: 'CRM Integration', description: 'Sales and marketing alignment', icon: Database },
        { name: 'Analytics & Tracking', description: 'Advanced user tracking and attribution', icon: BarChart3 },
        { name: 'Conversion Optimization', description: 'Landing page and funnel optimization', icon: Target },
        { name: 'Pixel Optimization', description: 'Advanced tracking and retargeting', icon: Eye },
        { name: 'Lead Generation', description: 'Systematic lead capture and qualification', icon: Users }
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const marketingServices = [
    {
      title: 'VSL Funnel Development',
      description: 'High-converting video sales letter funnels that guide prospects through your entire customer journey.',
      icon: Play,
      features: ['Video script writing', 'Professional video production', 'Landing page optimization', 'Conversion tracking'],
      results: 'Up to 300% improvement in conversion rates'
    },
    {
      title: 'Email Marketing Automation',
      description: 'Sophisticated email sequences that nurture leads and drive consistent revenue from your list.',
      icon: Mail,
      features: ['Welcome sequences', 'Nurture campaigns', 'Abandoned cart recovery', 'Segmentation strategies'],
      results: '25-40% increase in customer lifetime value'
    },
    {
      title: 'Advanced User Tracking',
      description: 'Comprehensive analytics setup to track every touchpoint in your customer journey.',
      icon: Activity,
      features: ['Multi-channel attribution', 'Customer journey mapping', 'Conversion tracking', 'ROI measurement'],
      results: 'Clear visibility into what drives results'
    },
    {
      title: 'Landing Page Optimization',
      description: 'Data-driven landing pages designed and optimized for maximum conversion rates.',
      icon: Globe,
      features: ['A/B testing protocols', 'Mobile optimization', 'Speed optimization', 'UX/UI improvements'],
      results: '50-200% improvement in conversion rates'
    },
    {
      title: 'Pixel Optimization',
      description: 'Advanced tracking setup for better targeting, retargeting, and campaign optimization.',
      icon: Eye,
      features: ['Facebook Pixel setup', 'Google Analytics 4', 'Custom conversions', 'Audience building'],
      results: '30-50% reduction in cost per acquisition'
    },
    {
      title: 'Multi-Channel Campaigns',
      description: 'Coordinated campaigns across multiple channels for maximum reach and impact.',
      icon: Layers,
      features: ['Channel strategy', 'Message consistency', 'Cross-channel tracking', 'Budget optimization'],
      results: '2-3x increase in overall campaign performance'
    }
  ];

  const caseStudies = [
    {
      title: 'E-commerce Brand Transformation',
      industry: 'E-commerce',
      challenge: 'Low conversion rates (0.8%) and high customer acquisition costs',
      solution: 'Implemented our 4-phase approach with VSL funnels and advanced tracking',
      results: [
        '425% increase in conversion rate (0.8% → 4.2%)',
        '60% reduction in cost per acquisition',
        '300% increase in monthly revenue',
        '150% improvement in customer lifetime value'
      ],
      timeline: '3 months',
      budget: '£15K investment',
      roi: '840% ROI in first year',
      channels: ['Google Ads', 'Facebook Ads', 'Email Marketing', 'VSL Funnels']
    },
    {
      title: 'SaaS Lead Generation Success',
      industry: 'SaaS Technology',
      challenge: 'Struggling to generate qualified leads for B2B software platform',
      solution: 'Multi-channel lead generation with LinkedIn ads and content marketing',
      results: [
        '500% increase in qualified leads',
        '40% improvement in lead quality score',
        '200% increase in demo bookings',
        '180% growth in monthly recurring revenue'
      ],
      timeline: '4 months',
      budget: '£25K investment',
      roi: '650% ROI in first year',
      channels: ['LinkedIn Ads', 'Google Ads', 'Content Marketing', 'Email Automation']
    },
    {
      title: 'Local Service Business Scale',
      industry: 'Professional Services',
      challenge: 'Relying only on word-of-mouth, needed systematic lead generation',
      solution: 'Local SEO, Google Ads, and automated lead nurturing system',
      results: [
        '150+ qualified leads monthly',
        '250% increase in revenue',
        '90% reduction in manual follow-up time',
        '300% increase in online visibility'
      ],
      timeline: '4 months',
      budget: '£8K investment',
      roi: '720% ROI in first year',
      channels: ['Google Ads', 'Local SEO', 'Email Marketing', 'Landing Pages']
    }
  ];

  const pricingApproach = [
    {
      title: 'Service Fee Model',
      description: 'Our preferred approach - transparent monthly service fees for ongoing marketing management.',
      icon: DollarSign,
      benefits: [
        'Predictable monthly investment',
        'Full transparency on costs',
        'Aligned incentives for results',
        'No hidden commission fees'
      ],
      ideal: 'Best for businesses wanting full control and transparency'
    },
    {
      title: 'Commission-Based',
      description: 'Performance-based model where we earn based on results achieved for your business.',
      icon: TrendingUp,
      benefits: [
        'Lower upfront investment',
        'Pay based on performance',
        'Shared risk and reward',
        'Results-driven approach'
      ],
      ideal: 'Perfect for businesses with limited upfront budget'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Background Effects */}
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

       <Navbar currentPage="/services/marketing-solutions" /> 

      {/* Hero Section */}
      <section className="relative z-40 max-w-6xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
        <motion.div 
          className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <Megaphone className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-semibold text-orange-600">Marketing Solutions</span>
          <span className="text-sm text-orange-600">4-Phase Proven System</span>
          <ChevronRight className="w-4 h-4 text-orange-400" />
        </motion.div>

        <motion.h1 
          className="text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Marketing that actually
          <br />
          <span style={{ color: '#216ad9' }}>drives results</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          From strategy to scaling - our proven 4-phase marketing approach ensures no budget is wasted. 
          We research, create, test, and scale campaigns that deliver measurable ROI.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Search, text: 'Research & Strategy', color: '#ef4444' },
            { icon: Camera, text: 'Create & Develop', color: '#f59e0b' },
            { icon: Rocket, text: 'Test & Launch', color: '#216ad9' },
            { icon: TrendingUp, text: 'Scale & Optimize', color: '#10b981' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center space-y-3 bg-white rounded-2xl p-4 shadow-lg border border-gray-200"
              whileHover={{ scale: 1.05, y: -2 }}
              animate={activePhase === index ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color }}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-gray-700 text-sm text-center">{item.text}</span>
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
          onClick={handleBookConsultation}
        >
          <span>Get Marketing Strategy Call</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </section>

      {/* 4-Phase Marketing Approach */}
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
              Our proven <span style={{ color: '#216ad9' }}>4-phase marketing</span> system
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike agencies that waste your budget on guesswork, we follow a systematic approach 
              that maximizes ROI at every stage of your marketing journey.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-8">
            {fourPhaseApproach.map((phase, index) => (
              <motion.div 
                key={index}
                className={`bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  activePhase === index ? 'ring-2 ring-blue-200 border-blue-300' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActivePhase(index)}
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Phase Number & Icon */}
                  <div className="lg:col-span-2 flex items-center space-x-4 lg:flex-col lg:space-x-0 lg:space-y-4">
                    <div className="text-6xl font-bold text-gray-300">
                      {phase.phase}
                    </div>
                    <motion.div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: '#216ad9' }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {React.createElement(phase.icon, {
                        className: "w-8 h-8 text-white"
                      })}
                    </motion.div>
                  </div>

                  {/* Phase Content */}
                  <div className="lg:col-span-6">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Phase {phase.phase}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                    <p className="text-xl text-gray-600 leading-relaxed mb-6">{phase.description}</p>
                    
                    {/* Key points */}
                    <div className="grid md:grid-cols-2 gap-3">
                      {phase.details.slice(0, 4).map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="lg:col-span-4">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Expected Outcome</h4>
                      <p className="text-gray-700 leading-relaxed">{phase.outcome}</p>
                      
                      {/* Progress indicator for active phase */}
                      {activePhase === index && (
                        <motion.div 
                          className="mt-4 pt-4 border-t border-gray-200"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Marketing Journey Progress</span>
                            <span>{((index + 1) / 4 * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                              className="h-2 rounded-full"
                              style={{ backgroundColor: '#216ad9' }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(index + 1) / 4 * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to see this system in action?
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                Book a free strategy call and we'll show you exactly how our 4-phase approach 
                can transform your marketing results.
              </p>
              <motion.button 
                className="text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                style={{ backgroundColor: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <span>Get Free Marketing Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marketing Channels & Services */}
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
              Every channel, every platform, maximum impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Google and Facebook ads to VSL funnels and email automation - 
              we master every marketing channel to drive results for your business.
            </p>
          </motion.div>

          <div className="space-y-12">
            {marketingChannels.map((category, categoryIndex) => (
              <motion.div 
                key={categoryIndex}
                className="bg-gray-50 rounded-3xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.channels.map((channel, channelIndex) => (
                    <motion.div 
                      key={channelIndex}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: channelIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          <channel.icon className="w-5 h-5" style={{ color: '#216ad9' }} />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{channel.name}</h4>
                      </div>
                      <p className="text-gray-600">{channel.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Marketing Services */}
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
              Specialized marketing services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced marketing solutions that go beyond basic advertising - 
              built for businesses serious about sustainable growth.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {marketingServices.map((service, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${
                  activeService === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: '#216ad9' }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-green-50 rounded-2xl p-4">
                  <p className="text-green-700 font-semibold">{service.results}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
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
              Real campaigns, real results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our 4-phase marketing approach has transformed businesses 
              across industries with measurable, sustainable growth.
            </p>
          </motion.div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                          <Megaphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{study.title}</h3>
                          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            {study.industry} • {study.timeline} • {study.budget}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-red-600 mb-2">Challenge</h4>
                          <p className="text-gray-700">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-2" style={{ color: '#216ad9' }}>Solution</h4>
                          <p className="text-gray-700">{study.solution}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Channels Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.channels.map((channel, channelIndex) => (
                          <span 
                            key={channelIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-green-700 mb-4">Results Achieved</h4>
                      <div className="space-y-3">
                        {study.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-green-700 font-medium text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: '#216ad9' }}>{study.roi}</div>
                      <div className="text-sm font-semibold text-gray-600">Return on Investment</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Approach */}
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
              Flexible pricing that works for you
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer two approaches to fit your business needs and budget. 
              Choose the model that works best for your situation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingApproach.map((approach, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${
                  index === 0 ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {index === 0 && (
                  <div className="text-center mb-6">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                      Preferred Approach
                    </span>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: index === 0 ? '#216ad9' : '#10b981' }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <approach.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900">{approach.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{approach.description}</p>
                
                <div className="space-y-3 mb-6">
                  {approach.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className={`${index === 0 ? 'bg-blue-50' : 'bg-green-50'} rounded-2xl p-4`}>
                  <p className={`${index === 0 ? 'text-blue-700' : 'text-green-700'} font-semibold`}>
                    {approach.ideal}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to transform your marketing?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free marketing strategy call today. We'll analyze your current approach, 
              identify opportunities, and show you exactly how our 4-phase system can drive results for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <span>Get Free Marketing Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="/about/case-studies"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Marketing Case Studies
              </motion.a>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Free strategy call • No obligations • Custom marketing plan included
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
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[800px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200" style={{ backgroundColor: '#216ad9' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Book Your Free Marketing Strategy Call</h3>
                    <p className="text-blue-100 text-sm">Get a custom marketing plan and ROI projections</p>
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
              
              <div className="h-full pb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <motion.div 
                      className="w-8 h-8 border-4 rounded-full mx-auto mb-4"
                      style={{ borderColor: '#216ad9', borderTopColor: 'transparent' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-gray-600">Loading calendar...</p>
                  </div>
                </div>
                
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
 <Footer onBookConsultation={handleBookConsultation} />
    </div>
  );
};

export default MarketingSolutionsPage;