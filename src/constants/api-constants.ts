const API_ENDPOINTS = {
  ROOT: "/",

  AUTH: {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
  },

  USERS: {
    LIST: "/users/list",
    CREATE: "/users/create",
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}/update`,
    DELETE: (id: string) => `/users/${id}/delete`,
  },

  APARTMENTS: {
    LIST: "/apartments/list",
    CREATE: "/apartments/create",
    DETAIL: (id: string) => `/apartments/${id}`,
    UPDATE: (id: string) => `/apartments/${id}/update`,
    DELETE: (id: string) => `/apartments/${id}/delete`,
  },

  METERS: {
    LIST: "/meters/list",
    CREATE: "/meters/create",
    DETAIL: (id: string) => `/meters/${id}`,
    UPDATE: (id: string) => `/meters/${id}/update`,
    DELETE: (id: string) => `/meters/${id}/delete`,
  },

  BILLS: {
    LIST: "/bills/list",
    CREATE: "/bills/create",
    DETAIL: (id: string) => `/bills/${id}`,
    UPDATE: (id: string) => `/bills/${id}/update`,
    DELETE: (id: string) => `/bills/${id}/delete`,
  },
};

export default API_ENDPOINTS;
