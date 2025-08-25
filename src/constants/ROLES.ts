// src/types/roles.ts

export const UserRoles = {
    SUPERADMIN: "superadmin",
    ADMIN: "admin",
    DELEGATE: "delegate",
    CLIENT: "client",
} as const;

// ✅ Union type of values
export type UserRole = typeof UserRoles[keyof typeof UserRoles];
