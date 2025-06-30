import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Users, 
  Code,
  Smartphone,
  Settings,
  CheckCircle,
  BarChart3,
  Zap,
  Rocket,
  Calendar,
  X,
  Globe,
  ChevronRight,
  Search,
  Monitor,
  Layers,
  Database,
  Shield,
  Award,
  Clock,
  Activity,
  Heart,
  Palette,
  Wifi,
  Lock,
  CloudLightning,
  Cpu,
  Server
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WebDevelopmentPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

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
      setActiveProject((prev) => (prev + 1) % 4);
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

  const webDevelopmentServices = [
    {
      icon: Globe,
      title: 'Business Websites',
      description: 'Professional, conversion-focused websites that represent your brand and drive results.',
      features: [
        'Custom design and branding',
        'Mobile-responsive layouts', 
        'SEO optimization',
        'Lead generation forms'
      ],
      color: 'from-blue-500 to-cyan-600',
      popular: true
    },
    {
      icon: Database,
      title: 'E-commerce Platforms',
      description: 'Complete online stores with payment processing, inventory management, and analytics.',
      features: [
        'Shopping cart functionality',
        'Payment gateway integration',
        'Inventory management',
        'Order tracking systems'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Settings,
      title: 'Custom Web Applications',
      description: 'Tailored web applications that solve specific business problems and streamline operations.',
      features: [
        'Custom functionality',
        'Database integration',
        'User authentication',
        'API development'
      ],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Smartphone,
      title: 'Progressive Web Apps',
      description: 'App-like experiences that work across all devices with offline capabilities.',
      features: [
        'Cross-platform compatibility',
        'Offline functionality',
        'Push notifications',
        'Fast loading speeds'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboards',
      description: 'Custom dashboards that visualize your business data for better decision making.',
      features: [
        'Real-time data visualization',
        'Custom metrics tracking',
        'Interactive charts',
        'Automated reporting'
      ],
      color: 'from-teal-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Client Portals',
      description: 'Secure portals where clients can access their information, documents, and services.',
      features: [
        'Secure user authentication',
        'Document management',
        'Client communication tools',
        'Project tracking'
      ],
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const developmentProcess = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We dive deep into your business needs, target audience, and technical requirements.',
      icon: Search,
      details: [
        'Business requirements analysis',
        'Target audience research',
        'Technical specification',
        'Project timeline planning'
      ]
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Create wireframes, mockups, and prototypes that align with your brand and goals.',
      icon: Palette,
      details: [
        'User experience design',
        'Visual design concepts',
        'Interactive prototypes',
        'Brand integration'
      ]
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Build your website using modern technologies with rigorous testing throughout.',
      icon: Code,
      details: [
        'Clean, maintainable code',
        'Responsive development',
        'Cross-browser testing',
        'Performance optimization'
      ]
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'Deploy your website and provide ongoing maintenance and optimization.',
      icon: Rocket,
      details: [
        'Domain & hosting setup',
        'SEO optimization',
        'Analytics integration',
        'Ongoing maintenance'
      ]
    }
  ];

  const techStack = [
    {
      category: 'Frontend Technologies',
      icon: Monitor,
      technologies: [
        { name: 'React', description: 'Modern UI library', icon: Code },
        { name: 'Next.js', description: 'Full-stack React framework', icon: Layers },
        { name: 'TypeScript', description: 'Type-safe JavaScript', icon: Code },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: Palette },
        { name: 'Framer Motion', description: 'Animation library', icon: Activity },
        { name: 'HTML5 & CSS3', description: 'Modern web standards', icon: Globe }
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      category: 'Backend & Database',
      icon: Server,
      technologies: [
        { name: 'Node.js', description: 'JavaScript runtime', icon: Cpu },
        { name: 'Python', description: 'Versatile programming language', icon: Code },
        { name: 'PostgreSQL', description: 'Advanced relational database', icon: Database },
        { name: 'MongoDB', description: 'NoSQL document database', icon: Database },
        { name: 'Firebase', description: 'Real-time database platform', icon: CloudLightning },
        { name: 'REST APIs', description: 'Modern API architecture', icon: Wifi }
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      category: 'Tools & Platforms',
      icon: Settings,
      technologies: [
        { name: 'AWS', description: 'Cloud hosting platform', icon: CloudLightning },
        { name: 'Vercel', description: 'Frontend deployment platform', icon: Rocket },
        { name: 'Git', description: 'Version control system', icon: Code },
        { name: 'Figma', description: 'Design collaboration tool', icon: Palette },
        { name: 'Analytics', description: 'Performance tracking tools', icon: BarChart3 },
        { name: 'Security', description: 'SSL & security protocols', icon: Lock }
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const projectShowcase = [
    {
      title: 'Coaching & Consulting Platform',
      client: 'Professional Business Coach',
      challenge: 'Needed a professional website to showcase services and attract high-value clients',
      solution: 'Modern, elegant website with service showcase, testimonials, and booking integration',
      results: [
        'Professional online presence established',
        'Clear service presentation',
        'Streamlined client booking process',
        'Mobile-optimized user experience'
      ],
      technologies: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
      timeline: '4 weeks',
      color: 'from-pink-500 to-rose-600',
      link: 'https://natasha-iota.vercel.app/',
      linkText: 'View Live Site'
    },
    {
      title: 'AI-Powered Educational Platform',
      client: 'X-Cubed Education',
      challenge: 'Create an innovative platform that uses AI to generate questions from past papers',
      solution: 'Advanced web application with AI integration, user management, and content generation',
      results: [
        'AI-powered question generation system',
        'Intuitive student dashboard',
        'Seamless past paper integration',
        'Scalable learning platform'
      ],
      technologies: ['React', 'AI Integration', 'Node.js', 'Database'],
      timeline: '12 weeks',
      color: 'from-blue-500 to-cyan-600',
      link: 'https://www.x-cubed.com/',
      linkText: 'Explore Platform'
    },
    {
      title: 'Global Language Academy',
      client: 'Educational Travel Company',
      challenge: 'Showcase unique English learning programs through international travel experiences',
      solution: 'Engaging website highlighting programs, destinations, and educational approach',
      results: [
        'Clear program presentation',
        'Inspiring travel destinations showcase',
        'Easy inquiry and enrollment process',
        'Multi-device compatibility'
      ],
      technologies: ['React', 'Next.js', 'CSS3', 'Responsive Design'],
      timeline: '6 weeks',
      color: 'from-green-500 to-emerald-600',
      link: 'https://glaclient.vercel.app/',
      linkText: 'Discover Programs'
    },
    {
      title: 'Tourism & Travel Platform',
      client: 'Egypt Tourism Board',
      challenge: 'Create an immersive website showcasing Egypt\'s tourism attractions and experiences',
      solution: 'Visually stunning website with destination galleries, tour information, and booking capabilities',
      results: [
        'Immersive visual storytelling',
        'Comprehensive destination coverage',
        'User-friendly navigation',
        'Tourism information hub'
      ],
      technologies: ['React', 'Image Optimization', 'CSS3', 'Animation'],
      timeline: '8 weeks',
      color: 'from-orange-500 to-red-600',
      link: 'https://egypt-kappa-five.vercel.app/',
      linkText: 'Explore Egypt'
    }
  ];

  const keyFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Every website is optimized for mobile devices, ensuring perfect performance across all screen sizes.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with advanced caching, image optimization, and efficient code architecture.'
    },
    {
      icon: Shield,
      title: 'Security Focused',
      description: 'Built with security best practices, SSL certificates, and regular security updates.'
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      description: 'Search engine optimization built-in from the ground up to help you rank higher.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Ready',
      description: 'Comprehensive tracking setup to measure performance and user engagement.'
    },
    {
      icon: Heart,
      title: 'User Experience',
      description: 'Intuitive, accessible design that converts visitors into customers.'
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
          className="inline-flex items-center space-x-2 bg-green-50 border border-green-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <Code className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-green-600">Web Development</span>
          <span className="text-sm text-green-600">300+ Websites Built</span>
          <ChevronRight className="w-4 h-4 text-green-400" />
        </motion.div>

        <motion.h1 
          className="text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Websites that work
          <br />
          <span style={{ color: '#216ad9' }}>as hard as you do</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          From simple business websites to complex web applications - we build digital solutions 
          that drive results, perfectly tailored to your business needs and budget.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Globe, text: 'Modern, responsive design', color: '#216ad9' },
            { icon: Zap, text: 'Lightning-fast performance', color: '#10b981' },
            { icon: Shield, text: 'Security & SEO optimized', color: '#f59e0b' }
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
          <span>Get Your Website Quote</span>
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
              Built for performance, designed for success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every website we build includes these essential features to ensure your success online.
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

      {/* Services Section */}
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
              Complete web development solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple business websites to complex web applications - 
              we build digital solutions that grow with your business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {webDevelopmentServices.map((service, index) => (
              <motion.div 
                key={index}
                className={`bg-gray-50 rounded-3xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 relative ${
                  service.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-white px-6 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#216ad9' }}>
                      Most Popular
                    </div>
                  </div>
                )}
                
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
              Our proven development process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures every project is delivered on time, 
              within budget, and exceeds expectations.
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
              Modern technology stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use the latest technologies and frameworks to build fast, 
              secure, and scalable websites that stand the test of time.
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

      {/* Project Showcase */}
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
              Real projects, real results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore live websites we've built across diverse industries. From coaching platforms 
              to AI-powered education tools - see our work in action and the results we deliver.
            </p>
          </motion.div>

          <div className="space-y-8">
            {projectShowcase.map((project, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 ${
                  activeProject === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          {project.client} • {project.timeline}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-red-600 mb-2">Challenge</h4>
                        <p className="text-gray-700">{project.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-2" style={{ color: '#216ad9' }}>Solution</h4>
                        <p className="text-gray-700">{project.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
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
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-green-700 mb-4">Results Achieved</h4>
                      <div className="space-y-3">
                        {project.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-green-700 font-medium">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: '#216ad9' }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>{project.linkText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.a>
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
              Proven track record
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3+ years of building exceptional websites and web applications 
              for businesses across all industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, value: '300+', label: 'Websites Built', color: '#216ad9' },
              { icon: Users, value: '150+', label: 'Happy Clients', color: '#10b981' },
              { icon: Clock, value: '3+', label: 'Years Experience', color: '#f59e0b' },
              { icon: Award, value: '99%', label: 'Client Satisfaction', color: '#ef4444' }
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
              Transparent, budget-friendly pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No fixed pricing because every project is unique. We work within your budget 
              to deliver maximum value, whether you're a startup or an established business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Any Budget Welcome',
                description: 'From £500 to £50K+ - we create solutions that fit your specific budget range.',
                icon: Heart,
                benefits: ['Transparent pricing', 'No hidden costs', 'Payment plans available']
              },
              {
                title: 'Value-Driven Approach',
                description: 'Every feature and functionality is designed to deliver real business value.',
                icon: Target,
                benefits: ['ROI-focused development', 'Business goal alignment', 'Performance tracking']
              },
              {
                title: 'Ongoing Support',
                description: 'Launch is just the beginning - we provide ongoing maintenance and optimization.',
                icon: Shield,
                benefits: ['Technical support', 'Security updates', 'Performance monitoring']
              }
            ].map((principle, index) => (
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
                  <principle.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{principle.description}</p>
                <div className="space-y-2">
                  {principle.benefits.map((benefit, benefitIndex) => (
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
              Ready to build your website?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free consultation today and discover how we can create a website 
              that perfectly represents your business and drives real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <span>Get Free Website Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="/portfolio"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Portfolio
              </motion.a>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Free consultation • Custom quote within 24 hours • No obligations
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
                    <h3 className="text-xl font-bold text-white">Book Your Free Website Consultation</h3>
                    <p className="text-blue-100 text-sm">Get a custom quote and development timeline</p>
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

export default WebDevelopmentPage;