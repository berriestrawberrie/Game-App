import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./routes/Login";
import Home from "./routes/Home";
import { Player } from "./routes/Player";
import AllUsers from "./routes/AllUsers";
import PlayGame from "./routes/PlayGame";
import SelectGame from "./routes/SelectGames";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.init";
import { useAuthStore } from "./store/authStore";

const App: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
        localStorage.setItem("token", idToken);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    });

    return () => unsubscribe();
  }, [setUser, setToken]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allplayers" element={<AllUsers />} />
        <Route path="/player/:userId" element={<Player />} />
        <Route path="/selectgames" element={<SelectGame />} />
        <Route path="/playgame/:gameTitle/:gameId" element={<PlayGame />} />
      </Routes>
    </Router>
  );
};

export default App;
