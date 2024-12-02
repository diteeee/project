import React from 'react';
import {
    Table, Button, Input, Alert, Card as MuiCard, Card, CardBody, CardHeader, CardTitle, Row, Col, Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentDrawer from './AppointmentDrawer';

const AppointmentList = () => {
    const {
        appointments,
        hospitals,
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
    } = useAppointments();

    return (
        <>
            <Alert color="success" isOpen={!!successMessage} toggle={() => setSuccessMessage('')}>
                {successMessage}
            </Alert>
            <Alert color="danger" isOpen={!!errorMessage} toggle={() => setErrorMessage('')}>
                {errorMessage}
            </Alert>

            {/* Mobile View */}
            <div className="mobile-view">
                <Nav tabs>
                    {hospitals.map((hospital, index) => (
                        <NavItem key={hospital.nrRegjistrimit}>
                            <NavLink
                                style={{ color: 'white' }}
                                className={classnames({ active: activeHospitalTab === `${index}` })}
                                onClick={() => handleHospitalSelect(hospital, `${index}`)}
                            >
                                {hospital.emri}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={activeHospitalTab}>
                    <TabPane tabId={activeHospitalTab}>
                        <Nav tabs>
                            {departments.map((department, index) => (
                                <NavItem key={department.departmentID}>
                                    <NavLink
                                        style={{ color: 'white' }}
                                        className={classnames({ active: activeDepartmentTab === `${index}` })}
                                        onClick={() => handleDepartmentSelect(department, `${index}`)}
                                    >
                                        {department.emri}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                        <TabContent activeTab={activeDepartmentTab}>
                            <TabPane tabId={activeDepartmentTab}>
                                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        onClick={toggleAppointmentModal}
                                    >
                                        Add Appointment
                                    </Button>
                                </div>
                                <Grid container spacing={3}>
                                    {appointments.map(appointment => (
                                        <Grid item xs={12} sm={6} md={4} key={appointment.appointmentID}>
                                            <MuiCard>
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Date: {editingAppointmentId === appointment.appointmentID ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="data"
                                                                value={editedAppointment.data}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            appointment.data
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Time: {editingAppointmentId === appointment.appointmentID ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="ora"
                                                                value={editedAppointment.ora}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            appointment.ora
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Patient Name: {appointment.Patient.emri} {appointment.Patient.mbiemri}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Doctor Name: {appointment.Doctor.emri} {appointment.Doctor.mbiemri}
                                                    </Typography>
                                                    <div style={{ marginTop: '10px' }}>
                                                        {editingAppointmentId === appointment.appointmentID ? (
                                                            <>
                                                                <IconButton color="primary" onClick={handleSave}>
                                                                    <SaveIcon />
                                                                </IconButton>
                                                                <IconButton color="secondary" onClick={handleCancelEdit}>
                                                                    <CancelIcon />
                                                                </IconButton>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IconButton color="info" onClick={() => handleEdit(appointment.appointmentID)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton color="error" onClick={() => handleDeleteAppointment(appointment.appointmentID)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </MuiCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPane>
                        </TabContent>
                    </TabPane>
                </TabContent>
            </div>
            <div className="desktop-view">
                <Nav tabs>
                    {hospitals.map((hospital, index) => (
                        <NavItem key={hospital.nrRegjistrimit}>
                            <NavLink
                                style={{ color: 'white' }}
                                className={classnames({ active: activeHospitalTab === `${index}` })}
                                onClick={() => handleHospitalSelect(hospital, `${index}`)}
                            >
                                {hospital.emri}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={activeHospitalTab}>
                    <TabPane tabId={activeHospitalTab}>
                        <Nav tabs>
                            {departments.map((department, index) => (
                                <NavItem key={department.departmentID}>
                                    <NavLink
                                        style={{ color: 'white' }}
                                        className={classnames({ active: activeDepartmentTab === `${index}` })}
                                        onClick={() => handleDepartmentSelect(department, `${index}`)}
                                    >
                                        {department.emri}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                        <TabContent activeTab={activeDepartmentTab}>
                            <TabPane tabId={activeDepartmentTab}>
                                <Row>
                                    <Col xs="12">
                                        {selectedHospital && selectedDepartment && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle tag="h5">Select Date for Appointments</CardTitle>
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={handleDateChange}
                                                        dateFormat="yyyy-MM-dd"
                                                        className="form-control"
                                                    />
                                                </CardHeader>
                                                <CardBody>
                                                    <CardTitle tag="h4">Appointments On Selected Date</CardTitle>
                                                    <Table className="tablesorter">
                                                        <thead className="text-primary">
                                                            <tr>
                                                                <th>Appointment ID</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                                <th>Patient Name</th>
                                                                <th>Doctor Name</th>
                                                                <th></th>
                                                                <th>
                                                                    <Button onClick={toggleAppointmentModal}>Add Appointment</Button>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {appointments.map((appointment) => (
                                                                <tr key={appointment.appointmentID}>
                                                                    <td>{appointment.appointmentID}</td>
                                                                    <td>
                                                                        {editingAppointmentId === appointment.appointmentID ? (
                                                                            <Input
                                                                                type="text"
                                                                                name="data"
                                                                                value={editedAppointment.data}
                                                                                onChange={handleEditInputChange}
                                                                            />
                                                                        ) : (
                                                                            appointment.data
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {editingAppointmentId === appointment.appointmentID ? (
                                                                            <Input
                                                                                type="text"
                                                                                name="ora"
                                                                                value={editedAppointment.ora}
                                                                                onChange={handleEditInputChange}
                                                                            />
                                                                        ) : (
                                                                            appointment.ora
                                                                        )}
                                                                    </td>
                                                                    <td>{appointment.Patient.emri} {appointment.Patient.mbiemri}</td>
                                                                    <td>{appointment.Doctor.emri} {appointment.Doctor.mbiemri}</td>
                                                                    <td>
                                                                        {editingAppointmentId === appointment.appointmentID ? (
                                                                            <Button color="success" onClick={handleSave}>Save</Button>
                                                                        ) : (
                                                                            <Button color="info" onClick={() => handleEdit(appointment.appointmentID)}>Edit</Button>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {editingAppointmentId === appointment.appointmentID ? (
                                                                            <>
                                                                                <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                                            </>
                                                                        ) : (
                                                                            <Button color="danger" onClick={() => handleDeleteAppointment(appointment.appointmentID)}>Delete</Button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                    <AppointmentDrawer
                                                        isOpen={appointmentModal}
                                                        toggle={toggleAppointmentModal}
                                                        handleSubmit={handleSubmit}
                                                        handleHospitalChange={handleHospitalChange}
                                                        handleDepartmentChange={handleDepartmentChange}
                                                        handleDoctorChange={handleDoctorChange}
                                                        handlePatientChange={handlePatientChange}
                                                        handleDateToInsert={handleDateToInsert}
                                                        handleTimeChange={handleTimeChange}
                                                        errorMessageModal={errorMessageModal}
                                                        setErrorMessageModal={setErrorMessageModal}
                                                        hospitals={hospitals}
                                                        departments={departmentsModal}
                                                        doctors={doctors}
                                                        patients={patients}
                                                        availableTimeSlots={availableTimeSlots}
                                                        selectedHospital={selectedHospitalModal}
                                                        selectedDepartment={selectedDepartmentModal}
                                                        selectedDoctor={selectedDoctor}
                                                        selectedPatient={selectedPatient}
                                                        selectedTime={selectedTime}
                                                        selectedDateForInsert={selectedDateForInsert}
                                                    />
                                                </CardBody>
                                            </Card>
                                        )}
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </TabPane>
                </TabContent>
            </div>
        </>
    );
};

export default AppointmentList;