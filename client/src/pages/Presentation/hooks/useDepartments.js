import { useState, useEffect } from "react";
import axios from "axios";

export const useDepartments = () => {
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  };

  //display departments
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hospitals", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setHospitals(response.data);
        if (response.data.length > 0) {
          setSelectedHospital(response.data[0]);
        }
      } catch (error) {
        console.error("There was an error fetching the hospitals!", error);
      }
    };

    fetchHospitals();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hospitals/${selectedHospital.nrRegjistrimit}/departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("There was an error fetching the departments!", error);
    }
  };

  useEffect(() => {
    if (selectedHospital) {
      fetchDepartments();
    } else {
      setDepartments([]);
    }
  }, [selectedHospital]);

  //add
  const [formErrors, setFormErrors] = useState({});
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    emri: "",
    lokacioni: "",
    nrTel: "",
  });

  const validateForm = () => {
    const errors = {};
    if (!newDepartment.emri) errors.emri = "Department Name is required.";
    if (!newDepartment.lokacioni) errors.lokacioni = "Location is required.";
    if (!newDepartment.nrTel.trim()) {
      errors.nrTel = "Phone Number is required.";
    } else if (!newDepartment.nrTel.match(/^\d{5,15}$/)) {
      errors.nrTel = "Phone Number should have between 5 and 15 digits.";
    }
    return errors;
  };

  const handleAddDepartmentClick = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      handleAddDepartment();
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDepartment = async () => {
    const formData = {
      ...newDepartment,
      hospitalId: selectedHospital.nrRegjistrimit,
    };

    try {
      await axios.post("http://localhost:3001/departments", formData, axiosConfig, {});
      setShowAddDepartmentForm(false);
      setNewDepartment({
        emri: "",
        lokacioni: "",
        nrTel: "",
      });
      fetchDepartments();
    } catch (error) {
      console.error("There was an error adding the department!", error);
    }
  };

  //edit
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState({
    emri: "",
    lokacioni: "",
    nrTel: "",
  });

  const handleHospitalChange = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleEdit = (department) => {
    setEditingDepartmentId(department.departmentID);
    setEditedDepartment(department);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/departments/${editingDepartmentId}`,
        editedDepartment,
        axiosConfig,
        {}
      );
      setEditingDepartmentId(null);
      fetchDepartments();
    } catch (error) {
      console.error("There was an error saving the department!", error);
    }
  };

  //delete
  const handleDelete = async (departmentID) => {
    try {
      await axios.delete(`http://localhost:3001/departments/${departmentID}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      fetchDepartments();
    } catch (error) {
      console.error("There was an error deleting the department!", error);
    }
  };

  return {
    hospitals,
    departments,
    selectedHospital,
    newDepartment,
    showAddDepartmentForm,
    editingDepartmentId,
    editedDepartment,
    formErrors,
    setEditingDepartmentId,
    handleEditInputChange,
    handleEdit,
    handleSave,
    handleDelete,
    handleHospitalChange,
    handleAddDepartment,
    handleAddInputChange,
    setShowAddDepartmentForm,
    handleAddDepartmentClick,
  };
};
