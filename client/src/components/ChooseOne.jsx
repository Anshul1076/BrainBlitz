import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import Cards from "./Cards";
import { useUser } from "../context/contextApi";

export default function ChooseOne() {
  const navigate = useNavigate();  
  const { username, setUsername } = useUser();

  const sports = [
    'chess', 'cricket', 'football', 'kabaddi', 'tennis',
    'basketball', 'volleyball', 'TT', 'badminton'
  ];

  const handelSend = (sport) => {
    navigate(`/quiz/${sport}`);  
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Choose One , {username.toUpperCase()[0] + username.slice(1) ? username.toUpperCase()[0] + username.slice(1) : "User"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sports.map((sport, index) => (
          <Cards
            key={index}
            name={sport.toUpperCase()}
            image={`${sport}.jpg`}
            description="Test your knowledge"
            onClick={() => handelSend(sport)}  
          />
        ))}
      </div>
    </div>
  );
}
