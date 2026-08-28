import Link from "next/link";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import PromoBanner from "@/models/PromoBanner";
import PromoBannerTable from "@/components/admin/promo-banners/PromoBannerTable";

export const metadata = { title: "Promo Banners | CodiceSconto Admin" };

export default async function PromoBannersPage() {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  await connectMongo();
  const promoBanners = (await PromoBanner.find().sort({ createdAt: -1 }).lean()).map((banner) => ({ ...banner, _id: banner._id.toString() }));
  return <main className="min-h-screen bg-white"><header className="flex flex-col gap-4 border-b border-gray-200 bg-accent-light px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8"><div><h1 className="text-2xl font-bold text-gray-800">Promo Banners</h1><p className="mt-1 text-sm text-gray-600">Manage promotional banner content.</p></div><Link href="/dashboard/promo-banners/new" className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white hover:bg-accent-hover">Add Promo Banner</Link></header><section className="px-4 py-8 md:px-8"><PromoBannerTable promoBanners={promoBanners} /></section></main>;
}
