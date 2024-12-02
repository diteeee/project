import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useDoctors = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageModal, setErrorMessageModal] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const [doctors, setDoctors] = useState([]);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospital.nrRegjistrimit}/departments/${department.departmentID}/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  //insert a doctor in database
  const [newDoctor, setNewDoctor] = useState({ emri: '', mbiemri: '', nrPersonal: '', adresa: '', nrTel: '', specializimi: '', depID: '', email: '', password: '', imageUrl: '' });
  const [selectedHospitalModal, setSelectedHospitalModal] = useState(null);
  const [selectedDepartmentModal, setSelectedDepartmentModal] = useState(null);
  const [doctorModal, setDoctorModal] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [modalDepartments, setModalDepartments] = useState([]);
  const [selectedImageName, setSelectedImageName] = useState('');

  const toggleDoctorModal = () => setDoctorModal(!doctorModal);

  const handleHospitalChange = async (selectedOption) => {
    setSelectedHospitalModal(selectedOption);
    setSelectedDepartmentModal(null);
    setNewDoctor({ ...newDoctor, hospitalName: selectedOption.label, depID: '', specializimi: '' });
    setSpecializations([]);
    try {
      const response = await axios.get(`http://localhost:3001/hospitals/${selectedOption.value}/departments`);
      setModalDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDepartmentChange = (selectedOption) => {
    const selectedDept = modalDepartments.find(d => d.departmentID === selectedOption.value);
    setSelectedDepartmentModal(selectedDept);
    setNewDoctor({ ...newDoctor, depID: selectedOption.value, specializimi: '' });

    let filteredSpecializations = [];
    if (selectedDept.emri === "Emergjenca") {
      filteredSpecializations = ["Mjek i Pergjithshem", "Radiolog"];
    } else if (selectedDept.emri === "Neurologjia") {
      filteredSpecializations = ["Neurolog", "Neurokirurg"];
    } else if (selectedDept.emri === "Kardiologjia") {
      filteredSpecializations = ["Kardiolog", "Kardiokirurg"];
    } else if (selectedDept.emri === "Pediatria") {
      filteredSpecializations = ["Pediater", "Psikolog Pediatrik", "Kirurg Pediater"];
    } else if (selectedDept.emri === "Psikiatria") {
      filteredSpecializations = ["Psikiater"];
    } else if (selectedDept.emri === "Pulmologjia") {
      filteredSpecializations = ["Pulmolog", "Pulmokirurg"];
    } else if (selectedDept.emri === "Gjinekologjia") {
      filteredSpecializations = ["Gjinekolog", "Neonatolog"];
    } else if (selectedDept.emri === "Dermatologjia") {
      filteredSpecializations = ["Dermatolog"];
    } else if (selectedDept.emri === "Otorinolaringologjia") {
      filteredSpecializations = ["Otorinolaringolog"];
    } else if (selectedDept.emri === "Interno") {
      filteredSpecializations = ["Internist Abdominal"];
    } else if (selectedDept.emri === "Oftalmologjia") {
      filteredSpecializations = ["Oftalmolog", "Oftalmokirurg"];
    } else if (selectedDept.emri === "Ortopedia") {
      filteredSpecializations = ["Ortoped", "Kirurg Ortoped"];
    } else if (selectedDept.emri === "Radiologjia") {
      filteredSpecializations = ["Radiologjia"];
    }
    setSpecializations(filteredSpecializations);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewDoctor(prev => ({ ...prev, img: e.target.files[0] }));
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

  const [imageSelected, setImageSelected] = useState(!!selectedImageName);

  const handleFileSelection = (event) => {
      handleFileChange(event);
      setImageSelected(event.target.files.length > 0);
  };

  const onSubmit = (event) => {
      event.preventDefault();
      if (!imageSelected) {
          setErrorMessageModal('Please select an image.');
          return;
      }
      handleSubmit(event);
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append('emri', newDoctor.emri);
    formData.append('mbiemri', newDoctor.mbiemri);
    formData.append('nrPersonal', newDoctor.nrPersonal);
    formData.append('adresa', newDoctor.adresa);
    formData.append('nrTel', newDoctor.nrTel);
    formData.append('specializimi', newDoctor.specializimi);
    formData.append('email', newDoctor.email);
    formData.append('password', newDoctor.password);
    formData.append('hospitalName', selectedHospitalModal.label);
    formData.append('departmentName', modalDepartments.find(d => d.departmentID === newDoctor.depID)?.emri);
  
    if (newDoctor.img) {
      formData.append('img', newDoctor.img);
    }
  
    try {
      const response = await fetch("http://localhost:3001/doctors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        toggleDoctorModal();
        handleDepartmentSelect(selectedDepartment, activeDepartmentTab);
        setNewDoctor({ emri: "", mbiemri: "", nrPersonal: "", adresa: "", nrTel: "", specializimi: "", depID: "", imageUrl: "", email: "", password: "" });
        setSelectedHospitalModal(null);
        setSelectedDepartmentModal(null);
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessageModal(`Failed to insert doctor: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      } else {
        setErrorMessageModal("Failed to insert doctor: Unknown error occurred");
        setTimeout(() => {
          setErrorMessageModal(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting doctor:", error);
      setErrorMessageModal("Error inserting doctor");
      setTimeout(() => {
        setErrorMessageModal(null);
      }, 3000);
    }
  };  

  //edit a doctor
  const [selectedEditFile, setSelectedEditFile] = useState(null);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editedDoctor, setEditedDoctor] = useState({
    emri: "",
    mbiemri: "",
    adresa: "",
    nrTel: "",
    specializimi: "",
    imageUrl: "",
    email: "",
    password: "",
  });

  //me tleju me editu faqja
  const handleEdit = (nrPersonal) => {
    const doctor = doctors.find(doc => doc.nrPersonal === nrPersonal);
    setEditedDoctor(doctor);
    setEditingDoctorId(nrPersonal);
  };

  const handleEditFileChange = (e) => {
    setSelectedEditFile(e.target.files[0]);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingDoctorId(null);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('emri', editedDoctor.emri);
    formData.append('mbiemri', editedDoctor.mbiemri);
    formData.append('adresa', editedDoctor.adresa);
    formData.append('nrTel', editedDoctor.nrTel);
    formData.append('specializimi', editedDoctor.specializimi);
    formData.append('email', editedDoctor.email);
    formData.append('password', editedDoctor.password);
    
    if (selectedEditFile) {
      formData.append('img', selectedEditFile);
      console.log("File appended:", selectedEditFile);
    }
  
    try {
      const response = await axios.put(`http://localhost:3001/doctors/${editingDoctorId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        handleHospitalSelect(selectedHospital, activeHospitalTab);
        handleDepartmentSelect(selectedDepartment, activeDepartmentTab);
        setEditingDoctorId(null);
        setSelectedEditFile(null);
        setSuccessMessage('Doctor updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        const errorMessage = response.data.error || 'Failed to update doctor: Unknown error occurred';
        setErrorMessage(errorMessage);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setEditingDoctorId(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(`Failed to update doctor: ${error.response.data.error}`);
      } else {
        setErrorMessage('An error occurred while updating the doctor');
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      setEditingDoctorId(null);
    }
  };  

  //delete a doctor
  const handleDeleteDoctor = async (nrPersonal) => {
    try {
      await axios.delete(`http://localhost:3001/doctors/${nrPersonal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(doctors.filter(doctor => doctor.nrPersonal !== nrPersonal));
      setSuccessMessage('Doctor deleted successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setErrorMessage('An error occurred while deleting the doctor');
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
    doctors,
    newDoctor,
    doctorModal,
    specializations,
    editedDoctor,
    editingDoctorId,
    departments,
    selectedHospital,
    selectedDepartment,
    selectedImageName,
    selectedEditFile,
    activeHospitalTab,
    activeDepartmentTab,
    successMessage,
    errorMessage,
    errorMessageModal,
    selectedHospitalModal,
    selectedDepartmentModal,
    modalDepartments,
    toggleDoctorModal,
    setNewDoctor,
    handleHospitalSelect,
    handleDepartmentSelect,
    handleChange,
    handleHospitalChange,
    handleDepartmentChange,
    handleFileSelection,
    onSubmit,
    handleEdit,
    handleEditInputChange,
    handleEditFileChange,
    handleCancelEdit,
    handleSave,
    handleDeleteDoctor,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
  };
};