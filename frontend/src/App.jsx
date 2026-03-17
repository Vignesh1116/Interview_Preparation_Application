import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Results from './pages/Results';
import Admin from './pages/Admin';
import AIInterview from './pages/AIInterview';
import Landing from './pages/Landing';
import Learn from './pages/Learn';
import Compiler from './pages/Compiler';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

// REQUIRED: Replace with your actual Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "PASTE_YOUR_REAL_GOOGLE_CLIENT_ID_HERE"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/learn" element={isAuthenticated ? <Learn /> : <Navigate to="/login" />} />
          <Route path="/compiler" element={isAuthenticated ? <Compiler /> : <Navigate to="/login" />} />
          <Route path="/practice" element={isAuthenticated ? <Practice /> : <Navigate to="/login" />} />
          <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/interview" element={isAuthenticated ? <AIInterview /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
