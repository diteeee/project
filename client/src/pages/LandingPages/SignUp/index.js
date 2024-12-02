import React, { useEffect } from "react";
import { Grid, Card, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Select from "react-select";
import bgImage from "assets/images/bg-presentation.jpg";
import { useRegisterForm } from "./useRegisterForm";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

const RegisterPatient = () => {
  const {
    newPatient,
    handleChange,
    handleSubmit,
    handleHospitalChange,
    errorMessage,
    formErrors,
    hospitalOptions,
    resetForm,
  } = useRegisterForm();

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "14px", // Match font size with other inputs
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Match font family
      color: "#495057", // Match text color
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "14px", // Match font size with other inputs
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Match font family
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px", // Match font size with other inputs
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Match font family
      color: "#adb5bd", // Match placeholder color
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "14px", // Match font size with other inputs
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Match font family
      color: "#495057", // Match text color
    }),
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />

      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={6} lg={4}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign Up
                </MKTypography>
              </MKBox>
              {errorMessage && (
                <MKBox px={3}>
                  <MKTypography variant="body2" color="error">
                    {errorMessage}
                  </MKTypography>
                </MKBox>
              )}
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {/* First Row */}
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <MKInput
                          type="text"
                          label="Name"
                          fullWidth
                          name="emri"
                          id="emri"
                          placeholder="Name"
                          value={newPatient.emri}
                          onChange={handleChange}
                          required
                          helperText={formErrors.emri}
                        />
                      </MKBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <MKInput
                          type="text"
                          label="Surname"
                          fullWidth
                          name="mbiemri"
                          id="mbiemri"
                          placeholder="Surname"
                          value={newPatient.mbiemri}
                          onChange={handleChange}
                          required
                          helperText={formErrors.mbiemri}
                        />
                      </MKBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKInput
                        type="text"
                        label="Personal ID"
                        fullWidth
                        name="nrPersonal"
                        id="nrPersonal"
                        placeholder="Personal ID"
                        value={newPatient.nrPersonal}
                        onChange={handleChange}
                        required
                        helperText={formErrors.nrPersonal}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <MKInput
                          type="text"
                          label="Birthday"
                          fullWidth
                          name="datelindja"
                          id="datelindja"
                          placeholder="Birthday"
                          value={newPatient.datelindja}
                          onChange={handleChange}
                          required
                        />
                      </MKBox>
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <RadioGroup
                          name="gjinia"
                          value={newPatient.gjinia}
                          onChange={handleChange}
                          row
                        >
                          <FormControlLabel value="Male" control={<Radio />} label="Male" />
                          <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        </RadioGroup>
                      </MKBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <MKInput
                          type="text"
                          label="Address"
                          fullWidth
                          name="adresa"
                          id="adresa"
                          placeholder="Address"
                          value={newPatient.adresa}
                          onChange={handleChange}
                          required
                        />
                      </MKBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <MKInput
                          type="text"
                          label="Phone Number"
                          fullWidth
                          name="nrTel"
                          id="nrTel"
                          placeholder="Phone Number"
                          value={newPatient.nrTel}
                          onChange={handleChange}
                          required
                          helperText={formErrors.emri}
                        />
                      </MKBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <MKInput
                          type="email"
                          label="Email"
                          fullWidth
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={newPatient.email}
                          onChange={handleChange}
                          required
                          helperText={formErrors.email}
                        />
                      </MKBox>
                    </Grid>

                    {/* Third Row */}
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <MKInput
                          type="password"
                          label="Password"
                          fullWidth
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={newPatient.password}
                          onChange={handleChange}
                          required
                          helperText={formErrors.password}
                          autoComplete="new-password"
                        />
                      </MKBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKBox mb={2}>
                        <Select
                          options={hospitalOptions}
                          classNamePrefix="custom-select"
                          value={hospitalOptions.find(
                            (option) => option.value === newPatient.hospitalId
                          )}
                          onChange={handleHospitalChange}
                          placeholder="Select Hospital"
                          styles={customSelectStyles}
                          required
                        />
                      </MKBox>
                    </Grid>
                    <Grid item xs={12}>
                      <MKBox mt={4}>
                        <MKButton variant="gradient" color="info" fullWidth type="submit">
                          Register
                        </MKButton>
                      </MKBox>
                    </Grid>
                  </Grid>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
};

export default RegisterPatient;
