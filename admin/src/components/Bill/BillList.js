import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useBills } from '../../hooks/useBills';
import BillDrawer from './BillDrawer';
import 'assets/css/ListCSS.css';

const BillList = () => {
    const {
        bills,
        patients,
        newBill,
        newService,
        servicePrices,
        billModal,
        editedBill,
        editingBillId,
        successMessage,
        errorMessage,
        errorMessageModal,
        selectedHospital,
        selectedPatient,
        selectedDate,
        hospitals,
        toggleBillModal,
        addService,
        setNewService,
        handleHospitalChange,
        handlePatientChange,
        handleDateChange,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteBill,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
    } = useBills();

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
                        onClick={toggleBillModal}
                    >
                        Add Bill
                    </Button>
                </div>
                <Grid container spacing={3}>
                    {bills.map(bill => (
                        <Grid item xs={12} sm={6} md={4} key={bill.billID}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        Bill ID: {bill.billID}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Services:
                                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                                            {bill.sherbimi && bill.sherbimi.map((service, index) => (
                                                <li key={index} style={{ fontSize: "small" }}>{service.emri}:{service.cmimi}€</li>
                                            ))}
                                        </ul>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Date: {editingBillId === bill.billID ? (
                                            <Input
                                                variant="outlined"
                                                name="lokacioni"
                                                value={editedBill.data}
                                                onChange={handleEditInputChange}
                                                style={{ marginBottom: '10px' }}
                                            />
                                        ) : (
                                            bill.data
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total: {bill.totali}€
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Patient Name: {bill.Patient.emri} {bill.Patient.mbiemri}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Hospital Name: {bill.Hospital.emri}
                                    </Typography>
                                    <div style={{ marginTop: "10px" }}>
                                        {editingBillId === bill.billID ? (
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
                                                <IconButton color="info" onClick={() => handleEdit(bill.billID)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteBill(bill.billID)}>
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
                        <CardTitle tag="h4">All Bills</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table className="tablesorter">
                            <thead className="text-primary">
                                <tr>
                                    <th>Bill ID</th>
                                    <th>Services</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Patient Name</th>
                                    <th>Hospital Name</th>
                                    <th>
                                        <Button onClick={toggleBillModal}>Add Bill</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map(bill => (
                                    <React.Fragment key={bill.billID}>
                                        <tr key={bill.billID}>
                                            <td>{bill.billID}</td>
                                            <td>
                                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                    {bill.sherbimi && bill.sherbimi.map((service, index) => (
                                                        <li key={index} style={{ fontSize: "small" }}>{service.emri}:{service.cmimi}€</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                {editingBillId === bill.billID ? (
                                                    <Input
                                                        type="text"
                                                        name="data"
                                                        value={editedBill.data}
                                                        onChange={handleEditInputChange}
                                                    />
                                                ) : (
                                                    bill.data
                                                )}
                                            </td>
                                            <td>{bill.totali}€</td>
                                            <td>{bill.Patient.emri} {bill.Patient.mbiemri}</td>
                                            <td>{bill.Hospital.emri}</td>
                                            <td>
                                                {editingBillId === bill.billID ? (
                                                    <Button color="success" onClick={handleSave}>Save</Button>
                                                ) : (
                                                    <Button color="info" onClick={() => handleEdit(bill.billID)}>Edit</Button>
                                                )}
                                            </td>
                                            <td>
                                                {editingBillId === bill.billID ? (
                                                    <>
                                                        <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                    </>
                                                ) : (
                                                    <Button color="danger" onClick={() => handleDeleteBill(bill.billID)}>Delete</Button>
                                                )}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                        <BillDrawer
                            isOpen={billModal}
                            toggle={toggleBillModal}
                            newBill={newBill}
                            servicePrices={servicePrices}
                            addService={addService}
                            newService={newService}
                            setNewService={setNewService}
                            handleHospitalChange={handleHospitalChange}
                            handlePatientChange={handlePatientChange}
                            handleDateChange={handleDateChange}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            selectedHospital={selectedHospital}
                            selectedPatient={selectedPatient}
                            selectedDate={selectedDate}
                            hospitals={hospitals}
                            patients={patients}
                            errorMessageModal={errorMessageModal}
                            setErrorMessageModal={setErrorMessageModal}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
};
export default BillList;