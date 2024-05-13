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
  { label: "Dashboard", href: "/dashboard", level: [100,500,1000,5000,10000] },           // ALL USERS
  { label: "Pediatricians", href: "/pediatricians", level: [100,500,1000,5000,10000] },   // ALL USERS
  { label: "Appointments", href: "/appointments", level: [100,500,1000,5000,10000] },     // ALL USERS
  { label: "My Children", href: "/children", level: [100,500,1000,5000,10000] },          // ALL USERS
  { label: "Medical History", href: "/medical-history", level: [100,500,10000] },         // PARENT, CONSULTANT AND SUPER ADMIN
  { label: "My Availability", href: "/availability", level: [1000] },                     // CONSULTANT
  { label: "Reports", href: "/reports", level: [100, 500, 1000,5000,10000] },                       // CONSULTANT AND ABOVE
  { label: "Posts", href: "/community-posts", level: [5000,10000] },                      // COMPANY ADMIN AND ABOVE
  { label: "Users", href: "/users", level: [5000,10000] },                                // COMPANY ADMIN AND ABOVE
  { label: "User Roles", href: "/user-roles", level: [10000] },                           // SUPER ADMIN
];
