import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const usePlayers = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);
  const [teams, setTeams] = useState([]);

  //displaying players in a team
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeTeamTab, setActiveTeamTab] = useState('0');
  
  const token = localStorage.getItem("token");
  
  //insert new player in database
  const [newPlayer, setNewPlayer] = useState({ emri: '', numri: '', teamId: '' });
  const [playerModal, setPlayerModal] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [editedPlayer, setEditedPlayer] = useState({
    emri: "",
    numri: '',
  });

  const handleTeamSelect = useCallback(async (team, tab) => {
    setSelectedTeam(team);
    setActiveTeamTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/teams/${team.teamID}/players`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  }, [token]);

  const togglePlayerModal = () => setPlayerModal(!playerModal);

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewPlayer({ ...newPlayer, [name]: value });
    }
  };

  const handleTeamChange = (selectedOption) => {
    setNewPlayer({ ...newPlayer, teamId: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playerWithTeam = { ...newPlayer };
    try {
      const response = await fetch("http://localhost:3001/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(playerWithTeam),
      });
      if (response.ok) {
        togglePlayerModal();
        handleTeamSelect(selectedTeam, activeTeamTab);
        setNewPlayer({ emri: "", numri: "", teamId: "" });
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert player: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      } else {
        console.error("Failed to insert player");
        setErrorMessageModal("Failed to insert player: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting player:", error);
    }
  };

  const handleEdit = (playerID) => {
    const player = players.find(dept => dept.playerID === playerID);
    setEditedPlayer(player);
    setEditingPlayerId(playerID);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingPlayerId(null);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/players/${editingPlayerId}`,
        editedPlayer,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        handleTeamSelect(selectedTeam, activeTeamTab);
        setEditingPlayerId(null);
        setSuccessMessage('Player updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update player');
        setEditingPlayerId(null);
      }
    } catch (error) {
      console.error('Error updating player:', error);
      setErrorMessage('An error occurred while updating the player');
      setEditingPlayerId(null);
    }
  };

  const handleDeletePlayer = async (playerID) => {
    try {
      await axios.delete(`http://localhost:3001/players/${playerID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlayers(players.filter(player => player.playerID !== playerID));
      setSuccessMessage('Player deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting player:', error);
      setErrorMessage('An error occurred while deleting the player');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/teams/")
      .then(response => {
        setTeams(response.data);
        if (response.data.length > 0) {
          handleTeamSelect(response.data[0], "0");
        }
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, [handleTeamSelect]);

  const teamOptions = teams.map(team => ({
    value: team.teamID,
    label: team.emri
  }));

  return {
    teams,
    players,
    newPlayer,
    playerModal,
    editedPlayer,
    editingPlayerId,
    successMessage,
    errorMessage,
    errorMessageModal,
    teamOptions,
    activeTeamTab,
    selectedTeam,
    setTeams,
    togglePlayerModal,
    handleTeamSelect,
    handleChange,
    handleTeamChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    handleDeletePlayer,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
    setActiveTeamTab,
  };
};