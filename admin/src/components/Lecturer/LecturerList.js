import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useLecturers } from '../../hooks/useLecturers';
import LecturerDrawer from './LecturerDrawer';
import 'assets/css/ListCSS.css';

const LecturerList = () => {
    const {
        lecturers,
        newLecturer,
        lecturerModal,
        editingLecturerId,
        editedLecturer,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleLecturerModal,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteLecturer,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal
    } = useLecturers();

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
                        onClick={toggleLecturerModal}
                    >
                        Add Lecturer
                    </Button>
                </div>
                <Grid container spacing={3}>
                    {lecturers.map(lecturer => (
                        <Grid item xs={12} sm={6} md={4} key={lecturer.lecturerID}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {editingLecturerId === lecturer.lecturerID ? (
                                            <Input
                                                variant="outlined"
                                                name="emri"
                                                value={editedLecturer.emri}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            lecturer.emri
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Lecturer ID: {lecturer.lecturerID}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {editingLecturerId === lecturer.lecturerID ? (
                                            <Input
                                                variant="outlined"
                                                name="department"
                                                value={editedLecturer.department}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            lecturer.department
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {editingLecturerId === lecturer.lecturerID ? (
                                            <Input
                                                variant="outlined"
                                                name="email"
                                                value={editedLecturer.email}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            lecturer.email
                                        )}
                                    </Typography>
                                    <div style={{ marginTop: "10px" }}>
                                        {editingLecturerId === lecturer.lecturerID ? (
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
                                                <IconButton color="info" onClick={() => handleEdit(lecturer.lecturerID)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteLecturer(lecturer.lecturerID)}>
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
                        <CardTitle tag="h4">Lecturers</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table className="tablesorter">
                            <thead className="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Lecturer ID</th>
                                    <th>Department</th>
                                    <th>Email</th>
                                    <th></th>
                                    <th>
                                        <Button onClick={toggleLecturerModal}>Add Lecturer</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lecturers.map(lecturer => (
                                    <tr key={lecturer.lecturerID}>
                                        <td>
                                            {editingLecturerId === lecturer.lecturerID ? (
                                                <Input
                                                    type="text"
                                                    name="emri"
                                                    value={editedLecturer.emri}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                lecturer.emri
                                            )}
                                        </td>
                                        <td>{lecturer.lecturerID}</td>
                                        <td>
                                            {editingLecturerId === lecturer.lecturerID ? (
                                                <Input
                                                    type="text"
                                                    name="department"
                                                    value={editedLecturer.department}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                lecturer.department
                                            )}
                                        </td>
                                        <td>
                                            {editingLecturerId === lecturer.lecturerID ? (
                                                <Input
                                                    type="text"
                                                    name="email"
                                                    value={editedLecturer.email}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                lecturer.email
                                            )}
                                        </td>
                                        <td>
                                            {editingLecturerId === lecturer.lecturerID ? (
                                                <Button color="success" onClick={handleSave}>Save</Button>
                                            ) : (
                                                <Button color="info" onClick={() => handleEdit(lecturer.lecturerID)}>Edit</Button>
                                            )}
                                        </td>
                                        <td>
                                            {editingLecturerId === lecturer.lecturerID ? (
                                                <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
                                            ) : (
                                                <Button color="danger" onClick={() => handleDeleteLecturer(lecturer.lecturerID)}>Delete</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <LecturerDrawer
                            isOpen={lecturerModal}
                            toggle={toggleLecturerModal}
                            newLecturer={newLecturer}
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

export default LecturerList;
