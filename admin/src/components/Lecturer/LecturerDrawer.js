import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LecturerDrawer = ({
    isOpen,
    toggle,
    newLecturer,
    handleChange,
    onSubmit,
    errorMessageModal,
    setErrorMessageModal,
}) => {

    return (
        <Drawer anchor="right" open={isOpen} onClose={toggle}>
            <Box p={3} width={400}>
                <Typography variant="h6" gutterBottom>
                    Add Lecturer
                </Typography>
                <IconButton edge="end" color="inherit" onClick={toggle}>
                    <CloseIcon />
                </IconButton>
                <Alert severity="info" open={!!errorMessageModal} onClose={() => setErrorMessageModal('')}>
                    {errorMessageModal}
                </Alert>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormGroup>
                                <InputLabel htmlFor="emri">Name</InputLabel>
                                <Input
                                    type="text"
                                    name="emri"
                                    id="emri"
                                    placeholder="Name"
                                    value={newLecturer.emri}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <InputLabel htmlFor="department">Department</InputLabel>
                                <Input
                                    type="text"
                                    name="department"
                                    id="department"
                                    placeholder="Department"
                                    value={newLecturer.department}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={newLecturer.email}
                                    onChange={handleChange}
                                    required
                                    inputProps={{ pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", title: "Email invalid." }}
                                />
                            </FormGroup>
                        </Grid>
                        <Box mt={2} textAlign="center">
                            <Button variant="contained" color="primary" type="submit">
                                Add Lecturer
                            </Button>
                        </Box>
                    </Grid>
                </form>
            </Box>
        </Drawer>
    );
};

export default LecturerDrawer;
