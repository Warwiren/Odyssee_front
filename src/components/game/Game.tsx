import React, { useEffect, useState } from "react";
import { API } from "../../services/AxiosApi";
import { Card, Button, Row, Col, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface Map {
  id: number;
  name: string;
  image: string;
  events_count?: number;
}

interface Event {
  id: number;
  name: string;
  description: string;
  dice_test: number;
  location: string;
  location_image: string;
  type: string;
  map_id: number;
  completed: boolean;
}

interface GameProps {
  selectedCharacter: {
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
  } | null;
}

export const Game: React.FC<GameProps> = ({ selectedCharacter }) => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMapEvents, setSelectedMapEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCharacter) {
      fetchAvailableMaps();
    }
  }, [selectedCharacter]);

  const fetchAvailableMaps = async () => {
    setLoading(true);

    try {
      const response = await API.get(
        `/characters/${selectedCharacter?.id}/available_maps`
      );
      console.log(response.data.data);
      setMaps(response.data.data);
    } catch (error) {
      console.error("Failed to fetch maps", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowEvent = async (mapId: number) => {
    try {
      const response = await API.get(`/maps/${mapId}/events`);
      setSelectedMapEvents(response.data.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Spin tip="Loading maps..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={handleBack} style={{ marginBottom: "20px" }}>
        Retour
      </Button>
      <Title level={2} style={{ color: "white" }}>
        Joueur : {selectedCharacter?.character_name}
      </Title>
      <Row gutter={[16, 16]}>
        {maps.map((map) => (
          <Col xs={24} sm={12} md={8} key={map.id}>
            <Card
              hoverable
              cover={
                <img
                  src={`/${map.image}`}
                  alt={map.name}
                  style={{ height: 150, objectFit: "cover" }}
                />
              }
              onClick={() => handleClickShowEvent(map.id)}
            >
              <Card.Meta title={map.name} />
            </Card>
          </Col>
        ))}
      </Row>
      {selectedMapEvents.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Title level={4}>Événements</Title>
          <Row gutter={[16, 16]}>
            {selectedMapEvents.map((event) => (
              <Col xs={24} sm={12} md={8} key={event.id}>
                <Card
                  hoverable
                  style={{
                    textDecoration: event.completed ? "line-through" : "none",
                  }}
                >
                  {event.name}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};
