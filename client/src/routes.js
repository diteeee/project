// Assuming you have these imports
import Icon from "@mui/material/Icon";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-in/sign-up";
// import BookingPage from "layouts/pages/authentication/sign-in/booking";

// Sections
import OurHospitals from "pages/Presentation/sections/OurHospitals.js";
import OurDepartments from "pages/Presentation/sections/OurDepartments";
import OurDoctors from "pages/Presentation/sections/OurDoctors";
import SignOutPage from "pages/LandingPages/SignOut";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "hospital",
        collapse: [
          {
            name: "about us",
            route: "/pages/landing-pages/about-us",
            component: <AboutUs />,
            key: "aboutus",
          },
          {
            name: "contact us",
            route: "/pages/landing-pages/contact-us",
            component: <ContactUs />,
            key: "contactus",
          },
        ],
      },
      {
        name: "account",
        collapse: [
          {
            name: "log out",
            route: "/logout",
            component: <SignOutPage />,
            key: "logout",
          },
          {
            name: "sign in",
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
            key: "signin",
          },
          {
            name: "sign up",
            route: "/pages/authentication/sign-in/sign-up",
            component: <SignUp />,
            key: "signup",
          },
        ],
      },
    ],
  },
  {
    name: "sections",
    icon: <Icon>view_day</Icon>,
    collapse: [
      {
        name: "our hospitals",
        route: "/sections/OurHospitals",
        component: <OurHospitals />,
        key: "hospitals",
      },
      {
        name: "our departments",
        route: "/sections/OurDepartments",
        component: <OurDepartments />,
        key: "departments",
      },
      {
        name: "our doctors",
        route: "/sections/OurDoctors",
        component: <OurDoctors />,
        key: "doctors",
      },
    ],
  },
];

export default routes;
