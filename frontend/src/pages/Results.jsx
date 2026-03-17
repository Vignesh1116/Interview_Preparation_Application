import { useState, useEffect } from 'react';
import api from '../services/api';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get('/results');
        setResults(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="container" style={{ padding: '3rem 2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Practice <span className="gradient-text">History</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Review your past answers and AI feedback.</p>
      </header>

      {loading ? <p>Loading history...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {results.length === 0 ? (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
              <p>You haven't completed any practice sessions yet.</p>
            </div>
          ) : (
            results.sort((a,b) => b.id - a.id).map(res => (
              <div key={res.id} className="glass-card" style={{ padding: '1.5rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      <Clock size={14} /> {new Date(res.created_at).toLocaleDateString()} at {new Date(res.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>Question ID: {res.question_id}</div>
                  </div>
                  <div style={{ 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    background: res.score > 70 ? 'rgba(16, 185, 129, 0.1)' : res.score > 40 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: res.score > 70 ? 'var(--success)' : res.score > 40 ? 'var(--warning)' : 'var(--error)',
                    fontWeight: 700
                  }}>
                    {res.score}%
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  {res.answer_text}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
