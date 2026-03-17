import { useState, useEffect } from 'react';
import { interviewService } from '../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BookOpen, Award, Target, ChevronRight, Play, MessageSquare, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [performance, setPerformance] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const data = await interviewService.getResults();
        setPerformance(data);
      } catch (err) {
        console.error("Failed to fetch performance", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerformance();
  }, []);

  const topics = [
    { name: 'Python', icon: '🐍', description: 'Core Python, libraries, and best practices.' },
    { name: 'Java', icon: '☕', description: 'Multithreading, JVM, and OOP design.' },
    { name: 'JavaScript', icon: 'JS', description: 'ES6+, Async, Closures, and DOM.' },
    { name: 'HTML', icon: '🌐', description: 'Semantic tags, forms, and accessibility.' },
    { name: 'CSS', icon: '🎨', description: 'Flexbox, Grid, Animations, and Selectors.' },
    { name: 'React', icon: '⚛️', description: 'Hooks, Virtual DOM, and state management.' },
    { name: 'SQL', icon: '🗄️', description: 'Joins, Indexes, and normalization.' },
    { name: 'System Design', icon: '🏗️', description: 'Scalability, Caching, and Load balancing.' },
    { name: 'Data Structures', icon: '📊', description: 'Arrays, Trees, Graphs, and Algorithms.' },
    { name: 'Computer Networks', icon: '🌐', description: 'TCP/IP, OSI, Protocols, and Routing.' },
    { name: 'Cloud Computing', icon: '☁️', description: 'AWS, Azure, Docker, and Kubernetes.' },
    { name: 'Communication', icon: '🗣️', description: 'Soft skills and professional interaction.' }
  ];

  const chartData = {
    labels: Object.keys(performance),
    datasets: [
      {
        label: 'Average Score (%)',
        data: Object.values(performance),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    },
  };

  const startPractice = (difficulty) => {
    navigate(`/practice?topic=${selectedTopic}&difficulty=${difficulty}`);
  };

  const startInterview = (topic) => {
    navigate(`/interview?topic=${topic}`);
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 800 }}>Prep<span className="gradient-text">AI</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Intelligent AI feedback for your technical interview journey.
        </p>
      </header>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
              <Award color="var(--success)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Mastery Index</h3>
          </div>
          <div style={{ fontSize: '3.5rem', fontWeight: 800 }}>
            {Object.keys(performance).length > 0 
              ? Math.round(Object.values(performance).reduce((a, b) => a + b, 0) / Object.keys(performance).length) 
              : 0}%
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Average proficiency score</p>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
              <BookOpen color="var(--primary)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Active Domains</h3>
          </div>
          <div style={{ fontSize: '3.5rem', fontWeight: 800 }}>
            {Object.keys(performance).length}
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Specializations tracked</p>
        </div>
      </div>

      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Experience the <span className="gradient-text">Future</span> of Learning</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {topics.map(topic => (
            <div key={topic.name} className="glass-card topic-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{topic.icon}</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--primary)' }}>Featured</div>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{topic.name}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.5' }}>{topic.description}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => { setSelectedTopic(topic.name); setShowDifficulty(true); }}
                    className="btn btn-outline" 
                    style={{ flex: 1, fontSize: '0.8rem', padding: '8px' }}
                  >
                    <Play size={14} /> Practice
                  </button>
                  {!['Communication', 'Computer Networks', 'Cloud Computing'].includes(topic.name) && (
                    <button 
                      onClick={() => navigate(`/compiler?topic=${topic.name}`)}
                      className="btn btn-outline" 
                      style={{ flex: 1, fontSize: '0.8rem', padding: '8px' }}
                    >
                      <Terminal size={14} /> Compiler
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => startInterview(topic.name)}
                  className="btn btn-primary" 
                  style={{ width: '100%', fontSize: '0.8rem', padding: '8px' }}
                >
                  <MessageSquare size={14} /> Mock AI Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Skill Analytics</h3>
        {loading ? <p>Syncing...</p> : (
          Object.keys(performance).length > 0 
            ? <div style={{ height: '300px' }}><Bar data={chartData} options={chartOptions} /></div>
            : <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>No data available. Start practicing to see your analytics.</p>
        )}
      </div>

      {showDifficulty && (
        <div className="modal-overlay" onClick={() => setShowDifficulty(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ padding: '3rem', maxWidth: '450px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Choose <span className="gradient-text">Difficulty</span></h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Setting up <strong>{selectedTopic}</strong> practice session.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={() => startPractice('Beginner')} className="btn btn-outline" style={{ padding: '1.25rem', justifyContent: 'center' }}>Beginner</button>
              <button onClick={() => startPractice('Intermediate')} className="btn btn-outline" style={{ padding: '1.25rem', justifyContent: 'center' }}>Intermediate</button>
              <button onClick={() => startPractice('Expert')} className="btn btn-primary" style={{ padding: '1.25rem', justifyContent: 'center' }}>Expert</button>
            </div>
            
            <button onClick={() => setShowDifficulty(false)} style={{ marginTop: '2rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <style>{`
        .topic-card:hover { transform: translateY(-5px); border-color: var(--primary); transition: 0.3s; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
      `}</style>
    </div>
  );
};

export default Dashboard;
