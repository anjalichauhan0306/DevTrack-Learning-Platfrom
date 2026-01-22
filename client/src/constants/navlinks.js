
const navLinks = {
  guest: [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/courses" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  Student: [
    { label: "Courses", path: "/courses" },
    { label: "Mentors", path: "/mentors" },
    { label: "My Learning", path: "/dashboard" },
    { label: "Resources", path: "/resources" },
  ],
  Educator: [
    { label: "My Courses", path: "/teacher/courses" },
    { label: "Students", path: "/teacher/students" },
    { label: "Analytics", path: "/teacher/analytics" },
    { label: "Resources", path: "/resources" },
  ],
};

export { navLinks };