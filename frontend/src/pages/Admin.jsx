import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Users, Database, Shield } from 'lucide-react';

const Admin = () => {
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState({ users: 0, answers: 0 });
  const [newQuestion, setNewQuestion] = useState({ topic: 'Python', difficulty: 'Medium', question_text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const qRes = await api.get('/questions');
      const rRes = await api.get('/results'); // In a real app, this would be an admin stats endpoint
      setQuestions(qRes.data);
      setStats({ users: 1, answers: rRes.data.length }); // Simplified stats
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you'd have an admin-protected POST /questions
      // Here we just simulate adding to local state or call a seed-like endpoint
      alert("Admin functionality: Question created (Simulated)");
      setNewQuestion({ ...newQuestion, question_text: '' });
    } catch (err) {
      alert("Error creating question");
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}><Shield color="var(--warning)" size={32} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Admin <span className="gradient-text">Control Center</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage questions, monitor system health, and review user analytics.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Candidates</div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.users}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Practices Completed</div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.answers}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>System Uptime</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>99.9%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Plus size={20} /> Add New Question</h3>
          <form onSubmit={handleAddQuestion}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Topic</label>
              <select value={newQuestion.topic} onChange={(e) => setNewQuestion({...newQuestion, topic: e.target.value})}>
                <option>Python</option>
                <option>SQL</option>
                <option>Web Development</option>
                <option>Data Structures</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Difficulty</label>
              <select value={newQuestion.difficulty} onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Question Text</label>
              <textarea 
                value={newQuestion.question_text} 
                onChange={(e) => setNewQuestion({...newQuestion, question_text: e.target.value})}
                placeholder="Enter the question for candidates..."
                style={{ minHeight: '120px' }}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Publish Question
            </button>
          </form>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Database size={20} /> Question Repository</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {questions.map(q => (
              <div key={q.id} style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--glass-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                    <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>{q.topic}</span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>{q.difficulty}</span>
                  </div>
                  <div style={{ fontSize: '0.95rem' }}>{q.question_text}</div>
                </div>
                <button className="btn-secondary" style={{ padding: '8px', border: 'none', color: 'var(--error)' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
