import './App.css';
import { useState } from 'react';

import quizData from './quizData.json'
import { QuizForm } from './components/QuizForm';
import QuizList from './components/QuizList';

function App() {
  const [quizzes, setQuizzes] = useState([quizData]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleAddQuiz = () => {
    const newQuiz = {
      created: new Date().toISOString(),
      description: '',
      id: null,
      modified: new Date().toISOString(),
      questions_answers: [],
      score: null,
      title: '',
      url: ''
    };
    setSelectedQuiz(newQuiz);
  };

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleAddQuestion = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleSaveQuiz = (updatedQuiz) => {
    if (updatedQuiz.id) {
      // Update existing quiz
      const updatedQuizzes = quizzes.map((quiz) =>
        quiz.id === updatedQuiz.id ? updatedQuiz : quiz
      );
      setQuizzes(updatedQuizzes);
    } else {
      // Add new quiz
      const newQuiz = { ...updatedQuiz, id: new Date().getTime() };
      setQuizzes([...quizzes, newQuiz]);
    }
    setSelectedQuiz(null);
  };
  return (
    <div className="App">
      <div>
        {selectedQuiz ? (
          <QuizForm quiz={selectedQuiz} onSaveQuiz={handleSaveQuiz} />
        ) : (
          <QuizList
            quiz={selectedQuiz}
            quizzes={quizzes}
            onAddQuiz={handleAddQuiz}
            onEditQuiz={handleEditQuiz}
            onAddQuestion={handleAddQuestion}

          />
        )}
      </div>
    </div>
  );
}

export default App;
