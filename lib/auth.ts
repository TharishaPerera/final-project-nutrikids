import { auth } from "@/auth";

/**
 * Return current user data
 */
export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

/**
 * Return current user role
 */
export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};