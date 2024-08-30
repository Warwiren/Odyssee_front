import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CharacterPage } from "@/components/landing/CharactersPage";
import { Game } from "@/components/game/Game";
import { LoginPage } from "@/components/login/LoginPage";
import { RegisterPage } from "@/components/login/RegisterPage";
import { useUserContext } from "@/contexts/UserContext";

type Character = {
  id: number;
  character_name: string;
  class_name: string;
  class_id: number;
  current_health: number;
  max_health: number;
  skill: number;
  will: number;
  strength: number;
  spell_slot: number;
};

export const RouterComponent: React.FC = () => {
  const { user, fetchUser, userLoading } = useUserContext();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  return (
    <Router>
      {userLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <Routes>
        <Route path={"*"} element={<Navigate to="/" />} />
        {user && !userLoading && (
          <Route>
            <Route path="/" element={<Navigate to="/characters" />} />
            <Route
              path="/characters"
              element={
                <CharacterPage setSelectedCharacter={setSelectedCharacter} />
              }
            />
            {selectedCharacter && (
              <Route
                path="/play"
                element={<Game selectedCharacter={selectedCharacter} />}
              />
            )}
          </Route>
        )}
        {!user && !userLoading && (
          <Route>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};
