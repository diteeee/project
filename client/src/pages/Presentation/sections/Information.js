import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";
import { useUser } from "context/UserContext";

function Information() {
  const { user } = useUser();
  const role = user ? user.role : "guest";
  const token = localStorage.getItem("token");

  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Feel the
                    <br />
                    Healing Touch
                  </>
                }
                description="All the best doctors that you need to be healthy and feel young."
              />
              <RotatingCardBack
                image={bgBack}
                title={role === "admin" ? "Go to Dashboard" : "Embrace Wellness Here"}
                description={
                  role === "admin"
                    ? "Manage the hospital and all departments."
                    : "You will be feeling healthier by the day."
                }
                action={
                  role === "admin"
                    ? {
                        type: "internal",
                        route: `http://localhost:3006/admin/dashboard?token=${token}`,
                        label: "Go to Dashboard",
                      }
                    : {
                        type: "internal",
                        route: "/pages/authentication/sign-in/booking",
                        label: "Book appointment",
                      }
                }
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="Our Hospital"
                  description="Dedicated to providing exceptional care, where every patient is treated with dignity, respect, and the expertise they deserve."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="Our Staff"
                  description="Nurses so caring, they make your teddy bear jealous."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="Our Departments"
                  description="Explore our comprehensive range of specialized departments, dedicated to providing exceptional care tailored to your unique health needs"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Foundation"
                  description="Established by leading medical minds, committed to your health."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
