"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, History, User, Heart, Settings, LogOut, Bell, Home } from "lucide-react";

// قائمة الروابط الجديدة للقائمة الجانبية
const navLinks = [
  { href: "/dashboard", text: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/properties", text: "العقارات", icon: Home },
  { href: "/dashboard/history", text: "تاريخ الإيجار", icon: History },
  { href: "/dashboard/profile", text: "ملفي الشخصي", icon: User },
  { href: "/dashboard/favorites", text: "قائمة التفضيلات", icon: Heart },
  { href: "/dashboard/settings", text: "الإعدادات", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // حذف التوكن وتوجيه المستخدم لصفحة تسجيل الدخول
    localStorage.removeItem("api_token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-serif" dir="rtl">
      {/* --- القائمة الجانبية (Sidebar) --- */}
      <aside className="w-64 flex-shrink-0 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="h-20 flex items-center px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            لوحة التحكم
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.text}
                href={link.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#1E3A5F] text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="h-5 w-5 ml-3" />
                <span>{link.text}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 ml-3" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* --- المحتوى الرئيسي للصفحات --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
