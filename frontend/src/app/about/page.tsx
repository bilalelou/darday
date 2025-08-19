"use client";

import React from "react";
import { Users, Target, Eye, Linkedin, Twitter, ShieldCheck, Search, Handshake } from "lucide-react";
import Link from "next/link";

// مكون لبطاقة "لماذا تختارنا؟"
const FeatureCard = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-6 rounded-lg text-right shadow-sm hover:shadow-lg transition-shadow">
            <Icon className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

// مكون لبطاقة عضو الفريق
const TeamMemberCard = ({ name, role, imageUrl }: { name: string, role: string, imageUrl: string }) => (
    <div className="text-center group">
        <div className="relative w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h4 className="font-bold text-lg text-gray-800">{name}</h4>
        <p className="text-gray-500">{role}</p>
        <div className="flex justify-center space-x-3 rtl:space-x-reverse mt-2">
            <a href="#" className="text-gray-400 hover:text-blue-600"><Twitter size={18} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600"><Linkedin size={18} /></a>
        </div>
    </div>
);

export default function AboutPage() {
  return (
    <div className="bg-gray-50 font-serif" dir="rtl">
      {/* Hero Section */}
      <section 
        className="relative py-28 bg-cover bg-center text-white"
        style={{backgroundImage: "url('https://placehold.co/1920x800/1E3A5F/FFFFFF?text=DarDay.ma')"}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            نحن نُعيد تعريف تجربة الإيجار في المغرب
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            مهمتنا هي توفير منصة آمنة وموثوقة تربط بين أصحاب العقارات والباحثين عنها بكل سهولة ويسر.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">لماذا تختار DarDay.ma؟</h2>
                <p className="text-gray-600 mt-2">نحن نقدم أكثر من مجرد قائمة عقارات.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={ShieldCheck}
                    title="منصة موثوقة"
                    description="جميع العقارات المعروضة يتم التحقق منها لضمان الجودة والأمان لعملائنا."
                />
                <FeatureCard 
                    icon={Search}
                    title="خيارات واسعة"
                    description="مجموعة متنوعة من العقارات في جميع أنحاء المغرب لتناسب جميع الاحتياجات والميزانيات."
                />
                <FeatureCard 
                    icon={Handshake}
                    title="عملية سهلة"
                    description="تجربة مستخدم بسيطة وواضحة من البحث وحتى التواصل مع المالك لطلب الحجز."
                />
            </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <img src="https://placehold.co/600x400" alt="قصتنا" className="rounded-lg shadow-lg" />
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">قصتنا</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        تأسست DarDay.ma من شغف بتبسيط سوق العقارات المعقد. لاحظنا وجود فجوة بين أصحاب العقارات الذين يجدون صعوبة في الوصول إلى المستأجرين المناسبين، والباحثين عن سكن الذين يواجهون تحديات في العثور على مكان موثوق. من هنا، ولدت فكرة إنشاء منصة مركزية تجمع الطرفين بشفافية وأمان.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        نحن نؤمن بأن العثور على المنزل المثالي يجب أن يكون تجربة ممتعة وليست عبئاً. لذلك، نركز على توفير أدوات بحث متقدمة، صور عالية الجودة، وتواصل مباشر لتسهيل هذه العملية.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">تعرف على فريقنا</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <TeamMemberCard name="أحمد علي" role="المؤسس والرئيس التنفيذي" imageUrl="https://placehold.co/160x160" />
                <TeamMemberCard name="فاطمة الزهراء" role="مديرة العمليات" imageUrl="https://placehold.co/160x160" />
                <TeamMemberCard name="يوسف أمين" role="رئيس قسم التكنولوجيا" imageUrl="https://placehold.co/160x160" />
                <TeamMemberCard name="سارة كرم" role="مديرة التسويق" imageUrl="https://placehold.co/160x160" />
            </div>
        </div>
      </section>

       {/* Call to Action Section */}
      <section className="bg-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للعثور على منزلك القادم؟</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">تصفح مئات العقارات المتاحة في جميع أنحاء المغرب أو اعرض عقارك معنا اليوم.</p>
            <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <Link href="/properties">
                    <button className="bg-white text-blue-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                        تصفح العقارات
                    </button>
                </Link>
                <Link href="/contact">
                    <button className="bg-transparent border-2 border-blue-300 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-800 transition-colors">
                        اتصل بنا
                    </button>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
