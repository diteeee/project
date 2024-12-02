import React from 'react';
import { Drawer, Button, Alert, IconButton, Box, Typography, InputLabel, FormGroup, Input, Grid } from '@mui/material';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloseIcon from '@mui/icons-material/Close';
import 'assets/css/custom-datepicker.css';

const PrescriptionDrawer = ({
    isOpen,
    toggle,
    newPrescription,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    handleDoctorChange,
    handlePatientChange,
    handleDateChange,
    handleChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    doctors,
    patients,
    selectedHospital,
    selectedDepartment,
    selectedDoctor,
    selectedPatient,
    selectedDate,
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <Box p={3} width={400}>
            <Typography variant="h6" gutterBottom>
                Add Prescription
            </Typography>
            <IconButton edge="end" color="inherit" onClick={toggle}>
                <CloseIcon />
            </IconButton>
            <Alert
                severity="info"
                open={!!errorMessageModal}
                onClose={() => setErrorMessageModal('')}
            >
                {errorMessageModal}
            </Alert>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormGroup>
                            <DatePicker
                                className="custom-datepicker"
                                placeholderText="Select Date"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel for="diagnoza">Diagnoza</InputLabel>
                            <Input
                                type="text"
                                name="diagnoza"
                                id="diagnoza"
                                placeholder="Diagnosis"
                                value={newPrescription.diagnoza}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel for="ilace">Ilace</InputLabel>
                            <Input
                                type="text"
                                name="ilace"
                                id="ilace"
                                placeholder="Medication"
                                value={newPrescription.ilace}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel for="udhezimi">Udhezimi</InputLabel>
                            <Input
                                type="text"
                                name="udhezimi"
                                id="udhezimi"
                                placeholder="Instruction"
                                value={newPrescription.udhezimi}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel for="hospital">Hospital</InputLabel>
                            <Select
                                options={hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Hospital"
                                value={selectedHospital}
                                onChange={handleHospitalChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel for="department">Department</InputLabel>
                            <Select
                                options={departments.map(d => ({ value: d.departmentID, label: d.emri }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Department"
                                value={selectedDepartment}
                                onChange={handleDepartmentChange}
                                isDisabled={!selectedHospital}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel for="doctorName">Doctor</InputLabel>
                            <Select
                                options={doctors.map(doctor => ({ value: doctor.nrPersonal, label: `${doctor.emri} ${doctor.mbiemri}` }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Doctor"
                                value={selectedDoctor ? { value: selectedDoctor.nrPersonal, label: `${selectedDoctor.emri} ${selectedDoctor.mbiemri}` } : null}
                                onChange={handleDoctorChange}
                                isDisabled={!selectedDepartment}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel for="patientName">Patient</InputLabel>
                            <Select
                                options={patients.map(patient => ({ value: patient.nrPersonal, label: `${patient.emri} ${patient.mbiemri}` }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Patient"
                                value={selectedPatient ? { value: selectedPatient.nrPersonal, label: `${selectedPatient.emri} ${selectedPatient.mbiemri}` } : null}
                                onChange={handlePatientChange}
                                isDisabled={!selectedHospital}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Box mt={2} textAlign="center">
                        <Button color="primary" type="submit" variant="contained">
                            Add Prescription
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    </Drawer>
);

export default PrescriptionDrawer;
