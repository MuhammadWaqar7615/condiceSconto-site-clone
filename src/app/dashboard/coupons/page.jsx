import { requireAuth, requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import Link from "next/link";
import connectMongo from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import CouponTable from "./CouponTable";

export const metadata = {
  title: "Manage Coupons | CodiceSconto Admin",
};

export default async function CouponsPage() {
  const user = await requireAuth();
  await requireRole(ROLES.ADMIN);
  await connectMongo();

  // Fetch all coupons and populate store information
  const rawCoupons = await Coupon.find()
    .populate("storeId", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  // Serialize for Client Component
  const coupons = rawCoupons.map(c => ({
    _id: c._id.toString(),
    store: c.storeId ? {
      _id: c.storeId._id.toString(),
      name: c.storeId.name,
      slug: c.storeId.slug
    } : null,
    type: c.type,
    title: c.title,
    description: c.description,
    discount: c.discount,
    code: c.code,
    couponUrl: c.couponUrl,
    terms: c.terms,
    isActive: c.isActive,
    isFeatured: c.isFeatured,
    startsAt: c.startsAt ? c.startsAt.toISOString() : null,
    expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
    createdAt: c.createdAt ? c.createdAt.toISOString() : null,
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full">
          
        <div className="px-4 md:px-8 py-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-accent-light">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Coupons</h1>
            <p className="text-sm text-gray-600 mt-1">Admin Dashboard / Coupons</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              href="/dashboard"
              className="w-full md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm text-center"
            >
              Back to Stores
            </Link>
          </div>
        </div>
        
        <div className="px-4 md:px-8 py-8 w-full">
          <div className="mb-6 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Coupons</h2>
            
            {/* Note: The ability to create coupons is done via the Store table row click. 
                We could add a direct create button here if we built a more complex modal that also includes a Store selector. 
                For now, we just list and manage them. */}
            
            <CouponTable coupons={coupons} />
          </div>
        </div>
          
      </div>
    </main>
  );
}
