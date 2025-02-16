import { auth } from "@clerk/nextjs/server";

const getRole = async () => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.role as string;
  return role;
};

export { getRole };
