import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle, Nav, NavLink, NavItem, Row, Col, TabContent, TabPane,
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import classnames from 'classnames';
import { usePlayers } from '../../hooks/usePlayers';
import PlayerDrawer from './PlayerDrawer';
import 'assets/css/ListCSS.css';

const PlayerList = () => {
    const {
        players,
        teams,
        newPlayer,
        playerModal,
        editedPlayer,
        editingPlayerId,
        selectedTeam,
        successMessage,
        errorMessage,
        errorMessageModal,
        teamOptions,
        activeTeamTab,
        togglePlayerModal,
        handleTeamSelect,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeletePlayer,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
        handleTeamChange
    } = usePlayers();
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
                <Nav tabs>
                    {teams.map((team, index) => (
                        <NavItem key={team.teamID}>
                            <NavLink
                                style={{ color: 'white' }}
                                className={classnames({ active: activeTeamTab === `${index}` })}
                                onClick={() => handleTeamSelect(team, `${index}`)}
                            >
                                {team.emri}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={activeTeamTab}>
                    <TabPane tabId={activeTeamTab}>
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={togglePlayerModal}
                            >
                                Add Player
                            </Button>
                        </div>
                        <Grid container spacing={3}>
                            {players.map(player => (
                                <Grid item xs={12} sm={6} md={4} key={player.playerID}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {editingPlayerId === player.playerID ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="emri"
                                                        value={editedPlayer.emri}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    player.emri
                                                )}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {editingPlayerId === player.playerID ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="numri"
                                                        value={editedPlayer.numri}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    player.numri
                                                )}
                                            </Typography>
                                            <div style={{ marginTop: "10px" }}>
                                                {editingPlayerId === player.playerID ? (
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
                                                        <IconButton color="info" onClick={() => handleEdit(player.playerID)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeletePlayer(player.playerID)}>
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
                    </TabPane>
                </TabContent>
            </div>

            {/* Desktop View */}
            <div className="desktop-view">
                <Nav tabs>
                    {teams.map((team, index) => (
                        <NavItem key={team.teamID}>
                            <NavLink
                                style={{ color: 'white' }}
                                className={classnames({ active: activeTeamTab === `${index}` })}
                                onClick={() => handleTeamSelect(team, `${index}`)}
                            >
                                {team.emri}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={activeTeamTab}>
                    <TabPane tabId={activeTeamTab}>
                        <Row>
                            <Col xs="12">
                                {selectedTeam && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h4">Players by {selectedTeam.emri}</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Table>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Player ID</th>
                                                        <th>Name</th>
                                                        <th>Number</th>
                                                        <th>
                                                            <Button onClick={togglePlayerModal}>Add Player</Button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {players.map((player) => (
                                                        <tr key={player.playerID}>
                                                            <td>{player.playerID}</td>
                                                            <td>
                                                                {editingPlayerId === player.playerID ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="emri"
                                                                        value={editedPlayer.emri}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    player.emri
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingPlayerId === player.playerID ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="numri"
                                                                        value={editedPlayer.numri}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    player.numri
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingPlayerId === player.playerID ? (
                                                                    <Button color="success" onClick={handleSave}>Save</Button>
                                                                ) : (
                                                                    <Button color="info" onClick={() => handleEdit(player.playerID)}>Edit</Button>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingPlayerId === player.playerID ? (
                                                                    <>
                                                                        <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                                    </>
                                                                ) : (
                                                                    <Button color="danger" onClick={() => handleDeletePlayer(player.playerID)}>Delete</Button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            <PlayerDrawer
                                                isOpen={playerModal}
                                                toggle={togglePlayerModal}
                                                newPlayer={newPlayer}
                                                handleChange={handleChange}
                                                handleSubmit={handleSubmit}
                                                handleTeamChange={handleTeamChange}
                                                errorMessageModal={errorMessageModal}
                                                setErrorMessageModal={setErrorMessageModal}
                                                teamOptions={teamOptions}
                                            />
                                        </CardBody>
                                    </Card>
                                )}
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </>
    );
};

export default PlayerList;
