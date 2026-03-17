import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { Terminal, LogOut, BarChart3, BookOpen } from 'lucide-react';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // Simple JWT decoding to check admin status
  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.is_admin === 1;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={isAuthenticated ? "/dashboard" : "/"} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800 }}>
          <div style={{ background: 'var(--primary)', padding: '5px', borderRadius: '8px', display: 'flex' }}>
            <Terminal size={22} color="white" />
          </div>
          <span>Prep<span className="gradient-text">AI</span></span>
        </Link>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {isAuthenticated && (
            <>
              <Link to="/learn" className="btn-secondary" style={{ border: 'none', padding: '8px 12px' }}>
                <BookOpen size={18} /> <span className="desktop-only">Learn</span>
              </Link>
              <Link to="/compiler" className="btn-secondary" style={{ border: 'none', padding: '8px 12px' }}>
                <Terminal size={18} /> <span className="desktop-only">Compiler</span>
              </Link>
              <Link to="/practice" className="btn-secondary" style={{ border: 'none', padding: '8px 12px' }}>
                <BookOpen size={18} /> <span className="desktop-only">Practice</span>
              </Link>
              {isAdmin() && (
                <Link to="/admin" className="btn-secondary" style={{ border: 'none', padding: '8px 12px', color: 'var(--warning)' }}>
                  <Terminal size={18} /> <span className="desktop-only">Admin</span>
                </Link>
              )}
            </>
          )}

          <button onClick={toggleTheme} className="btn-secondary" style={{ border: 'none', padding: '8px', borderRadius: '50%' }}>
            {theme === 'dark' ? <BarChart3 size={20} /> : <BarChart3 size={20} style={{ transform: 'rotate(180deg)' }} />}
          </button>

          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <LogOut size={16} /> <span className="desktop-only">Logout</span>
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Sign In</Link>
          )}
        </div>
      </div>
      <style>{`
        .desktop-only { display: inline; }
        @media (max-width: 768px) { .desktop-only { display: none; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
