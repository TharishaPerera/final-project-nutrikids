import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, 10);
};
