import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { interviewService } from '../services/api';
import { Send, CheckCircle2, XCircle, ChevronLeft, RefreshCcw, Award } from 'lucide-react';

const Practice = () => {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // To store all results for summary
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const selectedTopic = searchParams.get('topic');
  const selectedDifficulty = searchParams.get('difficulty');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await interviewService.getQuestions(selectedTopic, selectedDifficulty);
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [selectedTopic, selectedDifficulty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAnswer.trim()) return;
    
    setError(null);
    setSubmitting(true);
    try {
      const data = await interviewService.submitAnswer(questions[currentIndex].id, selectedAnswer);
      
      // Collect result for final summary
      setUserAnswers(prev => [...prev, {
        question: questions[currentIndex],
        userAnswer: selectedAnswer,
        score: data.score,
        feedback: data.feedback,
        isCorrect: data.score === 100
      }]);

      // Move to next question immediately (or finish)
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer('');
        setError(null);
      } else {
        setIsFinished(true);
      }

    } catch (err) {
      console.error("Failed to submit answer", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again to save your progress.");
      } else {
        setError("Failed to submit answer. Please check your connection.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Prevent multiple triggers
    if (showFeedback && currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setCurrentResult(null);
    } else if (showFeedback && currentIndex === questions.length - 1) {
      setIsFinished(true);
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}><h2>Loading questions...</h2></div>;

  if (questions.length === 0) return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
      <div className="glass-card" style={{ padding: '3rem' }}>
        <h2>No questions found for this category.</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1.5rem 0' }}>Please select another topic or check back later.</p>
        <button onClick={() => navigate('/')} className="btn btn-outline"><ChevronLeft size={18} /> Back to Dashboard</button>
      </div>
    </div>
  );

  if (isFinished) {
    const totalScore = Math.round(userAnswers.reduce((acc, curr) => acc + curr.score, 0) / userAnswers.length);
    const correctCount = userAnswers.filter(a => a.isCorrect).length;

    return (
      <div className="container" style={{ maxWidth: '900px', padding: '3rem 2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Award size={64} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '3rem' }}>Practice <span className="gradient-text">Complete</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Here is your performance summary for {selectedTopic}</p>
        </header>

        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary)' }}>{totalScore}%</div>
              <div style={{ color: 'var(--text-muted)' }}>Average Score</div>
            </div>
            <div>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--success)' }}>{correctCount}/{userAnswers.length}</div>
              <div style={{ color: 'var(--text-muted)' }}>Correct Answers</div>
            </div>
          </div>
        </div>

        <h3 style={{ marginBottom: '1.5rem' }}>Detailed Review</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {userAnswers.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem', borderLeft: item.isCorrect ? '4px solid var(--success)' : '4px solid var(--error)' }}>
              <div style={{ marginBottom: '1rem', fontWeight: 600 }}>Question {idx + 1}: {item.question.question_text}</div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ color: item.isCorrect ? 'var(--success)' : 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />} 
                  Your Answer: {item.userAnswer}
                </span>
              </div>
              {!item.isCorrect && (
                <div style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>
                  Correct Answer: {item.question.correct_option}
                </div>
              )}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Explanation:</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{item.question.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button onClick={() => navigate('/')} className="btn btn-primary">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '3rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/')} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', padding: 0 }}>
          <ChevronLeft size={20} /> Exit Session
        </button>
        <div style={{ color: 'var(--text-muted)' }}>Step {currentIndex + 1} of {questions.length}</div>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="tag">{currentQuestion.topic}</span>
          <span className={`tag ${currentQuestion.difficulty.toLowerCase()}`}>{currentQuestion.difficulty}</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', lineHeight: '1.4', marginBottom: '2.5rem' }}>{currentQuestion.question_text}</h2>

        {currentQuestion.question_type === 'MCQ' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {JSON.parse(currentQuestion.options || '[]').map((option, idx) => (
              <label 
                key={idx} 
                className={`choice-card ${selectedAnswer === option ? 'selected' : ''} ${showFeedback ? (option === currentQuestion.correct_option ? 'correct' : (selectedAnswer === option ? 'wrong' : '')) : ''}`}
              >
                <input 
                  type="radio" 
                  name="mcq" 
                  value={option} 
                  disabled={showFeedback}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  style={{ display: 'none' }}
                />
                <div className="radio-circle"></div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <textarea
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder={currentQuestion.question_type === 'Coding' ? "Write your code here..." : "Explain your answer..."}
              style={{ 
                minHeight: '200px', 
                borderRadius: '12px', 
                background: 'rgba(255,255,255,0.03)',
                fontFamily: currentQuestion.question_type === 'Coding' ? 'JetBrains Mono, monospace' : 'inherit'
              }}
            />
          </div>
        )}

        {error && (
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--error)', background: 'rgba(239, 68, 68, 0.05)', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--error)', fontWeight: 600 }}>
              <XCircle size={20} />
              <span>{error}</span>
            </div>
            {error.includes("Session expired") && (
              <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                Go to Login
              </button>
            )}
          </div>
        )}

        <button 
          onClick={handleSubmit} 
          className="btn btn-primary" 
          disabled={submitting || !selectedAnswer} 
          style={{ width: '100%', marginTop: '2.5rem', justifyContent: 'center' }}
        >
          {submitting ? 'Submitting...' : <>{currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Session'} <Send size={18} /></>}
        </button>
      </div>

      <style>{`
        .tag { background: rgba(255,255,255,0.05); padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .tag.beginner { color: var(--success); }
        .tag.intermediate { color: var(--warning); }
        .tag.expert { color: var(--error); }
        
        .timer-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: var(--primary);
          width: 100%;
          animation: timerRun 3s linear forwards;
        }
        
        @keyframes timerRun { from { width: 100%; } to { width: 0%; } }
        
        .choice-card {
          padding: 1.25rem;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          background: var(--glass-bg);
        }
        .choice-card:hover:not(.disabled) { border-color: var(--primary); background: rgba(99, 102, 241, 0.05); }
        .choice-card.selected { border-color: var(--primary); background: rgba(99, 102, 241, 0.1); }
        .choice-card.correct { border-color: var(--success) !important; background: rgba(16, 185, 129, 0.1) !important; }
        .choice-card.wrong { border-color: var(--error) !important; background: rgba(239, 68, 68, 0.1) !important; }
        
        .radio-circle { width: 20px; height: 20px; border: 2px solid var(--border-color); border-radius: 50%; position: relative; }
        .selected .radio-circle { border-color: var(--primary); }
        .selected .radio-circle::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background: var(--primary); border-radius: 50%; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Practice;
