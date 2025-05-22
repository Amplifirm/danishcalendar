import React, { useRef, useState } from 'react';
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const values = [
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Be a leader',
      description: 'Leadership isn\'t restricted to about improving ourselves daily. We are leaders at many levels. We motivate those around us, we take action, we seek opportunity.',
      color: 'yellow',
      delay: 0
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Be an innovator', 
      description: 'We\'re passionate about improving ourselves and inspire others to do the same. We take delight in discovery, personal, educational and technological.',
      color: 'yellow',
      delay: 0.1
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Be genuine',
      description: 'It is as important to hold our hands up to mistakes as it is to celebrate our successes. We keep it real, we keep it honest.',
      color: 'yellow',
      delay: 0.2
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Be knowledgeable',
      description: 'We know a great deal about language education and are proud to share it. We empower others with our knowledge and never stop learning.',
      color: 'black',
      delay: 0.3
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Be inspirational',
      description: 'Inspiration runs deep in us all. We make dreams come true every day. We open doors, build bridges and provide life-changing experiences.',
      color: 'black',
      delay: 0.4
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Be a storyteller',
      description: 'We all have stories to tell. Storytelling is the oldest form of education. Share your stories, share your ideas, tell your story.',
      color: 'black',
      delay: 0.5
    }
  ];

  const programs = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Academic study',
      description: 'Earn a degree, certificate, or credential.',
      subtitle: 'We offer degree programs at secondary, university, and post-graduate levels. Students attend the world\'s best universities.',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      icon: <Plane className="w-12 h-12" />,
      title: 'Educational Travel',
      description: 'Turn the world into your classroom',
      subtitle: 'Expertly-guided tours to the world\'s greatest sights with unforgettable experiences for people of all ages.',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Learn a language',
      description: 'Communicate with the world in 10+ languages',
      subtitle: 'Language courses in 50+ cities worldwide, plus EF English Live – the world\'s largest online English school.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Cultural exchange',
      description: 'Experience life as a local',
      subtitle: 'Exchange programs give young adults the chance to experience new cultures with host families worldwide.',
      gradient: 'from-pink-400 to-red-500'
    }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              i % 3 === 0 ? 'bg-yellow-400/10' : 
              i % 3 === 1 ? 'bg-black/5' : 'border-2 border-yellow-400/20'
            } ${
              i % 4 === 0 ? 'rounded-full' : 
              i % 4 === 1 ? 'rotate-45' : 
              i % 4 === 2 ? 'rounded-lg' : 'rounded-full'
            }`}
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating dots */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 relative"
            >
              What we{' '}
              <span className="relative">
                <span className="text-black">believe</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-400 origin-left"
                />
              </span>
            </motion.h2>
            
            {/* Floating elements around title */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
              className="absolute -top-8 -right-8 w-8 h-8 border-2 border-yellow-400 rounded-full"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                y: [0, -10, 0]
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity }
              }}
              className="absolute -bottom-4 -left-12 w-6 h-6 bg-yellow-400 rotate-45"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed"
          >
            We're guided by values that help us bring out our best—and the best in each other.
          </motion.p>
        </motion.div>

        {/* Enhanced Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: value.delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -20, 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden cursor-pointer"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: hoveredCard === index ? 1 : 0,
                  scale: hoveredCard === index ? 1.2 : 0.8
                }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 bg-gradient-to-br ${
                  value.color === 'yellow' 
                    ? 'from-yellow-50 via-yellow-100 to-yellow-200' 
                    : 'from-gray-50 via-gray-100 to-gray-200'
                } opacity-50`}
              />
              
              {/* Sparkle effects */}
              <motion.div
                animate={hoveredCard === index ? {
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-4 right-4 w-4 h-4"
              >
                <Sparkles className="w-full h-full text-yellow-400" />
              </motion.div>
              
              <div className="relative z-10">
                {/* Enhanced Icon */}
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, -5, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-5 rounded-3xl mb-6 ${
                    value.color === 'yellow' 
                      ? 'bg-yellow-400 text-black shadow-yellow-400/25' 
                      : 'bg-black text-white shadow-black/25'
                  } shadow-xl group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
                >
                  <motion.div
                    animate={hoveredCard === index ? { x: ['-100%', '100%'] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <div className="relative z-10">
                    {value.icon}
                  </div>
                </motion.div>
                
                {/* Enhanced Title */}
                <motion.h3 
                  className="text-2xl md:text-3xl font-black text-black mb-4 group-hover:text-gray-900 transition-colors"
                  animate={hoveredCard === index ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {value.title}
                </motion.h3>
                
                {/* Enhanced Description */}
                <motion.p 
                  className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors"
                  animate={hoveredCard === index ? {
                    y: [0, -5, 0],
                  } : {}}
                  transition={{ duration: 0.8 }}
                >
                  {value.description}
                </motion.p>
              </div>

              {/* Border animation */}
              <motion.div
                className={`absolute inset-0 rounded-3xl border-2 ${
                  value.color === 'yellow' ? 'border-yellow-400' : 'border-black'
                }`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: hoveredCard === index ? 1 : 0,
                  opacity: hoveredCard === index ? 1 : 0
                }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Opening the world section */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-[2rem] p-8 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden"
        >
          {/* Background animation */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(255, 212, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(255, 212, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 60%, rgba(255, 212, 0, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0"
          />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight"
              >
                Opening the world{' '}
                <span className="relative">
                  <span className="text-black">through education</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 1.6 }}
                    className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-400 origin-left"
                  />
                </span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Our educational learning programs help turn dreams into opportunities for people around the world.
              </motion.p>
            </div>

            {/* Enhanced Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 15 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.6 + (0.2 * index) }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateY: index % 2 === 0 ? -5 : 5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 0.1, scale: 1.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${program.gradient}`}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="relative z-10">
                    {/* Enhanced Icon */}
                    <motion.div
                      whileHover={{ 
                        rotate: [0, 360],
                        scale: [1, 1.3, 1.1]
                      }}
                      transition={{ duration: 0.8 }}
                      className="inline-flex p-6 rounded-3xl bg-yellow-400 text-black mb-6 group-hover:shadow-xl shadow-yellow-400/25 transition-all duration-500"
                    >
                      {program.icon}
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h4 
                      className="text-2xl md:text-3xl font-black text-black mb-3"
                      whileHover={{ x: 5 }}
                    >
                      {program.title}
                    </motion.h4>
                    <motion.p 
                      className="text-yellow-600 font-bold mb-4 text-lg"
                      whileHover={{ x: 5 }}
                    >
                      {program.description}
                    </motion.p>
                    <motion.p 
                      className="text-gray-600 leading-relaxed mb-6"
                      whileHover={{ x: 5 }}
                    >
                      {program.subtitle}
                    </motion.p>
                    
                    {/* Enhanced Learn more link */}
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="inline-flex items-center text-black font-bold group-hover:text-yellow-600 transition-colors cursor-pointer text-lg"
                    >
                      <span>Learn more</span>
                      <motion.span
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="ml-3 text-2xl"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.1, 
              y: -10,
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
              rotateX: 10
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: { duration: 3, repeat: Infinity },
              hover: { duration: 0.3 }
            }}
            className="px-16 py-6 bg-black text-yellow-400 font-black text-xl rounded-full hover:bg-gray-900 transition-all duration-500 relative overflow-hidden group shadow-2xl"
          >
            <motion.div
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent skew-x-12"
            />
            <span className="relative z-10">Discover Our Programs</span>
            
            {/* Button glow effect */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-yellow-400/20 rounded-full"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;