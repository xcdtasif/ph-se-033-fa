export const roleToPath = {
  TENANT: "tenant",
  LANDLORD: "landlord",
  ADMIN: "admin",
} as const;

export type UserRole = keyof typeof roleToPath;

export const currentYear = new Date().getFullYear();
