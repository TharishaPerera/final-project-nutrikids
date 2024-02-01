import { auth } from "@/auth";

/**
 * Return current user data
 * For sever components
 */
export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

/**
 * Return current user role
 * For sever components
 */
export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};