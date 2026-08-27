import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Category from "@/models/Category";
import CategoryForm from "@/components/admin/categories/CategoryForm";

export const metadata = { title: "Edit Category | CodiceSconto Admin" };

export default async function EditCategoryPage({ params }) {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  const { id } = await params;
  await connectMongo();
  const category = await Category.findById(id).lean();
  if (!category) notFound();
  return <CategoryForm category={{ ...category, _id: category._id.toString() }} />;
}
