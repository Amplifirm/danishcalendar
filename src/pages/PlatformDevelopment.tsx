import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Users, 
  TrendingUp,
  Code,
  Settings,
  CheckCircle,
  BarChart3,
  Zap,
  Rocket,
  Upload,
  Calendar,
  X,
  ChevronRight,
  Search,
  Monitor,
  Layers,
  Database,
  Shield,
  Building,
  Award,
  Activity,
  Palette,
  Wifi,
  Lock,
  CloudLightning,
  Cpu,
  Server,
  CreditCard,
  BarChart2,
  Briefcase,
  ShoppingCart,
  Package,
  Gauge
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlatformDevelopmentPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePlatform, setActivePlatform] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [previewModal, setPreviewModal] = useState({ isOpen: false, platform: null });

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
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
        }
        if (previewModal.isOpen) {
          setPreviewModal({ isOpen: false, platform: null });
        }
      }
    };

    if (isModalOpen || previewModal.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, previewModal.isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlatform((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBookConsultation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const platformTypes = [
    {
      icon: Users,
      title: 'SaaS Platforms',
      description: 'Complete software-as-a-service platforms with user management, billing, and scalable architecture.',
      features: [
        'Multi-tenant architecture',
        'Subscription management', 
        'User role management',
        'API integrations'
      ],
      color: 'from-blue-500 to-cyan-600',
      popular: true
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Platforms',
      description: 'Advanced online marketplaces and e-commerce solutions with payment processing and inventory management.',
      features: [
        'Product catalog management',
        'Order processing systems',
        'Payment gateway integration',
        'Inventory tracking'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboards',
      description: 'Real-time data visualization platforms that turn complex data into actionable business insights.',
      features: [
        'Real-time data processing',
        'Custom visualizations',
        'Automated reporting',
        'Data export capabilities'
      ],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Building,
      title: 'Business Management Systems',
      description: 'Comprehensive platforms for managing operations, projects, and teams with integrated workflows.',
      features: [
        'Project management tools',
        'Team collaboration features',
        'Workflow automation',
        'Document management'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Briefcase,
      title: 'Client Portals',
      description: 'Secure portals where clients can access services, track progress, and communicate with your team.',
      features: [
        'Secure authentication',
        'File sharing capabilities',
        'Progress tracking',
        'Communication tools'
      ],
      color: 'from-teal-500 to-blue-600'
    },
    {
      icon: Gauge,
      title: 'Custom Enterprise Solutions',
      description: 'Tailored platforms built specifically for your unique business processes and requirements.',
      features: [
        'Custom functionality',
        'Legacy system integration',
        'Scalable architecture',
        'Enterprise security'
      ],
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const developmentProcess = [
    {
      step: '01',
      title: 'Requirements Analysis',
      description: 'Deep dive into your business needs, user requirements, and technical specifications.',
      icon: Search,
      details: [
        'Business process mapping',
        'User story development',
        'Technical architecture planning',
        'Performance requirements analysis'
      ]
    },
    {
      step: '02',
      title: 'Architecture Design',
      description: 'Design scalable, secure architecture with database modeling and system integration planning.',
      icon: Layers,
      details: [
        'System architecture design',
        'Database schema planning',
        'API structure definition',
        'Security framework setup'
      ]
    },
    {
      step: '03',
      title: 'Agile Development',
      description: 'Build your platform using modern technologies with regular updates and feedback cycles.',
      icon: Code,
      details: [
        'Sprint-based development',
        'Regular progress updates',
        'Continuous testing',
        'Feature delivery cycles'
      ]
    },
    {
      step: '04',
      title: 'Testing & Deployment',
      description: 'Comprehensive testing, performance optimization, and secure deployment to production.',
      icon: Rocket,
      details: [
        'Quality assurance testing',
        'Performance optimization',
        'Security audits',
        'Production deployment'
      ]
    },
    {
      step: '05',
      title: 'Support & Scaling',
      description: 'Ongoing maintenance, feature enhancements, and scaling as your business grows.',
      icon: TrendingUp,
      details: [
        'Ongoing maintenance',
        'Feature enhancements',
        'Performance monitoring',
        'Scaling optimization'
      ]
    }
  ];

  const techStack = [
    {
      category: 'Frontend Technologies',
      icon: Monitor,
      technologies: [
        { name: 'React', description: 'Modern UI library for complex interfaces', icon: Code },
        { name: 'Next.js', description: 'Full-stack React framework', icon: Layers },
        { name: 'TypeScript', description: 'Type-safe development', icon: Code },
        { name: 'Redux', description: 'State management for complex apps', icon: Database },
        { name: 'Material-UI', description: 'Professional component library', icon: Palette },
        { name: 'D3.js', description: 'Advanced data visualizations', icon: BarChart3 }
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      category: 'Backend & Infrastructure',
      icon: Server,
      technologies: [
        { name: 'Node.js', description: 'Scalable server-side JavaScript', icon: Cpu },
        { name: 'Python', description: 'Data processing and AI integration', icon: Code },
        { name: 'PostgreSQL', description: 'Advanced relational database', icon: Database },
        { name: 'Redis', description: 'High-performance caching', icon: Zap },
        { name: 'Docker', description: 'Containerized deployment', icon: Package },
        { name: 'AWS/Azure', description: 'Enterprise cloud infrastructure', icon: CloudLightning }
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      category: 'Platform Features',
      icon: Settings,
      technologies: [
        { name: 'Authentication', description: 'Secure user management systems', icon: Lock },
        { name: 'Payment Processing', description: 'Stripe, PayPal integrations', icon: CreditCard },
        { name: 'Real-time Updates', description: 'WebSocket communications', icon: Activity },
        { name: 'API Development', description: 'RESTful and GraphQL APIs', icon: Wifi },
        { name: 'File Management', description: 'Secure upload and storage', icon: Upload },
        { name: 'Analytics', description: 'Built-in tracking and reporting', icon: BarChart2 }
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const platformShowcase = [
    {
      title: 'SaaS Analytics Platform',
      client: 'Data Analytics Company',
      challenge: 'Need a scalable platform for clients to visualize and analyze their business data',
      solution: 'Built comprehensive SaaS platform with real-time dashboards, custom reporting, and multi-tenant architecture',
      results: [
        'Serves 10,000+ active users',
        'Processes 1M+ data points daily',
        '99.9% uptime performance',
        '40% increase in client retention'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
      timeline: '16 weeks',
      color: 'from-blue-500 to-cyan-600',
      features: [
        'Real-time data processing',
        'Custom dashboard builder',
        'Multi-tenant security',
        'API integrations',
        'Automated reporting',
        'Role-based access control'
      ]
    },
    {
      title: 'E-commerce Marketplace',
      client: 'Multi-Vendor Retailer',
      challenge: 'Create a marketplace connecting multiple vendors with customers, handling complex logistics',
      solution: 'Developed comprehensive marketplace with vendor management, order processing, and logistics integration',
      results: [
        '500+ active vendors onboarded',
        '50,000+ products listed',
        '95% order fulfillment rate',
        '300% increase in sales volume'
      ],
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'Docker', 'Microservices'],
      timeline: '20 weeks',
      color: 'from-green-500 to-emerald-600',
      features: [
        'Vendor onboarding system',
        'Product catalog management',
        'Order processing automation',
        'Payment splitting',
        'Shipping integrations',
        'Review and rating system'
      ]
    },
    {
      title: 'Healthcare Management Platform',
      client: 'Medical Practice Group',
      challenge: 'Streamline patient management across multiple locations with compliance requirements',
      solution: 'Built HIPAA-compliant platform with appointment scheduling, patient records, and billing integration',
      results: [
        '20,000+ patients managed',
        '80% reduction in admin time',
        '100% HIPAA compliance',
        '60% improvement in patient satisfaction'
      ],
      technologies: ['React', 'Python', 'PostgreSQL', 'HIPAA Infrastructure'],
      timeline: '14 weeks',
      color: 'from-red-500 to-pink-600',
      features: [
        'Patient portal access',
        'Appointment scheduling',
        'Electronic health records',
        'Billing integration',
        'Compliance reporting',
        'Multi-location support'
      ]
    },
    {
      title: 'Project Management Platform',
      client: 'Digital Agency',
      challenge: 'Need comprehensive project management solution for client work and team collaboration',
      solution: 'Custom platform with project tracking, time management, client communication, and resource planning',
      results: [
        '200+ projects managed',
        '50% improvement in delivery times',
        '90% client satisfaction rate',
        '35% increase in team productivity'
      ],
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Real-time Updates'],
      timeline: '12 weeks',
      color: 'from-purple-500 to-indigo-600',
      features: [
        'Project timeline management',
        'Team collaboration tools',
        'Client communication portal',
        'Time tracking integration',
        'Resource allocation',
        'Automated invoicing'
      ]
    }
  ];

  const keyFeatures = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Advanced user authentication, role-based permissions, and multi-tenant architecture.'
    },
    {
      icon: Database,
      title: 'Scalable Architecture',
      description: 'Built to handle growth from hundreds to millions of users with optimal performance.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption, secure APIs, and compliance frameworks.'
    },
    {
      icon: Wifi,
      title: 'API Integration',
      description: 'Seamless integration with third-party services and existing business systems.'
    },
    {
      icon: Activity,
      title: 'Real-time Features',
      description: 'Live updates, notifications, and collaborative features that keep users engaged.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Built-in analytics, custom reports, and data visualization for better decisions.'
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
      {/* Hero Section */}
      <section className="relative z-40 max-w-6xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
        <motion.div 
          className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <Layers className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-600">Platform Development</span>
          <span className="text-sm text-purple-600">Enterprise Solutions</span>
          <ChevronRight className="w-4 h-4 text-purple-400" />
        </motion.div>

        <motion.h1 
          className="text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Platforms that power
          <br />
          <span style={{ color: '#216ad9' }}>your business</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          From SaaS applications to enterprise management systems - we build scalable, 
          secure platforms that grow with your business and delight your users.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Users, text: 'Multi-user architecture', color: '#216ad9' },
            { icon: Database, text: 'Scalable & secure', color: '#10b981' },
            { icon: Zap, text: 'Real-time features', color: '#f59e0b' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-lg border border-gray-200"
              whileHover={{ scale: 1.05, y: -2 }}
              animate={activeFeature === index ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
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
          <span>Get Platform Consultation</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </section>

      {/* Key Features */}
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
              Enterprise-grade platform features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every platform we build includes these essential features to ensure scalability, 
              security, and exceptional user experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
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
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Types */}
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
              Platforms built for every business need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple client portals to complex enterprise systems - 
              we design and build platforms that solve real business problems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {platformTypes.map((platform, index) => (
              <motion.div 
                key={index}
                className={`bg-gray-50 rounded-3xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 relative ${
                  platform.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {platform.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-white px-6 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#216ad9' }}>
                      Most Popular
                    </div>
                  </div>
                )}
                
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <platform.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{platform.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{platform.description}</p>
                
                <div className="space-y-3">
                  {platform.features.map((feature, featureIndex) => (
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

      {/* Development Process */}
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
              Our proven platform development process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures every platform is built to scale, 
              delivered on time, and exceeds your business requirements.
            </p>
          </motion.div>

          <div className="space-y-8">
            {developmentProcess.map((step, index) => (
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

      {/* Technology Stack */}
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
              Enterprise-grade technology stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use cutting-edge technologies and proven frameworks to build 
              platforms that are fast, secure, and built to scale.
            </p>
          </motion.div>

          <div className="space-y-12">
            {techStack.map((category, categoryIndex) => (
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
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div 
                      key={techIndex}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: techIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          <tech.icon className="w-5 h-5" style={{ color: '#216ad9' }} />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{tech.name}</h4>
                      </div>
                      <p className="text-gray-600">{tech.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
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
              Platforms driving real business results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses transform their operations with 
              custom platforms that scale and deliver measurable outcomes.
            </p>
          </motion.div>

          <div className="space-y-8">
            {platformShowcase.map((platform, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 ${
                  activePlatform === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                onMouseEnter={() => setActivePlatform(index)}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center`}>
                        <Layers className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{platform.title}</h3>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          {platform.client} • {platform.timeline}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-red-600 mb-2">Challenge</h4>
                        <p className="text-gray-700">{platform.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-2" style={{ color: '#216ad9' }}>Solution</h4>
                        <p className="text-gray-700">{platform.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {platform.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {platform.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-green-700 mb-4">Results Achieved</h4>
                    <div className="space-y-3">
                      {platform.results.map((result, resultIndex) => (
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

      {/* Statistics */}
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
              Platform development expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3+ years of building enterprise-grade platforms for businesses 
              across industries with proven scalability and performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Layers, value: '50+', label: 'Platforms Built', color: '#216ad9' },
              { icon: Users, value: '150+', label: 'Happy Clients', color: '#10b981' },
              { icon: Database, value: '1M+', label: 'Users Served', color: '#f59e0b' },
              { icon: Award, value: '99.9%', label: 'Uptime Average', color: '#ef4444' }
            ].map((stat, index) => (
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
                  style={{ backgroundColor: stat.color }}
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

      {/* Pricing Philosophy */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Scalable solutions for every budget
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startup MVP to enterprise platform - we build solutions that fit your 
              budget and scale with your business growth. No fixed pricing, maximum value.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'MVP Platforms',
                description: 'Start with core features and essential functionality to validate your concept and get to market quickly.',
                icon: Rocket,
                benefits: ['Core functionality focus', 'Rapid development', 'Market validation', 'Future-proof architecture'],
                budget: '£5K - £25K'
              },
              {
                title: 'Growth Platforms',
                description: 'Comprehensive platforms with advanced features, integrations, and scalability for growing businesses.',
                icon: TrendingUp,
                benefits: ['Advanced features', 'Third-party integrations', 'User management', 'Analytics & reporting'],
                budget: '£25K - £75K'
              },
              {
                title: 'Enterprise Solutions',
                description: 'Full-scale platforms with enterprise security, compliance, and unlimited scalability.',
                icon: Building,
                benefits: ['Enterprise security', 'Compliance frameworks', 'Unlimited scaling', 'Dedicated support'],
                budget: '£75K+'
              }
            ].map((tier, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <tier.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{tier.description}</p>
                <div className="text-2xl font-bold mb-6" style={{ color: '#216ad9' }}>{tier.budget}</div>
                <div className="space-y-2">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2 justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
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
              Ready to build your platform?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free consultation today and discover how we can create a 
              scalable platform that transforms your business operations and drives growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <span>Get Platform Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="/portfolio"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Platform Portfolio
              </motion.a>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Free consultation • Custom platform roadmap • No obligations
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
                    <h3 className="text-xl font-bold text-white">Book Your Platform Consultation</h3>
                    <p className="text-blue-100 text-sm">Get a custom platform roadmap and development timeline</p>
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

     <Footer/>
    </div>
  );
};

export default PlatformDevelopmentPage;