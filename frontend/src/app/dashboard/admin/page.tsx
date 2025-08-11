"use client";

import React from "react";
import Link from "next/link";

const LOGO_SVG = () => (
  <svg
    width="130"
    height="34"
    viewBox="0 0 260 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="260" height="68" rx="8" fill="#1E3A5F" />
    <text
      x="28"
      y="43"
      fill="#FFFFFF"
      fontFamily="Inter, system-ui, -apple-system"
      fontWeight="700"
      fontSize="28"
    >
      DarDay<span style={{ fill: "#D4AF37" }}> .ma</span>
    </text>
  </svg>
);

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div aria-hidden>
              <LOGO_SVG />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link className="hover:underline px-2" href="/">الرئيسية</Link>
            <Link className="hover:underline px-2" href="/dashboard/admin">لوحة الإدارة</Link>
            <Link className="hover:underline px-2" href="/dashboard/user">لوحة المستخدم</Link>
            <a className="hover:underline px-2" href="#contact">اتصل بنا</a>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="bg-[#D4AF37] text-[#102030] px-4 py-2 rounded-md font-semibold"
              >
                إنشاء حساب
              </Link>
            </div>
          </nav>

          <div className="md:hidden">
            <button aria-label="menu" className="p-2 bg-white bg-opacity-10 rounded">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-10 bg-[#F7F7F7]">
        <div className="max-w-6xl mx-auto flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-xl shadow p-5 sticky top-6">
              <div className="text-xs text-gray-500 mb-3">القائمة</div>
              <nav className="space-y-1 text-sm">
                <Link href="/dashboard/admin" className="block px-3 py-2 rounded-md bg-[#1E3A5F] text-white">لوحة الإدارة</Link>
                <Link href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">المستخدمون</Link>
                <Link href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">العقارات</Link>
                <Link href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">الحجوزات</Link>
                <Link href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">الإعدادات</Link>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">لوحة التحكم — الإدارة</h1>

            {/* Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow p-5">
                <div className="text-sm text-gray-500">عدد المستخدمين</div>
                <div className="text-2xl font-bold mt-2">1,245</div>
              </div>
              <div className="bg-white rounded-xl shadow p-5">
                <div className="text-sm text-gray-500">عدد العقارات</div>
                <div className="text-2xl font-bold mt-2">382</div>
              </div>
              <div className="bg-white rounded-xl shadow p-5">
                <div className="text-sm text-gray-500">حجوزات هذا الشهر</div>
                <div className="text-2xl font-bold mt-2">97</div>
              </div>
            </section>

            {/* Actions */}
            <section className="bg-white rounded-xl shadow p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">إجراءات سريعة</h2>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-[#1E3A5F] text-white rounded-md">إضافة عقار</button>
                <button className="px-4 py-2 border rounded-md">إدارة المستخدمين</button>
                <button className="px-4 py-2 border rounded-md">مراجعة الحجوزات</button>
              </div>
            </section>

            {/* Recent items */}
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">آخر الأنشطة</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b pb-3">
                  <span>تمت إضافة عقار جديد في فاس</span>
                  <span className="text-gray-500">قبل 10 دقائق</span>
                </li>
                <li className="flex justify-between border-b pb-3">
                  <span>مستخدم جديد قام بالتسجيل</span>
                  <span className="text-gray-500">قبل ساعة</span>
                </li>
                <li className="flex justify-between">
                  <span>حجز جديد لعقار في الرباط</span>
                  <span className="text-gray-500">اليوم</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#102030] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="mb-3">
              <LOGO_SVG />
            </div>
            <p className="text-sm text-gray-200">
              منصة لعرض شقق الكراء اليومي والشهري في المغرب.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-2">روابط</h5>
            <ul className="text-sm text-gray-200 space-y-1">
              <li>الأسئلة المتكررة</li>
              <li>شروط الاستخدام</li>
              <li>سياسة الخصوصية</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">اتصل بنا</h5>
            <p className="text-sm text-gray-200">info@darday.ma</p>
            <p className="text-sm text-gray-200">+212 6X XX XX XX</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DarDay.ma — كل الحقوق محفوظة
        </div>
      </footer>
    </div>
  );
}


