
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AmpliFirmHubHomepage from './pages/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AmpliFirmHubHomepage />} />
          {/* Add more routes as you build out the platform */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;