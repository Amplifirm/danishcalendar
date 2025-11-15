
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BeshnoRetreatForm from './pages/Home';
import BeshnoCalendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BeshnoRetreatForm />} />
          <Route path="/calendar" element={<BeshnoCalendar />} />
        
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;