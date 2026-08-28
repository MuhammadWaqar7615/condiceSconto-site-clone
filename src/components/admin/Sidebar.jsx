'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AUTH_TOKEN_STORAGE_KEY } from '@/config/auth';

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'D' },
    { name: 'Coupons', href: '/dashboard/coupons', icon: 'C' },
    { name: 'Categories', href: '/dashboard/categories', icon: 'K' },
    { name: 'Subcategories', href: '/dashboard/subcategories', icon: 'S' },
    { name: 'Sliders', href: '/dashboard/sliders', icon: 'L' },
    { name: 'Promo banners', href: '/dashboard/promo-banners', icon: 'P' },
    { name: 'Badges', href: '/dashboard/badges', icon: 'B' },
    { name: 'Blog', href: '/dashboard/blog', icon: 'G' },
    { name: 'Users', href: '/dashboard/users', icon: 'U' },
    { name: 'Public stores', href: '/negozi', icon: 'S' },
    { name: 'Public offers', href: '/offerte', icon: 'O' },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white shadow-sm">
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-600">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Profile/Logout Area */}
      <div className="p-4 border-t border-gray-200">
        <form action="/api/auth/logout" method="POST" onSubmit={handleLogout}>
          <button type="submit" className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50">
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-red-50 text-xs font-bold">X</span>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}