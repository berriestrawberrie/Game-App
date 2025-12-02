import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from "./routes/login";
import Home from "./routes/Home";
import { User } from "./routes/user";

const About: React.FC = () => <h2>About Page</h2>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
