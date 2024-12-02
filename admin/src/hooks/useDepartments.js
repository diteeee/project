import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useDepartments = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  //displaying departments in a hospital
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [activeHospitalTab, setActiveHospitalTab] = useState('0');
  
  const token = localStorage.getItem("token");
  
  //insert new department in database
  const [newDepartment, setNewDepartment] = useState({ emri: '', lokacioni: '', nrTel: '', hospitalId: '' });
  const [departmentModal, setDepartmentModal] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState({
    emri: "",
    lokacioni: "",
    nrTel: "",
  });

  const handleHospitalSelect = useCallback(async (hospital, tab) => {
    setSelectedHospital(hospital);
    setActiveHospitalTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }, [token]);

  const toggleDepartmentModal = () => setDepartmentModal(!departmentModal);

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewDepartment({ ...newDepartment, [name]: value });
    }
  };

  const handleHospitalChange = (selectedOption) => {
    setNewDepartment({ ...newDepartment, hospitalId: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const departmentWithHospital = { ...newDepartment };
    try {
      const response = await fetch("http://localhost:3001/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(departmentWithHospital),
      });
      if (response.ok) {
        toggleDepartmentModal();
        handleHospitalSelect(selectedHospital, activeHospitalTab);
        setNewDepartment({ emri: "", lokacioni: "", nrTel: "", hospitalId: "" });
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert department: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      } else {
        console.error("Failed to insert department");
        setErrorMessageModal("Failed to insert department: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting department:", error);
    }
  };

  const handleEdit = (departmentID) => {
    const department = departments.find(dept => dept.departmentID === departmentID);
    setEditedDepartment(department);
    setEditingDepartmentId(departmentID);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDepartment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingDepartmentId(null);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/departments/${editingDepartmentId}`,
        editedDepartment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        handleHospitalSelect(selectedHospital, activeHospitalTab);
        setEditingDepartmentId(null);
        setSuccessMessage('Department updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update department');
        setEditingDepartmentId(null);
      }
    } catch (error) {
      console.error('Error updating department:', error);
      setErrorMessage('An error occurred while updating the department');
      setEditingDepartmentId(null);
    }
  };

  const handleDeleteDepartment = async (departmentID) => {
    try {
      await axios.delete(`http://localhost:3001/departments/${departmentID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments(departments.filter(department => department.departmentID !== departmentID));
      setSuccessMessage('Department deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting department:', error);
      setErrorMessage('An error occurred while deleting the department');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/hospitals/")
      .then(response => {
        setHospitals(response.data);
        if (response.data.length > 0) {
          handleHospitalSelect(response.data[0], "0");
        }
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
      });
  }, [handleHospitalSelect]);

  const hospitalOptions = hospitals.map(hospital => ({
    value: hospital.nrRegjistrimit,
    label: hospital.emri
  }));

  return {
    hospitals,
    departments,
    newDepartment,
    departmentModal,
    editedDepartment,
    editingDepartmentId,
    successMessage,
    errorMessage,
    errorMessageModal,
    hospitalOptions,
    activeHospitalTab,
    selectedHospital,
    setHospitals,
    toggleDepartmentModal,
    handleHospitalSelect,
    handleChange,
    handleHospitalChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    handleDeleteDepartment,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
    setActiveHospitalTab,
  };
};