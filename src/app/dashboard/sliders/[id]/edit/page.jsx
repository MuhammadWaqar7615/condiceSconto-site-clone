import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Slider from "@/models/Slider";
import SliderForm from "@/components/admin/sliders/SliderForm";

export const metadata = { title: "Edit Slider | CodiceSconto Admin" };

export default async function EditSliderPage({ params }) {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  const { id } = await params;
  await connectMongo();
  const slider = await Slider.findById(id).lean();
  if (!slider) notFound();
  return <SliderForm slider={{ ...slider, _id: slider._id.toString() }} />;
}
