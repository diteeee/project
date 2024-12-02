import depImage from "../../../../assets/images/10130.jpg";
import docImage from "../../../../assets/images/young-handsome-physician-medical-robe-with-stethoscope.jpg";
import staffImage from "../../../../assets/images/staff.jpg";

import { Link } from "react-router-dom";

export default [
  {
    title: "Explore Further",
    description: "A selection of 5 page sections",
    items: [
      {
        image: depImage,
        name: "Our Hospitals",
        count: 14,
        link: "/sections/OurHospitals",
        component: (
          <Link to="/sections/OurHospitals">
            <div>
              <img src={depImage} alt="Our Hospitals" />
              <h2>Our Hospitals</h2>
              <p>3 hospitals</p>
            </div>
          </Link>
        ),
      },
      {
        image: staffImage,
        name: "Our Departments",
        count: 11,
        link: "/sections/OurDepartments",
        component: (
          <Link to="/sections/OurDepartments">
            <div>
              <img src={staffImage} alt="Our Departments" />
              <h2>Our Departments</h2>
              <p>13 departments</p>
            </div>
          </Link>
        ),
      },
      {
        image: docImage,
        name: "Our Doctors",
        count: 12,
        link: "/sections/OurDoctors",
        component: (
          <Link to="/sections/OurDoctors">
            <div>
              <img src={docImage} alt="Our Doctors" />
              <h2>Our Doctors</h2>
              <p>12 doctors</p>
            </div>
          </Link>
        ),
      },
    ],
  },
];
