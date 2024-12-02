import React from 'react';
import { Drawer, Button, Alert, IconButton } from '@mui/material';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

const RoomDrawer = ({
    isOpen,
    toggle,
    newRoom,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    handleDepartmentChange,
    errorMessageModal,
    setErrorMessageModal,
    hospitals,
    departments,
    selectedHospital,
    selectedDepartment
}) => (
    <Drawer anchor="right" open={isOpen} onClose={toggle}>
        <div style={{ width: '400px', padding: '20px' }}>
            <h5>Add Room</h5>
            <IconButton edge="end" color="inherit" onClick={toggle}>
                <CloseIcon />
            </IconButton>
            <Alert
                severity="info"
                open={!!errorMessageModal}
                onClose={() => setErrorMessageModal('')}
            >
                {errorMessageModal}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="numri">Numri</Label>
                    <Input 
                        type="text" 
                        name="numri" 
                        id="numri" 
                        placeholder="Number" 
                        value={newRoom.numri} 
                        onChange={handleChange} 
                        required 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="hospital">Hospital</Label>
                    <Select
                        options={hospitals.map(h => ({ value: h.nrRegjistrimit, label: h.emri }))}
                        classNamePrefix="custom-select"
                        placeholder="Select Hospital"
                        value={selectedHospital}
                        onChange={handleHospitalChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="department">Department</Label>
                    <Select
                        options={departments.map(d => ({ value: d.departmentID, label: d.emri }))}
                        classNamePrefix="custom-select"
                        placeholder="Select Department"
                        value={selectedDepartment ? { value: selectedDepartment.departmentID, label: selectedDepartment.emri } : null}
                        onChange={handleDepartmentChange}
                        isDisabled={!selectedHospital}
                        required
                    />
                </FormGroup>
                <div className="text-center">
                    <Button color="primary" type="submit" variant="contained">
                        Add Room
                    </Button>
                </div>
            </Form>
        </div>
    </Drawer>
);

export default RoomDrawer;
