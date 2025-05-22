
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ValuesSection from './components/ValuesSection';

function App() {
  return (
    <div className="min-h-screen bg-yellow-400 text-black overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ValuesSection />
    </div>
  );
}

export default App;