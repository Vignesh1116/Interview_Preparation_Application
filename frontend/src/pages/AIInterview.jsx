import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, User, Bot, ChevronLeft, Mic, MicOff, Video, VideoOff } from 'lucide-react';

const AIInterview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const chatEndRef = useRef(null);
  
  const domain = searchParams.get('topic') || 'Software Engineering';

  useEffect(() => {
    // Initial AI greeting
    const welcome = {
      id: 1,
      role: 'ai',
      content: `Hello! I'm your AI Interviewer. Today we'll be discussing ${domain}. Are you ready to begin?`
    };
    setMessages([welcome]);
  }, [domain]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: getAIResponse(input, domain, messages.length) 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (userInput, domain, msgCount) => {
    const domainTopics = {
      'Python': ['Decorators', 'Generators', 'Memory Management', 'GIL'],
      'Java': ['JVM Architecture', 'Garbage Collection', 'Multithreading', 'Spring Boot'],
      'JavaScript': ['Closures', 'Event Loop', 'Prototypal Inheritance', 'Promises'],
      'React': ['Hooks', 'Virtual DOM', 'Reconciliation', 'State Management'],
      'SQL': ['Normalization', 'Indexing', 'Query Optimization', 'ACID Properties'],
      'System Design': ['Load Balancing', 'Caching', 'Microservices', 'Sharding'],
      'Cloud Computing': ['Auto-scaling', 'S3 vs EBS', 'Serverless', 'VPC'],
      'Computer Networks': ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'Load Balancers'],
      'Communication': ['Feedback loops', 'Cross-functional collaboration', 'Presentation skills', 'Negotiation'],
      'Behavioral': ['Conflict resolution', 'Leadership', 'Failure handling', 'Teamwork']
    };

    const topics = domainTopics[domain] || ['Core concepts', 'Architecture', 'Problem solving'];
    const phase = Math.floor(msgCount / 2) % topics.length;
    const currentTopic = topics[phase];

    const followUps = [
      `That's a solid explanation. Can you dive deeper into how you'd handle ${currentTopic} in a high-concurrency production environment?`,
      `Interesting perspective. If you had to explain ${currentTopic} to a junior developer, how would you simplify the concept?`,
      `Great. Let's move to a scenario: If your ${domain} application is experiencing bottlenecks specifically in ${currentTopic}, what's your debugging strategy?`,
      `How does your experience with ${domain} influence your approach to ${currentTopic} compared to other frameworks?`
    ];

    if (msgCount <= 2) {
      return `Welcome! Let's start with your expertise in ${domain}. What is your experience level, and which aspects of ${domain} do you find most challenging?`;
    }
    
    return followUps[Math.floor(Math.random() * followUps.length)];
  };

  return (
    <div className="container" style={{ height: '90vh', padding: '2rem', display: 'flex', gap: '2rem' }}>
      {/* Left side: Video Feed Mockup */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="glass-card" style={{ flex: 1, background: '#000', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
          {isVideoOn ? (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #121212, #1e1e1e)' }}>
                <div style={{ textAlign: 'center' }}>
                   <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>U</div>
                   <p style={{ color: '#fff', fontWeight: 600 }}>Guest User</p>
                </div>
             </div>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
               <VideoOff size={48} color="#444" />
            </div>
          )}
          
          <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.5)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', color: '#fff' }}>
             REC ● LIVE
          </div>

          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem' }}>
             <button onClick={() => setIsMicOn(!isMicOn)} className={`icon-btn ${!isMicOn ? 'off' : ''}`}>
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
             </button>
             <button onClick={() => setIsVideoOn(!isVideoOn)} className={`icon-btn ${!isVideoOn ? 'off' : ''}`}>
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
             </button>
          </div>
        </div>
        
        <div className="glass-card" style={{ height: '200px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '20px', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Bot size={48} color="#fff" />
            </div>
            <div>
               <h3 style={{ marginBottom: '0.5rem' }}>AI Interviewer (Alpha)</h3>
               <p style={{ color: 'var(--text-muted)' }}>Currently analyzing your domain: <span style={{ color: 'var(--primary)' }}>{domain}</span></p>
               <div style={{ display: 'flex', gap: '5px', marginTop: '1rem' }}>
                  {[1,2,3,4,5].map(i => <div key={i} style={{ width: '3px', height: Math.random()*20+10, background: 'var(--primary)', borderRadius: '2px' }}></div>)}
               </div>
            </div>
        </div>
      </div>

      {/* Right side: Chat */}
      <div className="glass-card" style={{ width: '450px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           <h3 style={{ fontSize: '1.1rem' }}>Interview Transcript</h3>
           <button onClick={() => navigate('/')} className="btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>End Session</button>
        </div>

        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           {messages.map(msg => (
             <div key={msg.id} style={{ display: 'flex', gap: '1rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  background: msg.role === 'ai' ? 'var(--primary)' : '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                   {msg.role === 'ai' ? <Bot size={16} color="#fff" /> : <User size={16} color="#fff" />}
                </div>
                <div style={{ 
                  background: msg.role === 'ai' ? 'rgba(255,255,255,0.05)' : 'var(--primary)',
                  padding: '1rem', borderRadius: '15px', maxWidth: '80%',
                  fontSize: '0.95rem', lineHeight: '1.5',
                  color: msg.role === 'ai' ? 'inherit' : '#fff',
                  borderTopLeftRadius: msg.role === 'ai' ? 0 : '15px',
                  borderTopRightRadius: msg.role === 'user' ? 0 : '15px',
                }}>
                   {msg.content}
                </div>
             </div>
           ))}
           {isTyping && (
             <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Bot size={16} color="#fff" />
                </div>
                <div className="typing-indicator">
                   <span></span><span></span><span></span>
                </div>
             </div>
           )}
           <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
           <input 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Speak or type your answer..." 
             style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}
           />
           <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
              <Send size={20} />
           </button>
        </form>
      </div>

      <style>{`
        .icon-btn { width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; display: flex; alignItems: center; justifyContent: center; color: #fff; cursor: pointer; transition: 0.2s; }
        .icon-btn:hover { background: rgba(255,255,255,0.2); }
        .icon-btn.off { background: var(--error); }
        
        .typing-indicator { display: flex; gap: 4px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 15px; align-self: flex-start; }
        .typing-indicator span { width: 6px; height: 6px; background: var(--text-muted); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
      `}</style>
    </div>
  );
};

export default AIInterview;
