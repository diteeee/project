import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import PropTypes from "prop-types";
import { useHospitals } from "../hooks/useHospitals";
import { useUser } from "context/UserContext";

const OurHospitals = () => {
  const { user } = useUser();
  const {
    hospitals,
    editedHospital,
    editingHospitalId,
    newHospital,
    showAddHospitalForm,
    formErrors,
    setEditingHospitalId,
    handleEdit,
    handleImageChange,
    handleEditInputChange,
    handleSave,
    handleDelete,
    handleAddInputChange,
    setShowAddHospitalForm,
    handleAddHospitalClick,
  } = useHospitals();

  const role = user ? user.role : "guest";
  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox sx={{ paddingTop: "100px" }}>
        <Container>
          {role === "admin" && (
            <Button
              color="primary"
              variant="contained"
              sx={{ marginBottom: 2, color: "#fff" }}
              onClick={() => setShowAddHospitalForm(!showAddHospitalForm)}
            >
              {showAddHospitalForm ? "Cancel" : "Add New Hospital"}
            </Button>
          )}
          <Grid container spacing={3}>
            {showAddHospitalForm && role === "admin" && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <TextField
                      label="Name"
                      name="emri"
                      value={newHospital.emri}
                      onChange={handleAddInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.emri)}
                      helperText={formErrors.emri}
                    />
                    <TextField
                      label="Address"
                      name="adresa"
                      value={newHospital.adresa}
                      onChange={handleAddInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.adresa)}
                      helperText={formErrors.adresa}
                    />
                    <TextField
                      label="Phone Number"
                      name="nrTel"
                      value={newHospital.nrTel}
                      onChange={handleAddInputChange}
                      fullWidth
                      margin="normal"
                      required
                      pattern="^\d{5,15}$"
                      title="Phone Number should have between 5-15 numbers."
                      error={Boolean(formErrors.nrTel)}
                      helperText={formErrors.nrTel}
                    />
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "new")}
                    />
                    <Button color="primary" onClick={handleAddHospitalClick}>
                      Add
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={hospital.nrRegjistrimit}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt={hospital.emri}
                      height="140"
                      image={`http://localhost:3001/${hospital.imageUrl}`}
                    />
                    <CardContent>
                      {editingHospitalId === hospital.nrRegjistrimit ? (
                        <>
                          <TextField
                            label="Name"
                            name="emri"
                            value={editedHospital.emri}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Address"
                            name="adresa"
                            value={editedHospital.adresa}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Phone Number"
                            name="nrTel"
                            value={editedHospital.nrTel}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <input
                            type="file"
                            name="img"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "edit")}
                          />
                          <Button color="primary" onClick={handleSave}>
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingHospitalId(null)}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Typography gutterBottom variant="h5" component="div">
                            {hospital.emri}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {hospital.adresa}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {hospital.nrTel}
                          </Typography>
                          {role === "admin" && (
                            <>
                              <Button onClick={() => handleEdit(hospital)}>Edit</Button>
                              <Button
                                onClick={() => handleDelete(hospital.nrRegjistrimit)}
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
                  No hospitals found.
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

OurHospitals.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default OurHospitals;
