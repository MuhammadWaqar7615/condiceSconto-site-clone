import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AggiungiNegozioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Aggiungi un Negozio</h1>
        <p>Segnala un nuovo negozio o un codice sconto.</p>
      </main>
      <Footer />
    </div>
  );
}
