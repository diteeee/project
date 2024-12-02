import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useLectures = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);
  const [lecturers, setLecturers] = useState([]);

  //displaying lectures in a lecturer
  const [lectures, setLectures] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [activeLecturerTab, setActiveLecturerTab] = useState('0');
  
  const token = localStorage.getItem("token");
  
  //insert new lecture in database
  const [newLecture, setNewLecture] = useState({ emri: '', lecturerId: '' });
  const [lectureModal, setLectureModal] = useState(false);
  const [editingLectureId, setEditingLectureId] = useState(null);
  const [editedLecture, setEditedLecture] = useState({
    emri: "",
  });

  const handleLecturerSelect = useCallback(async (lecturer, tab) => {
    setSelectedLecturer(lecturer);
    setActiveLecturerTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/lecturers/${lecturer.lecturerID}/lectures`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  }, [token]);

  const toggleLectureModal = () => setLectureModal(!lectureModal);

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewLecture({ ...newLecture, [name]: value });
    }
  };

  const handleLecturerChange = (selectedOption) => {
    setNewLecture({ ...newLecture, lecturerId: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lectureWithLecturer = { ...newLecture };
    try {
      const response = await fetch("http://localhost:3001/lectures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lectureWithLecturer),
      });
      if (response.ok) {
        toggleLectureModal();
        handleLecturerSelect(selectedLecturer, activeLecturerTab);
        setNewLecture({ emri: "", lecturerId: "" });
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert lecture: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      } else {
        console.error("Failed to insert lecture");
        setErrorMessageModal("Failed to insert lecture: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting lecture:", error);
    }
  };

  const handleEdit = (lectureID) => {
    const lecture = lectures.find(dept => dept.lectureID === lectureID);
    setEditedLecture(lecture);
    setEditingLectureId(lectureID);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLecture(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingLectureId(null);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/lectures/${editingLectureId}`,
        editedLecture,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        handleLecturerSelect(selectedLecturer, activeLecturerTab);
        setEditingLectureId(null);
        setSuccessMessage('Lecture updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update lecture');
        setEditingLectureId(null);
      }
    } catch (error) {
      console.error('Error updating lecture:', error);
      setErrorMessage('An error occurred while updating the lecture');
      setEditingLectureId(null);
    }
  };

  const handleDeleteLecture = async (lectureID) => {
    try {
      await axios.delete(`http://localhost:3001/lectures/${lectureID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLectures(lectures.filter(lecture => lecture.lectureID !== lectureID));
      setSuccessMessage('Lecture deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting lecture:', error);
      setErrorMessage('An error occurred while deleting the lecture');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/lecturers/")
      .then(response => {
        setLecturers(response.data);
        if (response.data.length > 0) {
          handleLecturerSelect(response.data[0], "0");
        }
      })
      .catch(error => {
        console.error('Error fetching lecturers:', error);
      });
  }, [handleLecturerSelect]);

  const lecturerOptions = lecturers.map(lecturer => ({
    value: lecturer.lecturerID,
    label: lecturer.emri
  }));

  return {
    lecturers,
    lectures,
    newLecture,
    lectureModal,
    editedLecture,
    editingLectureId,
    successMessage,
    errorMessage,
    errorMessageModal,
    lecturerOptions,
    activeLecturerTab,
    selectedLecturer,
    setLecturers,
    toggleLectureModal,
    handleLecturerSelect,
    handleChange,
    handleLecturerChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    handleDeleteLecture,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
    setActiveLecturerTab,
  };
};