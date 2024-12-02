import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useRooms = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);

    const [rooms, setRooms] = useState([]);

    const token = localStorage.getItem("token");

    const fetchRooms = useCallback(async () => {
        try {
          const response = await fetch("http://localhost:3001/rooms", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
          const data = await response.json();
          setRooms(data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      }, [token]);
    
      useEffect(() => {
        fetchRooms();
      }, [fetchRooms]);

    //insert new room into database
    const [newRoom, setNewRoom] = useState({ numri: '', depID: '' });
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [roomModal, setRoomModal] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [departments, setDepartments] = useState([]);

    const toggleRoomModal = () => setRoomModal(!roomModal);

    const fetchHospitals = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3001/hospitals", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchHospitals();
    }, [fetchHospitals]);


    const handleHospitalChange = async (selectedOption) => {
        setSelectedHospital(selectedOption);
        setSelectedDepartment(null);
        setNewRoom({ ...newRoom, hospitalName: selectedOption.label, depID: ''});
        try {
            const response = await axios.get(`http://localhost:3001/hospitals/${selectedOption.value}/departments`);
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleDepartmentChange = (selectedOption) => {
        const selectedDep = departments.find(d => d.departmentID === selectedOption.value);
        setSelectedDepartment(selectedDep);

        setNewRoom({ ...newRoom, depID: selectedOption.value});
    };

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setNewRoom({ ...newRoom, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomWithDepartment = {
            ...newRoom,
            depID: selectedDepartment.depID,
            hospitalName: selectedHospital.label,
            departmentName: departments.find(d => d.departmentID === newRoom.depID)?.emri
        };
        try {
            const response = await fetch("http://localhost:3001/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(roomWithDepartment),
            });

            if (response.ok) {
                toggleRoomModal();
                fetchRooms();
                setNewRoom({ numri: "", depID: "" });
                setSelectedHospital(null);
                setSelectedDepartment(null);
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessageModal(`Failed to insert room: ${responseData.error}`);
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            } else {
                console.error("Failed to insert room");
                setErrorMessageModal("Failed to insert room: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting room:", error);
        }
    };

    //edit a room
    const [editingRoomId, setEditingRoomId] = useState(null);
    const [editedRoom, setEditedRoom] = useState({
       numri: "",
    });

    //me tleju me editu faqja
    const handleEdit = (roomID) => {
        const room = rooms.find(r => r.roomID === roomID);
        setEditedRoom(room);
        setEditingRoomId(roomID);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRoom(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingRoomId(null);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/rooms/${editingRoomId}`, editedRoom, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setEditingRoomId(null);
                fetchRooms();
                setSuccessMessage('Room updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setErrorMessage('Failed to update room');
                setEditingRoomId(null);
            }
        } catch (error) {
            console.error('Error updating room:', error);
            setErrorMessage('An error occurred while updating the room');
            setEditingRoomId(null);
        }
    };

    const handleDeleteRoom = async (roomID) => {
        try {
            await axios.delete(`http://localhost:3001/rooms/${roomID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRooms(rooms.filter(room => room.roomID !== roomID));
            setSuccessMessage('Room deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting room:', error);
            setErrorMessage('An error occurred while deleting the room');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    return {
        rooms,
        hospitals,
        departments,
        editingRoomId,
        editedRoom,
        roomModal,
        newRoom,
        selectedDepartment,
        selectedHospital,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleRoomModal,
        setNewRoom,
        handleHospitalChange,
        handleDepartmentChange,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteRoom,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    };
};