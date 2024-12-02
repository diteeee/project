import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import bgImage from "assets/images/bg-presentation.jpg";
import { useAppointments } from ".//../Booking/useAppointments";

const BookAppointment = () => {
  const {
    formData,
    hospitals,
    departments,
    doctors,
    availableTimeSlots,
    handleHospitalChange,
    handleDepartmentChange,
    handleDoctorChange,
    handleChange,
    handleSubmit,
  } = useAppointments();

  return (
    <>
      <DefaultNavbar
        routes={routes}
        // action={{
        //   type: "external",
        //   route: "https://www.creative-tim.com/product/material-kit-react",
        //   label: "free download",
        //   color: "default",
        // }}
        transparent
        light
      />
      <MKBox
        minHeight="100vh"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card
          sx={{
            p: 3,
            mx: { xs: 2, lg: 3 },
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <MKBox p={3}>
            <Container>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                    Book Your Appointment
                  </MKTypography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="emri"
                          variant="outlined"
                          required
                          value={formData.emri}
                          onChange={handleChange}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="mbiemri"
                          variant="outlined"
                          required
                          value={formData.mbiemri}
                          onChange={handleChange}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          select
                          label="Hospital"
                          name="hospital"
                          value={formData.hospital}
                          onChange={handleHospitalChange}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiInputBase-root": {
                              padding: "12px 14px",
                            },
                          }}
                        >
                          {hospitals.map((hospital) => (
                            <MenuItem key={hospital.nrRegjistrimit} value={hospital.nrRegjistrimit}>
                              {hospital.emri}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          select
                          label="Department"
                          name="department"
                          value={formData.department}
                          onChange={handleDepartmentChange}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiInputBase-root": {
                              padding: "12px 14px",
                            },
                          }}
                        >
                          {departments.map((department) => (
                            <MenuItem key={department.departmentID} value={department.departmentID}>
                              {department.emri}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          select
                          label="Doctor"
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleDoctorChange}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiInputBase-root": {
                              padding: "12px 14px",
                            },
                          }}
                        >
                          {doctors.map((doctor) => (
                            <MenuItem key={doctor.nrPersonal} value={`${doctor.nrPersonal}`}>
                              {`${doctor.emri} ${doctor.mbiemri}`}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Preferred Date"
                          type="date"
                          name="preferredDate"
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          required
                          value={formData.preferredDate}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          select
                          label="Preferred Time"
                          name="preferredTime"
                          variant="outlined"
                          required
                          value={formData.preferredTime}
                          onChange={handleChange}
                          disabled={availableTimeSlots.length === 0}
                          sx={{
                            "& .MuiInputBase-root": {
                              padding: "12px 14px",
                            },
                          }}
                        >
                          {availableTimeSlots.length > 0 ? (
                            availableTimeSlots.map((slot) => (
                              <MenuItem key={slot} value={slot}>
                                {slot}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No available time slots</MenuItem>
                          )}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                          Book Appointment
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Container>
          </MKBox>
        </Card>
      </MKBox>
    </>
  );
};

export default BookAppointment;
