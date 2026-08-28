import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Badge from "@/models/Badge";
import BadgeForm from "@/components/admin/badges/BadgeForm";

export const metadata = { title: "Edit Badge | CodiceSconto Admin" };

export default async function EditBadgePage({ params }) {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  const { id } = await params;
  await connectMongo();
  const badge = await Badge.findById(id).lean();
  if (!badge) notFound();
  return <BadgeForm badge={{ ...badge, _id: badge._id.toString() }} />;
}
