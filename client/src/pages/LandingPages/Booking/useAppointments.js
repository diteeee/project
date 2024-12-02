import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "context/UserContext";
import axios from "axios";

export const useAppointments = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    preferredDate: "",
    preferredTime: "",
    hospital: "",
    hospitalName: "",
    department: "",
    departmentName: "",
    doctor: "",
    doctorName: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json", // Use 'application/json' if you're not uploading files
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  };

  useEffect(() => {
    if (!user) {
      navigate("/pages/authentication/sign-in");
    } else {
      setFormData({
        ...formData,
        emri: user.emri,
        mbiemri: user.mbiemri,
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/hospitals")
      .then((response) => setHospitals(response.data))
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  useEffect(() => {
    if (formData.preferredDate && formData.doctor) {
      fetchAvailableTimeSlots(formData.preferredDate, formData.doctor);
    }
  }, [formData.preferredDate, formData.doctor]);

  const handleHospitalChange = (e) => {
    const hospitalId = e.target.value;
    const hospital = hospitals.find((h) => h.nrRegjistrimit === hospitalId);
    setFormData({
      ...formData,
      hospital: hospitalId,
      hospitalName: hospital ? hospital.emri : "",
      departmentName: "",
      doctor: "",
      doctorName: "",
      preferredTime: "",
    });

    axios
      .get(`http://localhost:3001/hospitals/${hospitalId}/departments`)
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));
  };

  const handleDepartmentChange = (e) => {
    const departmentID = e.target.value;
    const department = departments.find((d) => d.departmentID === departmentID);
    setFormData({
      ...formData,
      department: departmentID,
      departmentName: department ? department.emri : "",
      doctorName: "",
      preferredTime: "",
    });

    axios
      .get(
        `http://localhost:3001/hospitals/${formData.hospital}/departments/${departmentID}/doctors`,
        axiosConfig
      )
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  const handleDoctorChange = (e) => {
    const doctorNrPersonal = e.target.value;
    const doctor = doctors.find((doc) => doc.nrPersonal === doctorNrPersonal);
    setFormData({
      ...formData,
      doctor: doctorNrPersonal,
      doctorName: doctor ? `${doctor.emri} ${doctor.mbiemri}` : "",
      preferredTime: "",
    });
    if (formData.preferredDate) {
      fetchAvailableTimeSlots(formData.preferredDate, doctorNrPersonal);
    }
  };

  const fetchAvailableTimeSlots = (date, doctorNrPersonal) => {
    axios
      .get("http://localhost:3001/appointments/availability", {
        params: { date, doctor: doctorNrPersonal },
      })
      .then((response) => {
        setAvailableTimeSlots(response.data.availableTimeSlots);
        setFormData((prevData) => ({ ...prevData, preferredTime: "" }));
      })
      .catch((error) => console.error("Error fetching time slots:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data before submitting:", formData); // Debugging line
    axios
      .post("http://localhost:3001/appointments", {
        data: formData.preferredDate,
        ora: formData.preferredTime,
        patientName: `${formData.emri} ${formData.mbiemri}`,
        doctorName: formData.doctorName,
        hospitalName: formData.hospitalName,
        departmentName: formData.departmentName,
      })
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        navigate("/dashboard");
      })
      .catch((error) => console.error("Error booking appointment:", error));
  };

  return {
    formData,
    hospitals,
    departments,
    doctors,
    availableTimeSlots,
    handleHospitalChange,
    handleDepartmentChange,
    handleDoctorChange,
    handleChange,
    handleSubmit,
  };
};
