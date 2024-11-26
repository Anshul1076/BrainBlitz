import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/contextApi";

function Result() {
  const { score } = useParams();
  const navigate = useNavigate();
    const { username } = useUser();

  const getMessage = () => {
    if(score >= 9) {
        return {
            message: "You are Haruday or wot? 🎉",
            emoji: "🥳",
            image: "https://example.com/genius-image.jpg", // Replace with your image URL
        };
        }

    else if (score >= 7) {
      return {
        message: "You are the man! 💪🏆",
        emoji: "🎉",
        image: "https://example.com/you-are-the-man-image.jpg", // Replace with your image URL
      };
    } else if (score >= 5) {
      return {
        message: "Good, but you can do better! 🤔",
        emoji: "😎",
        image: "https://example.com/good-but-better-image.jpg", // Replace with your image URL
      };
    } else {
      return {
        message: "Try Again! 😓",
        emoji: "💔",
        image: "https://example.com/try-again-image.jpg", // Replace with your image URL
      };
    }
  };

  const { message, emoji, image } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hello {username},</h1>
        <p className="text-xl text-gray-700 mb-4">
          Your score is <span className="font-semibold text-blue-500">{score}</span>
        </p>
        <h2 className="text-2xl text-gray-800 mb-4">{message}</h2>
        <p className="text-5xl mb-4">{emoji}</p>
        
     
        <button
          onClick={() => navigate("/chooseOne")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Result;
