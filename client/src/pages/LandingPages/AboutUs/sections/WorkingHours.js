// pages/LandingPages/AboutUs/sections/WorkingHours.js
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function WorkingHours() {
  return (
    <MKBox sx={{ py: 6, textAlign: "center" }}>
      <MKTypography variant="h4" gutterBottom>
        Working Hours
      </MKTypography>
      <MKTypography variant="body1" color="textSecondary">
        Our hospital is open to serve you during the following hours:
        <br />
        <strong>Monday to Sunday:</strong> 08:00 AM - 05:00 PM
        <br />
      </MKTypography>
    </MKBox>
  );
}

export default WorkingHours;
