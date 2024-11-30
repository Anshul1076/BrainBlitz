import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/contextApi";

function Landing() {
  const navigate = useNavigate();
  const [named, setNamed] = useState(""); 
  const { setUsername } = useUser(); 

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setNamed(username); 
    setUsername(username); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Rules</h1>

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Please read the rules before proceeding:</h2>
          <ul className="list-decimal pl-5 space-y-2 text-lg text-gray-700">
            <li>You will be presented with multiple-choice questions.</li>
            <li>Each correct answer will award you points.</li>
            <li>The quiz is time-limited, so answer quickly!</li>
            <li>Once you submit your answer, you cannot change it.</li>
            <li>Good luck and have fun!</li>
          </ul>
        </div>

        <div className="space-y-4">
          <label htmlFor="username" className="block text-lg font-medium text-gray-700">
            Enter your username:
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={named} 
            onChange={handleUsernameChange} 
          />

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!named} 
            onClick={() => navigate("/chooseOne")} 
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
