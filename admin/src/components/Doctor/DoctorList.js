import React from 'react';
import {
    Table, Button, Input, Alert, Card as MuiCard, Card, CardBody, CardHeader, CardTitle, Row, Col, Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent, CardMedia } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import classnames from 'classnames';
import { useDoctors } from '../../hooks/useDoctors';
import DoctorDrawer from './DoctorDrawer';
import 'assets/css/ListCSS.css';

const DoctorList = () => {
    const {
        hospitals,
        doctors,
        newDoctor,
        doctorModal,
        specializations,
        editedDoctor,
        editingDoctorId,
        departments,
        selectedImageName,
        activeHospitalTab,
        activeDepartmentTab,
        successMessage,
        errorMessage,
        errorMessageModal,
        selectedHospitalModal,
        selectedDepartmentModal,
        modalDepartments,
        toggleDoctorModal,
        setNewDoctor,
        handleHospitalSelect,
        handleDepartmentSelect,
        handleChange,
        handleHospitalChange,
        handleDepartmentChange,
        handleFileSelection,
        onSubmit,
        handleEdit,
        handleEditInputChange,
        handleEditFileChange,
        handleCancelEdit,
        handleSave,
        handleDeleteDoctor,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useDoctors();

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
                    {hospitals.map((hospital, index) => (
                        <NavItem key={hospital.nrRegjistrimit}>
                            <NavLink
                                style={{ color: 'white' }}
                                className={classnames({ active: activeHospitalTab === `${index}` })}
                                onClick={() => handleHospitalSelect(hospital, `${index}`)}
                            >
                                {hospital.emri}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={activeHospitalTab}>
                    <TabPane tabId={activeHospitalTab}>
                        <Nav tabs>
                            {departments.map((department, index) => (
                                <NavItem key={department.departmentID}>
                                    <NavLink
                                        style={{ color: 'white' }}
                                        className={classnames({ active: activeDepartmentTab === `${index}` })}
                                        onClick={() => handleDepartmentSelect(department, `${index}`)}
                                    >
                                        {department.emri}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                        <TabContent activeTab={activeDepartmentTab}>
                            <TabPane tabId={activeDepartmentTab}>
                                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        onClick={toggleDoctorModal}
                                    >
                                        Add Doctor
                                    </Button>
                                </div>
                                <Grid container spacing={3}>
                                    {doctors.map(doctor => (
                                        <Grid item xs={12} sm={6} md={4} key={doctor.nrPersonal}>
                                            <MuiCard>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={`http://localhost:3001/${doctor.imageUrl}`}
                                                    alt={doctor.emri}
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Name: {editingDoctorId === doctor.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="emri"
                                                                value={editedDoctor.emri}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            doctor.emri
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Surname: {editingDoctorId === doctor.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="mbiemri"
                                                                value={editedDoctor.mbiemri}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            doctor.mbiemri
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Personal ID: {doctor.nrPersonal}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Address: {editingDoctorId === doctor.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="adresa"
                                                                value={editedDoctor.adresa}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            doctor.adresa
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Phone Number: {editingDoctorId === doctor.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="nrTel"
                                                                value={editedDoctor.nrTel}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            doctor.nrTel
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Specialization: {editingDoctorId === doctor.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="specializimi"
                                                                value={editedDoctor.specializimi}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            doctor.specializimi
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Email: {editingDoctorId === doctor.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="email"
                                                                value={editedDoctor.email}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            doctor.email
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Password: {editingDoctorId === doctor.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="password"
                                                                value={editedDoctor.password}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            '••••••••'
                                                        )}
                                                    </Typography>
                                                    {editingDoctorId === doctor.nrPersonal && (
                                                        <Input
                                                            type="file"
                                                            name="img"
                                                            onChange={handleEditFileChange}
                                                        />
                                                    )}
                                                    <div style={{ marginTop: '10px' }}>
                                                        {editingDoctorId === doctor.nrPersonal ? (
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
                                                                <IconButton color="info" onClick={() => handleEdit(doctor.nrPersonal)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton color="error" onClick={() => handleDeleteDoctor(doctor.nrPersonal)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </MuiCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPane>
                        </TabContent>
                    </TabPane>
                </TabContent>
            </div>

            {/* Desktop View */}
            <div className="desktop-view">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Doctors</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Nav tabs>
                                    {hospitals.map((hospital, index) => (
                                        <NavItem key={hospital.nrRegjistrimit}>
                                            <NavLink
                                                style={{ color: 'white' }}
                                                className={classnames({ active: activeHospitalTab === `${index}` })}
                                                onClick={() => handleHospitalSelect(hospital, `${index}`)}
                                            >
                                                {hospital.emri}
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                                <TabContent activeTab={activeHospitalTab}>
                                    <TabPane tabId={activeHospitalTab}>
                                        <Nav tabs>
                                            {departments.map((department, index) => (
                                                <NavItem key={department.departmentID}>
                                                    <NavLink
                                                        style={{ color: 'white' }}
                                                        className={classnames({ active: activeDepartmentTab === `${index}` })}
                                                        onClick={() => handleDepartmentSelect(department, `${index}`)}
                                                    >
                                                        {department.emri}
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>
                                        <TabContent activeTab={activeDepartmentTab}>
                                            <TabPane tabId={activeDepartmentTab}>
                                                <Table>
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Surname</th>
                                                            <th>Personal ID</th>
                                                            <th>Address</th>
                                                            <th>Phone Number</th>
                                                            <th>Specialization</th>
                                                            <th>Email</th>
                                                            <th>Password</th>
                                                            <th>Image</th>
                                                            <th>
                                                                <Button onClick={toggleDoctorModal}>Add Doctor</Button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {doctors.map(doctor => (
                                                            <tr key={doctor.nrPersonal}>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="emri"
                                                                            value={editedDoctor.emri}
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        doctor.emri
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="mbiemri"
                                                                            value={editedDoctor.mbiemri}
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        doctor.mbiemri
                                                                    )}
                                                                </td>
                                                                <td>{doctor.nrPersonal}</td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="adresa"
                                                                            value={editedDoctor.adresa}
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        doctor.adresa
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="nrTel"
                                                                            value={editedDoctor.nrTel}
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        doctor.nrTel
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="specializimi"
                                                                            value={editedDoctor.specializimi}
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        doctor.specializimi
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="email"
                                                                            value={editedDoctor.email}
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        doctor.email
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <Input
                                                                            type="text"
                                                                            name="password"
                                                                            value={editedDoctor.password}
                                                                            onChange={handleEditInputChange}
                                                                        />
                                                                    ) : (
                                                                        <Input
                                                                            type="text"
                                                                            value="••••••••"
                                                                            readOnly
                                                                        />
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <>
                                                                            <Input
                                                                                type="file"
                                                                                name="img"
                                                                                onChange={handleEditFileChange}
                                                                            />
                                                                            {doctor.imageUrl && (
                                                                                <img
                                                                                    src={`http://localhost:3001/${doctor.imageUrl}`}
                                                                                    alt={doctor.emri}
                                                                                    width="100"
                                                                                    style={{ marginTop: "10px" }}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <img
                                                                            src={`http://localhost:3001/${doctor.imageUrl}`}
                                                                            alt={doctor.emri}
                                                                            width="100"
                                                                        />
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingDoctorId === doctor.nrPersonal ? (
                                                                        <>
                                                                            <Button color="success" onClick={handleSave} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Save</Button>
                                                                            <Button color="secondary" onClick={handleCancelEdit} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px", fontSize: "small" }}>Cancel</Button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Button color="info" onClick={() => handleEdit(doctor.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Edit</Button>
                                                                            <Button color="danger" onClick={() => handleDeleteDoctor(doctor.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Delete</Button>
                                                                        </>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                <DoctorDrawer
                                                    isOpen={doctorModal}
                                                    toggle={toggleDoctorModal}
                                                    newDoctor={newDoctor}
                                                    handleChange={handleChange}
                                                    handleHospitalChange={handleHospitalChange}
                                                    handleDepartmentChange={handleDepartmentChange}
                                                    handleFileSelection={handleFileSelection}
                                                    errorMessageModal={errorMessageModal}
                                                    setErrorMessageModal={setErrorMessageModal}
                                                    hospitals={hospitals}
                                                    departments={modalDepartments}
                                                    specializations={specializations}
                                                    setNewDoctor={setNewDoctor}
                                                    selectedHospital={selectedHospitalModal}
                                                    selectedDepartment={selectedDepartmentModal}
                                                    selectedImageName={selectedImageName}
                                                    onSubmit={onSubmit}
                                                />
                                            </TabPane>
                                        </TabContent>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default DoctorList;
