import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid, IconButton } from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

const DepartmentDrawer = ({
    isOpen,
    toggle,
    newDepartment,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitalOptions,
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <Box p={3} width={400}>
            <Typography variant="h6" gutterBottom>
                Add Department
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
                            <InputLabel htmlFor="emri">Name</InputLabel>
                            <Input
                                type="text"
                                name="emri"
                                id="emri"
                                value={newDepartment.emri}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="lokacioni">Location</InputLabel>
                            <Input
                                type="text"
                                name="lokacioni"
                                id="lokacioni"
                                value={newDepartment.lokacioni}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="nrTel">Phone Number</InputLabel>
                            <Input
                                type="text"
                                name="nrTel"
                                id="nrTel"
                                value={newDepartment.nrTel}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: "^\\d{5,15}$", title: "Phone Number should have between 5-15 numbers." }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="hospitalName">Hospital</InputLabel>
                            <Select
                                options={hospitalOptions}
                                classNamePrefix="custom-select"
                                placeholder="Select Hospital"
                                value={hospitalOptions.find(option => option.value === newDepartment.hospitalId)}
                                onChange={(selectedOption) => handleHospitalChange(selectedOption)}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Box mt={2} textAlign="center">
                        <Button variant="contained" color="primary" type="submit">
                            Add Department
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    </Drawer>
);

export default DepartmentDrawer;
