import React from 'react';

const LOGO_SVG = () => (
  <svg width="130" height="34" viewBox="0 0 260 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="260" height="68" rx="8" fill="#1E3A5F" />
    <text x="28" y="43" fill="#FFFFFF" fontFamily="Inter, system-ui, -apple-system" fontWeight="700" fontSize="28">DarDay<span style={{fill:'#D4AF37'}}> .ma</span></text>
  </svg>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div aria-hidden><LOGO_SVG/></div>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a className="hover:underline px-2" href="/">الرئيسية</a>
            <a className="hover:underline px-2" href="/about">من نحن</a>
            <a className="hover:underline px-2" href="/services">خدماتنا</a>
            <a className="hover:underline px-2" href="/contact">اتصل بنا</a>
            <div className="flex items-center gap-2">
                <a href="/login" className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors">تسجيل الدخول</a>
                <button className="bg-[#D4AF37] text-[#102030] px-4 py-2 rounded-md font-semibold">أضف عقار</button>
            </div>
          </nav>

          <div className="md:hidden">
            <button aria-label="menu" className="p-2 bg-white bg-opacity-10 rounded">☰</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8B] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">من نحن</h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            منصة DarDay.ma هي الوجهة الأولى في المغرب للعثور على شقق الكراء اليومي والشهري
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1E3A5F] mb-6">قصتنا</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                بدأت رحلة DarDay.ma في عام 2024 من رؤية بسيطة: جعل عملية البحث عن شقق الكراء في المغرب أكثر سهولة وشفافية. 
                لاحظنا أن العديد من الناس يواجهون صعوبة في العثور على شقق مناسبة للكراء اليومي أو الشهري.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                اليوم، أصبحنا المنصة الرائدة التي تربط بين ملاك العقارات والمستأجرين المحتملين، 
                مما يوفر تجربة سلسة وآمنة للجميع.
              </p>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">رؤيتنا</h3>
                <p className="text-gray-600">أن نكون المنصة الأولى في المغرب للعقارات المؤجرة</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">مهمتنا وقيمنا</h2>
            <p className="text-lg text-gray-600">نحن نعمل بجد لتحقيق رؤيتنا من خلال قيم أساسية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">الموثوقية</h3>
              <p className="text-gray-600">نضمن أن جميع العقارات المعروضة موثوقة ومتحقق منها</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">الأمان</h3>
              <p className="text-gray-600">نوفر بيئة آمنة ومحمية لجميع المستخدمين</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">السرعة</h3>
              <p className="text-gray-600">نوفر خدمة سريعة وفعالة لجميع احتياجاتك</p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8B] rounded-lg p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">أرقام تتحدث</h2>
              <p className="text-xl text-gray-200">إنجازاتنا في أرقام</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">1000+</div>
                <p className="text-gray-200">عقار متاح</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">500+</div>
                <p className="text-gray-200">عميل راضي</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">50+</div>
                <p className="text-gray-200">مدينة مغربية</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">24/7</div>
                <p className="text-gray-200">دعم العملاء</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">فريقنا</h2>
            <p className="text-lg text-gray-600">نفخر بفريقنا المتفاني والمحترف</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">أحمد محمد</h3>
              <p className="text-[#D4AF37] font-medium">المدير التنفيذي</p>
              <p className="text-gray-600 mt-2">خبرة 15 سنة في مجال العقارات والتكنولوجيا</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">فاطمة الزهراء</h3>
              <p className="text-[#D4AF37] font-medium">مدير العمليات</p>
              <p className="text-gray-600 mt-2">متخصصة في إدارة المشاريع وتطوير الأعمال</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">محمد علي</h3>
              <p className="text-[#D4AF37] font-medium">مدير التطوير</p>
              <p className="text-gray-600 mt-2">خبير في تطوير البرمجيات والذكاء الاصطناعي</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-[#F8F9FA] rounded-lg p-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">انضم إلينا اليوم</h2>
            <p className="text-lg text-gray-600 mb-8">
              اكتشف كيف يمكن لـ DarDay.ma أن يساعدك في العثور على العقار المثالي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/listings" 
                className="bg-[#D4AF37] text-[#102030] px-8 py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors"
              >
                تصفح العقارات
              </a>
              <a 
                href="/contact" 
                className="border-2 border-[#1E3A5F] text-[#1E3A5F] px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A5F] hover:text-white transition-colors"
              >
                اتصل بنا
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#102030] text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="mb-3"><LOGO_SVG/></div>
            <p className="text-sm text-gray-200">منصة لعرض شقق الكراء اليومي والشهري في المغرب.</p>
          </div>

          <div>
            <h5 className="font-semibold mb-2">روابط</h5>
            <ul className="text-sm text-gray-200 space-y-1">
              <li><a href="/about" className="hover:text-[#D4AF37]">من نحن</a></li>
              <li><a href="/services" className="hover:text-[#D4AF37]">خدماتنا</a></li>
              <li><a href="/contact" className="hover:text-[#D4AF37]">اتصل بنا</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">اتصل بنا</h5>
            <p className="text-sm text-gray-200">info@darday.ma</p>
            <p className="text-sm text-gray-200">+212 6X XX XX XX</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">© {new Date().getFullYear()} DarDay.ma — كل الحقوق محفوظة</div>
      </footer>
    </div>
  );
}
