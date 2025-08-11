"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (response.ok && data?.success) {
        setSuccess(data.message ?? "تم تسجيل الدخول بنجاح");
        // Redirect after a short delay so the user can see the success message
        setTimeout(() => router.push("/"), 800);
      } else {
        setError(data?.message ?? "تعذر تسجيل الدخول. يرجى المحاولة لاحقًا");
      }
    } catch {
      setError("حدث خطأ غير متوقع. تحقق من الاتصال بالخادم");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            <Link className="hover:underline px-2" href="/">المدن</Link>
            <Link className="hover:underline px-2" href="/">كيف تحجز</Link>
            <a className="hover:underline px-2" href="#contact">اتصل بنا</a>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
              >
                تسجيل الدخول
              </Link>
              <button className="bg-[#D4AF37] text-[#102030] px-4 py-2 rounded-md font-semibold">
                أضف عقار
              </button>
            </div>
          </nav>

          <div className="md:hidden">
            <button aria-label="menu" className="p-2 bg-white bg-opacity-10 rounded">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Main/login card */}
      <main className="flex-1 flex items-center justify-center bg-[#F7F7F7] px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-[#1E3A5F] mb-6 text-center">تسجيل الدخول</h1>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md bg-green-50 p-3 text-green-700 text-sm border border-green-200">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] text-[#102030] py-2 rounded-md font-semibold hover:opacity-95 disabled:opacity-60"
            >
              {isSubmitting ? "جاري الدخول…" : "دخول"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            ليس لديك حساب؟ {" "}
            <Link href="/register" className="text-[#1E3A5F] underline">
              إنشاء حساب
            </Link>
          </p>
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


