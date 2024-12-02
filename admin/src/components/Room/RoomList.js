import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useRooms } from '../../hooks/useRooms';
import RoomDrawer from './RoomDrawer';
import 'assets/css/ListCSS.css';

const RoomList = () => {
    const {
        rooms,
        hospitals,
        departments,
        editingRoomId,
        editedRoom,
        roomModal,
        newRoom,
        selectedDepartment,
        selectedHospital,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleRoomModal,
        setNewRoom,
        handleHospitalChange,
        handleDepartmentChange,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteRoom,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useRooms();

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
                        onClick={toggleRoomModal}
                    >
                        Add Room
                    </Button>
                </div>
                <Grid container spacing={3}>
                    {rooms.map(room => (
                        <Grid item xs={12} sm={6} md={4} key={room.roomID}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        Room ID: {room.roomID}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Room Number: {editingRoomId === room.roomID ? (
                                            <Input
                                                variant="outlined"
                                                name="numri"
                                                value={editedRoom.numri}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            room.numri
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Department: {room.Department.emri}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Hospital: {room.Department.Hospital.emri}
                                    </Typography>
                                    <div style={{ marginTop: "10px" }}>
                                        {editingRoomId === room.roomID ? (
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
                                                <IconButton color="info" onClick={() => handleEdit(room.roomID)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteRoom(room.roomID)}>
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

            <div className="desktop-view">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Rooms</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table className="tablesorter">
                            <thead className="text-primary">
                                <tr>
                                    <th>Room ID</th>
                                    <th>Room Number</th>
                                    <th>Department</th>
                                    <th>Hospital</th>
                                    <th></th>
                                    <th>
                                        <Button onClick={toggleRoomModal}>Add Room</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map(room => (
                                    <tr key={room.roomID}>
                                        <td>{room.roomID}</td>
                                        <td>
                                            {editingRoomId === room.roomID ? (
                                                <Input
                                                    type="text"
                                                    name="numri"
                                                    value={editedRoom.numri}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                room.numri
                                            )}
                                        </td>
                                        <td>{room.Department.emri}</td>
                                        <td>{room.Department.Hospital.emri}</td>
                                        <td>
                                            {editingRoomId === room.roomID ? (
                                                <Button color="success" onClick={handleSave}>Save</Button>
                                            ) : (
                                                <Button color="info" onClick={() => handleEdit(room.roomID)}>Edit</Button>
                                            )}
                                        </td>
                                        <td>
                                            {editingRoomId === room.roomID ? (
                                                <>
                                                    <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                </>
                                            ) : (
                                                <Button color="danger" onClick={() => handleDeleteRoom(room.roomID)}>Delete</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <RoomDrawer
                            isOpen={roomModal}
                            toggle={toggleRoomModal}
                            newRoom={newRoom}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleHospitalChange={handleHospitalChange}
                            handleDepartmentChange={handleDepartmentChange}
                            errorMessageModal={errorMessageModal}
                            setErrorMessageModal={setErrorMessageModal}
                            hospitals={hospitals}
                            departments={departments}
                            setNewRoom={setNewRoom}
                            selectedHospital={selectedHospital}
                            selectedDepartment={selectedDepartment}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
};
export default RoomList;