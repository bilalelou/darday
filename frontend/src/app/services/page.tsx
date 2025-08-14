import React from 'react';

const LOGO_SVG = () => (
  <svg width="130" height="34" viewBox="0 0 260 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="260" height="68" rx="8" fill="#1E3A5F" />
    <text x="28" y="43" fill="#FFFFFF" fontFamily="Inter, system-ui, -apple-system" fontWeight="700" fontSize="28">DarDay<span style={{fill:'#D4AF37'}}> .ma</span></text>
  </svg>
);

export default function ServicesPage() {
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
          <h1 className="text-5xl font-bold mb-6">خدماتنا</h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            نقدم مجموعة شاملة من الخدمات لمساعدتك في العثور على العقار المثالي
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Services */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">خدماتنا الرئيسية</h2>
            <p className="text-lg text-gray-600">اكتشف كيف يمكننا مساعدتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Daily Rental */}
            <div className="bg-white rounded-lg shadow-lg p-8 border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4 text-center">الكراء اليومي</h3>
              <p className="text-gray-600 text-center mb-6">
                ابحث عن شقق مفروشة للكراء اليومي في جميع المدن المغربية. مثالية للسياح والزوار.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  حجز فوري وسهل
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  صور عالية الجودة
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  دعم 24/7
                </li>
              </ul>
              <div className="text-center">
                <a href="/listings" className="inline-block bg-[#D4AF37] text-[#102030] px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors">
                  ابدأ البحث
                </a>
              </div>
            </div>

            {/* Monthly Rental */}
            <div className="bg-white rounded-lg shadow-lg p-8 border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4 text-center">الكراء الشهري</h3>
              <p className="text-gray-600 text-center mb-6">
                شقق للكراء الشهري بأسعار تنافسية. مثالية للمقيمين والطلاب والعاملين.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  عقود مرنة
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  أسعار شفافة
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  خيارات متعددة
                </li>
              </ul>
              <div className="text-center">
                <a href="/listings" className="inline-block bg-[#D4AF37] text-[#102030] px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors">
                  تصفح العروض
                </a>
              </div>
            </div>

            {/* Property Management */}
            <div className="bg-white rounded-lg shadow-lg p-8 border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4 text-center">إدارة العقارات</h3>
              <p className="text-gray-600 text-center mb-6">
                نقدم خدمات إدارة شاملة لملاك العقارات لمساعدتهم في تحقيق أقصى عائد.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  تسويق احترافي
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  إدارة المستأجرين
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  صيانة دورية
                </li>
              </ul>
              <div className="text-center">
                <a href="/contact" className="inline-block bg-[#D4AF37] text-[#102030] px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors">
                  احصل على عرض
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">خدمات إضافية</h2>
            <p className="text-lg text-gray-600">نقدم خدمات متخصصة لضمان تجربة مثالية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F8F9FA] rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">حماية المستأجرين</h3>
                  <p className="text-gray-600">
                    نضمن حماية كاملة للمستأجرين من خلال نظام دفع آمن وضمانات مالية.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">ضمان الجودة</h3>
                  <p className="text-gray-600">
                    جميع العقارات المعروضة مفحوصة ومتحقق منها لضمان أعلى معايير الجودة.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">دعم 24/7</h3>
                  <p className="text-gray-600">
                    فريق دعم متاح على مدار الساعة لمساعدتك في أي استفسار أو مشكلة.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">حجز فوري</h3>
                  <p className="text-gray-600">
                    احجز عقارك المفضل فوراً من خلال نظام حجز سريع وآمن.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">أسعار الخدمات</h2>
            <p className="text-lg text-gray-600">خطط مرنة تناسب جميع احتياجاتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">المستأجر</h3>
              <div className="text-3xl font-bold text-[#D4AF37] mb-6">مجاناً</div>
              <ul className="text-sm text-gray-600 space-y-3 mb-8">
                <li>تصفح جميع العقارات</li>
                <li>حجز فوري</li>
                <li>دعم العملاء</li>
                <li>تقييمات المستخدمين</li>
              </ul>
              <a href="/register" className="inline-block bg-[#D4AF37] text-[#102030] px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors">
                ابدأ الآن
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#D4AF37] text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#D4AF37] text-[#102030] px-4 py-1 rounded-full text-sm font-semibold">الأكثر شعبية</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">مالك العقار</h3>
              <div className="text-3xl font-bold text-[#D4AF37] mb-6">5%</div>
              <p className="text-sm text-gray-500 mb-4">من قيمة الإيجار</p>
              <ul className="text-sm text-gray-600 space-y-3 mb-8">
                <li>إدراج العقار</li>
                <li>تسويق احترافي</li>
                <li>إدارة الحجوزات</li>
                <li>دعم متخصص</li>
                <li>تقارير مفصلة</li>
              </ul>
              <a href="/contact" className="inline-block bg-[#D4AF37] text-[#102030] px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors">
                ابدأ الآن
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">الخدمات المتقدمة</h3>
              <div className="text-3xl font-bold text-[#D4AF37] mb-6">اتصل بنا</div>
              <p className="text-sm text-gray-500 mb-4">للحصول على عرض مخصص</p>
              <ul className="text-sm text-gray-600 space-y-3 mb-8">
                <li>إدارة كاملة للعقار</li>
                <li>صيانة دورية</li>
                <li>خدمات تنظيف</li>
                <li>دعم قانوني</li>
                <li>تقارير شهرية</li>
              </ul>
              <a href="/contact" className="inline-block bg-[#D4AF37] text-[#102030] px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors">
                احصل على عرض
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">كيف تعمل الخدمة</h2>
            <p className="text-lg text-gray-600">ثلاث خطوات بسيطة للحصول على عقارك المثالي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#102030]">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">ابحث</h3>
              <p className="text-gray-600">
                استخدم أدوات البحث المتقدمة للعثور على العقار المناسب لاحتياجاتك
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#102030]">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">احجز</h3>
              <p className="text-gray-600">
                احجز العقار المفضل لديك من خلال نظام حجز آمن وسريع
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#102030]">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">استمتع</h3>
              <p className="text-gray-600">
                استمتع بإقامة مريحة وآمنة في عقارك المختار
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8B] rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك اليوم</h2>
            <p className="text-xl text-gray-200 mb-8">
              انضم إلى آلاف المستخدمين الراضين واكتشف العقار المثالي لك
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
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1E3A5F] transition-colors"
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
