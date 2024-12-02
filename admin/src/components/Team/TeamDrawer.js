import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TeamDrawer = ({
    isOpen,
    toggle,
    newTeam,
    handleChange,
    onSubmit,
    errorMessageModal,
    setErrorMessageModal,
}) => {

    return (
        <Drawer anchor="right" open={isOpen} onClose={toggle}>
            <Box p={3} width={400}>
                <Typography variant="h6" gutterBottom>
                    Add Team
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
                                    value={newTeam.emri}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Box mt={2} textAlign="center">
                            <Button variant="contained" color="primary" type="submit">
                                Add Team
                            </Button>
                        </Box>
                    </Grid>
                </form>
            </Box>
        </Drawer>
    );
};

export default TeamDrawer;
