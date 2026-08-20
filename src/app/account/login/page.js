import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Accedi al tuo Account</h1>
        <p>Effettua il login per accedere alle tue funzionalità esclusive.</p>
      </main>
      <Footer />
    </div>
  );
}
