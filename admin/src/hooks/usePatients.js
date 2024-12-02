import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const usePatients = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    //displaying patients in a hospital
    const [patients, setPatients] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [activeHospitalTab, setActiveHospitalTab] = useState('0');

    const token = localStorage.getItem("token");

    const handleHospitalSelect = useCallback(async (hospital, tab) => {
        setSelectedHospital(hospital);
        setActiveHospitalTab(tab);
        try {
            const response = await axios.get(`http://localhost:3001/hospitals/${hospital.nrRegjistrimit}/patients`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }, [token]);

    //insert a patient into database
    const [newPatient, setNewPatient] = useState({ emri: '', mbriemri: '', nrPersonal: '', datelindja: '', gjinia: '', adresa: '', nrTel: '', email: '', password: '', hospitalId: '' });
    const [patientModal, setPatientModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const togglePatientModal = () => setPatientModal(!patientModal);

    const fetchPatients = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3001/patients", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    const handleHospitalChange = (selectedOption) => {
        setNewPatient({ ...newPatient, hospitalId: selectedOption.value });
    };

    const handleDateChange = async (selectedOption) => {
        setSelectedDate(selectedOption);
        setNewPatient({ ...newPatient, datelindja: selectedOption });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
        const patientWithHospital = { ...newPatient, datelindja: formattedDate };
        try {
            const response = await fetch("http://localhost:3001/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(patientWithHospital),
            });
            if (response.ok) {
                togglePatientModal();
                handleHospitalSelect(selectedHospital, activeHospitalTab);
                setNewPatient({ emri: "", mbriemri: "", nrPersonal: "", datelindja: "", gjinia: "", adresa: "", nrTel: "", email: '', password: '', hospitalId: "" });
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessageModal(`Failed to insert patient: ${responseData.error}`);
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            } else {
                console.error("Failed to insert patient");
                setErrorMessageModal("Failed to insert patient: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting patient:", error);
        }
    };

    //edit a patient
    const [editingPatientId, setEditingPatientId] = useState(null);
    const [editedPatient, setEditedPatient] = useState({
        emri: "",
        mbiemri: "",
        datelindja: "",
        gjinia: "",
        adresa: "",
        nrTel: "",
        email: "",
        password: ""
    });

    //me tleju me editu faqja
    const handleEdit = (nrPersonal) => {
        const patient = patients.find(pat => pat.nrPersonal === nrPersonal);
        setEditedPatient(patient);
        setEditingPatientId(nrPersonal);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingPatientId(null);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/patients/${editingPatientId}`, editedPatient, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                handleHospitalSelect(selectedHospital, activeHospitalTab);
                setEditingPatientId(null);
                setSuccessMessage('Patient updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                const errorMessage = response.data.error || 'Failed to update patient: Unknown error occurred';
                setErrorMessage(errorMessage);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
                setEditingPatientId(null);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(`Failed to update patient: ${error.response.data.error}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            } else {
                setErrorMessage('An error occurred while updating the patient');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            }
            setEditingPatientId(null);
        }
    };


    //delete a patient
    const handleDeletePatient = async (nrPersonal) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${nrPersonal}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPatients(patients.filter(patient => patient.nrPersonal !== nrPersonal));
            setSuccessMessage('Patient deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting patient:', error);
            setErrorMessage('An error occurred while deleting the patient');
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
        patients,
        newPatient,
        patientModal,
        editedPatient,
        editingPatientId,
        selectedHospital,
        selectedDate,
        activeHospitalTab,
        hospitalOptions,
        successMessage,
        errorMessage,
        errorMessageModal,
        handleHospitalSelect,
        handleDateChange,
        handleChange,
        handleHospitalChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        togglePatientModal,
        handleDeletePatient,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    };
};