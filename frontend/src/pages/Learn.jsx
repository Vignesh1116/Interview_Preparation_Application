import { useNavigate } from 'react-router-dom';
import { Book, ChevronRight, Code, Database, Globe, Cloud, Cpu, MessageSquare, Terminal } from 'lucide-react';

const Learn = () => {
    const navigate = useNavigate();

    const topics = [
        {
            title: "Python",
            icon: <Terminal size={24} />,
            concepts: [
                { name: "Decorators & Generators", desc: "Using closures to wrap functions and 'yield' for memory-efficient data streaming." },
                { name: "GIL (Global Interpreter Lock)", desc: "Understanding how Python manages thread execution and its impact on CPU-bound tasks." },
                { name: "Memory Management", desc: "Reference counting, garbage collection cycles, and the use of '__slots__'." },
                { name: "AsyncIO & Concurrency", desc: "Handling I/O-bound tasks using the event loop and 'async/await' syntax." },
                { name: "OOP & Metaclasses", desc: "Deep dive into MRO (Method Resolution Order), abstract base classes, and metaclass logic." }
            ]
        },
        {
            title: "Java",
            icon: <Code size={24} />,
            concepts: [
                { name: "JVM Architecture", desc: "How Java manages Memory (Heap, Stack, Metaspace) and the Just-In-Time (JIT) compiler." },
                { name: "Garbage Collection", desc: "Comparing G1, Parallel, and ZGC strategies for high-throughput applications." },
                { name: "Multithreading", desc: "Java Memory Model, volatile keyword, and the ExecutorService framework." },
                { name: "Spring Boot Internals", desc: "Dependency Injection, Bean lifecycle, and the Proxy pattern in AOP." },
                { name: "Collections Framework", desc: "Performance trade-offs between HashMap, ConcurrentHashMap, and TreeMap." }
            ]
        },
        {
            title: "JavaScript",
            icon: <Globe size={24} />,
            concepts: [
                { name: "Event Loop", desc: "Understanding the Call Stack, Microtask queue, and Task queue execution order." },
                { name: "Closures & Scope", desc: "Lexical scope, private variables, and memory leak prevention in JS applications." },
                { name: "Prototypal Inheritance", desc: "How objects link to prototypes and the difference between __proto__ and prototype." },
                { name: "Promises & Async/Await", desc: "Handling asynchronous flow control and avoiding 'callback hell' with modern syntax." },
                { name: "ES6+ Modern Features", desc: "Destructuring, arrow functions, template literals, and the spread/rest operators." }
            ]
        },
        {
            title: "HTML",
            icon: <Globe size={24} />,
            concepts: [
                { name: "Semantic Tags", desc: "Using proper tags (article, section, main) for SEO and Screen Reader accessibility." },
                { name: "DOM Tree Structure", desc: "How browsers parse HTML into a tree and the difference between HTML and the DOM." },
                { name: "Web Storage API", desc: "Comparing localStorage, sessionStorage, and cookies for client-side data." },
                { name: "Form Validation", desc: "Using native HTML5 validation constraints and handling custom error messages." },
                { name: "SEO Optimization", desc: "Proper use of meta tags, heading hierarchy, and alt text for image indexing." }
            ]
        },
        {
            title: "CSS",
            icon: <Code size={24} />,
            concepts: [
                { name: "Flexbox & Grid", desc: "Layout engines for creating complex, responsive, and aligned user interfaces." },
                { name: "Box Model", desc: "Mastering content, padding, border, and margin, and the 'box-sizing' property." },
                { name: "CSS Specificity", desc: "Rules for style application: Inline > ID > Class > Element weight calculation." },
                { name: "Post-processors (SASS)", desc: "Using variables, nesting, and mixins to write maintainable and DRY CSS code." },
                { name: "Animations & Keyframes", desc: "Creating smooth transitions and complex animations using the browser's GPU." }
            ]
        },
        {
            title: "React",
            icon: <Cpu size={24} />,
            concepts: [
                { name: "Virtual DOM", desc: "The reconciliation algorithm and how Fiber enables incremental rendering." },
                { name: "Hooks In-Depth", desc: "Understanding useEffect dependencies, useMemo for memoization, and custom hook logic." },
                { name: "State Architecture", desc: "Choosing between Context API, Redux Toolkit, and local state for scalable apps." },
                { name: "Component Lifecycle", desc: "Mounting, updating, and unmounting phases in both functional and class components." },
                { name: "Performance Optimization", desc: "React.memo, lazy loading components, and preventing unnecessary re-renders." }
            ]
        },
        {
            title: "SQL",
            icon: <Database size={24} />,
            concepts: [
                { name: "Indexing Strategies", desc: "B-Tree vs Hash indexes and when to use clustered vs non-clustered indexes." },
                { name: "Normalization", desc: "Achieving 3NF/BCNF and knowing when to denormalize for read-heavy workloads." },
                { name: "Window Functions", desc: "Using ROW_NUMBER, RANK, and DENSE_RANK for complex analytical queries." },
                { name: "Transaction Isolation", desc: "Understanding ACID properties and levels (Read Uncommitted to Serializable)." },
                { name: "Query Optimization", desc: "Reading EXPLAIN plans, optimizing joins, and reducing subquery overhead." }
            ]
        },
        {
            title: "System Design",
            icon: <Globe size={24} />,
            concepts: [
                { name: "Load Balancing", desc: "Distributing traffic via Round Robin, Weighted, and Least Connection strategies." },
                { name: "Caching Patterns", desc: "Implementing Redis/Memcached with Write-through, Write-back, or Cache-aside." },
                { name: "Microservices", desc: "Service discovery, API Gateways, and inter-service communication via gRPC/REST." },
                { name: "Database Sharding", desc: "Horizontal partitioning strategies and handling rebalancing with consistent hashing." },
                { name: "Reliability & CAP", desc: "Navigating the trade-offs between Consistency, Availability, and Partition Tolerance." }
            ]
        },
        {
            title: "Data Structures",
            icon: <Terminal size={24} />,
            concepts: [
                { name: "Big O Analysis", desc: "Evaluating Time and Space complexity for efficient algorithm selection." },
                { name: "Arrays & Strings", desc: "Two-pointer techniques, sliding windows, and string manipulation algorithms." },
                { name: "Trees & Graphs", desc: "BFS vs DFS, Binary Search Trees, and finding the shortest path in a graph." },
                { name: "Hash Tables", desc: "Collision handling strategies like Chaining and Open Addressing (Linear Probing)." },
                { name: "Stacks & Queues", desc: "FIFO and LIFO principles, including implementation of Priority Queues." }
            ]
        },
        {
            title: "Computer Networks",
            icon: <Globe size={24} />,
            concepts: [
                { name: "OSI Model", desc: "The 7-layer framework for understanding network communication from physical to app." },
                { name: "TCP/IP Suite", desc: "Understanding the 3-way handshake, sequence numbers, and reliable data transfer." },
                { name: "DNS Resolution", desc: "The hierarchical process of translating domain names into routable IP addresses." },
                { name: "HTTP/HTTPS & SSL", desc: "How secure connections are established using certificates and public-key encryption." },
                { name: "Load Balancers", desc: "Functioning at Layer 4 (Transport) vs Layer 7 (Application) for traffic management." }
            ]
        },
        {
            title: "Cloud Computing",
            icon: <Cloud size={24} />,
            concepts: [
                { name: "Serverless (FaaS)", desc: "Building event-driven applications without managing the underlying infrastructure." },
                { name: "VPC & Subnets", desc: "Designing secure network architectures with public/private subnets and gateways." },
                { name: "Object Storage", desc: "Managing massive amounts of unstructured data using S3 or similar services." },
                { name: "IAM & Security", desc: "Principle of least privilege, roles, and policies for secure cloud access management." },
                { name: "Compute Options", desc: "Choosing between EC2 (Instances), Lambda (Functions), and ECS (Containers)." }
            ]
        },
        {
            title: "Communication",
            icon: <MessageSquare size={24} />,
            concepts: [
                { name: "Active Listening", desc: "Strategies to ensure you've understood the interviewer's question before answering." },
                { name: "Technical Clarity", desc: "Explaining internal system logic without getting lost in unnecessary implementation details." },
                { name: "Stakeholder Adaptation", desc: "Varying your language for technical vs business-oriented audiences." },
                { name: "Confidence & Tone", desc: "Maintaining a professional yet enthusiastic demeanour during high-pressure talks." },
                { name: "Effective Feedback", desc: "How to give and receive constructive criticism to foster a healthy team environment." }
            ]
        }
    ];

    return (
        <div className="container" style={{ padding: '3rem 2rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Learning <span className="gradient-text">Hub</span></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Master the core concepts before you start the practice sessions.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                {topics.map((topic, index) => (
                    <div key={index} className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '10px', background: 'var(--primary)', borderRadius: '12px', color: 'white' }}>
                                {topic.icon}
                            </div>
                            <h2 style={{ fontSize: '1.5rem' }}>{topic.title}</h2>
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {topic.concepts.map((concept, cIdx) => (
                                <div key={cIdx}>
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '1rem' }}>{concept.name}</div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{concept.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
                            <button 
                                onClick={() => navigate(`/practice?topic=${topic.title}&difficulty=Intermediate`)}
                                className="btn btn-outline" 
                                style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                            >
                                Practice <ChevronRight size={16} />
                            </button>
                            {!['Communication', 'Computer Networks', 'Cloud Computing'].includes(topic.title) && (
                                <button 
                                    onClick={() => navigate(`/compiler?topic=${topic.title}`)}
                                    className="btn btn-primary" 
                                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                                >
                                    <Terminal size={16} /> Compiler
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Learn;
