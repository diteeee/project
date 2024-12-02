import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useTeams = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);

    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({ emri: "" });
    const [teamModal, setTeamModal] = useState(false);

    const token = localStorage.getItem("token");

    const axiosConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // If you're using an auth token
        },
    };

    const toggleTeamModal = () => setTeamModal(!teamModal);

    const fetchTeams = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3001/teams", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({ ...newTeam, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('emri', newTeam.emri);
        console.log("New Team Data:", newTeam);

        try {
            const response = await axios.post("http://localhost:3001/teams", formData, axiosConfig);
            if (response.status === 201) {
                fetchTeams();
                setNewTeam({ emri: "" });
                console.log("new:", newTeam);
                toggleTeamModal();
            } else {
                console.error("Failed to insert team");
                setErrorMessageModal("Failed to insert team: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting team:", error);
        }
    };

    // edit
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [editedTeam, setEditedTeam] = useState({
        emri: "",
    });

    const handleEdit = (teamId) => {
        setEditingTeamId(teamId);
        const teamToEdit = teams.find(team => team.teamID === teamId);
        if (teamToEdit) {
            setEditedTeam(teamToEdit);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTeam(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingTeamId(null);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('emri', editedTeam.emri);

        try {
            const response = await axios.put(`http://localhost:3001/teams/${editingTeamId}`, formData, axiosConfig, {});
            if (response.status === 200) {
                fetchTeams();
                setEditingTeamId(null);
                setSuccessMessage('Team updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setErrorMessage('Failed to update team');
                setEditingTeamId(null);
            }
        } catch (error) {
            console.error('Error updating team:', error);
            setErrorMessage('An error occurred while updating the team');
            setEditingTeamId(null);
        }
    };

    const handleDeleteTeam = async (teamID) => {
        try {
            await axios.delete(`http://localhost:3001/teams/${teamID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTeams(teams.filter(team => team.teamID !== teamID));
            setSuccessMessage('Team deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting team:', error);
            setErrorMessage('An error occurred while deleting the team');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    return {
        teams,
        newTeam,
        teamModal,
        editingTeamId,
        editedTeam,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleTeamModal,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteTeam,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal
    };
};
