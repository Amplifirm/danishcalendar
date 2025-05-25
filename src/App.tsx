import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import all our components (you'll need to import these from your actual files)
import LoadingAnimation from './components/LoadingAnimation';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ValuesSection from './components/ValuesSection';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingAnimation key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <div key="main-content">
            <Navigation />
            <HeroSection />
            <ValuesSection />
            {/* Add other sections here as needed */}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;