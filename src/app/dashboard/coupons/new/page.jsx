import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import Store from "@/models/Store";
import CouponForm from "@/components/admin/coupons/CouponForm";

export const metadata = { title: "Add Coupon | CodiceSconto Admin" };

export default async function NewCouponPage() {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  await connectMongo();
  const stores = (await Store.find({ isActive: { $ne: false } }).select("name").sort({ name: 1 }).lean()).map((store) => ({ _id: store._id.toString(), name: store.name }));
  return <CouponForm stores={stores} />;
}
