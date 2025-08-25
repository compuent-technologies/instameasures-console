const ROUTES = {
  //  Routes
  DASHBOARD: {
    OVERVIEW: "/",
    CLIENTS: "clients",
    SUPERADMINS: "superadmins",
    APARTMENTS: "apartments",
    TICKETS: "tickets",
    PAYMENTS: "payments",
    NOTIFICATIONS: "notifications",
    SETTINGS: "settings",

    // Apartment Nested Routes
    APARTMENT_DETAIL: '/apartments/:apartmentId',
    APARTMENT_METERS: '/apartments/:apartmentId/meters',
    APARTMENT_USERS: '/apartments/:apartmentId/users',
    APARTMENT_RATE_CONFIG: '/apartments/:apartmentId/rate-config',
  },

  NAVIGATE: {
    APARTMENT_DETAIL: (id: string) => `/apartments/${id}`,
    APARTMENT_METERS: (id: string) => `/apartments/${id}/meters`,
    APARTMENT_USERS: (id: string) => `/apartments/${id}/users`,
    APARTMENT_RATE_CONFIG: (id: string) => `/apartments/${id}/rate-config`,
  },

  // Authentication Routes
  LOGIN: "/login",
  VERIFICATION: "/verification",

  // Miscellaneous Routes
  ROOT: "/",
  NOT_FOUND: "*",
};

export default ROUTES;
