import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./routes/Login";
import Home from "./routes/Home";
import { Player } from "./routes/Player";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </Router>
  );
};

export default App;
