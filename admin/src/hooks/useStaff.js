import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useStaff = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  //displaying staff in a department in a hospital
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [activeHospitalTab, setActiveHospitalTab] = useState('0');
  const [activeDepartmentTab, setActiveDepartmentTab] = useState('0');

  const token = localStorage.getItem("token");

  const handleHospitalSelect = useCallback(async (hospital, tab) => {
    setSelectedHospital(hospital);
    setActiveHospitalTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/departments`, {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }, [token]);

  const handleDepartmentSelect = async (department, tab) => {
    setSelectedDepartment(department);
    setActiveDepartmentTab(tab);
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospital.nrRegjistrimit}/departments/${department.departmentID}/staffs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  //insert a new staff member into database
  const [newStaff, setNewStaff] = useState({ emri: '', mbiemri: '', nrPersonal: '', pozita: '', adresa: '', nrTel: '', depID: '', dhoma: '' });
  const [selectedHospitalModal, setSelectedHospitalModal] = useState(null);
  const [selectedDepartmentModal, setSelectedDepartmentModal] = useState(null);
  const [staffModal, setStaffModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalDepartments, setModalDepartments] = useState([]);

  const toggleStaffModal = () => setStaffModal(!staffModal);

  const fetchRooms = useCallback(async (departmentId) => {
    try {
      const response = await fetch(`http://localhost:3001/departments/${departmentId}/rooms`, {
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

  const handleHospitalChange = async (selectedOption) => {
    setSelectedHospitalModal(selectedOption);
    setSelectedDepartmentModal(null);
    setSelectedRoom(null);
    setNewStaff({ ...newStaff, hospitalName: selectedOption.label });
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedOption.value}/departments`);
      setModalDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDepartmentChange = (selectedOption) => {
    setSelectedDepartmentModal(selectedOption);
    setNewStaff({ ...newStaff, departmentName: selectedOption.label });
    fetchRooms(selectedOption.value);
    setSelectedRoom(null);
  };

  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    setNewStaff({ ...newStaff, dhomaNumri: selectedOption.label });
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewStaff({ ...newStaff, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const staffWithDepartment = {
      ...newStaff,
      depID: selectedDepartmentModal.depID,
      dhoma: selectedRoom.roomID,
      departmentName: selectedDepartmentModal.label,
      dhomaNumri: selectedRoom.label,
    };
    try {
      const response = await fetch("http://localhost:3001/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(staffWithDepartment),
      });
      if (response.ok) {
        toggleStaffModal();
        handleDepartmentSelect(selectedDepartment, activeDepartmentTab);
        setNewStaff({ emri: "", mbiemri: "", nrPersonal: "", pozita: "", adresa: "", nrTel: "", depID: "", dhoma: '' });
        setSelectedHospitalModal(null);
        setSelectedDepartmentModal(null);
        setSelectedRoom(null);
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert staff member: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      } else {
        console.error("Failed to insert staff member");
        setErrorMessageModal("Failed to insert staff member: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting staff member:", error);
    }
  };

  //edit a staff member
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editedStaff, setEditedStaff] = useState({
    emri: "",
    mbiemri: "",
    pozita: "",
    adresa: "",
    nrTel: ""
  });

  //me tleju me editu faqja
  const handleEdit = (nrPersonal) => {
    const staffEdit = staff.find(staff => staff.nrPersonal === nrPersonal);
    setEditedStaff(staffEdit);
    setEditingStaffId(nrPersonal);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStaff(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingStaffId(null);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/staff/${editingStaffId}`, editedStaff, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        handleHospitalSelect(selectedHospital, activeHospitalTab);
        handleDepartmentSelect(selectedDepartment, activeDepartmentTab);
        setEditingStaffId(null);
        setSuccessMessage('Staff updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Failed to update staff member');
        setEditingStaffId(null);
      }
    } catch (error) {
      console.error('Error updating staff member:', error);
      setErrorMessage('An error occurred while updating the staff member');
      setEditingStaffId(null);
    }
  };

  //delete a staff member
  const handleDeleteStaff = async (nrPersonal) => {
    try {
      await axios.delete(`http://localhost:3001/staff/${nrPersonal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaff(staff.filter(staff => staff.nrPersonal !== nrPersonal));
      setSuccessMessage('Staff member deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting staff member:', error);
      setErrorMessage('An error occurred while deleting the staff member');
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

  useEffect(() => {
    if (departments.length > 0) {
      handleDepartmentSelect(departments[0], "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departments]);

  return {
    hospitals,
    staff,
    newStaff,
    staffModal,
    editedStaff,
    editingStaffId,
    departments,
    rooms,
    selectedDepartmentModal,
    selectedHospitalModal,
    selectedRoom,
    modalDepartments,
    selectedHospital,
    selectedDepartment,
    activeHospitalTab,
    activeDepartmentTab,
    successMessage,
    errorMessage,
    errorMessageModal,
    toggleStaffModal,
    setNewStaff,
    handleHospitalSelect,
    handleDepartmentSelect,
    handleChange,
    handleHospitalChange,
    handleDepartmentChange,
    handleRoomChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    handleDeleteStaff,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
  };
};