import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/home/DealCard";
import Link from "next/link";
import connectMongo from "@/lib/mongodb";
import Category from "@/models/Category";
import Subcategory from "@/models/Subcategory";
import Store from "@/models/Store";
import Coupon from "@/models/Coupon";

export const revalidate = 60;

export default async function SubcategoryPage({ params }) {
  await connectMongo();
  const { categorySlug, subcategorySlug } = await params;

  // 1. Fetch category and subcategory
  const category = await Category.findOne({ slug: categorySlug, status: "enabled" }).lean();
  if (!category) {
    notFound();
  }

  const subcategory = await Subcategory.findOne({ 
    slug: subcategorySlug, 
    parentCategory: category._id,
    status: "enabled" 
  }).lean();
  
  if (!subcategory) {
    notFound();
  }

  // 2. Fetch stores that have this subcategory
  const stores = await Store.find({ subcategories: subcategory._id, isActive: true }).lean();
  const storeIds = stores.map(store => store._id);

  // 3. Fetch active coupons for these stores
  const now = new Date();
  const coupons = await Coupon.find({
    storeId: { $in: storeIds },
    isActive: true,
    $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gte: now } }],
  }).populate("storeId", "name slug logoPath").lean();

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-primary-dark w-full py-4 mb-4">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <h1 className="text-white text-2xl font-light">
            Offerte e codici sconto <span className="font-bold">{subcategory.title}</span>
          </h1>
          {subcategory.description && (
            <p className="text-white/80 mt-2 text-sm">{subcategory.description}</p>
          )}
        </div>
      </div>

      <main className="flex-grow w-full mb-12">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <div className="text-[12px] text-gray-500 mb-6 border-b border-[#eaeaea] pb-4">
            <Link href="/" className="hover:underline cursor-pointer">CodiceSconto</Link> {'>'}{" "}
            <Link href="/offerte" className="hover:underline cursor-pointer">Categorie</Link> {'>'}{" "}
            <Link href={`/offerte/${category.slug}`} className="hover:underline cursor-pointer">{category.title}</Link> {'>'}{" "}
            <span className="text-gray-800 font-semibold">{subcategory.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-accent inline-block pb-1 mb-4">
                  Tutti i coupon {subcategory.title}
                </h2>
              </div>

              {coupons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
                  {coupons.map(coupon => (
                    <DealCard key={coupon._id.toString()} deal={coupon} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 text-center text-gray-500 rounded border border-gray-100">
                  Nessun coupon trovato per questa sottocategoria al momento.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
