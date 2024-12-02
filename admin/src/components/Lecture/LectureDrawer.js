import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid, IconButton } from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

const LectureDrawer = ({
    isOpen,
    toggle,
    newLecture,
    handleChange,
    handleSubmit,
    handleLecturerChange,
    errorMessageModal,
    setErrorMessageModal,
    lecturerOptions,
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <Box p={3} width={400}>
            <Typography variant="h6" gutterBottom>
                Add Lecture
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
                                value={newLecture.emri}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="lecturerName">Lecturer</InputLabel>
                            <Select
                                options={lecturerOptions}
                                classNamePrefix="custom-select"
                                placeholder="Select Lecturer"
                                value={lecturerOptions.find(option => option.value === newLecture.lecturerId)}
                                onChange={(selectedOption) => handleLecturerChange(selectedOption)}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Box mt={2} textAlign="center">
                        <Button variant="contained" color="primary" type="submit">
                            Add Lecture
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    </Drawer>
);

export default LectureDrawer;
