import React from 'react';
import {
  Table, Button, Input, Alert, Card as MuiCard, Card, CardBody, CardHeader, CardTitle, Row, Col, Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import classnames from 'classnames';
import { usePrescriptions } from '../../hooks/usePrescriptions';
import PrescriptionDrawer from './PrescriptionDrawer';
import 'assets/css/ListCSS.css';

const PrescriptionList = () => {
  const {
    successMessage,
    errorMessage,
    errorMessageModal,
    newPrescription,
    prescriptions,
    doctors,
    editingPrescriptionId,
    editedPrescription,
    selectedDoctor,
    activeDoctorTab,
    prescriptionModal,
    hospitals,
    departments,
    patients,
    doctorsModal,
    selectedDepartmentModal,
    selectedHospitalModal,
    selectedDoctorModal,
    selectedPatientModal,
    selectedDate,
    togglePrescriptionModal,
    handleDoctorSelect,
    handleDeletePrescription,
    handleHospitalChange,
    handleDepartmentChange,
    handlePatientChange,
    handleDoctorChange,
    handleDateChange,
    handleChange,
    handleSubmit,
    handleEdit,
    handleEditInputChange,
    handleCancelEdit,
    handleSave,
    setSuccessMessage,
    setErrorMessage,
    setErrorMessageModal,
  } = usePrescriptions();

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
          {doctors.map((doctor, index) => (
            <NavItem key={doctor.nrPersonal}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeDoctorTab === `${index}` })}
                onClick={() => handleDoctorSelect(doctor, `${index}`)}
              >
                {doctor.emri} {doctor.mbiemri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeDoctorTab}>
          <TabPane tabId={activeDoctorTab}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={togglePrescriptionModal}
              >
                Add Presciption
              </Button>
            </div>
            <Grid container spacing={3}>
              {prescriptions.map(prescription => (
                <Grid item xs={12} sm={6} md={4} key={prescription.prescriptionID}>
                  <MuiCard>
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Presciption ID: {prescription.prescriptionID}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Diagnosis: {editingPrescriptionId === prescription.prescriptionID ? (
                          <Input
                            variant="outlined"
                            name="diagnoza"
                            value={editedPrescription.diagnoza}
                            onChange={handleEditInputChange}
                            style={{ marginBottom: '10px' }}
                          />
                        ) : (
                          prescription.diagnoza
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Medication: {editingPrescriptionId === prescription.prescriptionID ? (
                          <Input
                            variant="outlined"
                            name="ilace"
                            value={editedPrescription.ilace}
                            onChange={handleEditInputChange}
                            style={{ marginBottom: '10px' }}
                          />
                        ) : (
                          prescription.ilace
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Instruction: {editingPrescriptionId === prescription.prescriptionID ? (
                          <Input
                            variant="outlined"
                            name="udhezimi"
                            value={editedPrescription.udhezimi}
                            onChange={handleEditInputChange}
                            style={{ marginBottom: '10px' }}
                          />
                        ) : (
                          prescription.udhezimi
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Date: {prescription.data}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Patient Name:{prescription.patient ? `${prescription.patient.emri} ${prescription.patient.mbiemri}` : 'Patient not found'}
                      </Typography>
                      <div style={{ marginTop: '10px' }}>
                        {editingPrescriptionId === prescription.prescriptionID ? (
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
                            <IconButton color="info" onClick={() => handleEdit(prescription.prescriptionID)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDeletePrescription(prescription.prescriptionID)}>
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
          {doctors.map((doctor, index) => (
            <NavItem key={doctor.nrPersonal}>
              <NavLink
                style={{ color: 'white' }}
                className={classnames({ active: activeDoctorTab === `${index}` })}
                onClick={() => handleDoctorSelect(doctor, `${index}`)}
              >
                {doctor.emri} {doctor.mbiemri}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeDoctorTab}>
          <TabPane tabId={activeDoctorTab}>
            <Row>
              <Col xs="12">
                {selectedDoctor && (
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Prescriptions by {selectedDoctor.emri} {selectedDoctor.mbiemri}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table>
                        <thead className="text-primary">
                          <tr>
                            <th>Prescription ID</th>
                            <th>Diagnosis</th>
                            <th>Medicine</th>
                            <th>Instruction</th>
                            <th>Data</th>
                            <th>Patient Name</th>
                            <th></th>
                            <th>
                              <Button onClick={togglePrescriptionModal}>Add Presciption</Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {prescriptions.map((prescription) => (
                            <tr key={prescription.prescriptionID}>
                              <td>{prescription.prescriptionID}</td>
                              <td>
                                {editingPrescriptionId === prescription.prescriptionID ? (
                                  <Input
                                    type="text"
                                    name="diagnoza"
                                    value={editedPrescription.diagnoza}
                                    onChange={handleEditInputChange}
                                  />
                                ) : (
                                  prescription.diagnoza
                                )}
                              </td>
                              <td>
                                {editingPrescriptionId === prescription.prescriptionID ? (
                                  <Input
                                    type="text"
                                    name="ilace"
                                    value={editedPrescription.ilace}
                                    onChange={handleEditInputChange}
                                  />
                                ) : (
                                  prescription.ilace
                                )}
                              </td>
                              <td>
                                {editingPrescriptionId === prescription.prescriptionID ? (
                                  <Input
                                    type="text"
                                    name="udhezimi"
                                    value={editedPrescription.udhezimi}
                                    onChange={handleEditInputChange}
                                  />
                                ) : (
                                  prescription.udhezimi
                                )}
                              </td>
                              <td>{prescription.data}</td>
                              <td>
                                {prescription.patient ? `${prescription.patient.emri} ${prescription.patient.mbiemri}` : 'Patient not found'}
                              </td>
                              <td>
                                {editingPrescriptionId === prescription.prescriptionID ? (
                                  <Button color="success" onClick={handleSave}>Save</Button>
                                ) : (
                                  <Button color="info" onClick={() => handleEdit(prescription.prescriptionID)}>Edit</Button>
                                )}
                              </td>
                              <td>
                                {editingPrescriptionId === prescription.prescriptionID ? (
                                  <>
                                    <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                  </>
                                ) : (
                                  <Button color="danger" onClick={() => handleDeletePrescription(prescription.prescriptionID)}>Delete</Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <PrescriptionDrawer
                        isOpen={prescriptionModal}
                        toggle={togglePrescriptionModal}
                        newPrescription={newPrescription}
                        handleSubmit={handleSubmit}
                        handleHospitalChange={handleHospitalChange}
                        handleDepartmentChange={handleDepartmentChange}
                        handleDoctorChange={handleDoctorChange}
                        handlePatientChange={handlePatientChange}
                        handleDateChange={handleDateChange}
                        handleChange={handleChange}
                        errorMessageModal={errorMessageModal}
                        setErrorMessageModal={setErrorMessageModal}
                        hospitals={hospitals}
                        departments={departments}
                        doctors={doctorsModal}
                        patients={patients}
                        selectedHospital={selectedHospitalModal}
                        selectedDepartment={selectedDepartmentModal}
                        selectedDoctor={selectedDoctorModal}
                        selectedPatient={selectedPatientModal}
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

export default PrescriptionList;