import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const navigate = useNavigate();
  const [newPatient, setNewPatient] = useState({
    emri: "",
    mbiemri: "",
    nrPersonal: "",
    datelindja: "",
    gjinia: "",
    adresa: "",
    nrTel: "",
    email: "",
    password: "",
    hospitalId: "",
  });

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setNewPatient({ ...newPatient, [name]: value });
    }
  };

  const handleHospitalChange = (selectedOption) => {
    setNewPatient({ ...newPatient, hospitalId: selectedOption.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!newPatient.emri.match(/^[A-Z][a-zA-Z\s]*$/))
      errors.emri = "Name must start with a capital letter and contain only letters.";
    if (!newPatient.mbiemri.match(/^[A-Z][a-zA-Z\s]*$/))
      errors.mbiemri = "Surname must start with a capital letter and contain only letters.";
    if (!newPatient.nrPersonal.match(/^\d{10}$/))
      errors.nrPersonal = "Personal ID should have exactly 10 digits.";
    if (!newPatient.nrTel.match(/^\d{5,15}$/))
      errors.nrTel = "Phone Number should have between 5 and 15 digits.";
    if (!newPatient.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = "Please enter a valid email address.";
    if (!newPatient.password.match(/^(?=.*\d)[A-Za-z\d]{8,16}$/))
      errors.password = "Password must be 8-16 characters long and include at least one number.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setErrorMessage(null);
    const patientWithHospital = { ...newPatient };
    try {
      const response = await fetch("http://localhost:3001/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientWithHospital),
      });
      if (response.ok) {
        setSuccessMessage("Patient registered successfully!");
        setNewPatient({
          emri: "",
          mbiemri: "",
          nrPersonal: "",
          datelindja: "",
          gjinia: "",
          adresa: "",
          nrTel: "",
          email: "",
          password: "",
          hospitalId: "",
        });
        navigate("/dashboard");
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMessage(`Failed to insert patient: ${responseData.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        setErrorMessage("Failed to insert patient: Unknown error occurred");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error inserting patient:", error);
    }
  };

  const resetForm = useCallback(() => {
    setNewPatient({
      emri: "",
      mbiemri: "",
      nrPersonal: "",
      datelindja: "",
      gjinia: "",
      adresa: "",
      nrTel: "",
      email: "",
      password: "",
      hospitalId: "",
    });
    setFormErrors({});
    setErrorMessage("");
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch("http://localhost:3001/hospitals");
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const hospitalOptions = hospitals.map((hospital) => ({
    value: hospital.nrRegjistrimit,
    label: hospital.emri,
  }));

  return {
    hospitals,
    patients,
    newPatient,
    selectedHospital,
    hospitalOptions,
    successMessage,
    errorMessage,
    formErrors,
    resetForm,
    setPatients,
    setSelectedHospital,
    handleChange,
    handleHospitalChange,
    handleSubmit,
    setSuccessMessage,
    setErrorMessage,
  };
};
