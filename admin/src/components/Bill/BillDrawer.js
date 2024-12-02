import React from 'react';
import { Drawer, Box, Typography, Button, Alert, Grid, FormGroup, InputLabel, Input, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'assets/css/custom-datepicker.css';

const BillDrawer = ({
    isOpen,
    toggle,
    newBill,
    newService,
    servicePrices,
    addService,
    setNewService,
    handleHospitalChange,
    handlePatientChange,
    handleDateChange,
    handleChange,
    handleSubmit,
    selectedHospital,
    selectedPatient,
    hospitals,
    patients,
    errorMessageModal,
    setErrorMessageModal,
    selectedDate,
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <Box p={3} width={400}>
            <Typography variant="h6" gutterBottom>
                Add Bill
            </Typography>
            <IconButton edge="end" color="inherit" onClick={toggle}>
                <CloseIcon />
            </IconButton>
            <Alert severity="info" open={!!errorMessageModal} onClose={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="sherbimi">Services</InputLabel>
                            <Select
                                options={Object.keys(servicePrices).map(service => ({ value: service, label: service }))}
                                value={newService}
                                onChange={(selectedOption) => setNewService(selectedOption.value)}
                                placeholder="Select Service"
                            />
                            <Button onClick={addService}>Add Service</Button>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newBill.sherbimi.map((service, index) => (
                                        <tr key={index}>
                                            <td>{service.emri}</td>
                                            <td>{service.cmimi}€</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="date">Date</InputLabel>
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
                            <InputLabel htmlFor="totali">Total</InputLabel>
                            <Input
                                type="text"
                                name="totali"
                                id="totali"
                                placeholder="Total"
                                value={newBill.totali}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="hospital">Hospital</InputLabel>
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
                            <InputLabel htmlFor="patientName">Patient</InputLabel>
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
                </Grid>
                <Box mt={2} textAlign="center">
                    <Button variant="contained" color="primary" type="submit">Add Bill</Button>
                </Box>
            </form>
        </Box>
    </Drawer>
);

export default BillDrawer;
