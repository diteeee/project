import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent, CardMedia } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useHospitals } from '../../hooks/useHospitals';
import HospitalDrawer from './HospitalDrawer';
import 'assets/css/ListCSS.css';

const HospitalList = () => {
    const {
        hospitals,
        newHospital,
        hospitalModal,
        selectedImageName,
        editingHospitalId,
        editedHospital,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleHospitalModal,
        handleFileSelection,
        handleEditFileChange,
        handleChange,
        onSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteHospital,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal
    } = useHospitals();

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
                        onClick={toggleHospitalModal}
                    >
                        Add Hospital
                    </Button>
                </div>
                <Grid container spacing={3}>
                    {hospitals.map(hospital => (
                        <Grid item xs={12} sm={6} md={4} key={hospital.nrRegjistrimit}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`http://localhost:3001/${hospital.imageUrl}`}
                                    alt={hospital.emri}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {editingHospitalId === hospital.nrRegjistrimit ? (
                                            <Input
                                                variant="outlined"
                                                name="emri"
                                                value={editedHospital.emri}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            hospital.emri
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Registration Number: {hospital.nrRegjistrimit}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {editingHospitalId === hospital.nrRegjistrimit ? (
                                            <Input
                                                variant="outlined"
                                                name="adresa"
                                                value={editedHospital.adresa}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            hospital.adresa
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {editingHospitalId === hospital.nrRegjistrimit ? (
                                            <Input
                                                variant="outlined"
                                                name="nrTel"
                                                value={editedHospital.nrTel}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            hospital.nrTel
                                        )}
                                    </Typography>
                                    {editingHospitalId === hospital.nrRegjistrimit ? (
                                        <>
                                            <input type="file" name="img" onChange={handleEditFileChange} />
                                        </>
                                    ) : null}
                                    <div style={{ marginTop: "10px" }}>
                                        {editingHospitalId === hospital.nrRegjistrimit ? (
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
                                                <IconButton color="info" onClick={() => handleEdit(hospital.nrRegjistrimit)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteHospital(hospital.nrRegjistrimit)}>
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
                        <CardTitle tag="h4">Hospitals</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table className="tablesorter">
                            <thead className="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Image</th>
                                    <th></th>
                                    <th>
                                        <Button onClick={toggleHospitalModal}>Add Hospital</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {hospitals.map(hospital => (
                                    <tr key={hospital.nrRegjistrimit}>
                                        <td>
                                            {editingHospitalId === hospital.nrRegjistrimit ? (
                                                <Input
                                                    type="text"
                                                    name="emri"
                                                    value={editedHospital.emri}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                hospital.emri
                                            )}
                                        </td>
                                        <td>{hospital.nrRegjistrimit}</td>
                                        <td>
                                            {editingHospitalId === hospital.nrRegjistrimit ? (
                                                <Input
                                                    type="text"
                                                    name="adresa"
                                                    value={editedHospital.adresa}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                hospital.adresa
                                            )}
                                        </td>
                                        <td>
                                            {editingHospitalId === hospital.nrRegjistrimit ? (
                                                <Input
                                                    type="text"
                                                    name="nrTel"
                                                    value={editedHospital.nrTel}
                                                    onChange={handleEditInputChange}
                                                />
                                            ) : (
                                                hospital.nrTel
                                            )}
                                        </td>
                                        <td>
                                            {editingHospitalId === hospital.nrRegjistrimit ? (
                                                <>
                                                    <Input
                                                        type="file"
                                                        name="img"
                                                        onChange={handleEditFileChange}
                                                    />
                                                    {hospital.imageUrl && (
                                                        <img
                                                            src={`http://localhost:3001/${hospital.imageUrl}`}
                                                            alt={hospital.emri}
                                                            width="100"
                                                            style={{ marginTop: "10px" }}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <img
                                                    src={`http://localhost:3001/${hospital.imageUrl}`}
                                                    alt={hospital.emri}
                                                    width="100"
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {editingHospitalId === hospital.nrRegjistrimit ? (
                                                <Button color="success" onClick={handleSave}>Save</Button>
                                            ) : (
                                                <Button color="info" onClick={() => handleEdit(hospital.nrRegjistrimit)}>Edit</Button>
                                            )}
                                        </td>
                                        <td>
                                            {editingHospitalId === hospital.nrRegjistrimit ? (
                                                <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
                                            ) : (
                                                <Button color="danger" onClick={() => handleDeleteHospital(hospital.nrRegjistrimit)}>Delete</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <HospitalDrawer
                            isOpen={hospitalModal}
                            toggle={toggleHospitalModal}
                            newHospital={newHospital}
                            selectedImageName={selectedImageName}
                            handleChange={handleChange}
                            handleFileSelection={handleFileSelection}
                            onSubmit={onSubmit}
                            errorMessageModal={errorMessageModal}
                            setErrorMessageModal={setErrorMessageModal}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default HospitalList;
