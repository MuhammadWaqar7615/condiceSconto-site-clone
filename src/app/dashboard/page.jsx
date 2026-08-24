import { requireAuth, requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import Link from "next/link";
import connectMongo from "@/lib/mongodb";
import Store from "@/models/Store";
import StoreTable from "./StoreTable";
import DashboardSearch from "./DashboardSearch";

export const metadata = {
  title: "Admin Dashboard | CodiceSconto",
  description: "Secure admin dashboard.",
};

export default async function DashboardPage({ searchParams }) {
  // This will redirect to /login if unauthenticated
  const user = await requireAuth();
  
  // This will redirect to /dashboard (or show error) if wrong role
  await requireRole(ROLES.ADMIN);
  await connectMongo();

  const sp = await Promise.resolve(searchParams);
  const search = sp?.search || "";
  const letter = sp?.letter || "";

  let query = {};
  
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  
  if (letter) {
    if (letter === "#") {
      // Doesn't start with a letter
      query.name = { ...query.name, $not: /^[a-zA-Z]/ };
    } else {
      // Starts with the specific letter
      query.name = { ...query.name, $regex: `^${letter}`, $options: "i" };
    }
  }

  const rawStores = await Store.find(query).sort({ name: 1 }).lean();
  
  // Serialize stores for Client Component
  const stores = rawStores.map(s => ({
    _id: s._id.toString(),
    name: s.name,
    slug: s.slug,
    logoPath: s.logoPath,
    isActive: s.isActive
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-purple-50">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome, {user.role}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/stores/new"
                className="px-4 py-2 bg-[#835674] text-white rounded-lg text-sm font-medium hover:bg-[#6c4660] transition-colors shadow-sm"
              >
                Add Store
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Store Management</h2>
              
              <DashboardSearch />
              
              <StoreTable stores={stores} />
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
