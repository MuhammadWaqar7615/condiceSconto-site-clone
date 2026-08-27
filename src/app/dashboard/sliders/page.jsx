import Link from "next/link";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Slider from "@/models/Slider";
import SliderTable from "@/components/admin/sliders/SliderTable";

export const metadata = { title: "Sliders | CodiceSconto Admin" };

export default async function SlidersPage() {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  await connectMongo();
  const sliders = (await Slider.find().sort({ featured: -1, createdAt: -1 }).lean()).map((slider) => ({ ...slider, _id: slider._id.toString() }));
  return <main className="min-h-screen bg-white"><header className="flex flex-col gap-4 border-b border-gray-200 bg-accent-light px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8"><div><h1 className="text-2xl font-bold text-gray-800">Sliders</h1><p className="mt-1 text-sm text-gray-600">Manage homepage slider content.</p></div><Link href="/dashboard/sliders/new" className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white hover:bg-accent-hover">Add Slider</Link></header><section className="px-4 py-8 md:px-8"><SliderTable sliders={sliders} /></section></main>;
}
