import React from 'react';

const LOGO_SVG = () => (
  <svg width="130" height="34" viewBox="0 0 260 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="260" height="68" rx="8" fill="#1E3A5F" />
    <text x="28" y="43" fill="#FFFFFF" fontFamily="Inter, system-ui, -apple-system" fontWeight="700" fontSize="28">DarDay<span style={{fill:'#D4AF37'}}> .ma</span></text>
  </svg>
);

export default function ContactPage() {
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">اتصل بنا</h1>
          <p className="text-lg text-gray-600">نحن هنا لمساعدتك في كل ما تحتاجه</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <h2 className="text-2xl font-semibold text-[#1E3A5F] mb-6">أرسل لنا رسالة</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="أدخل اسمك الأول"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="أدخل اسم العائلة"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الاستفسار</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent">
                  <option>اختر نوع الاستفسار</option>
                  <option>استفسار عام</option>
                  <option>مشكلة تقنية</option>
                  <option>شكوى</option>
                  <option>اقتراح</option>
                  <option>أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#D4AF37] text-[#102030] px-6 py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#F8F9FA] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">معلومات الاتصال</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">الهاتف</h4>
                    <p className="text-gray-600">+212 6X XX XX XX</p>
                    <p className="text-gray-600">+212 5X XX XX XX</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">البريد الإلكتروني</h4>
                    <p className="text-gray-600">info@darday.ma</p>
                    <p className="text-gray-600">support@darday.ma</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#102030]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">العنوان</h4>
                    <p className="text-gray-600">123 شارع محمد الخامس</p>
                    <p className="text-gray-600">الرباط، المغرب</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">ساعات العمل</h3>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>الأحد - الخميس</span>
                  <span>9:00 ص - 6:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span>الجمعة</span>
                  <span>9:00 ص - 1:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span>السبت</span>
                  <span>مغلق</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">تابعنا</h3>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center hover:bg-[#B8941F] transition-colors">
                  <svg className="w-5 h-5 text-[#102030]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center hover:bg-[#B8941F] transition-colors">
                  <svg className="w-5 h-5 text-[#102030]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center hover:bg-[#B8941F] transition-colors">
                  <svg className="w-5 h-5 text-[#102030]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
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
