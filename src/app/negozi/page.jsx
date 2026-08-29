import connectMongo from "@/lib/mongodb";
import Store from "@/models/Store";
import NegoziClient from "./NegoziClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tutti i negozi e codici sconto",
  description: "Cerca e trova i migliori codici sconto e offerte dei tuoi negozi preferiti.",
};

export const revalidate = 60;

export default async function NegoziPage() {
  // Fetch active stores from MongoDB
  await connectMongo();
  
  // Find only active stores, select necessary fields, lean for plain objects
  const rawStores = await Store.find({ isActive: { $ne: false } })
    .select("name slug logoPath")
    .sort({ name: 1 })
    .lean();

  // Convert ObjectIds to strings to avoid passing non-serializable objects to Client Components
  const stores = rawStores.map(store => ({
    _id: store._id.toString(),
    name: store.name,
    slug: store.slug,
    logoPath: store.logoPath
  }));

  return <NegoziClient stores={stores} />;
}
