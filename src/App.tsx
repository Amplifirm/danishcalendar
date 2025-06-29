
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AmplifirmHomepage from './pages/Home';
import AmplifirmPricingPage from './pages/Pricing';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AmplifirmHomepage />} />
          <Route path="/pricing" element={<AmplifirmPricingPage />} /> 
          
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;