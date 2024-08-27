import React, { useEffect, useState } from "react";
import { API } from "../../services/AxiosApi";
import { AddCharacter } from "./AddCharacter";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Modal } from "antd";
import "./CharactersPage.css";

interface Character {
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
}

interface CharacterPageProps {
  user: { name: string; email: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; email: string } | null>
  >;
  setSelectedCharacter: (character: Character) => void;
}

export const CharacterPage: React.FC<CharacterPageProps> = ({
  user,
  setUser,
  setSelectedCharacter,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCharacters();
    }
  }, [user]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await API.get("/characters");
      setCharacters(response.data);
    } catch (error) {
      console.error("Failed to fetch characters", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterAdded = (character: Character) => {
    setCharacters([...characters, character]);
    setCreating(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/characters/${id}`);
      setCharacters(characters.filter((character) => character.id !== id));
    } catch (error) {
      console.error("Failed to delete character", error);
    }
  };

  const handleClickCharacter = (character: Character) => {
    setSelectedCharacter(character);
    navigate("/play");
  };

  const logout = async () => {
    await API.post("/logout");
    setUser(null);
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "character_name",
      key: "character_name",
    },
    {
      title: "Classe",
      dataIndex: "class_name",
      key: "class_name",
    },
    {
      title: "Current H",
      dataIndex: "current_health",
      key: "current_health",
    },
    {
      title: "Max H",
      dataIndex: "max_health",
      key: "max_health",
    },
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
    },
    {
      title: "Will",
      dataIndex: "will",
      key: "will",
    },
    {
      title: "Strength",
      dataIndex: "strength",
      key: "strength",
    },
    {
      title: "Spell Slot",
      dataIndex: "spell_slot",
      key: "spell_slot",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, character: Character) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleClickCharacter(character)}
          >
            Jouer
          </Button>
          <Button
            type="default"
            danger
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(character.id);
            }}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Characters for {user?.name}</h2>
      <Table
        columns={columns}
        dataSource={characters}
        loading={loading}
        // rowClassName="table_character"
        rowKey="id"
        // onRow={(record) => ({
        //   onClick: () => handleClickCharacter(record),
        // })}
        pagination={{ pageSize: 5 }}
      />
      <Space direction="vertical" style={{ marginTop: "20px" }}>
        <Button type="primary" onClick={() => setCreating(true)}>
          Nouveau Personnage
        </Button>
        <Button type="default" onClick={logout}>
          Déconnexion
        </Button>
      </Space>
      <Modal
        title="Créer un nouveau personnage"
        visible={creating}
        onCancel={() => setCreating(false)}
        footer={null}
      >
        <AddCharacter onCharacterAdded={handleCharacterAdded} />
      </Modal>
    </div>
  );
};
