import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Category from "@/models/Category";
import Subcategory from "@/models/Subcategory";
import SubcategoryForm from "@/components/admin/subcategories/SubcategoryForm";

export const metadata = { title: "Edit Subcategory | CodiceSconto Admin" };

export default async function EditSubcategoryPage({ params }) {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  const { id } = await params;
  await connectMongo();
  const [subcategory, categories] = await Promise.all([
    Subcategory.findById(id).lean(),
    Category.find().sort({ title: 1 }).lean(),
  ]);
  if (!subcategory) notFound();

  return <SubcategoryForm subcategory={{ ...subcategory, _id: subcategory._id.toString(), parentCategory: subcategory.parentCategory.toString() }} categories={categories.map((category) => ({ _id: category._id.toString(), title: category.title }))} />;
}
