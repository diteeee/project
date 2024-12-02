import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useLecturers = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);

    const [lecturers, setLecturers] = useState([]);
    const [newLecturer, setNewLecturer] = useState({ emri: "", department: "", email: "" });
    const [lecturerModal, setLecturerModal] = useState(false);

    const token = localStorage.getItem("token");

    const axiosConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // If you're using an auth token
        },
    };

    const toggleLecturerModal = () => setLecturerModal(!lecturerModal);

    const fetchLecturers = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3001/lecturers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setLecturers(data);
        } catch (error) {
            console.error("Error fetching lecturers:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchLecturers();
    }, [fetchLecturers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLecturer({ ...newLecturer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('emri', newLecturer.emri);
        formData.append('department', newLecturer.department);
        formData.append('email', newLecturer.email);
        console.log("New Lecturer Data:", newLecturer);

        try {
            const response = await axios.post("http://localhost:3001/lecturers", formData, axiosConfig);
            if (response.status === 201) {
                fetchLecturers();
                setNewLecturer({ emri: "", department: "", email: "" });
                console.log("new:", newLecturer);
                toggleLecturerModal();
            } else {
                console.error("Failed to insert lecturer");
                setErrorMessageModal("Failed to insert lecturer: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting lecturer:", error);
        }
    };

    // edit
    const [editingLecturerId, setEditingLecturerId] = useState(null);
    const [editedLecturer, setEditedLecturer] = useState({
        emri: "",
        department: "",
        email: "",
    });

    const handleEdit = (lecturerId) => {
        setEditingLecturerId(lecturerId);
        const lecturerToEdit = lecturers.find(lecturer => lecturer.lecturerID === lecturerId);
        if (lecturerToEdit) {
            setEditedLecturer(lecturerToEdit);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedLecturer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingLecturerId(null);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('emri', editedLecturer.emri);
        formData.append('department', editedLecturer.department);
        formData.append('email', editedLecturer.email);

        try {
            const response = await axios.put(`http://localhost:3001/lecturers/${editingLecturerId}`, formData, axiosConfig, {});
            if (response.status === 200) {
                fetchLecturers();
                setEditingLecturerId(null);
                setSuccessMessage('Lecturer updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setErrorMessage('Failed to update lecturer');
                setEditingLecturerId(null);
            }
        } catch (error) {
            console.error('Error updating lecturer:', error);
            setErrorMessage('An error occurred while updating the lecturer');
            setEditingLecturerId(null);
        }
    };

    const handleDeleteLecturer = async (lecturerID) => {
        try {
            await axios.delete(`http://localhost:3001/lecturers/${lecturerID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLecturers(lecturers.filter(lecturer => lecturer.lecturerID !== lecturerID));
            setSuccessMessage('Lecturer deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting lecturer:', error);
            setErrorMessage('An error occurred while deleting the lecturer');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    return {
        lecturers,
        newLecturer,
        lecturerModal,
        editingLecturerId,
        editedLecturer,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleLecturerModal,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteLecturer,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal
    };
};
