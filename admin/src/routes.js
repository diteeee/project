import Dashboard from "views/Dashboard.js";
import HospitalData from "views/HospitalData";
import DepartmentData from "views/DepartmentData";
import DoctorData from "views/DoctorData";
import PatientData from "views/PatientData";
import BillData from "views/BillData";
import StaffData from "views/StaffData";
import AppointmentData from "views/AppointmentData";
import RoomData from "views/RoomData";
import PrescriptionData from "views/PrescriptionData";
import AdministratorData from "views/AdministratorData";
import LecturerData from "views/LecturerData"
import LectureData from "views/LectureData"
import TeamData from "views/TeamData"
import PlayerData from "views/PlayerData"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/hospitals",
    name: "Hospitals",
    component: <HospitalData />,
    layout: "/admin",
  },
  {
    path: "/teams",
    name: "Teams",
    component: <TeamData />,
    layout: "/admin",
  },
  {
    path: "/players",
    name: "Players",
    component: <PlayerData />,
    layout: "/admin",
  },
  {
    path: "/lecturers",
    name: "Lecturers",
    component: <LecturerData />,
    layout: "/admin",
  },
  {
    path: "/lectures",
    name: "Lectures",
    component: <LectureData />,
    layout: "/admin",
  },
  {
    path: "/departments",
    name: "Departments",
    component: <DepartmentData />,
    layout: "/admin",
  },
  {
    path: "/doctors",
    name: "Doctors",
    component: <DoctorData />,
    layout: "/admin",
  },
  {
    path: "/patients",
    name: "Patients",
    component: <PatientData />,
    layout: "/admin",
  },
  {
    path: "/staff",
    name: "Staff",
    component: <StaffData />,
    layout: "/admin",
  },
  {
    path: "/administrators",
    name: "Administrators",
    component: <AdministratorData />,
    layout: "/admin",
  },
  {
    path: "/bills",
    name: "Bills",
    component: <BillData />,
    layout: "/admin",
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: <AppointmentData />,
    layout: "/admin",
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: <RoomData />,
    layout: "/admin",
  },
  {
    path: "/prescriptions",
    name: "Prescriptions",
    component: <PrescriptionData />,
    layout: "/admin",
  },
];
export default routes;
