import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp,
  Building,
  Settings,
  Lightbulb,
  CheckCircle,
  Search,
  BarChart3,
  Rocket,
  DollarSign,
  Calendar,
  X,
  ChevronRight,
  Cog,
  TrendingDown,
  AlertTriangle,
  Shield
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import your Navbar component
// import Navbar from '../components/Navbar';

const BusinessConsultancyPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCase, setActiveCase] = useState(0);
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
      setActiveCase((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBookConsultation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const consultancyServices = [
    {
      icon: Settings,
      title: 'Operational Systemization',
      description: 'Transform chaotic processes into streamlined, efficient systems that scale with your business.',
      features: [
        'Process mapping and optimization',
        'Workflow automation setup', 
        'Standard operating procedures',
        'Team efficiency improvements'
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Data-driven insights to identify bottlenecks and optimize your business performance.',
      features: [
        'KPI tracking and reporting',
        'Performance dashboard creation',
        'Bottleneck identification',
        'Improvement recommendations'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Team Optimization',
      description: 'Enhance team productivity through better structure, communication, and management systems.',
      features: [
        'Organizational restructuring',
        'Communication system setup',
        'Role clarity and delegation',
        'Team performance tracking'
      ],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: DollarSign,
      title: 'Financial Operations',
      description: 'Optimize cash flow, budgeting, and financial processes for sustainable growth.',
      features: [
        'Cash flow optimization',
        'Budget planning and tracking',
        'Cost reduction strategies',
        'Financial reporting systems'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Rocket,
      title: 'Growth Strategy',
      description: 'Strategic planning and implementation to accelerate sustainable business growth.',
      features: [
        'Market expansion planning',
        'Competitive analysis',
        'Growth opportunity identification',
        'Strategic roadmap development'
      ],
      color: 'from-teal-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Identify and mitigate business risks while building resilient operational frameworks.',
      features: [
        'Risk assessment and analysis',
        'Contingency planning',
        'Business continuity systems',
        'Compliance frameworks'
      ],
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const consultancyProcess = [
    {
      step: '01',
      title: 'Business Audit & Discovery',
      description: 'Comprehensive analysis of your current operations, processes, and pain points.',
      icon: Search,
      details: [
        'In-depth operational assessment',
        'Process mapping and documentation',
        'Team interviews and feedback',
        'Performance metrics analysis'
      ]
    },
    {
      step: '02',
      title: 'Problem Identification',
      description: 'Pinpoint the root causes of inefficiencies and growth barriers.',
      icon: Target,
      details: [
        'Root cause analysis',
        'Bottleneck identification',
        'Impact assessment',
        'Priority ranking of issues'
      ]
    },
    {
      step: '03',
      title: 'Solution Design',
      description: 'Create tailored solutions and implementation roadmaps for your specific needs.',
      icon: Lightbulb,
      details: [
        'Custom solution development',
        'Implementation timeline',
        'Resource requirement planning',
        'Success metrics definition'
      ]
    },
    {
      step: '04',
      title: 'Implementation & Training',
      description: 'Execute solutions with hands-on support and comprehensive team training.',
      icon: Cog,
      details: [
        'System implementation',
        'Team training and onboarding',
        'Process documentation',
        'Performance monitoring setup'
      ]
    },
    {
      step: '05',
      title: 'Optimization & Scale',
      description: 'Continuous improvement and scaling of implemented solutions.',
      icon: TrendingUp,
      details: [
        'Performance monitoring',
        'Continuous optimization',
        'Scaling strategies',
        'Ongoing support and guidance'
      ]
    }
  ];

  const problemsSolved = [
    {
      problem: 'Manual Processes Everywhere',
      description: 'Time-consuming manual tasks eating into productivity and profits.',
      icon: AlertTriangle,
      solution: 'Automated workflows and streamlined processes',
      impact: '40-60% time savings on daily operations'
    },
    {
      problem: 'Lack of Clear Systems',
      description: 'No documented processes, causing confusion and inconsistency.',
      icon: TrendingDown,
      solution: 'Comprehensive system documentation and training',
      impact: 'Clear accountability and consistent results'
    },
    {
      problem: 'Team Communication Issues',
      description: 'Poor communication leading to missed deadlines and errors.',
      icon: Users,
      solution: 'Communication protocols and management systems',
      impact: '70% reduction in project delays'
    },
    {
      problem: 'Financial Mismanagement',
      description: 'Unclear financial picture and poor cash flow management.',
      icon: DollarSign,
      solution: 'Financial tracking systems and cash flow optimization',
      impact: '25-50% improvement in cash flow'
    }
  ];

  const caseStudies = [
    {
      title: 'Manufacturing Company Transformation',
      industry: 'Manufacturing',
      challenge: 'Chaotic production schedules, high waste, and poor quality control',
      solution: 'Implemented lean manufacturing principles and quality management systems',
      results: [
        '35% reduction in production waste',
        '50% improvement in delivery times',
        '25% increase in customer satisfaction'
      ],
      timeline: '4 months',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Professional Services Firm',
      industry: 'Professional Services',
      challenge: 'Poor project management, billing issues, and team inefficiencies',
      solution: 'Streamlined project workflows and implemented comprehensive tracking systems',
      results: [
        '60% faster project completion',
        '40% increase in billable hours',
        '90% reduction in billing errors'
      ],
      timeline: '3 months',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Retail Chain Optimization',
      industry: 'Retail',
      challenge: 'Inventory management issues and inconsistent customer service',
      solution: 'Automated inventory systems and standardized customer service protocols',
      results: [
        '45% reduction in stockouts',
        '30% improvement in inventory turnover',
        '85% increase in customer satisfaction'
      ],
      timeline: '5 months',
      color: 'from-purple-500 to-pink-600'
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

      <Navbar/>

      {/* Add your Navbar component here */}
      {/* <Navbar currentPage="/services/business-consultancy" /> */}

      {/* Hero Section */}
      <section className="relative z-40 max-w-6xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
        <motion.div 
          className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <Building className="w-4 h-4" style={{ color: '#216ad9' }} />
          <span className="text-sm font-semibold" style={{ color: '#216ad9' }}>Business Consultancy</span>
          <span className="text-sm" style={{ color: '#216ad9' }}>Operational Excellence</span>
          <ChevronRight className="w-4 h-4 text-blue-400" />
        </motion.div>

        <motion.h1 
          className="text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transform your business
          <br />
          <span style={{ color: '#216ad9' }}>operations</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          From chaotic processes to streamlined systems. We identify operational bottlenecks 
          and implement solutions that drive efficiency, reduce costs, and accelerate growth.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Settings, text: 'Process optimization & automation', color: '#216ad9' },
            { icon: BarChart3, text: 'Data-driven performance insights', color: '#10b981' },
            { icon: Rocket, text: 'Scalable growth systems', color: '#f59e0b' }
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
          onClick={handleBookConsultation}
        >
          <span>Get Free Business Audit</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </section>

     
      {/* Problems We Solve */}
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
              Common problems we solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every business faces operational challenges. We identify them and implement 
              solutions that deliver measurable results.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {problemsSolved.map((problem, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <problem.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{problem.problem}</h3>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#216ad9' }}>
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Solution</h4>
                      <p className="text-gray-700 mb-3">{problem.solution}</p>
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-green-700 font-semibold">Impact: {problem.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
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
              Comprehensive business solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From operational systemization to strategic growth planning - 
              we provide end-to-end consultancy services tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {consultancyServices.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
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
              Our proven consultancy process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures every solution is tailored to your specific 
              business needs and delivers measurable results.
            </p>
          </motion.div>

          <div className="space-y-8">
            {consultancyProcess.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#216ad9' }}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Step {step.step}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-xl text-gray-600 mb-6">{step.description}</p>
                  </div>
                  
                  <div className="lg:col-span-4">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Activities:</h4>
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#216ad9' }} />
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
              Real transformations, real results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses across industries streamline operations 
              and achieve sustainable growth.
            </p>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 ${
                  activeCase === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActiveCase(index)}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${study.color} rounded-xl flex items-center justify-center`}>
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{study.title}</h3>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          {study.industry} • {study.timeline}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
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
                  
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-green-700 mb-4">Results Achieved</h4>
                    <div className="space-y-3">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-green-700 font-medium">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
              Ready to transform your operations?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free business audit today. We'll analyze your operations, identify 
              opportunities, and show you exactly how we can improve your business efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <span>Get Free Business Audit</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="/about/case-studies"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View More Case Studies
              </motion.a>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Free audit • No obligations • Custom recommendations included
            </p>
          </motion.div>
        </div>
      </section>

      <Footer/>

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
                    <h3 className="text-xl font-bold text-white">Book Your Free Business Audit</h3>
                    <p className="text-blue-100 text-sm">Identify opportunities and get custom recommendations</p>
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
              <div className="h-full pb-6 relative">
                {/* Loading state */}
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
    </div>
  );
};

export default BusinessConsultancyPage;