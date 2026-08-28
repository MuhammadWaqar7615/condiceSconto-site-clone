import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Category from "@/models/Category";
import SubcategoryForm from "@/components/admin/subcategories/SubcategoryForm";

export const metadata = { title: "Add Subcategory | CodiceSconto Admin" };

export default async function NewSubcategoryPage() {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  await connectMongo();
  const categories = (await Category.find().sort({ title: 1 }).lean()).map((category) => ({ _id: category._id.toString(), title: category.title }));
  return <SubcategoryForm categories={categories} />;
}
