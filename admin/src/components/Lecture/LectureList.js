import React from 'react';
import {
    Table, Button, Input, Alert, Card, CardBody, CardHeader, CardTitle, Nav, NavLink, NavItem, Row, Col, TabContent, TabPane,
} from 'reactstrap';
import { Grid, Typography, IconButton, CardContent } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import classnames from 'classnames';
import { useLectures } from '../../hooks/useLectures';
import LectureDrawer from './LectureDrawer';
import 'assets/css/ListCSS.css';

const LectureList = () => {
    const {
        lectures,
        lecturers,
        newLecture,
        lectureModal,
        editedLecture,
        editingLectureId,
        selectedLecturer,
        successMessage,
        errorMessage,
        errorMessageModal,
        lecturerOptions,
        activeLecturerTab,
        toggleLectureModal,
        handleLecturerSelect,
        handleChange,
        handleSubmit,
        handleEdit,
        handleEditInputChange,
        handleCancelEdit,
        handleSave,
        handleDeleteLecture,
        setSuccessMessage,
        setErrorMessage,
        setErrorMessageModal,
        handleLecturerChange
    } = useLectures();
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
                    {lecturers.map((lecturer, index) => (
                        <NavItem key={lecturer.lecturerID}>
                            <NavLink
                                style={{ color: 'white' }}
                                className={classnames({ active: activeLecturerTab === `${index}` })}
                                onClick={() => handleLecturerSelect(lecturer, `${index}`)}
                            >
                                {lecturer.emri}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={activeLecturerTab}>
                    <TabPane tabId={activeLecturerTab}>
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={toggleLectureModal}
                            >
                                Add Lecture
                            </Button>
                        </div>
                        <Grid container spacing={3}>
                            {lectures.map(lecture => (
                                <Grid item xs={12} sm={6} md={4} key={lecture.lectureID}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {editingLectureId === lecture.lectureID ? (
                                                    <Input
                                                        variant="outlined"
                                                        name="emri"
                                                        value={editedLecture.emri}
                                                        onChange={handleEditInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    lecture.emri
                                                )}
                                            </Typography>
                                            <div style={{ marginTop: "10px" }}>
                                                {editingLectureId === lecture.lectureID ? (
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
                                                        <IconButton color="info" onClick={() => handleEdit(lecture.lectureID)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeleteLecture(lecture.lectureID)}>
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
                    {lecturers.map((lecturer, index) => (
                        <NavItem key={lecturer.lecturerID}>
                            <NavLink
                                style={{ color: 'white' }}
                                className={classnames({ active: activeLecturerTab === `${index}` })}
                                onClick={() => handleLecturerSelect(lecturer, `${index}`)}
                            >
                                {lecturer.emri}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={activeLecturerTab}>
                    <TabPane tabId={activeLecturerTab}>
                        <Row>
                            <Col xs="12">
                                {selectedLecturer && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h4">Lectures by {selectedLecturer.emri}</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Table>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Lecture ID</th>
                                                        <th>Name</th>
                                                        <th>Location</th>
                                                        <th>Phone Number</th>
                                                        <th></th>
                                                        <th>
                                                            <Button onClick={toggleLectureModal}>Add Lecture</Button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lectures.map((lecture) => (
                                                        <tr key={lecture.lectureID}>
                                                            <td>{lecture.lectureID}</td>
                                                            <td>
                                                                {editingLectureId === lecture.lectureID ? (
                                                                    <Input
                                                                        type="text"
                                                                        name="emri"
                                                                        value={editedLecture.emri}
                                                                        onChange={handleEditInputChange}
                                                                    />
                                                                ) : (
                                                                    lecture.emri
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingLectureId === lecture.lectureID ? (
                                                                    <Button color="success" onClick={handleSave}>Save</Button>
                                                                ) : (
                                                                    <Button color="info" onClick={() => handleEdit(lecture.lectureID)}>Edit</Button>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {editingLectureId === lecture.lectureID ? (
                                                                    <>
                                                                        <Button color="secondary" onClick={handleCancelEdit} style={{ marginRight: "10px", fontSize: "small" }}>Cancel</Button>
                                                                    </>
                                                                ) : (
                                                                    <Button color="danger" onClick={() => handleDeleteLecture(lecture.lectureID)}>Delete</Button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            <LectureDrawer
                                                isOpen={lectureModal}
                                                toggle={toggleLectureModal}
                                                newLecture={newLecture}
                                                handleChange={handleChange}
                                                handleSubmit={handleSubmit}
                                                handleLecturerChange={handleLecturerChange}
                                                errorMessageModal={errorMessageModal}
                                                setErrorMessageModal={setErrorMessageModal}
                                                lecturerOptions={lecturerOptions}
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

export default LectureList;
