import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#5c5c5c] text-white pt-10 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Column 1: Negozi */}
          <div>
            <h4 className="font-bold uppercase mb-4 text-white">Negozi</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Negozi A - E</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Negozi F - J</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Negozi K - O</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Negozi P - T</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Negozi U - Z</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Negozi 0 - 9</a></li>
            </ul>
          </div>

          {/* Column 2: Offerte */}
          <div>
            <h4 className="font-bold uppercase mb-4 text-white">Offerte</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Codici Sconto esclusivi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spedizione Gratuita</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Codici Sconto Amazon</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Codici Sconto eBay</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Codici Sconto Unieuro</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Top Negozi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ultimi Aggiunti</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categorie</a></li>
            </ul>
          </div>

          {/* Column 3: CodiceSconto */}
          <div>
            <h4 className="font-bold uppercase mb-4 text-white">CodiceSconto</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Chi siamo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Come funziona</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contattaci</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aggiungi negozio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pubblica un'offerta</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lavora con noi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 4: Logo & Social */}
          <div className="flex flex-col items-start md:items-end mt-6 md:mt-0">
            <div className="bg-white p-2 mb-6 w-40 flex items-center justify-center rounded">
              <img
                src="/images/placeholder.png"
                alt="CodiceSconto Logo"
                className="max-h-8 object-contain"
              />
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#4a4a4a] py-4 border-t border-[#6b6b6b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400">
          <p>© 2026 CodiceSconto. Tutti i diritti riservati.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-200 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-gray-200 transition-colors">Termini e Condizioni</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
