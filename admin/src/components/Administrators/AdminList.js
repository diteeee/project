import React from 'react';
import {
    Table, Button, Input, Alert, Card as MuiCard, Card, CardBody, CardHeader, CardTitle, Row, Col, Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import classnames from 'classnames';
import { useAdmins } from '../../hooks/useAdmins';
import AdminDrawer from './AdminDrawer';
import 'assets/css/ListCSS.css';

const AdminList = () => {
    const {
        hospitals,
        admins,
        newAdmin,
        adminModal,
        editedAdmin,
        editingAdminId,
        selectedHospital,
        selectedDate,
        activeHospitalTab,
        hospitalOptions,
        successMessage,
        errorMessage,
        errorMessageModal,
        handleHospitalSelect,
        handleDateChange,
        handleChange,
        handleHospitalChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        toggleAdminModal,
        handleDeleteAdmin,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useAdmins();

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
                                onClick={toggleAdminModal}
                            >
                                Add Administrator
                            </Button>
                        </div>
                        <Grid container spacing={3}>
                            {admins.map(admin => (
                                <Grid item xs={12} sm={6} md={4} key={admin.nrPersonal}>
                                    <MuiCard>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">
                                                Personal ID: {admin.nrPersonal}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Name: {editingAdminId === admin.nrPersonal ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="emri"
                                                        value={editedAdmin.emri}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    admin.emri
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Surname: {editingAdminId === admin.nrPersonal ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="mbiemri"
                                                        value={editedAdmin.mbiemri}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    admin.mbiemri
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Birthday: {editingAdminId === admin.nrPersonal ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="datelindja"
                                                        value={editedAdmin.datelindja}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    admin.datelindja
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Address: {editingAdminId === admin.nrPersonal ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="adresa"
                                                        value={editedAdmin.adresa}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    admin.adresa
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Phone Number: {editingAdminId === admin.nrPersonal ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="nrTel"
                                                        value={editedAdmin.nrTel}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    admin.nrTel
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Email: {editingAdminId === admin.nrPersonal ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="email"
                                                        value={editedAdmin.email}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    admin.email
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Password: {editingAdminId === admin.nrPersonal ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="password"
                                                        value={editedAdmin.password}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    '••••••••'
                                                )}
                                            </Typography>
                                            <div style={{ marginTop: '10px' }}>
                                                {editingAdminId === admin.nrPersonal ? (
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
                                                        <IconButton color="info" onClick={() => handleEdit(admin.nrPersonal)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeleteAdmin(admin.nrPersonal)}>
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
            </div>


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
                        <Row>
                            <Col xs="12">
                                {selectedHospital && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h4">Administrators in {selectedHospital.emri}</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Table>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Personal ID</th>
                                                        <th>Name</th>
                                                        <th>Surname</th>
                                                        <th>Birthday</th>
                                                        <th>Address</th>
                                                        <th>Phone Number</th>
                                                        <th>Email</th>
                                                        <th>Password</th>
                                                        <th>
                                                            <Button onClick={toggleAdminModal}>Add Administrator</Button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {admins.map((admin) => (
                                                        <tr key={admin.nrPersonal}>
                                                            <td>{admin.nrPersonal}</td>
                                                            <td>
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="emri"
                                                                        value={editedAdmin.emri}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    admin.emri
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="mbiemri"
                                                                        value={editedAdmin.mbiemri}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    admin.mbiemri
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="datelindja"
                                                                        value={editedAdmin.datelindja}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    admin.datelindja
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="adresa"
                                                                        value={editedAdmin.adresa}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    admin.adresa
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="nrTel"
                                                                        value={editedAdmin.nrTel}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    admin.nrTel
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="email"
                                                                        value={editedAdmin.email}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    admin.email
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="password"
                                                                        value={editedAdmin.password}
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
                                                                {editingAdminId === admin.nrPersonal ? (
                                                                    <>
                                                                        <Button color="success" onClick={handleSave} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Save</Button>
                                                                        <Button color="secondary" onClick={handleCancelEdit} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px", fontSize: "small" }}>Cancel</Button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Button color="info" onClick={() => handleEdit(admin.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Edit</Button>
                                                                        <Button color="danger" onClick={() => handleDeleteAdmin(admin.nrPersonal)} style={{ marginBottom: "10px", width: "130px", marginLeft: "10px" }}>Delete</Button>
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            <AdminDrawer
                                                isOpen={adminModal}
                                                toggle={toggleAdminModal}
                                                newAdmin={newAdmin}
                                                handleDateChange={handleDateChange}
                                                handleChange={handleChange}
                                                handleSubmit={handleSubmit}
                                                handleHospitalChange={handleHospitalChange}
                                                errorMessageModal={errorMessageModal}
                                                setErrorMessageModal={setErrorMessageModal}
                                                hospitalOptions={hospitalOptions}
                                                selectedDate={selectedDate}
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

export default AdminList;