import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoresHeader from "@/components/stores/StoresHeader";
import AlphabetNavigation from "@/components/stores/AlphabetNavigation";
import StoresList from "@/components/stores/StoresList";
import { stores, alphabetLetters, getStoresByLetter } from "@/data/stores/storesData";

export const metadata = {
  title: "Tutti i Negozi - CodiceSconto",
  description: "Scopri tutti i negozi su CodiceSconto. Trova codici sconto e offerte per i tuoi negozi preferiti.",
};

export default function NegoziPage() {
  const storesByLetter = getStoresByLetter();
  const storeCount = stores.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="flex-grow pb-[60px]">
        {/* Container matching reference width */}
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <StoresHeader storeCount={storeCount} />
          <AlphabetNavigation letters={alphabetLetters} />
          <StoresList storesByLetter={storesByLetter} letters={alphabetLetters} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
