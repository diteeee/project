import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import { useDoctors } from "../hooks/useDoctors";
import { useUser } from "context/UserContext";

const OurDoctors = () => {
  const { user } = useUser();
  const {
    hospitals,
    departments,
    doctors,
    newDoctor,
    editedDoctor,
    editingDoctorId,
    selectedHospital,
    selectedDepartment,
    specializations,
    showAddDoctorForm,
    formErrors,
    setNewDoctor,
    setSelectedHospital,
    setShowAddDoctorForm,
    handleNewDoctorFileChange,
    handleNewDoctorInputChange,
    handleDepartmentChange,
    handleAddDoctorClick,
    handleEditInputChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleDelete,
  } = useDoctors();

  const role = user ? user.role : "guest";

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox sx={{ paddingTop: "100px" }}>
        <Container>
          <Autocomplete
            options={hospitals}
            getOptionLabel={(hospital) => hospital.emri}
            value={hospitals.find((h) => h.nrRegjistrimit === selectedHospital) || null}
            onChange={(event, newValue) => setSelectedHospital(newValue?.nrRegjistrimit || "")}
            renderInput={(params) => <TextField {...params} label="Select Hospital" />}
            sx={{ marginBottom: 4 }}
          />

          <Autocomplete
            options={departments}
            getOptionLabel={(department) => department.emri}
            value={departments.find((d) => d.departmentID === selectedDepartment) || null}
            onChange={handleDepartmentChange}
            renderInput={(params) => <TextField {...params} label="Select Department" />}
            sx={{ marginBottom: 4 }}
            disabled={!selectedHospital}
          />
          {role === "admin" && (
            <Button
              color="primary"
              variant="contained"
              sx={{ marginBottom: 2, color: "#fff" }}
              onClick={() => setShowAddDoctorForm(!showAddDoctorForm)}
            >
              {showAddDoctorForm ? "Cancel" : "Add New Doctor"}
            </Button>
          )}
          <Grid container spacing={3}>
            {showAddDoctorForm && role === "admin" && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <TextField
                      label="Name"
                      name="emri"
                      value={newDoctor.emri}
                      onChange={handleNewDoctorInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.emri)}
                      helperText={formErrors.emri}
                    />
                    <TextField
                      label="Surname"
                      name="mbiemri"
                      value={newDoctor.mbiemri}
                      onChange={handleNewDoctorInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.mbiemri)}
                      helperText={formErrors.mbiemri}
                    />
                    <TextField
                      label="Personal Number"
                      name="nrPersonal"
                      value={newDoctor.nrPersonal}
                      onChange={handleNewDoctorInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.nrPersonal)}
                      helperText={formErrors.nrPersonal}
                    />
                    <TextField
                      label="Address"
                      name="adresa"
                      value={newDoctor.adresa}
                      onChange={handleNewDoctorInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.adresa)}
                      helperText={formErrors.adresa}
                    />
                    <TextField
                      label="Phone Number"
                      name="nrTel"
                      value={newDoctor.nrTel}
                      onChange={handleNewDoctorInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.nrTel)}
                      helperText={formErrors.nrTel}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={newDoctor.email}
                      onChange={handleNewDoctorInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.email)}
                      helperText={formErrors.email}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      value={newDoctor.password}
                      onChange={handleNewDoctorInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.password)}
                      helperText={formErrors.password}
                    />
                    <Autocomplete
                      options={specializations.map((spec) => ({ value: spec, label: spec }))}
                      getOptionLabel={(option) => option.label}
                      value={
                        newDoctor.specializimi
                          ? { value: newDoctor.specializimi, label: newDoctor.specializimi }
                          : null
                      }
                      onChange={(event, newValue) =>
                        setNewDoctor({ ...newDoctor, specializimi: newValue?.value || "" })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Select Specialization" />
                      )}
                      disabled={!selectedDepartment}
                      sx={{ marginTop: 2 }}
                    />
                    {formErrors.specializimi && (
                      <Typography color="error" variant="caption" sx={{ marginTop: 1 }}>
                        {formErrors.specializimi}
                      </Typography>
                    )}
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      onChange={(e) => handleNewDoctorFileChange(e)}
                      required
                      style={{ marginTop: "16px" }}
                    />
                    {formErrors.imageUrl && (
                      <Typography color="error" variant="caption" sx={{ marginTop: 1 }}>
                        {formErrors.imageUrl}
                      </Typography>
                    )}
                    <Button color="primary" onClick={handleAddDoctorClick}>
                      Add
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.nrPersonal}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt={doctor.emri}
                      height="140"
                      image={`http://localhost:3001/${doctor.imageUrl}`}
                    />
                    <CardContent>
                      {editingDoctorId === doctor.nrPersonal ? (
                        <>
                          <TextField
                            label="Name"
                            name="emri"
                            value={editedDoctor.emri || ""}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Surname"
                            name="mbiemri"
                            value={editedDoctor.mbiemri || ""}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Specialization"
                            name="specializimi"
                            value={editedDoctor.specializimi || ""}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Phone Number"
                            name="nrTel"
                            value={editedDoctor.nrTel || ""}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Email"
                            name="email"
                            value={editedDoctor.email || ""}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Password"
                            name="password"
                            value={editedDoctor.password || ""}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <Button color="primary" onClick={handleSave}>
                            Save
                          </Button>
                          <Button onClick={handleCancel} style={{ marginLeft: "10px" }}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Typography gutterBottom variant="h5" component="div">
                            {doctor.emri} {doctor.mbiemri}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.specializimi}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.nrTel}
                          </Typography>
                          {role === "admin" && (
                            <>
                              <Button onClick={() => handleEdit(doctor)}>Edit</Button>
                              <Button
                                onClick={() => handleDelete(doctor.nrPersonal)}
                                style={{ marginLeft: "10px" }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  No doctors found for the selected department.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default OurDoctors;
