import { useSession } from "next-auth/react";

/***
 * Get only user current role from the session
 * For client components
 */
export const useCurrentRole = () => {
  const session = useSession();
  return session.data?.user.role;
};
