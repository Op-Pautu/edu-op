import { auth } from "@clerk/nextjs/server";

const getRole = async () => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return role;
};

export { getRole };
