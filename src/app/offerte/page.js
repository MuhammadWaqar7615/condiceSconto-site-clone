import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
  { id: 1, name: "Animali", image: "image-02.jpg", sub: [] },
  { id: 2, name: "Articoli infanzia e Prémaman", image: "image-03.jpg", sub: [] },
  { id: 3, name: "Auto e Moto", image: "image-04.jpg", sub: [] },
  {
    id: 4, name: "Casa e Giardino", image: "image-05.jpg", sub: [
      "Casalinghi, Cucina e Ferramenta",
      "Giardino e Giardinaggio",
      "Mobili e Arredamento",
      "Pulizia e Sicurezza della casa"
    ]
  },
  {
    id: 5, name: "Cibi e Bevande", image: "image-06.jpg", sub: [
      "Bevande e Alcolici",
      "Caffè, Cialde e Capsule",
      "Prodotti alimentari"
    ]
  },
  { id: 6, name: "Cosmetici e Profumi", image: "image-07.jpg", sub: [] },
  {
    id: 7, name: "Elettronica", image: "image-08.jpg", sub: [
      "Articoli tecnologici",
      "Audio, Video e TV",
      "Domotica e Smart home",
      "Grandi elettrodomestici",
      "Piccoli elettrodomestici",
      "Sigaretta elettronica",
      "Smartphone e Telefoni"
    ]
  },
  { id: 8, name: "Energia", image: "image-09.jpg", sub: [] },
  { id: 9, name: "Fotografia e Stampa", image: "image-10.jpg", sub: [] },
  {
    id: 10, name: "Giochi e Hobby", image: "image-11.jpg", sub: [
      "Bricolage, Caccia e Pesca",
      "Console e Videogiochi",
      "Giocattoli"
    ]
  },
  { id: 11, name: "Gioielli e Orologi", image: "image-12.jpg", sub: [] },
  { id: 12, name: "Gruppi d'acquisto", image: "image-13.jpg", sub: [] },
  { id: 13, name: "Idee regalo e Gadget", image: "image-14.jpg", sub: [] },
  {
    id: 14, name: "Informatica", image: "image-15.jpg", sub: [
      "Cartucce e Toner",
      "Computer, Notebook e Tablet",
      "Periferiche e Accessori informatici",
      "Software e Applicazioni"
    ]
  },
  { id: 15, name: "Integratori", image: "image-16.jpg", sub: [] },
  {
    id: 16, name: "Internet e Comunicazione", image: "image-17.jpg", sub: [
      "Formazione e Lavoro",
      "Hosting, Domini e Siti web",
      "Telefonia, fibra e ADSL"
    ]
  },
  {
    id: 17, name: "Intrattenimento", image: "image-19.jpg", sub: [
      "Biglietti, Concerti ed Eventi",
      "Film in DVD e Blu-ray",
      "TV e Contenuti in streaming"
    ]
  },
  {
    id: 18, name: "Libri e Musica", image: "image-20.jpg", sub: [
      "Abbonamenti, Giornali e Riviste",
      "Libri e Manuali",
      "Musica in CD e Vinile",
      "Strumenti musicali e Accessori"
    ]
  },
  { id: 19, name: "Megastore", image: "image-21.jpg", sub: [] },
  {
    id: 20, name: "Moda e Accessori", image: "image-22.jpg", sub: [
      "Abbigliamento",
      "Borse e Accessori",
      "Moda bambini e ragazzi",
      "Scarpe"
    ]
  },
  { id: 21, name: "Parchi divertimento", image: "image-23.jpg", sub: [] },
  {
    id: 22, name: "Salute e Farmacia", image: "image-24.jpg", sub: [
      "Articoli sexy",
      "Farmacia",
      "Occhiali e Lenti a contatto",
      "Salute e Benessere"
    ]
  },
  {
    id: 23, name: "Servizi vari", image: "image-25.jpg", sub: [
      "Assicurazioni",
      "Servizi a domicilio",
      "Servizi finanziari"
    ]
  },
  { id: 24, name: "Sport e Fitness", image: "image-26.jpg", sub: [] },
  {
    id: 25, name: "Ufficio e Forniture", image: "image-27.jpg", sub: [
      "Articoli e Arredamento ufficio",
      "Cartoleria e Cancelleria"
    ]
  },
  {
    id: 26, name: "Viaggi, Voli e Hotel", image: "image-28.jpg", sub: [
      "Autonoleggio",
      "Casa e Campeggio",
      "Hotel",
      "Trasporti",
      "Vacanze",
      "Voli"
    ]
  }
];

export default function OffertePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-[#835674] w-full py-4 mb-4">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <h1 className="text-white text-2xl font-light">Tutte le categorie</h1>
        </div>
      </div>

      <main className="flex-grow w-full">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {categories.map((category) => (
              <div key={category.id} className="bg-white shadow-sm flex flex-col">
                <img
                  src={`/images-page3/${category.image}`}
                  alt={category.name}
                  className="w-full h-[150px] object-cover"
                />
                <div className="p-3 px-10">
                  <h2 className="text-[#78546b] font-bold text-[14px] mb-1">{category.name}</h2>
                  {category.sub.length > 0 && (
                    <ul className="mt-2">
                      {category.sub.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-[#666] text-[14px] border-t border-dotted border-[#e5e5e5]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Breadcrumb */}
          <div className="text-[12px] text-gray-500 mb-8 border-t border-[#eaeaea] pt-4">
            <span className="hover:underline cursor-pointer">CodiceSconto</span> {'>'} <span className="hover:underline cursor-pointer">Categorie</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
