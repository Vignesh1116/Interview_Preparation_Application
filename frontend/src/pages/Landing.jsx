import { Link } from 'react-router-dom';
import { Terminal, Bot, Zap, Shield, ChevronRight, PlayCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="glow-container">
          <div className="glow-sphere"></div>
          <div className="glow-sphere secondary"></div>
        </div>
        
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="badge fade-in">
            <span className="zap-icon"><Zap size={14} fill="currentColor" /></span>
            Next Generation AI Interview Prep
          </div>
          
          <h1 className="hero-title fade-in" style={{ animationDelay: '0.1s' }}>
            Elevate Your <span className="gradient-text">Interview Performance</span> <br /> 
            with Real-time AI Intelligence
          </h1>
          
          <p className="hero-subtitle fade-in" style={{ animationDelay: '0.2s' }}>
            The ultimate companion for developers. Practice 75+ technical domains, 
            receive instant pedagogical feedback, and master your conversational skills with 
            our simulated face-to-face AI interviews.
          </p>
          
          <div className="hero-actions fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/register" className="btn btn-primary hero-btn">
              Get Started for Free <ChevronRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-outline hero-btn">
              Explore Domains <PlayCircle size={18} />
            </Link>
          </div>
        </div>

        {/* Floating Code Snippet Card */}
        <div className="code-showcase fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="glass-card code-card">
            <div className="code-header">
              <div className="dots"><span className="red"></span><span className="yellow"></span><span className="green"></span></div>
              <div className="title">AI Evaluation Profile</div>
            </div>
            <div className="code-content">
              <pre>
                <code>
{`{
  "mastery": "Expert",
  "domain": "Fullstack Engineering",
  "logic_score": 98,
  "communication": 94,
  "readiness": "HIRE_IMMEDIATELY"
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Engineered for <span className="gradient-text">Success</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Advanced features to keep you ahead of the curve.</p>
          </div>

          <div className="grid">
            <div className="glass-card feature-card">
              <div className="feature-icon"><Bot size={24} /></div>
              <h3>AI-Powered Analysis</h3>
              <p>Receive granular feedback on your technical explanations and problem-solving patterns.</p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon"><Terminal size={24} /></div>
              <h3>75+ Question Bank</h3>
              <p>From System Design to Behavioral, master the exact domains that industry leaders test for.</p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon"><Shield size={24} /></div>
              <h3>Face-to-Face Sims</h3>
              <p>Practice live interviews in a stress-free environment with our immersive video simulation track.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="stats-section">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap' }}>
          <div className="stat">
            <div className="stat-value">10k+</div>
            <div className="stat-label">Developers Preparing</div>
          </div>
          <div className="stat">
            <div className="stat-value">95%</div>
            <div className="stat-label">Interview Success Rate</div>
          </div>
          <div className="stat">
            <div className="stat-value">24/7</div>
            <div className="stat-label">AI Mentor Availability</div>
          </div>
        </div>
      </section>

      <style>{`
        .landing-page { overflow: hidden; }
        
        .hero {
          padding: 10rem 0 8rem;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 2rem;
          font-weight: 800;
        }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        .hero-actions { display: flex; gap: 1rem; justify-content: center; }
        .hero-btn { padding: 15px 35px; border-radius: 50px; font-size: 1rem; }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          padding: 8px 16px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 2.5rem;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .zap-icon { color: var(--warning); display: flex; }

        .glow-sphere {
          position: absolute;
          width: 600px;
          height: 600px;
          background: var(--primary);
          filter: blur(150px);
          opacity: 0.15;
          top: -200px;
          left: -100px;
          border-radius: 50%;
          z-index: 0;
        }
        .glow-sphere.secondary {
          background: #8b5cf6;
          top: 100px;
          right: -100px;
          left: auto;
        }

        .code-showcase { margin-top: 6rem; position: relative; width: 100%; max-width: 500px; margin-inline: auto; perspective: 1000px; }
        .code-card { transform: rotateX(10deg) rotateY(-10deg); transition: 0.5s ease; border-color: rgba(99, 102, 241, 0.3); }
        .code-card:hover { transform: rotateX(0deg) rotateY(0deg); }
        
        .code-header { 
          padding: 12px 20px; 
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dots { display: flex; gap: 8px; }
        .dots span { width: 10px; height: 10px; border-radius: 50%; opacity: 0.6; }
        .dots .red { background: #ff5f56; }
        .dots .yellow { background: #ffbd2e; }
        .dots .green { background: #27c93f; }
        .code-header .title { font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono'; }
        
        .code-content { padding: 2rem; text-align: left; }
        .code-content code { color: #a5b4fc; font-size: 0.95rem; }

        .features-grid { padding: 8rem 0; background: rgba(0,0,0,0.1); }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .feature-card { padding: 3rem 2rem; text-align: center; }
        .feature-icon { 
          width: 50px; height: 50px; 
          background: rgba(99, 102, 241, 0.1); 
          color: var(--primary);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .feature-card h3 { margin-bottom: 1rem; }
        .feature-card p { color: var(--text-muted); line-height: 1.6; }

        .stats-section { padding: 6rem 0; border-top: 1px solid var(--border-color); }
        .stat { text-align: center; }
        .stat-value { font-size: 3.5rem; font-weight: 800; color: var(--text-main); line-height: 1; margin-bottom: 0.5rem; }
        .stat-label { color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem; }

        @media (max-width: 968px) {
          .hero-title { font-size: 2.5rem; }
          .grid { grid-template-columns: 1fr; }
          .hero { padding-top: 6rem; }
        }
      `}</style>
    </div>
  );
};

export default Landing;
