import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./routes/Login";
import Home from "./routes/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
