import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./services/AxiosApi";
import { LoginPage } from "./components/login/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CharacterPage } from "./components/landing/CharactersPage";
import { Game } from "./components/game/Game";
import { RegisterPage } from "./components/login/RegisterPage";

interface Character {
  id: number;
  name: string;
  class_name: string;
  class_id: number;
  current_health: number;
  max_health: number;
  skill: number;
  will: number;
  strength: number;
  spell_slot: number;
}

function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    // API.get("/user")
    //   .then((response) => setUser(response.data))
    //   .catch((e) => console.warn(e))
    //   .finally(() => setFetchingUser(false));
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setFetchingUser(true);
    try {
      const response = await API.get("/user");
      setUser(response.data);
    } catch (e) {
      // Not connected
      console.warn(e);
    }

    setFetchingUser(false);
  };

  return (
    <Router>
      <div>
        {fetchingUser ? (
          <p>Chargement en cours...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/characters" />
                ) : (
                  <LoginPage setUser={setUser} />
                )
              }
            />
            <Route
              path="/register"
              element={<RegisterPage setUser={setUser} />}
            />

            <Route
              path="/characters"
              element={
                user ? (
                  <CharacterPage
                    user={user}
                    setUser={setUser}
                    setSelectedCharacter={setSelectedCharacter}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/play"
              element={
                user && selectedCharacter ? (
                  <Game selectedCharacter={selectedCharacter} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        )}
      </div>
    </Router>
    // <div>
    //   {fetchingUser ? (
    //     <p>Chargement en cours...</p>
    //   ) : (
    //     <div>
    //       {user ? (
    //         <div>
    //           <h2>Welcome, {user.name}!</h2>
    //           <p>Email: {user.email}</p>
    //           <button onClick={logout}>Logout</button>
    //         </div>
    //       ) : (
    //         <LoginPage setUser={setUser} />
    //       )}
    //     </div>
    //   )}
    // </div>
  );
}

export default App;
