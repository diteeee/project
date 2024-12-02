// pages/LandingPages/AboutUs/sections/History.js
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function History() {
  return (
    <MKBox sx={{ py: 6, textAlign: "center" }}>
      <MKTypography variant="h4" gutterBottom>
        Our History
      </MKTypography>
      <MKTypography variant="body1" color="textSecondary">
        Founded in 1950, Our Hospital has been a cornerstone of the community for over 70 years. We
        started as a small clinic with a mission to provide quality healthcare to everyone. Over the
        decades, we have expanded to become a leading healthcare provider with state-of-the-art
        facilities and a dedicated team of professionals. Our legacy of compassion and excellence
        continues to drive us as we work towards a healthier future for all.
      </MKTypography>
    </MKBox>
  );
}

export default History;
