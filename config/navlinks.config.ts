export const ApplicationName = "NutriKids";

export const TopNavLinks = [
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
  { label: "Community", href: "/community" },
];

export const showDashboardBtnLinks = [
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/community",
  "/community/saved-posts",
  "/community/posts",
  "/community/my-posts",
];

export const SideNavLinks = [
  { label: "Dashboard", href: "/dashboard", level: 100 },               // PARENT 
  { label: "Pediatricians", href: "/pediatricians", level: 100 },       // PARENT 
  { label: "Appointments", href: "/appointments", level: 100 },         // PARENT 
  { label: "Children", href: "/children", level: 100 },                 // PARENT 
  { label: "History", href: "/history", level: 100 },                   // PARENT 
  { label: "My Availability", href: "/availability", level: 1000 },     // CONSULTANT
  { label: "Reports", href: "/reports", level: 1000 },                  // CONSULTANT
  { label: "Users", href: "/users", level: 5000 },                      // COMPANY ADMIN
  { label: "User Roles", href: "/user-roles", level: 10000 },           // SUPER ADMIN
];
