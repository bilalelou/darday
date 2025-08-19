"use client";

import React from "react";
import { Search, UserCheck, Home, ShieldCheck, TrendingUp, Key } from "lucide-react";
import Link from "next/link";

// مكون لبطاقة الخدمة
const ServiceCard = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-right transition-transform duration-300 hover:-translate-y-2">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 inline-block mb-4">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 font-serif" dir="rtl">
      {/* Hero Section */}
      <section 
        className="relative py-28 bg-cover bg-center text-white"
        style={{backgroundImage: "url('https://placehold.co/1920x600/1E3A5F/FFFFFF?text=DarDay.ma')"}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            خدماتنا المصممة خصيصاً لك
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            سواء كنت تبحث عن عقار للإيجار أو ترغب في تأجير عقارك، نحن نقدم لك الأدوات والخدمات اللازمة لتحقيق هدفك بسهولة وأمان.
          </p>
        </div>
      </section>

      {/* Services for Renters */}
      <section className="py-16">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">للباحثين عن عقار</h2>
                <p className="text-gray-600 mt-2">نجعل عملية العثور على منزلك القادم تجربة ممتعة وسهلة.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard 
                    icon={Search}
                    title="بحث متقدم"
                    description="استخدم فلاتر البحث الذكية للعثور على العقار الذي يناسب احتياجاتك وميزانيتك بدقة."
                />
                <ServiceCard 
                    icon={ShieldCheck}
                    title="قوائم موثوقة"
                    description="جميع العقارات المعروضة يتم التحقق منها لضمان صحة المعلومات وتوفير تجربة آمنة."
                />
                <ServiceCard 
                    icon={UserCheck}
                    title="تواصل مباشر"
                    description="تواصل مباشرة مع أصحاب العقارات عبر منصتنا لطرح الأسئلة وطلب الحجز بكل سهولة."
                />
            </div>
        </div>
      </section>

      {/* Services for Owners */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">لأصحاب العقارات</h2>
                <p className="text-gray-600 mt-2">نساعدك في الوصول إلى آلاف المستأجرين المحتملين وإدارة عقاراتك بكفاءة.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard 
                    icon={Home}
                    title="إدراج سهل للعقارات"
                    description="أضف عقارك بسهولة مع جميع التفاصيل والصور لجذب انتباه الباحثين عن إيجار."
                />
                <ServiceCard 
                    icon={TrendingUp}
                    title="وصول واسع"
                    description="اعرض عقارك أمام جمهور كبير من المهتمين بالإيجار في جميع أنحاء المغرب."
                />
                <ServiceCard 
                    icon={Key}
                    title="إدارة الحجوزات"
                    description="استقبل طلبات الحجز وقم بإدارتها من خلال لوحة تحكم سهلة الاستخدام (قريباً)."
                />
            </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-12">كيف تعمل المنصة؟</h2>
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 hidden md:block"></div>
                  <div className="relative text-center">
                      <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                      <h3 className="font-bold text-lg">ابحث</h3>
                      <p className="text-gray-600">استخدم فلاتر البحث لتحديد مواصفات العقار الذي تبحث عنه.</p>
                  </div>
                  <div className="relative text-center">
                      <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                      <h3 className="font-bold text-lg">تواصل</h3>
                      <p className="text-gray-600">تواصل مباشرة مع المالك عبر واتساب للاستفسار أو طلب الحجز.</p>
                  </div>
                  <div className="relative text-center">
                      <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                      <h3 className="font-bold text-lg">احجز</h3>
                      <p className="text-gray-600">اتفق على التفاصيل وقم بتأكيد حجزك للاستمتاع بإقامتك.</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
