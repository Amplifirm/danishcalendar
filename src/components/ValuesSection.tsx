import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Star, 
  Lightbulb, 
  Heart, 
  BookOpen, 
  Sparkles, 
  MessageSquare,
  GraduationCap,
  Plane,
  Globe,
  Users
} from 'lucide-react';

const ValuesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const values = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Be a leader',
      description: 'Leadership isn\'t restricted to about improving ourselves daily. We are leaders at many levels. We motivate those around us, we take action, we seek opportunity.'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Be an innovator', 
      description: 'We\'re passionate about improving ourselves and inspire others to do the same. We take delight in discovery, personal, educational and technological.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Be genuine',
      description: 'It is as important to hold our hands up to mistakes as it is to celebrate our successes. We keep it real, we keep it honest.'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Be knowledgeable',
      description: 'We know a great deal about language education and are proud to share it. We empower others with our knowledge and never stop learning.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Be inspirational',
      description: 'Inspiration runs deep in us all. We make dreams come true every day. We open doors, build bridges and provide life-changing experiences.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Be a storyteller',
      description: 'We all have stories to tell. Storytelling is the oldest form of education. Share your stories, share your ideas, tell your story.'
    }
  ];

  const programs = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Academic study',
      description: 'Earn a degree, certificate, or credential.',
      subtitle: 'We offer degree programs at secondary, university, and post-graduate levels. Students attend the world\'s best universities.'
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Educational Travel',
      description: 'Turn the world into your classroom',
      subtitle: 'Expertly-guided tours to the world\'s greatest sights with unforgettable experiences for people of all ages.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Learn a language',
      description: 'Communicate with the world in 10+ languages',
      subtitle: 'Language courses in 50+ cities worldwide, plus EF English Live – the world\'s largest online English school.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Cultural exchange',
      description: 'Experience life as a local',
      subtitle: 'Exchange programs give young adults the chance to experience new cultures with host families worldwide.'
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-teal-600 w-12"></div>
              <span className="text-teal-600 font-medium tracking-wider text-sm uppercase">Learn the language. Live the culture. Love the world</span>
              <div className="h-px bg-teal-600 w-12"></div>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            What we believe
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            We're guided by values that help us bring out our best—and the best in each other.
          </motion.p>
        </motion.div>

        {/* Clean Values Grid - No boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-32">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
                className="inline-flex p-4 rounded-full bg-teal-600 text-white mb-6 group-hover:bg-teal-700 transition-colors duration-300"
              >
                {value.icon}
              </motion.div>
              
              {/* Title */}
              <motion.h3 
                className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors duration-300"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {value.title}
              </motion.h3>
              
              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Opening the world section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-slate-50 rounded-3xl p-12 md:p-20"
        >
          <div className="text-center mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Opening the world through education
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
            >
              Our educational learning programs help turn dreams into opportunities for people around the world.
            </motion.p>
          </div>

          {/* Clean Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + (index * 0.1) }}
                className="group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex p-4 rounded-full bg-teal-600 text-white mb-6 group-hover:bg-teal-700 transition-colors duration-300"
                >
                  {program.icon}
                </motion.div>
                
                {/* Content */}
                <h4 
                  className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {program.title}
                </h4>
                <p className="text-lg font-semibold text-teal-600 mb-4">
                  {program.description}
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {program.subtitle}
                </p>
                
                {/* Learn more link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-slate-900 font-semibold group-hover:text-teal-600 transition-colors cursor-pointer"
                >
                  <span>Learn more</span>
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors duration-300 shadow-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Discover Our Programs
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;