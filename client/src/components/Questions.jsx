import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Questions() {

  const navigate = useNavigate();
  const { sport } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerVisible, setAnswerVisible] = useState({});
  const [userAnswer, setUserAnswer] = useState({});
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); 

  const handelSend = async () => {
    try {
      const data = await fetch(`http://localhost:8080/fetchQuestions/${sport}`);
      const response = await data.json();
      setQuestions(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const checkAnswer = (option, correctAnswer) => {
    if (isAnswered) return; 
    
    setUserAnswer((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));

    if (option === correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswered(true); 
  };

  useEffect(() => {
    handelSend();
  }, [sport]);

  useEffect(() => {
    setTimer(60);
    setIsTimerRunning(true);
    setIsAnswered(false); 

    const timerInterval = setInterval(() => {
      if (timer > 0 && isTimerRunning) {
        setTimer((prevTime) => prevTime - 1);
      } else if (timer === 0) {
        clearInterval(timerInterval);
        goToNextQuestion();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentQuestionIndex, sport]);

  const toggleAnswer = (index) => {
    setAnswerVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false); 
    } else {
      navigate(`/result/${score}`);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswered(false);
    }
  };

  const endQuiz = () => {
    navigate(`/result/${score}`);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold text-gray-700">Question {currentQuestionIndex + 1}</span>
        <span className="text-lg font-semibold text-gray-700">{convertTime(timer)}</span>
      </div>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Questions for {sport.toUpperCase()}
      </h2>
      <h3 className="text-xl text-center text-gray-600 mb-4">Score: {score}</h3>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="text-xl text-gray-600">Loading questions...</span>
        </div>
      ) : (
        <div>
          {questions.length > 0 ? (
            <div className="w-[50vw] mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4 border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-700">
                {questions[currentQuestionIndex].question}
              </h3>
              <div className="text-sm text-gray-500">
                <strong>Options:</strong>
                <ul className="ml-4 list-disc">
                  {questions[currentQuestionIndex].options.map((option, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        checkAnswer(option, questions[currentQuestionIndex].answer);
                        toggleAnswer(currentQuestionIndex);
                      }}
                      className={`p-2 cursor-pointer rounded-md transition-colors ${
                        userAnswer[currentQuestionIndex] === option
                          ? option === questions[currentQuestionIndex].answer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : ""
                      } ${isAnswered ? "cursor-not-allowed opacity-60" : ""}`} // Disable options after answering
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => toggleAnswer(currentQuestionIndex)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                {answerVisible[currentQuestionIndex] ? "Hide Answer" : "Show Answer"}
              </button>

              {answerVisible[currentQuestionIndex] && (
                <p className="mt-4 text-lg text-green-600">
                  <strong>Answer:</strong> {questions[currentQuestionIndex].answer}
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">No questions available.</p>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={goToPreviousQuestion}
              className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 disabled:bg-gray-300"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={goToNextQuestion}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300"
              disabled={!isAnswered} // Disable next button until the question is answered
            >
              Next
            </button>
          </div>

          {/* End Quiz Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={endQuiz}
              className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              End Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Questions;
