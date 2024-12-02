import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';

export const useAppointments = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    const token = localStorage.getItem("token");

    //displaying appointments by date
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const [departments, setDepartments] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [activeHospitalTab, setActiveHospitalTab] = useState('0');
    const [activeDepartmentTab, setActiveDepartmentTab] = useState('0');

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
            setErrorMessage('An error occurred while fetching departments');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    }, [token]);

    const handleDepartmentSelect = async (department, tab) => {
        setSelectedDepartment(department);
        setActiveDepartmentTab(tab);
        setAppointments([]);
    
        try {
            const response = await axios.get(`http://localhost:3001/hospitals/${selectedHospital.nrRegjistrimit}/departments/${department.departmentID}/appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const filteredAppointments = response.data.filter(appointment => 
                moment(appointment.data).isSame(selectedDate, 'day') && 
                appointment.departmentID === department.departmentID
            );
            
            setAppointments(filteredAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setErrorMessage('An error occurred while fetching appointments');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };    

    const handleFetchAppointmentsByDate = useCallback(async (date, departmentID) => {
        try {
            const formattedDate = moment(date).tz('Europe/Tirane').format('YYYY-MM-DD');
            let url = `http://localhost:3001/appointments?date=${formattedDate}`;
            if (departmentID) {
                url += `&departmentID=${departmentID}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const sortedAppointments = response.data.sort((a, b) => {
                const dateA = moment.tz(`${a.data}T${a.ora}`, 'Europe/Tirane').toDate();
                const dateB = moment.tz(`${b.data}T${b.ora}`, 'Europe/Tirane').toDate();
                return dateA - dateB;
            });

            setAppointments(sortedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setErrorMessage('An error occurred while fetching appointments');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    }, [token]);

    const handleDateChange = (date) => {
        setDisplayedDate(date);
    };

    useEffect(() => {
        setSelectedDate(displayedDate);
    }, [displayedDate]);

    //inserting an appointment
    const [newAppointment, setNewAppointment] = useState({ data: '', ora: '', patientNrPersonal: '', doctorNrPersonal: '', departmentID: '' });
    const [appointmentModal, setAppointmentModal] = useState(false);
    const [patients, setPatients] = useState([]);
    const [departmentsModal,setDepartmentsModal] = useState([]);
    const [selectedHospitalModal, setSelectedHospitalModal] = useState(null);
    const [selectedDepartmentModal, setSelectedDepartmentModal] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDateForInsert, setSelectedDateForInsert] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const toggleAppointmentModal = () => setAppointmentModal(!appointmentModal);

    const fetchPatients = useCallback(async (hospitalId) => {
        try {
            const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/patients`, {
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

    const fetchDepartments = useCallback(async (hospitalId) => {
        try {
            const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/departments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setDepartmentsModal(data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    }, [token]);

    const fetchDoctors = useCallback(async (depID) => {
        try {
            const response = await fetch(`http://localhost:3001/departments/${depID}/doctors`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }, [token]);

    const handleHospitalChange = (selectedOption) => {
        setSelectedHospitalModal(selectedOption);
        fetchDepartments(selectedOption.value);
        fetchPatients(selectedOption.value);
        setNewAppointment({ ...newAppointment, hospitalName: selectedOption.label });
        setSelectedDepartmentModal(null);
        setSelectedPatient(null);
        setSelectedDoctor(null);
    };

    const handleDepartmentChange = (selectedOption) => {
        setSelectedDepartmentModal(selectedOption);
        fetchDoctors(selectedOption.value);
        setNewAppointment({ ...newAppointment, departmentName: selectedOption.label });
        setSelectedDoctor(null);
        setSelectedPatient(null);
    };

    const handlePatientChange = (selectedOption) => {
        const selectedPatient = patients.find(p => p.nrPersonal === selectedOption.value);
        setSelectedPatient(selectedPatient);

        const fullName = `${selectedPatient.emri} ${selectedPatient.mbiemri}`;

        setNewAppointment({ ...newAppointment, patientName: fullName });
    };

    const handleDoctorChange = async (selectedOption) => {
        const selectedDoctor = doctors.find(p => p.nrPersonal === selectedOption.value);
        setSelectedDoctor(selectedDoctor);

        const fullName = `${selectedDoctor.emri} ${selectedDoctor.mbiemri}`;

        setNewAppointment({ ...newAppointment, doctorName: fullName });
        setSelectedTime(null);
    };

    const handleDateToInsert = async (selectedOption) => {
        setSelectedDateForInsert(selectedOption);
        setSelectedTime(null);
        setNewAppointment({ ...newAppointment, data: selectedOption });
    };

    const handleTimeChange = (selectedOption) => {
        setSelectedTime(selectedOption);
        setNewAppointment({ ...newAppointment, ora: selectedOption.value });
    };

    const fetchAvailableTimeSlots = async (date, doctorId) => {
        try {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            const response = await fetch(`http://localhost:3001/appointments/availability?date=${formattedDate}&doctor=${doctorId}`);
            const data = await response.json();
            return data.availableTimeSlots;
        } catch (error) {
            console.error('Error fetching available time slots:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTimeSlots = async () => {
            if (selectedDateForInsert && selectedDoctor) {
                const slots = await fetchAvailableTimeSlots(selectedDateForInsert, selectedDoctor.nrPersonal);
                setAvailableTimeSlots(slots);
            }
        };
        fetchTimeSlots();
    }, [selectedDateForInsert, selectedDoctor]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointment = {
            ...newAppointment,
            data: moment(selectedDateForInsert).format('YYYY-MM-DD'),
            ora: selectedTime.value,
            departmentID: selectedDepartmentModal.departmentID,
            departmentName: selectedDepartmentModal.label,
            patientNrPersonal: selectedPatient.nrPersonal,
            patientName: `${selectedPatient.emri} ${selectedPatient.mbiemri}`,
            doctorNrPersonal: selectedDoctor.nrPersonal,
            doctorName: `${selectedDoctor.emri} ${selectedDoctor.mbiemri}`,
        };
        try {
            const response = await fetch("http://localhost:3001/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(appointment),
            });
            if (response.ok) {
                toggleAppointmentModal();
                handleFetchAppointmentsByDate(selectedDate, selectedDepartment.departmentID);
                setNewAppointment({ data: '', ora: '', patientNrPersonal: '', doctorNrPersonal: '', departmentID: '' });
                setSelectedHospitalModal(null);
                setSelectedDepartmentModal(null);
                setSelectedPatient(null);
                setSelectedDoctor(null);
                setSelectedTime(null);
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessageModal(`Failed to insert appointment: ${responseData.error}`);
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            } else {
                console.error("Failed to insert appointment");
                setErrorMessageModal("Failed to insert appointment: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting appointment:", error);
        }
    };

    //edit an appointment
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);
    const [editedAppointment, setEditedAppointment] = useState({
        data: "",
        ora: "",
    });

    //me tleju me editu faqja
    const handleEdit = (appointmentID) => {
        const appointment = appointments.find(app => app.appointmentID === appointmentID);
        setEditedAppointment(appointment);
        setEditingAppointmentId(appointmentID);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingAppointmentId(null);
      };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/appointments/${editingAppointmentId}`, editedAppointment, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                handleHospitalSelect(selectedHospital, activeHospitalTab);
                handleDepartmentSelect(selectedDepartment, activeDepartmentTab);
                setEditingAppointmentId(null);
                setSuccessMessage('Appointment updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setErrorMessage('Failed to update appointment');
                setEditingAppointmentId(null);
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            setErrorMessage('An error occurred while updating the appointment');
            setEditingAppointmentId(null);
        }
    };

    //delete an appointment
    const handleDeleteAppointment = async (appointmentID) => {
        try {
            await axios.delete(`http://localhost:3001/appointments/${appointmentID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(appointments.filter(appointment => appointment.appointmentID !== appointmentID));
            setSuccessMessage('Appointment deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting appointment:', error);
            setErrorMessage('An error occurred while deleting the appointment');
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

        handleFetchAppointmentsByDate(new Date());
    }, [handleHospitalSelect,handleFetchAppointmentsByDate]);

    useEffect(() => {
        if (departments.length > 0) {
            handleDepartmentSelect(departments[0], '0');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departments]);

    useEffect(() => {
        handleFetchAppointmentsByDate(selectedDate, selectedDepartment ? selectedDepartment.departmentID : null);
    }, [selectedDate, selectedDepartment, handleFetchAppointmentsByDate]);

    useEffect(() => {
        if (selectedDate && selectedDepartment) {
            handleFetchAppointmentsByDate(selectedDate, selectedDepartment.departmentID);
        }
    }, [selectedDate, selectedDepartment,handleFetchAppointmentsByDate]);

    return {
        appointments,
        hospitals,
        newAppointment,
        appointmentModal,
        selectedHospitalModal,
        selectedDepartmentModal,
        selectedDoctor,
        selectedPatient,
        editedAppointment,
        editingAppointmentId,
        departments,
        departmentsModal,
        patients,
        doctors,
        selectedDate,
        selectedDateForInsert,
        selectedTime,
        availableTimeSlots,
        selectedDepartment,
        selectedHospital,
        activeHospitalTab,
        activeDepartmentTab,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleAppointmentModal,
        handleTimeChange,
        handleFetchAppointmentsByDate,
        handleDateChange,
        handleHospitalSelect,
        handleDepartmentSelect,
        handleHospitalChange,
        handleDepartmentChange,
        handlePatientChange,
        handleDoctorChange,
        handleDateToInsert,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteAppointment,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    };
};