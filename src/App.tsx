
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AmplifirmHomepage from './pages/Home';
import AmplifirmPricingPage from './pages/Pricing';
import BusinessConsultancyPage from './pages/BusinessConsultancy';
import MarketingSolutionsPage from './pages/MarketingPage';
import ContactPage from './pages/Contact';
import WebDevelopmentPage from './pages/WebsiteDevelopment';
import PlatformDevelopmentPage from './pages/PlatformDevelopment';
import AboutOurStoryPage from './pages/Story';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AmplifirmHomepage />} />
          <Route path="/pricing" element={<AmplifirmPricingPage />} /> 
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/services/business-consultancy" element={<BusinessConsultancyPage />} /> 
          <Route path="/services/marketing-solutions" element={<MarketingSolutionsPage />} /> 
          <Route path="/services/website-development" element={<WebDevelopmentPage />} /> 
          <Route path="/services/platform-development" element={<PlatformDevelopmentPage />} /> 
          <Route path="/about/our-story" element={<AboutOurStoryPage />} /> 

          

          

          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;