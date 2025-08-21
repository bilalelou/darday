"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  Package,
  TrendingUp,
  Settings,
  LogOut,
  LayoutGrid,
  Shield,
  ClipboardList,
  Menu, // <-- أيقونة جديدة
  X,      // <-- أيقونة جديدة
} from "lucide-react";

const navLinks = [
  { href: "/admin/dashboard", text: "لوحة التحكم", icon: LayoutGrid },
  { href: "/admin/users", text: "المستخدمون", icon: Users },
  { href: "/admin/properties", text: "العقارات", icon: Package },
  { href: "/admin/rentals", text: "الإيجارات", icon: ClipboardList },
  { href: "/admin/analytics", text: "التحليلات", icon: TrendingUp },
  { href: "/admin/settings", text: "الإعدادات", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة جديدة للتحكم في القائمة

  useEffect(() => {
    const token = localStorage.getItem("api_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("api_token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      {/* --- القائمة الجانبية (Sidebar) --- */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-[#1E3A5F] text-gray-300 flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:flex`}>
        <div className="h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-md flex items-center justify-center text-2xl font-bold text-[#1E3A5F]">
              D
            </div>
            <span className="text-xl font-bold text-white tracking-wider">
              DarDay Admin
            </span>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-[#D4AF37] text-[#D4AF37] bg-[#1E3A5F]">
            <Shield className="h-5 w-5 text-[#D4AF37]" />
            <span className="mr-3">مدير النظام</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.text}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)} // إغلاق القائمة عند التنقل
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-[#D4AF37] text-[#1E3A5F] font-semibold"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mr-3">{link.text}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="mr-3">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* --- القائمة العلوية للهاتف --- */}
        <header className="md:hidden bg-white shadow-sm">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-xl font-bold text-gray-800">DarDay Admin</h1>
                <button onClick={() => setIsSidebarOpen(true)}>
                    <Menu size={24} />
                </button>
            </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
