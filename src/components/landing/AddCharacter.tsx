import React, { useState, useEffect } from "react";
import { API } from "../../services/AxiosApi";
import { Form, Input, Select, Button } from "antd"; // Import des composants AntD

interface ClassOption {
  id: number;
  class_name: string;
}

interface AddCharacterProps {
  onCharacterAdded: (character: {
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
  }) => void;
}

export const AddCharacter: React.FC<AddCharacterProps> = ({
  onCharacterAdded,
}) => {
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await API.get("/classes");
      setClassOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  const handleCreate = async (values: any) => {
    try {
      const response = await API.post("/characters", {
        character_name: values.character_name,
        class_id: values.class_id,
      });

      const selectedClassName = classOptions.find(
        (option) => option.id === values.class_id
      )?.class_name;

      onCharacterAdded({
        ...response.data,
        class_name: selectedClassName || "Unknown",
      });
    } catch (error) {
      console.error("Failed to create character", error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleCreate}>
      <Form.Item
        label="Nom"
        name="character_name"
        rules={[{ required: true, message: "Veuillez entrer un nom" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Classe"
        name="class_id"
        rules={[
          { required: true, message: "Veuillez sélectionner une classe" },
        ]}
      >
        <Select placeholder="Sélectionner une classe">
          {classOptions.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {option.class_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Créer
        </Button>
      </Form.Item>
    </Form>
  );
};
