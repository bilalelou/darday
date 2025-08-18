"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// --- Reusable Components (from your login page) ---
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


// --- Main Register Page Component ---
export default function ProfessionalRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (formData.password !== formData.password_confirmation) {
      setError("كلمتا المرور غير متطابقتين.");
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessages = Object.values(data.errors || {}).flat().join(' ');
        throw new Error(errorMessages || "فشل في إنشاء الحساب.");
      }

      localStorage.setItem('api_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');

    } catch (err: any) {
      setError(err.message);
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
              <h1 className="text-2xl font-bold text-[#1E3A5F]">إنشاء حساب جديد</h1>
              <p className="text-gray-500 mt-1">انضم إلينا اليوم وابدأ رحلتك</p>
            </div>
            
            {error && (
              <div className="mt-6 mb-4 text-center bg-red-100 text-red-700 text-sm p-3 rounded-md border border-red-200">
                  {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] pl-10"
                    placeholder="أدخل كلمة المرور"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="password_confirmation"  className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور</label>
                <div className="relative">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] pl-10"
                    placeholder="أعد إدخال كلمة المرور"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A5F] hover:bg-opacity-90 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "إنشاء الحساب"}
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600">لديك حساب بالفعل؟ </span>
                <Link href="/login" className="text-sm text-[#1E3A5F] hover:text-[#D4AF37] font-medium">
                  تسجيل الدخول
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
