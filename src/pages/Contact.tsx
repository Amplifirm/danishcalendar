import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  X,
  CheckCircle,
  Users,
  MessageSquare,
  Building,
  Award,
  Send,
  User,
  Star
} from 'lucide-react';

// Import your Navbar and Footer components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleBookConsultation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
        timeline: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Calendar,
      title: 'Book a Free Consultation',
      description: 'Schedule a 60-90 minute strategy session to discuss your business needs',
      action: 'Book Now',
      color: '#216ad9',
      highlight: true
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message and we\'ll respond within 24 hours',
      action: 'hello@amplifirm.co.uk',
      color: '#10b981'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team during business hours',
      action: '+44 20 7123 4567',
      color: '#f59e0b'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant answers to your questions via our website chat',
      action: 'Start Chat',
      color: '#8b5cf6'
    }
  ];

  const teamMembers = [
    {
      name: 'Ali Mir',
      role: 'Co-Founder & Director',
      description: 'Strategic business development and client relations',
      expertise: ['Business Strategy', 'Operations', 'Growth Planning']
    },
    {
      name: 'Asmit Agrawal',
      role: 'Co-Founder & Director',
      description: 'Technology leadership and digital transformation',
      expertise: ['Digital Strategy', 'Technology', 'Innovation']
    },
    {
      name: 'Lucas Duys',
      role: 'Head of Operations',
      description: 'Project management and operational excellence',
      expertise: ['Operations', 'Management', 'Process Optimization']
    },
    {
      name: 'Diniz Vissangy',
      role: 'Head of Media & Content',
      description: 'Creative direction and content strategy',
      expertise: ['Content Strategy', 'Media', 'Creative Direction']
    }
  ];

  const faqs = [
    {
      question: 'How quickly can you start working on my project?',
      answer: 'We can typically begin within 1-2 weeks of our initial consultation, depending on project scope and our current capacity.'
    },
    {
      question: 'Do you work with businesses outside the UK?',
      answer: 'Yes, we work with businesses globally. Most of our services can be delivered remotely, with occasional travel for larger projects.'
    },
    {
      question: 'What\'s included in the free consultation?',
      answer: 'A comprehensive 60-90 minute session where we analyze your business, identify opportunities, and provide strategic recommendations - regardless of whether you choose to work with us.'
    },
    {
      question: 'How do you ensure confidentiality?',
      answer: 'We sign NDAs before any detailed discussions and maintain strict confidentiality protocols throughout our engagement.'
    },
    {
      question: 'What industries do you specialize in?',
      answer: 'We work across all industries, with particular expertise in technology, professional services, e-commerce, and manufacturing.'
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

      <Navbar currentPage="/contact" />

      {/* Hero Section */}
      <section className="relative z-40 max-w-6xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
        <motion.div 
          className="inline-flex items-center space-x-2 bg-green-50 border border-green-200/50 rounded-full px-5 py-3 mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <MessageSquare className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-green-600">Get In Touch</span>
          <span className="text-sm text-green-600">We're Here to Help</span>
        </motion.div>

        <motion.h1 
          className="text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Let's discuss your
          <br />
          <span style={{ color: '#216ad9' }}>business goals</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Ready to transform your business? We're here to help you streamline operations, 
          boost marketing performance, and accelerate growth. Let's start the conversation.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Clock, text: 'Response within 24 hours', color: '#216ad9' },
            { icon: Users, text: 'Speak with our expert team', color: '#10b981' },
            { icon: CheckCircle, text: 'Free consultation included', color: '#f59e0b' }
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
      </section>

      {/* Contact Methods */}
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
              Choose how you'd like to connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer multiple ways to get in touch. Pick the method that works best for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 text-center ${
                  method.highlight ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {method.highlight && (
                  <div className="text-center mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </span>
                  </div>
                )}
                
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: method.color }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{method.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{method.description}</p>
                
                <motion.button 
                  className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    method.highlight 
                      ? 'text-white shadow-lg hover:shadow-xl' 
                      : 'border-2 text-gray-700 hover:bg-gray-50'
                  }`}
                  style={method.highlight ? { backgroundColor: method.color } : { borderColor: method.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={method.highlight ? handleBookConsultation : undefined}
                >
                  {method.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed response.
              </p>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                    <p className="text-green-600">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          placeholder="+44 20 1234 5678"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Service Interested In
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                        >
                          <option value="">Select a service</option>
                          <option value="business-consultancy">Business Consultancy</option>
                          <option value="marketing-solutions">Marketing Solutions</option>
                          <option value="website-development">Website Development</option>
                          <option value="platform-development">Platform Development</option>
                          <option value="custom-solutions">Custom Solutions</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                        >
                          <option value="">Select budget range</option>
                          <option value="500-2k">£500 - £2K</option>
                          <option value="2k-8k">£2K - £8K</option>
                          <option value="8k-25k">£8K - £25K</option>
                          <option value="25k+">£25K+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      >
                        <option value="">When do you need to start?</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="planning">Just planning ahead</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tell us about your project *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none"
                        placeholder="Describe your business challenges, goals, and what you're looking to achieve..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2 disabled:opacity-50"
                      style={{ backgroundColor: '#216ad9' }}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Company Info & Team */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Company Info */}
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-semibold text-gray-900">AMPLIFIRM LTD</div>
                      <div className="text-gray-600">Company Number: 15426833</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Registered Address</div>
                      <div className="text-gray-600">England & Wales</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Business Hours</div>
                      <div className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM GMT</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-gray-600">hello@amplifirm.co.uk</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h3>
                <div className="space-y-6">
                  {teamMembers.map((member, index) => (
                    <motion.div 
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6" style={{ color: '#216ad9' }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                          <p className="text-sm font-semibold text-gray-500 mb-2">{member.role}</p>
                          <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {member.expertise.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-gray-900">Award-Winning Consultancy</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-700 font-medium">AI Startup of the Year - Finalist</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-700 font-medium">Equity Backed Startup - Finalist</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Quick answers to common questions about working with amplifirm.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
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
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book your free consultation today and discover how we can help transform your business 
              with tailored solutions designed specifically for your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                style={{ color: '#216ad9' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookConsultation}
              >
                <Calendar className="w-5 h-5" />
                <span>Book Free Consultation</span>
              </motion.button>
              
              <motion.a
                href="mailto:hello@amplifirm.co.uk"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                <span>Send Email</span>
              </motion.a>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Free consultation • Response within 24 hours • No obligations
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
                    <h3 className="text-xl font-bold text-white">Book Your Free Consultation</h3>
                    <p className="text-blue-100 text-sm">Discuss your business goals with our expert team</p>
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

export default ContactPage;