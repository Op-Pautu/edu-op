import { auth } from "@clerk/nextjs/server";

const getRole = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return { currentUserId: userId, role };
};

export { getRole };
