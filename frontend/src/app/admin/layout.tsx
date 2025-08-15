"use client";

import React, { useEffect } from "react";
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
  ClipboardList, // 1. استيراد أيقونة جديدة
} from "lucide-react";

// 2. إضافة الرابط الجديد "الإيجارات"
const navLinks = [
  { href: "/admin/dashboard", text: "لوحة التحكم", icon: LayoutGrid },
  { href: "/admin/users", text: "المستخدمون", icon: Users },
  { href: "/admin/properties", text: "العقارات", icon: Package },
  { href: "/admin/rentals", text: "الإيجارات", icon: ClipboardList }, // <-- الرابط الجديد
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

  useEffect(() => {
    const token = localStorage.getItem("api_token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("api_token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      <aside className="w-64 flex-shrink-0 bg-[#1E3A5F] text-gray-300 flex flex-col font-serif">
        <div className="h-16 flex items-center px-6 space-x-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-md flex items-center justify-center text-2xl font-bold text-[#1E3A5F]">
            D
          </div>
          <span className="text-xl font-bold text-white tracking-wider">
            DarDay Admin
          </span>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
