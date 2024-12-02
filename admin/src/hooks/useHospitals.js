import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useHospitals = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);

  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState({ emri: "", adresa: "", nrTel: "", imageUrl: "" });
  const [hospitalModal, setHospitalModal] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState('');

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const toggleHospitalModal = () => setHospitalModal(!hospitalModal);

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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewHospital({ ...newHospital, img: e.target.files[0] });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
    } else {
      setSelectedImageName('');
    }
    handleImageChange(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHospital({ ...newHospital, [name]: value });
  };

  const [imageSelected, setImageSelected] = useState(!!selectedImageName);

  const handleFileSelection = (event) => {
      handleFileChange(event);
      setImageSelected(!!event.target.files.length);
  };

  const onSubmit = (event) => {
      event.preventDefault();
      if (!imageSelected) {
          setErrorMessageModal('Please select an image.');
          return;
      }
      handleSubmit(event);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('emri', newHospital.emri);
    formData.append('adresa', newHospital.adresa);
    formData.append('nrTel', newHospital.nrTel);
    if (newHospital.img) {
      formData.append('img', newHospital.img);
    }
  
    try {
      const response = await axios.post("http://localhost:3001/hospitals", formData, axiosConfig, {});
      if (response.status === 201) {
        fetchHospitals();
        setNewHospital({ emri: "", adresa: "", nrTel: "", imageUrl: "" });
        toggleHospitalModal();
      } else {
        console.error("Failed to insert hospital");
        setErrorMessageModal("Failed to insert hospital: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting hospital:", error);
    }
  };  

  // edit
  const [selectedEditFile, setSelectedEditFile] = useState(null);
  const [editingHospitalId, setEditingHospitalId] = useState(null);
  const [editedHospital, setEditedHospital] = useState({
    emri: "",
    adresa: "",
    nrTel: "",
    imageUrl: "",
  });

  const handleEdit = (hospitalId) => {
    setEditingHospitalId(hospitalId);
    const hospitalToEdit = hospitals.find(hospital => hospital.nrRegjistrimit === hospitalId);
    if (hospitalToEdit) {
      setEditedHospital(hospitalToEdit);
    }
  };

  const handleEditFileChange = (e) => {
    setSelectedEditFile(e.target.files[0]);
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHospital(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingHospitalId(null);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('emri', editedHospital.emri);
    formData.append('adresa', editedHospital.adresa);
    formData.append('nrTel', editedHospital.nrTel);
    if (selectedEditFile) {
      formData.append('img', selectedEditFile);
    }
  
    try {
      const response = await axios.put(`http://localhost:3001/hospitals/${editingHospitalId}`, formData, axiosConfig, {});
      if (response.status === 200) {
        fetchHospitals();
        setEditingHospitalId(null);
        setSelectedEditFile(null);
        setSuccessMessage('Hospital updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update hospital');
        setEditingHospitalId(null);
      }
    } catch (error) {
      console.error('Error updating hospital:', error);
      setErrorMessage('An error occurred while updating the hospital');
      setEditingHospitalId(null);
    }
  };

  const handleDeleteHospital = async (hospitalID) => {
    try {
      await axios.delete(`http://localhost:3001/hospitals/${hospitalID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHospitals(hospitals.filter(hospital => hospital.nrRegjistrimit !== hospitalID));
      setSuccessMessage('Hospital deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting hospital:', error);
      setErrorMessage('An error occurred while deleting the hospital');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return {
    hospitals,
    newHospital,
    hospitalModal,
    selectedImageName,
    selectedEditFile,
    editingHospitalId,
    editedHospital,
    successMessage,
    errorMessage,
    errorMessageModal,
    toggleHospitalModal,
    handleFileSelection,
    handleEditFileChange,
    handleChange,
    onSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    handleDeleteHospital,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal
  };
};
