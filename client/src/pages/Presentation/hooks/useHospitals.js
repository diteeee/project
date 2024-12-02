import { useState, useEffect } from "react";
import axios from "axios";

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  //display
  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hospitals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHospitals(response.data);
    } catch (error) {
      console.error("There was an error fetching the hospitals!", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  //add hospital
  const [formErrors, setFormErrors] = useState({});
  const [showAddHospitalForm, setShowAddHospitalForm] = useState(false);
  const [newHospital, setNewHospital] = useState({
    emri: "",
    adresa: "",
    nrTel: "",
  });

  const validateForm = () => {
    const errors = {};
    if (!newHospital.emri) errors.emri = "Name is required.";
    if (!newHospital.adresa) errors.adresa = "Address is required.";
    if (!newHospital.nrTel.trim()) {
      errors.nrTel = "Phone Number is required.";
    } else if (!newHospital.nrTel.match(/^\d{5,15}$/)) {
      errors.nrTel = "Phone Number should have between 5 and 15 digits.";
    }
    return errors;
  };

  const handleAddHospitalClick = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      handleAddHospital();
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewHospital((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddHospital = async () => {
    const formData = new FormData();
    formData.append("emri", newHospital.emri);
    formData.append("adresa", newHospital.adresa);
    formData.append("nrTel", newHospital.nrTel);
    if (selectedImage) {
      formData.append("img", selectedImage);
    }

    try {
      await axios.post("http://localhost:3001/hospitals", formData, axiosConfig, {});
      fetchHospitals();
      setNewHospital({
        emri: "",
        adresa: "",
        nrTel: "",
      });
      setSelectedImage(null);
      setShowAddHospitalForm(false);
    } catch (error) {
      console.error("Error adding hospital:", error);
    }
  };

  //edit
  const [editingHospitalId, setEditingHospitalId] = useState(null);
  const [editedHospital, setEditedHospital] = useState({
    emri: "",
    adresa: "",
    nrTel: "",
    imageUrl: "",
  });

  const handleImageChange = (e, type) => {
    if (type === "new") {
      setSelectedImage(e.target.files[0]);
    } else {
      setEditedHospital((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHospital((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (hospital) => {
    setEditingHospitalId(hospital.nrRegjistrimit);
    setEditedHospital(hospital);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("emri", editedHospital.emri);
    formData.append("adresa", editedHospital.adresa);
    formData.append("nrTel", editedHospital.nrTel);
    if (editedHospital.image) {
      formData.append("img", editedHospital.image);
    }

    try {
      await axios.put(
        `http://localhost:3001/hospitals/${editingHospitalId}`,
        formData,
        axiosConfig,
        {}
      );
      fetchHospitals();
      setEditingHospitalId(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  //delete
  const handleDelete = async (hospitalId) => {
    try {
      await axios.delete(`http://localhost:3001/hospitals/${hospitalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchHospitals();
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  return {
    hospitals,
    editedHospital,
    editingHospitalId,
    newHospital,
    showAddHospitalForm,
    formErrors,
    setEditingHospitalId,
    handleEdit,
    handleImageChange,
    handleEditInputChange,
    handleSave,
    handleDelete,
    handleAddHospital,
    handleAddInputChange,
    setShowAddHospitalForm,
    handleAddHospitalClick,
  };
};
