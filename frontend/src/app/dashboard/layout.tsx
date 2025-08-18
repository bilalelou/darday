"use client";

import React, { useState, useEffect } from "react"; // 1. استيراد useEffect
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, History, User, Heart, Settings, LogOut, Home, Menu, X } from "lucide-react";

// قائمة الروابط للقائمة الجانبية
const navLinks = [
  { href: "/dashboard", text: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/properties", text: "تصفح العقارات", icon: Home },
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. إضافة التحقق الأمني
  useEffect(() => {
    const token = localStorage.getItem("api_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("api_token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-serif" dir="rtl">
      {/* --- القائمة الجانبية (Sidebar) --- */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-50 border-l border-gray-200 flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:flex`}>
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
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-800 text-white"
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
        {/* --- القائمة العلوية للهاتف --- */}
        <header className="md:hidden bg-white shadow-sm">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-xl font-bold text-gray-800">DarDay</h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
