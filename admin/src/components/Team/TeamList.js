import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useTeams } from '../../hooks/useTeams';
import TeamDrawer from './TeamDrawer';
import 'assets/css/ListCSS.css';

const TeamList = () => {
    const {
        teams,
        newTeam,
        teamModal,
        editingTeamId,
        editedTeam,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleTeamModal,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteTeam,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal
    } = useTeams();

    return (
        <>
            <Alert color="success" isOpen={!!successMessage} toggle={() => setSuccessMessage('')}>
                {successMessage}
            </Alert>
            <Alert color="danger" isOpen={!!errorMessage} toggle={() => setErrorMessage('')}>
                {errorMessage}
            </Alert>

            {/* Mobile View */}
            <div className="mobile-view">
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={toggleTeamModal}
                    >
                        Add Team
                    </Button>
                </div>
                <Grid container spacing={3}>
                    {teams.map(team => (
                        <Grid item xs={12} sm={6} md={4} key={team.teamID}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {editingTeamId === team.teamID ? (
                                            <Input
                                                variant="outlined"
                                                name="emri"
                                                value={editedTeam.emri}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            team.emri
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Team ID: {team.teamID}
                                    </Typography>
                                    <div style={{ marginTop: "10px" }}>
                                        {editingTeamId === team.teamID ? (
                                            <>
                                                <IconButton color="primary" onClick={handleSave}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={handleCancelEdit}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton color="info" onClick={() => handleEdit(team.teamID)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteTeam(team.teamID)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>

            {/* Desktop View */}
            <div className="desktop-view">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Teams</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table className="tablesorter">
                            <thead className="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Team ID</th>
                                    <th>Department</th>
                                    <th>Email</th>
                                    <th></th>
                                    <th>
                                        <Button onClick={toggleTeamModal}>Add Team</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map(team => (
                                    <tr key={team.teamID}>
                                        <td>
                                            {editingTeamId === team.teamID ? (
                                                <Input
                                                    type="text"
                                                    name="emri"
                                                    value={editedTeam.emri}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                team.emri
                                            )}
                                        </td>
                                        <td>{team.teamID}</td>
                                        <td>
                                            {editingTeamId === team.teamID ? (
                                                <Button color="success" onClick={handleSave}>Save</Button>
                                            ) : (
                                                <Button color="info" onClick={() => handleEdit(team.teamID)}>Edit</Button>
                                            )}
                                        </td>
                                        <td>
                                            {editingTeamId === team.teamID ? (
                                                <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
                                            ) : (
                                                <Button color="danger" onClick={() => handleDeleteTeam(team.teamID)}>Delete</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <TeamDrawer
                            isOpen={teamModal}
                            toggle={toggleTeamModal}
                            newTeam={newTeam}
                            handleChange={handleChange}
                            onSubmit={handleSubmit}
                            errorMessageModal={errorMessageModal}
                            setErrorMessageModal={setErrorMessageModal}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default TeamList;
