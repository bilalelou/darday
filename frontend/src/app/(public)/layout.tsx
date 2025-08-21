"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogIn, UserPlus, Menu, X } from "lucide-react";

// --- مكونات التنقل والفوتر ---
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-10 h-10 bg-[#1E3A5F] rounded-md flex items-center justify-center text-2xl font-bold text-[#D4AF37]">D</div>
          <span className="text-xl font-bold text-[#1E3A5F]">DarDay.ma</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[#1E3A5F]">الرئيسية</Link>
          <Link href="/properties" className="hover:text-[#1E3A5F]">العقارات</Link>
          <Link href="/about" className="hover:text-[#1E3A5F]">من نحن</Link>
          <Link href="/contact" className="hover:text-[#1E3A5F]">اتصل بنا</Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
             <Link href="/login" className="text-[#1E3A5F] font-semibold px-4 py-2 rounded-md hover:bg-gray-100">
                تسجيل الدخول
            </Link>
            <Link href="/register" className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90">
                إنشاء حساب
            </Link>
        </div>

        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)}>
                <Menu className="h-6 w-6 text-gray-700" />
            </button>
        </div>
      </div>

      {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMenuOpen(false)}>
              <div 
                className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white p-6"
                onClick={(e) => e.stopPropagation()}
              >
                  <div className="flex justify-end mb-8">
                      <button onClick={() => setIsMenuOpen(false)}>
                          <X className="h-6 w-6 text-gray-700" />
                      </button>
                  </div>
                  <nav className="flex flex-col items-center gap-6 text-lg font-medium text-gray-700">
                      <Link href="/" onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
                      <Link href="/properties" onClick={() => setIsMenuOpen(false)}>العقارات</Link>
                      <Link href="/about" onClick={() => setIsMenuOpen(false)}>من نحن</Link>
                      <Link href="/contact" onClick={() => setIsMenuOpen(false)}>اتصل بنا</Link>
                  </nav>
                  <div className="mt-8 border-t pt-6 flex flex-col gap-4">
                      <Link href="/login" className="w-full text-center text-[#1E3A5F] font-semibold px-4 py-2 rounded-md bg-gray-100">
                          تسجيل الدخول
                      </Link>
                      <Link href="/register" className="w-full text-center bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-semibold">
                          إنشاء حساب
                      </Link>
                  </div>
              </div>
          </div>
      )}
    </header>
  );
};

const Footer = () => (
    <footer id="contact" className="bg-[#102030] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} DarDay.ma — كل الحقوق محفوظة
        </div>
    </footer>
);

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
