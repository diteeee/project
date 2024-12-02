import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle, Nav, NavLink, NavItem, Row, Col, TabContent, TabPane,
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import classnames from 'classnames';
import { useDepartments } from '../../hooks/useDepartments';
import DepartmentDrawer from './DepartmentDrawer';
import 'assets/css/ListCSS.css';

const DepartmentList = () => {
    const {
        departments,
        hospitals,
        newDepartment,
        departmentModal,
        editedDepartment,
        editingDepartmentId,
        selectedHospital,
        successMessage,
        errorMessage,
        errorMessageModal,
        hospitalOptions,
        activeHospitalTab,
        toggleDepartmentModal,
        handleHospitalSelect,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteDepartment,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
        handleHospitalChange
    } = useDepartments();
    console.log("now:", departments)
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
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={toggleDepartmentModal}
                            >
                                Add Department
                            </Button>
                        </div>
                        <Grid container spacing={3}>
                            {departments.map(department => (
                                <Grid item xs={12} sm={6} md={4} key={department.departmentID}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {editingDepartmentId === department.departmentID ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="emri"
                                                        value={editedDepartment.emri}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    department.emri
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Location: {editingDepartmentId === department.departmentID ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="lokacioni"
                                                        value={editedDepartment.lokacioni}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    department.lokacioni
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Phone Number: {editingDepartmentId === department.departmentID ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="nrTel"
                                                        value={editedDepartment.nrTel}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    department.nrTel
                                                )}
                                            </Typography>
                                            <div style={{ marginTop: "10px" }}>
                                                {editingDepartmentId === department.departmentID ? (
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
                                                        <IconButton color="info" onClick={() => handleEdit(department.departmentID)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeleteDepartment(department.departmentID)}>
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
                        <Row>
                            <Col xs="12">
                                {selectedHospital && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h4">Departments in {selectedHospital.emri}</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Table>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Department ID</th>
                                                        <th>Name</th>
                                                        <th>Location</th>
                                                        <th>Phone Number</th>
                                                        <th></th>
                                                        <th>
                                                            <Button onClick={toggleDepartmentModal}>Add Department</Button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {departments.map((department) => (
                                                        <tr key={department.departmentID}>
                                                            <td>{department.departmentID}</td>
                                                            <td>
                                                                {editingDepartmentId === department.departmentID ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="emri"
                                                                        value={editedDepartment.emri}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    department.emri
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingDepartmentId === department.departmentID ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="lokacioni"
                                                                        value={editedDepartment.lokacioni}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    department.lokacioni
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingDepartmentId === department.departmentID ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="nrTel"
                                                                        value={editedDepartment.nrTel}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    department.nrTel
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingDepartmentId === department.departmentID ? (
                                                                    <Button color="success" onClick={handleSave}>Save</Button>
                                                                ) : (
                                                                    <Button color="info" onClick={() => handleEdit(department.departmentID)}>Edit</Button>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingDepartmentId === department.departmentID ? (
                                                                    <>
                                                                        <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                                    </>
                                                                ) : (
                                                                    <Button color="danger" onClick={() => handleDeleteDepartment(department.departmentID)}>Delete</Button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            <DepartmentDrawer
                                                isOpen={departmentModal}
                                                toggle={toggleDepartmentModal}
                                                newDepartment={newDepartment}
                                                handleChange={handleChange}
                                                handleSubmit={handleSubmit}
                                                handleHospitalChange={handleHospitalChange}
                                                errorMessageModal={errorMessageModal}
                                                setErrorMessageModal={setErrorMessageModal}
                                                hospitalOptions={hospitalOptions}
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

export default DepartmentList;
