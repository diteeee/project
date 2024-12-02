import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const HospitalDrawer = ({
    isOpen,
    toggle,
    newHospital,
    handleChange,
    onSubmit,
    errorMessageModal,
    setErrorMessageModal,
    handleFileSelection,
    selectedImageName
}) => {

    return (
        <Drawer anchor="right" open={isOpen} onClose={toggle}>
            <Box p={3} width={400}>
                <Typography variant="h6" gutterBottom>
                    Add Hospital
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
                                    value={newHospital.emri}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <InputLabel htmlFor="adresa">Address</InputLabel>
                                <Input
                                    type="text"
                                    name="adresa"
                                    id="adresa"
                                    placeholder="Address"
                                    value={newHospital.adresa}
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
                                    placeholder="Phone Number"
                                    value={newHospital.nrTel}
                                    onChange={handleChange}
                                    required
                                    inputProps={{ pattern: "^\\d{5,15}$", title: "Phone Number should have between 5-15 numbers." }}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <InputLabel htmlFor="imageUrl">Hospital's Image</InputLabel>
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
                        <Box mt={2} textAlign="center">
                            <Button variant="contained" color="primary" type="submit">
                                Add Hospital
                            </Button>
                        </Box>
                    </Grid>
                </form>
            </Box>
        </Drawer>
    );
};

export default HospitalDrawer;
