import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp,
  Building,
  Settings,
  CheckCircle,
  Zap,
  Rocket,
  DollarSign,
  Calendar,
  X,
  Star,
  Globe,
  ChevronRight,
  Award,
  Clock,
  Heart,
  BookOpen,
  Briefcase,
  GraduationCap,
  Code,
  Megaphone,
  Handshake,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutOurStoryPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeValue, setActiveValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);

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
      setActiveValue((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBookConsultation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const companyValues = [
    {
      icon: Heart,
      title: 'Entrepreneurship for All',
      description: 'We believe in a world where entrepreneurship is encouraged without inequality. Every business, regardless of size or budget, deserves expert guidance.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Target,
      title: 'Tailored Solutions',
      description: 'No cookie-cutter approaches. Every solution is designed specifically for your business needs, budget, and growth stage.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Handshake,
      title: 'Partnership Approach',
      description: 'We don\'t just deliver projects - we become your strategic partners, invested in your long-term success and growth.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Innovation & Excellence',
      description: 'Combining cutting-edge technology with proven business strategies to deliver solutions that exceed expectations.',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Ali Mir',
      role: 'Co-Founder & Director',
      description: 'Strategic business development and client relations expert with a passion for operational excellence.',
      expertise: [
        'Business Strategy & Operations',
        'Client Relationship Management', 
        'Growth Planning & Execution',
        'Team Leadership & Development'
      ],
      achievements: [
        'Industry leader in digital transformation',
        'Career development advisor',
        'Educational sector consultant'
      ],
      color: 'from-blue-500 to-cyan-600',
      icon: Briefcase
    },
    {
      name: 'Asmit Agrawal',
      role: 'Co-Founder & Director',
      description: 'Technology leadership and digital transformation specialist driving innovation across all projects.',
      expertise: [
        'Technology Strategy & Architecture',
        'Digital Transformation',
        'Innovation & AI Integration',
        'Technical Leadership'
      ],
      achievements: [
        'Industry leader in tech innovation',
        'AI and automation specialist',
        'Digital strategy consultant'
      ],
      color: 'from-purple-500 to-pink-600',
      icon: Code
    },
    {
      name: 'Lucas Duys',
      role: 'Head of Operations',
      description: 'Operations and management specialist ensuring seamless project delivery and operational excellence.',
      expertise: [
        'Project Management & Delivery',
        'Process Optimization',
        'Quality Assurance',
        'Resource Management'
      ],
      achievements: [
        'Process optimization expert',
        'Quality management specialist',
        'Operational efficiency leader'
      ],
      color: 'from-green-500 to-emerald-600',
      icon: Settings
    },
    {
      name: 'Diniz Vissangy',
      role: 'Head of Media & Content',
      description: 'Creative direction and content strategy leader, crafting compelling narratives and marketing campaigns.',
      expertise: [
        'Content Strategy & Creation',
        'Creative Direction',
        'Brand Development',
        'Marketing Campaigns'
      ],
      achievements: [
        'Creative strategy specialist',
        'Brand development expert',
        'Content marketing leader'
      ],
      color: 'from-orange-500 to-red-600',
      icon: Megaphone
    }
  ];

  const companyTimeline = [
    {
      year: '2021',
      title: 'Founded with Vision',
      description: 'Started amplifirm with a mission to make expert business consultancy accessible to all businesses, regardless of size or budget.',
      icon: Rocket,
      achievements: [
        'Company incorporation (AMPLIFIRM LTD)',
        'First client projects delivered',
        'Core team formation'
      ]
    },
    {
      year: '2022',
      title: 'Rapid Growth & Recognition',
      description: 'Expanded our services and gained recognition in the industry while building our reputation for excellence.',
      icon: TrendingUp,
      achievements: [
        '50+ successful projects completed',
        'Industry partnerships established',
        'Service portfolio expansion'
      ]
    },
    {
      year: '2023',
      title: 'Award-Winning Excellence',
      description: 'Achieved significant milestones and industry recognition for our innovative approach to business transformation.',
      icon: Award,
      achievements: [
        'AI Startup of the Year - Finalist',
        'Equity Backed Startup - Finalist',
        '100+ clients served milestone'
      ]
    },
    {
      year: '2024',
      title: 'Industry Leadership',
      description: 'Established ourselves as industry leaders with 300+ websites built and 150+ businesses transformed.',
      icon: Building,
      achievements: [
        '300+ websites successfully delivered',
        '150+ businesses transformed',
        'Educational sector partnerships'
      ]
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'AI Startup of the Year',
      subtitle: 'Finalist - UK Awards',
      description: 'Recognized for innovation in AI integration and business transformation solutions.',
      color: '#f59e0b'
    },
    {
      icon: Star,
      title: 'Equity Backed Startup',
      subtitle: 'Finalist - UK Awards',
      description: 'Acknowledged for sustainable business model and growth potential.',
      color: '#ef4444'
    },
    {
      icon: Users,
      title: '150+ Clients Served',
      subtitle: 'Across All Industries',
      description: 'Successfully transformed businesses from startups to established enterprises.',
      color: '#10b981'
    },
    {
      icon: Globe,
      title: '300+ Websites Built',
      subtitle: 'Professional Digital Presence',
      description: 'Delivered high-quality websites and platforms that drive business results.',
      color: '#216ad9'
    }
  ];

  const communityImpact = [
    {
      icon: GraduationCap,
      title: 'Educational Partnerships',
      description: 'Working closely with schools through activities and funding to support the next generation of entrepreneurs.',
      impact: 'Supporting future innovators'
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description: 'Our directors actively advise on career development in the digital and tech industry.',
      impact: 'Mentoring industry professionals'
    },
    {
      icon: Heart,
      title: 'Equality in Business',
      description: 'Championing entrepreneurship without inequality, ensuring all businesses can access expert guidance.',
      impact: 'Breaking down barriers'
    },
    {
      icon: Building,
      title: 'Industry Leadership',
      description: 'Leading by example in ethical business practices and innovative solution development.',
      impact: 'Setting industry standards'
    }
  ];

  const businessApproach = [
    {
      title: 'No Fixed Pricing',
      description: 'Every business is unique, so we create custom solutions that fit your specific budget and deliver maximum value.',
      icon: DollarSign,
      benefit: 'Maximum value for your investment'
    },
    {
      title: 'All Budgets Welcome',
      description: 'From £500 startups to £100K+ enterprises - we work with businesses at every stage of their journey.',
      icon: Heart,
      benefit: 'Accessible to all business sizes'
    },
    {
      title: 'Results-Driven',
      description: 'Every solution is designed to deliver specific, measurable results that drive real business growth.',
      icon: Target,
      benefit: 'Proven ROI and performance metrics'
    },
    {
      title: 'Early Bird Incentives',
      description: 'We reward quick decision-making with Super Early Bird (24h) and Early Bird (3-day) discounts.',
      icon: Clock,
      benefit: 'Save more with faster decisions'
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

      <Navbar currentPage="/about/our-story" />

      {/* Hero Section */}
      <section className="relative z-40 max-w-6xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
        <motion.div 
          className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <BookOpen className="w-4 h-4" style={{ color: '#216ad9' }} />
          <span className="text-sm font-semibold" style={{ color: '#216ad9' }}>Our Story</span>
          <span className="text-sm" style={{ color: '#216ad9' }}>3+ Years of Excellence</span>
          <ChevronRight className="w-4 h-4 text-blue-400" />
        </motion.div>

        <motion.h1 
          className="text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building the future of
          <br />
          <span style={{ color: '#216ad9' }}>business consultancy</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          From a vision of democratizing expert business guidance to award-winning consultancy - 
          discover the story behind amplifirm and our mission to transform businesses across all industries.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Building, text: 'Award-winning consultancy', color: '#216ad9' },
            { icon: Users, text: '150+ businesses transformed', color: '#10b981' },
            { icon: Heart, text: 'Entrepreneurship for all', color: '#ef4444' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-lg border border-gray-200"
              whileHover={{ scale: 1.05, y: -2 }}
              animate={activeValue === index ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color }}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our mission: Entrepreneurship without inequality
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2021, amplifirm was born from a simple yet powerful belief: every business, 
                  regardless of size or budget, deserves access to expert guidance and tailored solutions. 
                  We saw too many talented entrepreneurs held back by expensive consultancy fees and 
                  one-size-fits-all approaches.
                </p>
                <p>
                  Our founders, Ali Mir and Asmit Agrawal, combined their expertise in business strategy 
                  and technology to create a new model of consultancy - one that scales solutions to 
                  fit any budget while never compromising on quality or results.
                </p>
                <p>
                  Today, we're proud to be recognized as an award-winning consultancy, but our core 
                  mission remains unchanged: democratizing access to world-class business expertise 
                  and creating a world where entrepreneurship thrives without barriers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Building className="w-6 h-6" style={{ color: '#216ad9' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">AMPLIFIRM LTD</h3>
                    <p className="text-gray-500">Company Number: 15426833</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Registered in England & Wales, operating globally with clients across 
                  diverse industries and business stages.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Our Approach</h3>
                    <p className="text-gray-500">No Fixed Pricing, Maximum Value</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Every solution is tailored to your specific needs and budget, ensuring you get 
                  maximum value regardless of your investment size.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
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
              Values that drive everything we do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values aren't just words on a page - they're the principles that guide every 
              decision, every solution, and every client relationship we build.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {companyValues.map((value, index) => (
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
                  className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
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
              Our journey to excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startup to award-winning consultancy - the key milestones 
              that shaped amplifirm into the company it is today.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block" />
            
            <div className="space-y-12">
              {companyTimeline.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className={`relative grid lg:grid-cols-12 gap-8 items-center ${
                    activeTimeline === index ? 'lg:scale-105' : ''
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-6 w-6 h-6 rounded-full bg-white border-4 hidden lg:block"
                    style={{ borderColor: '#216ad9' }}
                    animate={activeTimeline === index ? { scale: 1.5 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="lg:col-span-2 lg:pl-20">
                    <div className="text-4xl font-bold mb-2" style={{ color: '#216ad9' }}>
                      {milestone.year}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-10">
                    <motion.div 
                      className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#216ad9' }}>
                          <milestone.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">{milestone.description}</p>
                      
                      <div className="space-y-2">
                        {milestone.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet the team behind amplifirm
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry leaders who combine deep expertise with a passion for helping 
              businesses achieve their full potential through tailored solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-6 mb-6">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <member.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-lg font-semibold text-gray-600">{member.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Core Expertise</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#216ad9' }} />
                          <span className="text-sm text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h4>
                    <div className="space-y-2">
                      {member.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center space-x-3">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">{achievement}</span>
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

      {/* Awards & Recognition */}
      <section className="py-32 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Awards & recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry recognition for our innovative approach to business consultancy 
              and commitment to transforming businesses across all sectors.
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
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: achievement.color }}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-sm font-semibold text-gray-500 mb-4">{achievement.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Approach */}
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
              How we work differently
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique approach to business consultancy ensures every client gets exactly 
              what they need, when they need it, within their budget.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {businessApproach.map((approach, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: '#216ad9' }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <approach.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900">{approach.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{approach.description}</p>
                
                <div className="bg-green-50 rounded-2xl p-4">
                  <p className="text-green-700 font-semibold">✓ {approach.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
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
              Our community impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond business transformation, we're committed to building a better entrepreneurial 
              ecosystem and supporting the next generation of business leaders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityImpact.map((impact, index) => (
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
                  <impact.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{impact.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{impact.description}</p>
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-blue-700 font-semibold text-sm">{impact.impact}</p>
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
              Ready to be part of our story?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join the 150+ businesses we've already transformed. Book a free consultation 
              and discover how our award-winning team can help accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <span>Start Your Transformation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="/about/team"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet The Full Team
              </motion.a>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Free consultation • No obligations • Custom solutions for every budget
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
                    <h3 className="text-xl font-bold text-white">Join Our Success Story</h3>
                    <p className="text-blue-100 text-sm">Book your free consultation with our award-winning team</p>
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

export default AboutOurStoryPage;