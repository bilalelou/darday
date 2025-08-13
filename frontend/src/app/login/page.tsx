"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

// --- مكونات إضافية ---
const Navigation = () => (
    <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#1E3A5F] rounded-md flex items-center justify-center text-2xl font-bold text-[#D4AF37]">D</div>
                <span className="text-xl font-bold text-[#1E3A5F]">DarDay.ma</span>
            </Link>
            
            {/* Main Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <Link href="/" className="hover:text-[#1E3A5F]">الرئيسية</Link>
                <Link href="/about" className="hover:text-[#1E3A5F]">من نحن</Link>
                <Link href="/services" className="hover:text-[#1E3A5F]">الخدمات</Link>
                <Link href="/contact" className="hover:text-[#1E3A5F]">اتصل بنا</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
                 <Link href="/login" className="text-[#1E3A5F] font-semibold px-4 py-2 rounded-md hover:bg-gray-100">
                    تسجيل الدخول
                </Link>
                <Link href="/register" className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90">
                    إنشاء حساب
                </Link>
            </div>
        </div>
    </header>
);

const Footer = () => (
    <footer id="contact" className="bg-[#102030] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} DarDay.ma — كل الحقوق محفوظة
        </div>
    </footer>
);


// --- المكون الرئيسي للصفحة ---
export default function ProfessionalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        user?: { role?: "admin" | "user" };
        token?: string;
      };

      if (response.ok && data?.success && data.user && data.token) {
        localStorage.setItem('api_token', data.token);
        const destination = data.user.role === "admin" ? "/admin/dashboard" : "/dashboard";
        router.push(destination); // توجيه المستخدم مباشرة
      } else {
        setError(data?.message ?? "فشل تسجيل الدخول. يرجى التحقق من بياناتك.");
      }
    } catch {
      setError("حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" dir="rtl">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E3A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#D4AF37] font-bold text-3xl">D</span>
              </div>
              <h1 className="text-2xl font-bold text-[#1E3A5F]">مرحباً بعودتك</h1>
              <p className="text-gray-500 mt-1">سجل الدخول إلى حساب DarDay الخاص بك</p>
            </div>
            
            {error && (
              <div className="mt-6 mb-4 text-center bg-red-100 text-red-700 text-sm p-3 rounded-md border border-red-200">
                  {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] pl-10"
                    placeholder="أدخل كلمة المرور"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="rememberMe" onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#1E3A5F] focus:ring-[#D4AF37]" />
                  <label htmlFor="rememberMe" className="text-sm text-gray-600 mr-2">تذكرني</label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#1E3A5F] hover:text-[#D4AF37]">
                  هل نسيت كلمة المرور؟
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A5F] hover:bg-opacity-90 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري التحقق..." : "تسجيل الدخول"}
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600">ليس لديك حساب؟ </span>
                <Link href="/register" className="text-sm text-[#1E3A5F] hover:text-[#D4AF37] font-medium">
                  أنشئ حساباً
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
