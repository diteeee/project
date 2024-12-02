import React from 'react';
import {
    Table, Button, Input, Alert, Card as MuiCard, Card, CardBody, CardHeader, CardTitle, Row, Col, Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import classnames from 'classnames';
import { useStaff } from '../../hooks/useStaff';
import StaffDrawer from './StaffDrawer';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import 'assets/css/ListCSS.css';

const StaffList = () => {
    const {
        hospitals,
        staff,
        newStaff,
        staffModal,
        editedStaff,
        editingStaffId,
        departments,
        rooms,
        selectedDepartmentModal,
        selectedHospitalModal,
        selectedRoom,
        modalDepartments,
        selectedHospital,
        selectedDepartment,
        activeHospitalTab,
        activeDepartmentTab,
        successMessage,
        errorMessage,
        errorMessageModal,
        toggleStaffModal,
        setNewStaff,
        handleHospitalSelect,
        handleDepartmentSelect,
        handleChange,
        handleHospitalChange,
        handleDepartmentChange,
        handleRoomChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteStaff,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useStaff();

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
                                        onClick={toggleStaffModal}
                                    >
                                        Add Staff
                                    </Button>
                                </div>
                                <Grid container spacing={3}>
                                    {staff.map(staff => (
                                        <Grid item xs={12} sm={6} md={4} key={staff.nrPersonal}>
                                            <MuiCard>
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Personal ID: {staff.nrPersonal}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Name: {editingStaffId === staff.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="emri"
                                                                value={editedStaff.emri}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            staff.emri
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Surname: {editingStaffId === staff.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="mbiemri"
                                                                value={editedStaff.mbiemri}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            staff.mbiemri
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Job Position: {editingStaffId === staff.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="pozita"
                                                                value={editedStaff.pozita}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            staff.pozita
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Address: {editingStaffId === staff.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="adresa"
                                                                value={editedStaff.adresa}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            staff.adresa
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Phone Number: {editingStaffId === staff.nrPersonal ? (
                                                            <Input
                                                                variant="outlined"
                                                                name="nrTel"
                                                                value={editedStaff.nrTel}
                                                                onChange={handleEditInputChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        ) : (
                                                            staff.nrTel
                                                        )}
                                                    </Typography>
                                                    <div style={{ marginTop: '10px' }}>
                                                        {editingStaffId === staff.nrPersonal ? (
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
                                                                <IconButton color="info" onClick={() => handleEdit(staff.nrPersonal)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton color="error" onClick={() => handleDeleteStaff(staff.nrPersonal)}>
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
            <div className='desktop-view'>
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
                                <Row>
                                    <Col xs="12">
                                        {selectedHospital && selectedDepartment && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle tag="h4">Staff in {selectedDepartment.emri}</CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <Table>
                                                        <thead className="text-primary">
                                                            <tr>
                                                                <th>Personal ID</th>
                                                                <th>Name</th>
                                                                <th>Surname</th>
                                                                <th>Job Position</th>
                                                                <th>Address</th>
                                                                <th>Phone Number</th>
                                                                <th>
                                                                    <Button onClick={toggleStaffModal}>Add Staff</Button>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {staff.map((staff) => (
                                                                <tr key={staff.nrPersonal}>
                                                                    <td>{staff.nrPersonal}</td>
                                                                    <td>
                                                                        {editingStaffId === staff.nrPersonal ? (
                                                                            <Input
                                                                                type="text"
                                                                                name="emri"
                                                                                value={editedStaff.emri}
                                                                                onChange={handleEditInputChange}
                                                                            />
                                                                        ) : (
                                                                            staff.emri
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {editingStaffId === staff.nrPersonal ? (
                                                                            <Input
                                                                                type="text"
                                                                                name="mbiemri"
                                                                                value={editedStaff.mbiemri}
                                                                                onChange={handleEditInputChange}
                                                                            />
                                                                        ) : (
                                                                            staff.mbiemri
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {editingStaffId === staff.nrPersonal ? (
                                                                            <Input
                                                                                type="text"
                                                                                name="pozita"
                                                                                value={editedStaff.pozita}
                                                                                onChange={handleEditInputChange}
                                                                            />
                                                                        ) : (
                                                                            staff.pozita
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {editingStaffId === staff.nrPersonal ? (
                                                                            <Input
                                                                                type="text"
                                                                                name="adresa"
                                                                                value={editedStaff.adresa}
                                                                                onChange={handleEditInputChange}
                                                                            />
                                                                        ) : (
                                                                            staff.adresa
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {editingStaffId === staff.nrPersonal ? (
                                                                            <Input
                                                                                type="text"
                                                                                name="nrTel"
                                                                                value={editedStaff.nrTel}
                                                                                onChange={handleEditInputChange}
                                                                            />
                                                                        ) : (
                                                                            staff.nrTel
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {editingStaffId === staff.nrPersonal ? (
                                                                            <>
                                                                                <Button color="success" onClick={handleSave} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Save</Button>
                                                                                <Button color="secondary" onClick={handleCancelEdit} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px", fontSize: "small" }}>Cancel</Button>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Button color="info" onClick={() => handleEdit(staff.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Edit</Button>
                                                                                <Button color="danger" onClick={() => handleDeleteStaff(staff.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Delete</Button>
                                                                            </>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                    <StaffDrawer
                                                        isOpen={staffModal}
                                                        toggle={toggleStaffModal}
                                                        newStaff={newStaff}
                                                        handleChange={handleChange}
                                                        handleSubmit={handleSubmit}
                                                        handleHospitalChange={handleHospitalChange}
                                                        handleDepartmentChange={handleDepartmentChange}
                                                        handleRoomChange={handleRoomChange}
                                                        errorMessageModal={errorMessageModal}
                                                        setErrorMessageModal={setErrorMessageModal}
                                                        hospitals={hospitals}
                                                        departments={modalDepartments}
                                                        rooms={rooms}
                                                        setNewStaff={setNewStaff}
                                                        selectedHospital={selectedHospitalModal}
                                                        selectedDepartment={selectedDepartmentModal}
                                                        selectedRoom={selectedRoom}
                                                    />
                                                </CardBody>
                                            </Card>
                                        )}
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </TabPane>
                </TabContent>
            </div>
        </>
    );
};

export default StaffList;