import { useState, useEffect } from "react";
import axios from "axios";

export const useDoctors = () => {
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  };

  //display doctors
  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hospitals", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return [];
    }
  };

  const fetchDepartments = async (hospitalId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hospitals/${hospitalId}/departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  };

  const fetchDoctors = async (departmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/departments/${departmentId}/doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  const initializeSpecializations = (department) => {
    let filteredSpecializations = [];
    if (department?.emri === "Emergjenca") {
      filteredSpecializations = ["Mjek i Pergjithshem", "Radiolog"];
    } else if (department?.emri === "Neurologjia") {
      filteredSpecializations = ["Neurolog", "Neurokirurg"];
    } else if (department.emri === "Kardiologjia") {
      filteredSpecializations = ["Kardiolog", "Kardiokirurg"];
    } else if (department.emri === "Pediatria") {
      filteredSpecializations = ["Pediater", "Psikolog Pediatrik", "Kirurg Pediater"];
    } else if (department.emri === "Psikiatria") {
      filteredSpecializations = ["Psikiater"];
    } else if (department.emri === "Pulmologjia") {
      filteredSpecializations = ["Pulmolog", "Pulmokirurg"];
    } else if (department.emri === "Gjinekologjia") {
      filteredSpecializations = ["Gjinekolog", "Neonatolog"];
    } else if (department.emri === "Dermatologjia") {
      filteredSpecializations = ["Dermatolog"];
    } else if (department.emri === "Otorinolaringologjia") {
      filteredSpecializations = ["Otorinolaringolog"];
    } else if (department.emri === "Interno") {
      filteredSpecializations = ["Internist Abdominal"];
    } else if (department.emri === "Oftalmologjia") {
      filteredSpecializations = ["Oftalmolog", "Oftalmokirurg"];
    } else if (department.emri === "Ortopedia") {
      filteredSpecializations = ["Ortoped", "Kirurg Ortoped"];
    } else if (department.emri === "Radiologjia") {
      filteredSpecializations = ["Radiologjia"];
    }
    setSpecializations(filteredSpecializations);
  };

  useEffect(() => {
    const getHospitals = async () => {
      const hospitalData = await fetchHospitals();
      setHospitals(hospitalData);
      if (hospitalData.length > 0) {
        const initialHospitalId = hospitalData[0].nrRegjistrimit;
        setSelectedHospital(initialHospitalId);

        const departmentData = await fetchDepartments(initialHospitalId);
        setDepartments(departmentData);
        if (departmentData.length > 0) {
          const initialDepartment = departmentData[0];
          setSelectedDepartment(initialDepartment.departmentID);
          initializeSpecializations(initialDepartment);
        }
      }
    };
    getHospitals();
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      const getDepartments = async () => {
        const departmentData = await fetchDepartments(selectedHospital);
        setDepartments(departmentData);
        if (departmentData.length > 0 && selectedDepartment === "") {
          const initialDepartment = departmentData[0];
          setSelectedDepartment(initialDepartment.departmentID);
          initializeSpecializations(initialDepartment);
        }
      };
      getDepartments();
    }
  }, [selectedHospital]);

  useEffect(() => {
    if (selectedDepartment) {
      fetchDoctors(selectedDepartment);
    }
  }, [selectedDepartment]);

  //add doctor
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [specializations, setSpecializations] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    emri: "",
    mbiemri: "",
    nrPersonal: "",
    adresa: "",
    nrTel: "",
    specializimi: "",
    email: "",
    password: "",
    hospitalName: "",
    departmentName: "",
    imageUrl: null,
  });

  const validateForm = () => {
    const errors = {};
    if (!newDoctor.emri.trim()) {
      errors.emri = "Name is required.";
    } else if (!newDoctor.emri.match(/^[A-Z][a-zA-Z\s]*$/)) {
      errors.emri = "Name must start with a capital letter and contain only letters.";
    }
    if (!newDoctor.mbiemri.trim()) {
      errors.mbiemri = "Surname is required.";
    } else if (!newDoctor.mbiemri.match(/^[A-Z][a-zA-Z\s]*$/)) {
      errors.mbiemri = "Surname must start with a capital letter and contain only letters.";
    }
    if (!newDoctor.nrPersonal.trim()) {
      errors.nrPersonal = "Personal ID is required.";
    } else if (!newDoctor.nrPersonal.match(/^\d{10}$/)) {
      errors.nrPersonal = "Personal ID should have exactly 10 digits.";
    }
    if (!newDoctor.nrTel.trim()) {
      errors.nrTel = "Phone Number is required.";
    } else if (!newDoctor.nrTel.match(/^\d{5,15}$/)) {
      errors.nrTel = "Phone Number should have between 5 and 15 digits.";
    }
    if (!newDoctor.adresa.trim()) {
      errors.adresa = "Address is required.";
    }
    if (!newDoctor.email.trim()) {
      errors.email = "Email is required.";
    } else if (!newDoctor.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!newDoctor.password.trim()) {
      errors.password = "Password is required.";
    } else if (!newDoctor.password.match(/^(?=.*\d)[A-Za-z\d]{8,16}$/)) {
      errors.password = "Password must be 8-16 characters long and include at least one number.";
    }
    if (!newDoctor.specializimi.trim()) {
      errors.specializimi = "Specialization is required.";
    }
    if (!newDoctor.imageUrl) {
      errors.imageUrl = "Image is required.";
    }
    return errors;
  };

  const handleAddDoctorClick = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      addDoctor();
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handleNewDoctorFileChange = (e) => {
    setNewDoctor((prev) => ({ ...prev, imageUrl: e.target.files[0] }));
  };

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (event, newValue) => {
    const selectedDept = newValue;
    setSelectedDepartment(selectedDept?.departmentID);
    setNewDoctor({ ...newDoctor, depID: selectedDept?.departmentID, specializimi: "" });
    initializeSpecializations(selectedDept);
  };

  const addDoctor = async () => {
    const formData = new FormData();
    formData.append("emri", newDoctor.emri);
    formData.append("mbiemri", newDoctor.mbiemri);
    formData.append("nrPersonal", newDoctor.nrPersonal);
    formData.append("adresa", newDoctor.adresa);
    formData.append("nrTel", newDoctor.nrTel);
    formData.append("specializimi", newDoctor.specializimi);
    formData.append(
      "hospitalName",
      hospitals.find((h) => h.nrRegjistrimit === selectedHospital)?.emri || ""
    );
    formData.append(
      "departmentName",
      departments.find((d) => d.departmentID === selectedDepartment)?.emri || ""
    );
    if (newDoctor.imageUrl) {
      formData.append("img", newDoctor.imageUrl);
    }
    formData.append("email", newDoctor.email);
    formData.append("password", newDoctor.password);

    try {
      await axios.post("http://localhost:3001/doctors", formData, axiosConfig, {});
      fetchDoctors(selectedDepartment);
      setNewDoctor({
        emri: "",
        mbiemri: "",
        nrPersonal: "",
        adresa: "",
        nrTel: "",
        specializimi: "",
        email: "",
        password: "",
        hospitalName: "",
        departmentName: "",
        imageUrl: null,
      });
      setShowAddDoctorForm(false);
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  //edit doctor
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editedDoctor, setEditedDoctor] = useState({});

  const handleEdit = (doctor) => {
    setEditingDoctorId(doctor.nrPersonal);
    setEditedDoctor({ ...doctor });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/doctors/${editedDoctor.nrPersonal}`,
        editedDoctor,
        axiosConfig,
        {}
      );
      fetchDoctors(selectedDepartment);
      setEditingDoctorId(null);
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handleCancel = () => {
    setEditingDoctorId(null);
  };

  //delete
  const handleDelete = async (nrPersonal) => {
    try {
      await axios.delete(`http://localhost:3001/doctors/${nrPersonal}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      fetchDoctors(selectedDepartment);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return {
    hospitals,
    departments,
    doctors,
    newDoctor,
    editedDoctor,
    editingDoctorId,
    selectedHospital,
    selectedDepartment,
    specializations,
    showAddDoctorForm,
    formErrors,
    setNewDoctor,
    setSelectedHospital,
    setSelectedDepartment,
    setShowAddDoctorForm,
    handleNewDoctorFileChange,
    handleNewDoctorInputChange,
    handleAddDoctorClick,
    handleDepartmentChange,
    addDoctor,
    handleEditInputChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleDelete,
  };
};
