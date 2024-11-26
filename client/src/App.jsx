import { Route, Routes } from "react-router-dom";
import ChooseOne from "./components/ChooseOne";
import Questions from "./components/Questions";
import Result from "./components/Result";
import Landing from "./components/Landing";
import { UserProvider } from "./context/contextApi";

function App() {
  return (
    <UserProvider>
    <Routes>  
      <Route path="/" element={<Landing />} />
      <Route path="/chooseOne" element={<ChooseOne />} />
      <Route path="/quiz/:sport" element={<Questions />} />
      <Route path="/result/:score" element={<Result />} />

    </Routes>
    </UserProvider>
  );
}

export default App;
