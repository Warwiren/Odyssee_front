import React, { useState } from "react";
import { Modal, Button, Select, message } from "antd";
import { API } from "../../services/AxiosApi";

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

interface EditCharacterProps {
  character: Character;
  onClassUpdated: (updatedCharacter: Character) => void;
}

export const EditCharacter: React.FC<EditCharacterProps> = ({
  character,
  onClassUpdated,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number | null>(
    character.class_id || null
  );

  const handleClassChange = (value: number) => {
    setSelectedClass(value);
  };

  const handleSave = async () => {
    if (selectedClass !== null) {
      try {
        const response = await API.put(
          `/characters/${character.id}/update-class`,
          {
            class_id: selectedClass,
          }
        );
        onClassUpdated(response.data.character);
        setIsModalVisible(false);
        message.success("Classe du personnage mise à jour avec succès !");
      } catch (error) {
        console.error("Failed to update character class", error);
        message.error("Échec de la mise à jour de la classe du personnage.");
      }
    }
  };

  return (
    <>
      <Button type="default" onClick={() => setIsModalVisible(true)}>
        Modifier
      </Button>
      <Modal
        title="Modifier la Classe du Personnage"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        <Select
          placeholder="Sélectionnez une nouvelle classe"
          value={selectedClass || undefined}
          onChange={handleClassChange}
          style={{ width: "100%" }}
        >
          <Select.Option value={1}>Guerrier</Select.Option>
          <Select.Option value={2}>Assassin</Select.Option>
          <Select.Option value={3}>Mage</Select.Option>
        </Select>
      </Modal>
    </>
  );
};
