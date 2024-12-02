import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

const DoctorDrawer = ({
    isOpen,
    toggle,
    newDoctor,
    handleChange,
    onSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    handleFileSelection,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    specializations,
    setNewDoctor,
    selectedHospital,
    selectedDepartment,
    selectedImageName,
}) => {

    return (
        <Drawer anchor="right" open={isOpen} onClose={toggle}>
            <Box p={3} width={400}>
                <Typography variant="h6" gutterBottom>
                    Add Doctor
                </Typography>
                <IconButton edge="end" color="inherit" onClick={toggle}>
                    <CloseIcon />
                </IconButton>
                <Alert severity="info" open={!!errorMessageModal} onClose={() => setErrorMessageModal('')}>
                    {errorMessageModal}
                </Alert>
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormGroup>
                                <InputLabel htmlFor="emri">Name</InputLabel>
                                <Input
                                    type="text"
                                    name="emri"
                                    id="emri"
                                    placeholder="Name"
                                    value={newDoctor.emri}
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
                                    value={newDoctor.mbiemri}
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
                                    value={newDoctor.nrPersonal}
                                    onChange={handleChange}
                                    required
                                    inputProps={{ pattern: "^\\d{10}$", title: "Personal ID should have exactly 10 numbers" }}
                                />
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
                                    value={newDoctor.adresa}
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
                                    value={newDoctor.nrTel}
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
                                    value={newDoctor.email}
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
                                    value={newDoctor.password}
                                    onChange={handleChange}
                                    required
                                    inputProps={{ pattern: "^(?=.*\\d)[A-Za-z\\d]{8,16}$", title: "Password must be 8-16 characters long and include at least one number" }}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormGroup>
                                <InputLabel htmlFor="hospital">Hospital</InputLabel>
                                <Select
                                    options={hospitals && hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Hospital"
                                    value={selectedHospital}
                                    onChange={handleHospitalChange}
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormGroup>
                                <InputLabel htmlFor="department">Department</InputLabel>
                                <Select
                                    options={departments && departments.map(d => ({ value: d.departmentID, label: d.emri }))}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Department"
                                    value={selectedDepartment ? { value: selectedDepartment.departmentID, label: selectedDepartment.emri } : null}
                                    onChange={handleDepartmentChange}
                                    isDisabled={!selectedHospital}
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormGroup>
                                <InputLabel htmlFor="specializimi">Specialization</InputLabel>
                                <Select
                                    options={specializations && specializations.map(spec => ({ value: spec, label: spec }))}
                                    classNamePrefix="custom-select"
                                    placeholder="Select Specialization"
                                    value={newDoctor.specializimi ? { value: newDoctor.specializimi, label: newDoctor.specializimi } : null}
                                    onChange={(selectedOption) => setNewDoctor({ ...newDoctor, specializimi: selectedOption.value })}
                                    isDisabled={!selectedDepartment}
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormGroup>
                                <InputLabel htmlFor="imageUrl">Doctor's Image</InputLabel>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={handleFileSelection}
                                />
                                <label htmlFor="raised-button-file">
                                    <IconButton color="primary" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                    <span>Select Image</span>
                                </label>
                                {selectedImageName && <div style={{ marginTop: '10px' }}>{selectedImageName}</div>}
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Box mt={2} textAlign="center">
                        <Button variant="contained" color="primary" type="submit">Add Doctor</Button>
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
};

export default DoctorDrawer;
