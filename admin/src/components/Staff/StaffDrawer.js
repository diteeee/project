import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid, IconButton } from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

const StaffDrawer = ({
    isOpen,
    toggle,
    newStaff,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    handleRoomChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    rooms,
    selectedHospital,
    selectedDepartment,
    selectedRoom
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <Box p={3} width={400}>
            <Typography variant="h6" gutterBottom>
                Add Staff
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
                            <InputLabel htmlFor="nrPersonal">Personal ID</InputLabel>
                            <Input
                                type="text"
                                name="nrPersonal"
                                id="nrPersonal"
                                placeholder="Personal ID"
                                value={newStaff.nrPersonal}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^\\d{10}$", title: "Personal ID should have exactly 10 numbers" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel htmlFor="emri">Name</InputLabel>
                            <Input
                                type="text"
                                name="emri"
                                id="emri"
                                placeholder="Name"
                                value={newStaff.emri}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^[A-Z][a-zA-Z\\s]*$", title: "Name must start with capital letter" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel htmlFor="mbiemri">Surname</InputLabel>
                            <Input
                                type="text"
                                name="mbiemri"
                                id="mbiemri"
                                placeholder="Surname"
                                value={newStaff.mbiemri}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^[A-Z][a-zA-Z\\s]*$", title: "Surname must start with capital letter" }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel htmlFor="pozita">Job Position</InputLabel>
                            <Input
                                type="text"
                                name="pozita"
                                id="pozita"
                                placeholder="Job Position"
                                value={newStaff.pozita}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel htmlFor="adresa">Address</InputLabel>
                            <Input
                                type="text"
                                name="adresa"
                                id="adresa"
                                placeholder="Address"
                                value={newStaff.adresa}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel htmlFor="nrTel">Phone Number</InputLabel>
                            <Input
                                type="text"
                                name="nrTel"
                                id="nrTel"
                                placeholder="Phone Number"
                                value={newStaff.nrTel}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^\\d{5,15}$", title: "Phone Number should have between 5-15 numbers." }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel htmlFor="department">Department</InputLabel>
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
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel htmlFor="dhoma">Room</InputLabel>
                            <Select
                                options={rooms.map(r => ({ value: r.roomID, label: r.numri }))}
                                classNamePrefix="custom-select"
                                placeholder="Select Room"
                                value={selectedRoom}
                                onChange={handleRoomChange}
                                isDisabled={!selectedDepartment}
                                required
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Box mt={2} textAlign="center">
                    <Button variant="contained" color="primary" type="submit">
                        Add Staff
                    </Button>
                </Box>
            </form>
        </Box>
    </Drawer>
);

export default StaffDrawer;
