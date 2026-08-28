import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import UserForm from "@/components/admin/users/UserForm";

export const metadata = { title: "Edit User | CodiceSconto Admin" };

export default async function EditUserPage({ params }) {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  const { id } = await params;
  await connectMongo();
  const user = await User.findById(id).select("-passwordHash").lean();
  if (!user) notFound();
  return <UserForm user={{ ...user, _id: user._id.toString() }} />;
}
