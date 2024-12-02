import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from '@mui/icons-material/Close';
import 'assets/css/custom-datepicker.css';

const PatientDrawer = ({
    isOpen,
    toggle,
    newPatient,
    handleDateChange,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitalOptions,
    selectedDate,
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <Box p={3} width={400}>
            <Typography variant="h6" gutterBottom>
                Add Patient
            </Typography>
            <IconButton edge="end" color="inherit" onClick={toggle}>
                <CloseIcon />
            </IconButton>
            <Alert severity="info" open={!!errorMessageModal} onClose={() => setErrorMessageModal('')}>
                {errorMessageModal}
            </Alert>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="emri">Name</InputLabel>
                            <Input
                                type="text"
                                name="emri"
                                id="emri"
                                placeholder="Name"
                                value={newPatient.emri}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^[A-Z][a-zA-Z\\s]*$", title: "Name must start with capital letter" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="mbiemri">Surname</InputLabel>
                            <Input
                                type="text"
                                name="mbiemri"
                                id="mbiemri"
                                placeholder="Surname"
                                value={newPatient.mbiemri}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^[A-Z][a-zA-Z\\s]*$", title: "Surname must start with capital letter" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="nrPersonal">Personal ID</InputLabel>
                            <Input
                                type="text"
                                name="nrPersonal"
                                id="nrPersonal"
                                placeholder="Personal ID"
                                value={newPatient.nrPersonal}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^\\d{10}$", title: "Personal ID should have exactly 10 numbers" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="date">Date</InputLabel>
                            <DatePicker
                                className="custom-datepicker"
                                placeholderText="Select Date"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                wrapperClassName="datepicker-wrapper"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="gjinia">Gender</InputLabel>
                            <RadioGroup
                                name="gjinia"
                                value={newPatient.gjinia}
                                onChange={handleChange}
                                required
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="adresa">Address</InputLabel>
                            <Input
                                type="text"
                                name="adresa"
                                id="adresa"
                                placeholder="Address"
                                value={newPatient.adresa}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="nrTel">Phone Number</InputLabel>
                            <Input
                                type="text"
                                name="nrTel"
                                id="nrTel"
                                placeholder="Phone Number"
                                value={newPatient.nrTel}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^\\d{5,15}$", title: "Phone Number should have between 5-15 numbers." }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={newPatient.email}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", title: "Please enter a valid email address" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={newPatient.password}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^(?=.*\\d)[A-Za-z\\d]{8,16}$", title: "Password must be 8-16 characters long and include at least one number" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormGroup>
                            <InputLabel htmlFor="hospitalName">Hospital</InputLabel>
                            <Select
                                options={hospitalOptions}
                                classNamePrefix="custom-select"
                                placeholder="Select Hospital"
                                value={hospitalOptions.find(option => option.value === newPatient.hospitalId)}
                                onChange={(selectedOption) => handleHospitalChange(selectedOption)}
                                required
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Box mt={2} textAlign="center">
                    <Button variant="contained" color="primary" type="submit">Add Patient</Button>
                </Box>
            </form>
        </Box>
    </Drawer>
);

export default PatientDrawer;
