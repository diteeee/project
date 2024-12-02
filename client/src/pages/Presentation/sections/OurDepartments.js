import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import { useDepartments } from "../hooks/useDepartments";
import { useUser } from "context/UserContext";

const OurDepartments = () => {
  const { user } = useUser();
  const {
    hospitals,
    departments,
    selectedHospital,
    newDepartment,
    showAddDepartmentForm,
    editingDepartmentId,
    editedDepartment,
    formErrors,
    setEditingDepartmentId,
    handleEditInputChange,
    handleEdit,
    handleSave,
    handleDelete,
    handleHospitalChange,
    handleAddInputChange,
    setShowAddDepartmentForm,
    handleAddDepartmentClick,
  } = useDepartments();

  const role = user ? user.role : "guest";

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox sx={{ paddingTop: "100px" }}>
        <Container>
          <Autocomplete
            options={hospitals}
            getOptionLabel={(hospital) => hospital.emri}
            value={selectedHospital}
            onChange={(event, newValue) => handleHospitalChange(newValue)}
            renderInput={(params) => <TextField {...params} label="Select Hospital" />}
            sx={{ marginBottom: 4 }}
          />
          {role === "admin" && (
            <Button
              color="primary"
              variant="contained"
              sx={{ marginBottom: 2, color: "#fff" }}
              onClick={() => setShowAddDepartmentForm(!showAddDepartmentForm)}
              disabled={!selectedHospital}
            >
              {showAddDepartmentForm ? "Cancel" : "Add New Department"}
            </Button>
          )}
          <Grid container spacing={3}>
            {showAddDepartmentForm && role === "admin" && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <TextField
                      label="Department Name"
                      name="emri"
                      value={newDepartment.emri}
                      onChange={handleAddInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.emri)}
                      helperText={formErrors.emri}
                    />
                    <TextField
                      label="Location"
                      name="lokacioni"
                      value={newDepartment.lokacioni}
                      onChange={handleAddInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.lokacioni)}
                      helperText={formErrors.lokacioni}
                    />
                    <TextField
                      label="Phone Number"
                      name="nrTel"
                      value={newDepartment.nrTel}
                      onChange={handleAddInputChange}
                      fullWidth
                      margin="normal"
                      required
                      error={Boolean(formErrors.nrTel)}
                      helperText={formErrors.nrTel}
                    />
                    <Button color="primary" onClick={handleAddDepartmentClick}>
                      Add
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {departments.length > 0 ? (
              departments.map((department) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={department.departmentID}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      {editingDepartmentId === department.departmentID ? (
                        <>
                          <TextField
                            label="Department Name"
                            name="emri"
                            value={editedDepartment.emri}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Location"
                            name="lokacioni"
                            value={editedDepartment.lokacioni}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Phone Number"
                            name="nrTel"
                            value={editedDepartment.nrTel}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                          />
                          <Button color="primary" onClick={handleSave}>
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingDepartmentId(null)}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Typography gutterBottom variant="h5" component="div">
                            {department.emri}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {department.lokacioni}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {department.nrTel}
                          </Typography>
                          {role === "admin" && (
                            <>
                              <Button onClick={() => handleEdit(department)}>Edit</Button>
                              <Button
                                onClick={() => handleDelete(department.departmentID)}
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
                  No departments found for the selected hospital.
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

export default OurDepartments;
