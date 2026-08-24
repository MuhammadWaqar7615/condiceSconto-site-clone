import { getSession } from "./session";
import { redirect } from "next/navigation";
import { ROLES } from "./roles";

export async function authenticateUser(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("Server authentication configuration missing.");
  }

  // Check admin credentials
  if (email === adminEmail && password === adminPassword) {
    return {
      userId: "admin-id-001",
      email: adminEmail,
      role: ROLES.ADMIN,
    };
  }

  // In the future, this is where you would query the database for regular users
  // const user = await User.findOne({ email });
  // if (user && comparePasswords(password, user.password)) return user;

  return null; // Invalid credentials
}

export async function requireAuth() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/account/login");
  }

  return session.user;
}

export async function requireRole(allowedRoles) {
  const user = await requireAuth();

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  if (!roles.includes(user.role)) {
    // If authenticated but wrong role, typically we redirect to their default home page
    // For now we'll redirect to dashboard, or it could be a 403 page.
    redirect("/dashboard");
  }

  return user;
}
