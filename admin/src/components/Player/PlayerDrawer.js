import React from 'react';
import { Drawer, Box, Typography, FormGroup, InputLabel, Input, Button, Alert, Grid, IconButton } from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

const PlayerDrawer = ({
    isOpen,
    toggle,
    newPlayer,
    handleChange,
    handleSubmit,
    handleTeamChange,
    errorMessageModal,
    setErrorMessageModal,
    teamOptions,
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <Box p={3} width={400}>
            <Typography variant="h6" gutterBottom>
                Add Player
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
                                value={newPlayer.emri}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="numri">Number</InputLabel>
                            <Input
                                type="text"
                                name="numri"
                                id="numri"
                                value={newPlayer.numri}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <InputLabel htmlFor="teamName">Team</InputLabel>
                            <Select
                                options={teamOptions}
                                classNamePrefix="custom-select"
                                placeholder="Select Team"
                                value={teamOptions.find(option => option.value === newPlayer.teamId)}
                                onChange={(selectedOption) => handleTeamChange(selectedOption)}
                                required
                            />
                        </FormGroup>
                    </Grid>
                    <Box mt={2} textAlign="center">
                        <Button variant="contained" color="primary" type="submit">
                            Add Player
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    </Drawer>
);

export default PlayerDrawer;
