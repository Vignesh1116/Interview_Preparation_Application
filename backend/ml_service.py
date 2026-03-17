from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

class AIScorer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
    def score_answer(self, user_answer: str, question_topic: str):
        # In a real scenario, we'd compare against reference answers.
        # Here we simulate scoring based on length and presence of technical terms.
        
        # Simulated "technical terms" by topic
        topic_keywords = {
            "Python": ["list", "dictionary", "function", "class", "decorator", "yield", "generator", "memory", "gil", "inheritance", "polymorphism", "lambda", "async", "await", "multiprocessing"],
            "SQL": ["join", "select", "where", "index", "primary", "foreign", "group", "having", "transaction", "normalization", "denormalization", "view", "stored procedure", "trigger"],
            "Data Structures": ["tree", "graph", "stack", "priority", "queue", "heap", "complexity", "big o", "sort", "linked list", "hash table", "binary search", "recursion", "dynamic programming"],
            "Web Development": ["html", "css", "api", "rest", "http", "client", "server", "dom", "async", "await", "react", "frontend", "backend", "middleware", "cors", "jwt", "payload"]
        }
        
        keywords = topic_keywords.get(question_topic, [])
        user_answer_lower = user_answer.lower()
        
        # Calculate a base score based on keyword match
        match_count = sum(1 for kw in keywords if kw in user_answer_lower)
        keyword_score = min(match_count * 12, 60) # Increased max spread
        
        # Penalty for extremely short answers, bonus for detailed ones
        words = len(user_answer.split())
        if words < 10:
            length_modifier = -20
        elif words > 40:
            length_modifier = 20
        else:
            length_modifier = 0

        # Use Tfidf to simulate complexity
        try:
            tfidf_matrix = self.vectorizer.fit_transform([user_answer])
            complexity_score = min(len(self.vectorizer.get_feature_names_out()) * 4, 20)
        except:
            complexity_score = 5
            
        final_score = max(0, min(100, keyword_score + complexity_score + length_modifier + 10))
        
        # Feedback generation
        if final_score > 80:
            feedback = "Excellent! You've covered key technical concepts comprehensively."
        elif final_score > 50:
            feedback = "Good answer. Try to include more specific technical details related to " + question_topic + "."
        else:
            feedback = "Your answer is a bit brief. Consider elaborating on the core mechanisms and specific examples."
            
        return float(round(final_score, 1)), feedback

ai_scorer = AIScorer()
