import { useSession } from "next-auth/react";

/***
 * Get only user data from the session
 * For client components
 */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
