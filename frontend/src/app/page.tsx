import React from 'react';

/*
  DarDay.ma - Next.js Homepage Component

  **What's New:**
  - Added a "تسجيل الدخول" (Login) button in the header navigation.
  - This button should link to your future /login page.

  **How to use this file:**
  1.  Save this code in your Next.js project at: `frontend/src/app/page.jsx`
  2.  Place your background image at: `frontend/public/hero-background.jpg`
  3.  Ensure your layout file at `frontend/src/app/layout.jsx` has the RTL attribute:
      <html lang="ar" dir="rtl">
*/

// The LOGO_SVG component remains the same.
const LOGO_SVG = () => (
  <svg width="130" height="34" viewBox="0 0 260 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="260" height="68" rx="8" fill="#1E3A5F" />
    <text x="28" y="43" fill="#FFFFFF" fontFamily="Inter, system-ui, -apple-system" fontWeight="700" fontSize="28">DarDay<span style={{fill:'#D4AF37'}}> .ma</span></text>
  </svg>
);

// Mock data for listings.
const sampleListings = [
  {
    id: 1,
    title: 'شقة مفروشة قرب باب الجبس',
    city: 'فاس',
    price: '200 درهم/يوم',
    beds: 2,
    baths: 1,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    title: 'استوديو أنيق بالرباط',
    city: 'الرباط',
    price: '5000 درهم/شهر',
    beds: 1,
    baths: 1,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    title: 'شقة واسعة بمراكش',
    city: 'مراكش',
    price: '3000 درهم/شهر',
    beds: 3,
    baths: 2,
    img: 'https://images.unsplash.com/photo-1560448070-c7e1a6d0d6b8?auto=format&fit=crop&w=800&q=60'
  }
];

// This is the main component for your homepage.
export default function HomePage() {
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

      {/* Hero with search */}
      <section className="relative">
        <div className="h-72 md:h-96 bg-cover bg-center" style={{backgroundImage: `url('/hero-background.jpg')`}} />

        <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">ابحث عن شقتك — يومي أو شهري</h2>

            <form className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-sm text-gray-500">المدينة</label>
                <select className="mt-1 block w-full rounded border-gray-200 p-2">
                  <option>فاس</option>
                  <option>الرباط</option>
                  <option>مراكش</option>
                  <option>الدار البيضاء</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-500">نوع الكراء</label>
                <div className="mt-1 flex gap-2">
                  <label className="flex items-center gap-2"><input type="radio" name="type" defaultChecked/> يومي</label>
                  <label className="flex items-center gap-2"><input type="radio" name="type" /> شهري</label>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">مفروشة / فارغة</label>
                <select className="mt-1 block w-full rounded border-gray-200 p-2">
                  <option>مفروشة</option>
                  <option>فارغة</option>
                </select>
              </div>

              <div>
                <button type="submit" className="w-full bg-[#D4AF37] text-[#102030] px-4 py-2 rounded font-semibold">بحث</button>
              </div>
            </form>

          </div>
        </div>
      </section>

      {/* Featured listings */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-[#1E3A5F] text-center mb-8">عروض مميزة</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleListings.map(listing => (
            <article key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
              <div className="h-48 bg-gray-100">
                <img src={listing.img} alt={listing.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-lg">{listing.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{listing.city}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-[#1E3A5F]">{listing.price}</div>
                    <div className="text-sm text-gray-500">{listing.beds} غرف · {listing.baths} حمام</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-2 border rounded-md text-sm">عرض</button>
                    <button className="px-3 py-2 bg-[#D4AF37] rounded-md text-sm font-semibold">احجز الآن</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Info section */}
        <section className="mt-12 bg-[#F4F4F4] p-8 rounded-lg text-center">
          <h4 className="text-xl font-semibold mb-2">إيجار مريح وسهل</h4>
          <p className="text-gray-700">تصفح آلاف الشقق المفروشة والفارغة في المدن المغربية. عملية حجز بسيطة وشفافة مع دعم مباشر.</p>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#102030] text-white py-8">
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
