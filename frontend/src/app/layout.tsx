import Link from "next/link";
import './globals.css'; // تأكد من وجود ملف الـ CSS الخاص بك

// --- مكونات التنقل والفوتر ---
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

export const metadata = {
  title: 'DarDay.ma',
  description: 'منصة DarDay لإدارة العقارات',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}