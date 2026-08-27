import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import PromoBanner from "@/models/PromoBanner";
import PromoBannerForm from "@/components/admin/promo-banners/PromoBannerForm";

export const metadata = { title: "Edit Promo Banner | CodiceSconto Admin" };

export default async function EditPromoBannerPage({ params }) {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  const { id } = await params;
  await connectMongo();
  const promoBanner = await PromoBanner.findById(id).lean();
  if (!promoBanner) notFound();
  return <PromoBannerForm promoBanner={{ ...promoBanner, _id: promoBanner._id.toString() }} />;
}
