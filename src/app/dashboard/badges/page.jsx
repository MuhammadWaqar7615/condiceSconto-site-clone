import Link from "next/link";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Badge from "@/models/Badge";
import BadgeTable from "@/components/admin/badges/BadgeTable";

export const metadata = { title: "Badges | CodiceSconto Admin" };

export default async function BadgesPage() {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  await connectMongo();
  const badges = (await Badge.find().sort({ name: 1 }).lean()).map((badge) => ({ ...badge, _id: badge._id.toString() }));
  return <main className="min-h-screen bg-white"><header className="flex flex-col gap-4 border-b border-gray-200 bg-accent-light px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8"><div><h1 className="text-2xl font-bold text-gray-800">Badges</h1><p className="mt-1 text-sm text-gray-600">Manage badge names and images.</p></div><Link href="/dashboard/badges/new" className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white hover:bg-accent-hover">Add Badge</Link></header><section className="px-4 py-8 md:px-8"><BadgeTable badges={badges} /></section></main>;
}
