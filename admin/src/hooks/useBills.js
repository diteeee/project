import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useBills = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageModal, setErrorMessageModal] = useState(null);

    const token = localStorage.getItem("token");

    //inserting a bill into database
    const [hospitals, setHospitals] = useState([]);

    const [bills, setBills] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [newBill, setNewBill] = useState({ sherbimi: [], data: '', totali: 0, hospitalNrRegjistrimit: '', patientNrPersonal: '' });
    const [billModal, setBillModal] = useState(false);
    const [newService, setNewService] = useState('');
    const [servicePrices, setServicePrices] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleBillModal = () => setBillModal(!billModal);

    useEffect(() => {
        const fetchServicePrices = async () => {
            try {
                const response = await fetch('http://localhost:3001/services');
                const data = await response.json();
                const prices = data.reduce((acc, service) => {
                    acc[service.emri] = service.cmimi;
                    return acc;
                }, {});
                setServicePrices(prices);
            } catch (error) {
                console.error('Error fetching service prices:', error);
            }
        };

        fetchServicePrices();
    }, []);

    const addService = () => {
        const servicePrice = servicePrices[newService];
        if (servicePrice) {
            setNewBill(prevState => ({
                ...prevState,
                sherbimi: [...prevState.sherbimi, { emri: newService, cmimi: servicePrice }],
                totali: prevState.totali + servicePrice,
            }));
        } else {
            console.error(`Price not found for service: ${newService}`);
        }
        setNewService('');
    };

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

    const fetchPatients = useCallback(async (hospitalId) => {
        try {
            const response = await fetch(`http://localhost:3001/hospitals/${hospitalId}/patients`,{
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

    const handleHospitalChange = async (selectedOption) => {
        setSelectedHospital(selectedOption);
        setSelectedPatient(null);
        setNewBill({ ...newBill, hospitalName: selectedOption.label, patientNrPersonal: '' });
        fetchPatients(selectedOption.value);
    };

    const handlePatientChange = (selectedOption) => {
        const selectedPatient = patients.find(p => p.nrPersonal === selectedOption.value);
        setSelectedPatient(selectedPatient);

        const fullName = `${selectedPatient.emri} ${selectedPatient.mbiemri}`;
        setNewBill({ ...newBill, patientName: fullName });
    };

    const handleDateChange = async (selectedOption) => {
        setSelectedDate(selectedOption);
        setNewBill({ ...newBill, data: selectedOption });
      };

    const fetchBills = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3001/bills", {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
            const data = await response.json();
            setBills(data);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchBills();
    }, [fetchBills]);

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setNewBill({ ...newBill, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
        const billWithDoctor = {
            ...newBill,
            patientNrPersonal: selectedPatient.nrPersonal,
            hospitalNrRegjistrimit: selectedHospital.value,
            patientName: `${selectedPatient.emri} ${selectedPatient.mbiemri}`,
            data: formattedDate,
        };
        try {
            const response = await fetch("http://localhost:3001/bills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(billWithDoctor),
            });

            if (response.ok) {
                toggleBillModal();
                setNewBill({ sherbimi: [], data: "", totali: "", hospitalNrRegjistrimit: "", patientNrPersonal: "" });
                fetchBills();
                setSelectedHospital(null);
                setSelectedPatient(null);
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessageModal(`Failed to insert bill: ${responseData.error}`);
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            } else {
                console.error("Failed to insert bill");
                setErrorMessageModal("Failed to insert bill: Unknown error occurred");
                setTimeout(() => {
                    setErrorMessageModal(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error inserting doctor:", error);
        }
    };

    //edit a bill
    const [editingBillId, setEditingBillId] = useState(null);
    const [editedBill, setEditedBill] = useState({
        sherbimi: "",
        data: "",
        totali: "",
    });

    //me tleju me editu faqja
    const handleEdit = (billID) => {
        const bill = bills.find(b => b.billID === billID);
        setEditedBill(bill);
        setEditingBillId(billID);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBill(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingBillId(null);
      };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/bills/${editingBillId}`, editedBill, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setEditingBillId(null);
                fetchBills();
                setSuccessMessage('Bill updated successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setErrorMessage('Failed to update bill');
                setEditingBillId(null);
            }
        } catch (error) {
            console.error('Error updating bill:', error);
            setErrorMessage('An error occurred while updating the bill');
            setEditingBillId(null);
        }
    };

    //delete a bill
    const handleDeleteBill = async (billID) => {
        try {
            await axios.delete(`http://localhost:3001/bills/${billID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBills(bills.filter(bill => bill.billID !== billID));
            setSuccessMessage('Bill deleted successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting bill:', error);
            setErrorMessage('An error occurred while deleting the bill');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    useEffect(() => {
        axios.get("http://localhost:3001/bills/")
            .then(response => {
                setBills(response.data);
            })
            .catch(error => {
                console.error('Error fetching bills:', error);
            });
    }, []);

    return {
        bills,
        patients,
        newBill,
        newService,
        servicePrices,
        billModal,
        editedBill,
        editingBillId,
        successMessage,
        errorMessage,
        errorMessageModal,
        selectedHospital,
        selectedPatient,
        selectedDate,
        hospitals,
        toggleBillModal,
        addService,
        setNewService,
        handleHospitalChange,
        handlePatientChange,
        handleDateChange,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteBill,
        setHospitals,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    };
};