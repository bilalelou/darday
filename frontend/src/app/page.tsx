"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, MapPin, DollarSign, BedDouble, Bath, Ruler, Search, LogIn, UserPlus, Building, Home } from "lucide-react";

// تحديث تعريف أنواع البيانات ليعكس العلاقات الجديدة
type City = { id: number; name: string; };
type PropertyType = { id: number; name: string; };
type PropertyImage = { id: number; path: string; };
type Property = {
  id: number;
  title: string;
  address: string;
  pricePerNight: number;
  images: PropertyImage[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  city: City; // <-- تحديث
  property_type: PropertyType; // <-- تحديث
};

// تعريف أنواع البيانات الجديدة للأقسام المضافة
type CityInfo = { name: string; count: number; };
type TypeInfo = { name: string; count: number; icon: React.ElementType; };

// مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const Navigation = () => (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          DarDay
        </Link>
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link href="/" className="text-gray-600 hover:text-blue-600">الرئيسية</Link>
          <Link href="/properties" className="text-gray-600 hover:text-blue-600">العقارات</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">من نحن</Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">اتصل بنا</Link>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Link href="/login" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            <LogIn size={16} className="ml-2" />
            <span>تسجيل الدخول</span>
          </Link>
          <Link href="/register" className="hidden sm:flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">
             <UserPlus size={16} className="ml-2" />
            <span>حساب جديد</span>
          </Link>
        </div>
      </nav>
    </header>
);

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [citiesWithCount, setCitiesWithCount] = useState<CityInfo[]>([]);
  const [typesWithCount, setTypesWithCount] = useState<TypeInfo[]>([]);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace('/api', '');

  useEffect(() => {
    const fetchAvailableProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/properties`;
        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error("Failed to fetch properties.");

        const data = await response.json();
        setProperties(data);
        
        // تحديث منطق حساب عدد العقارات
        const cityCounts = data.reduce((acc: any, prop: Property) => {
            const cityName = prop.city.name;
            acc[cityName] = (acc[cityName] || 0) + 1;
            return acc;
        }, {});
        const cityData = Object.keys(cityCounts).map(city => ({ name: city, count: cityCounts[city] }));
        setCitiesWithCount(cityData);
        setCities(Object.keys(cityCounts));

        const typeCounts = data.reduce((acc: any, prop: Property) => {
            const typeName = prop.property_type.name;
            acc[typeName] = (acc[typeName] || 0) + 1;
            return acc;
        }, {});
        const typeData = Object.keys(typeCounts).map(type => ({ 
            name: type, 
            count: typeCounts[type],
            icon: type === 'فيلا' ? Home : Building
        }));
        setTypesWithCount(typeData);

      } catch (err: any) {
        setError("فشل في جلب بيانات العقارات. يرجى المحاولة مرة أخرى.");
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAvailableProperties();
  }, []);

  return (
    <div className="bg-gray-50 font-serif" dir="rtl">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[500px] text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: `url('/hero-background.jpg')`}}
          ></div>
          {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <h1 className="text-5xl font-bold mb-4">ابحث عن منزلك المثالي</h1>
              <p className="text-lg mb-8 max-w-2xl">أفضل مكان للعثور على العقارات المتاحة للإيجار في المغرب.</p>
              <div className="w-full max-w-3xl bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center shadow-lg">
                  <select className="w-full border-gray-300 rounded-md focus:ring-0 text-gray-800">
                      <option>كراء يومي</option>
                      <option>كراء شهري</option>
                  </select>
                  <select className="w-full border-gray-300 rounded-md focus:ring-0 text-gray-800">
                      <option value="">اختر المدينة</option>
                      {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                  <select className="w-full border-gray-300 rounded-md focus:ring-0 text-gray-800">
                      <option value="">نوع العقار</option>
                      <option>شقة</option>
                      <option>فيلا</option>
                      <option>استوديو</option>
                  </select>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                      <Search size={20} className="ml-2"/>
                      <span>بحث</span>
                  </button>
              </div>
          </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">عقارات مميزة</h2>
        {isLoading ? (
          <div className="flex justify-center items-center p-16">
            <Loader2 size={48} className="animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((prop) => {
              const mainImage = prop.images?.[0]
                ? `${apiBaseUrl}/storage/${prop.images[0].path}`
                : 'https://placehold.co/400x300';
              
              return (
                <Card key={prop.id} className="group transition-transform duration-300 hover:-translate-y-2">
                  <div className="relative h-56">
                    <img src={mainImage} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{prop.title}</h3>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 ml-1" />
                      <span className="text-sm">{prop.city.name}</span>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                        <div className="flex items-center"><BedDouble size={16} className="ml-1 text-gray-400" /><span>{prop.bedrooms} غرف</span></div>
                        <div className="flex items-center"><Bath size={16} className="ml-1 text-gray-400" /><span>{prop.bathrooms} حمامات</span></div>
                        <div className="flex items-center"><Ruler size={16} className="ml-1 text-gray-400" /><span>{prop.area} م²</span></div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-blue-600">{prop.pricePerNight.toLocaleString()} د.م.</span>
                        <span className="text-sm text-gray-500 mr-1">/الليلة</span>
                      </div>
                      <Link href={`/properties/${prop.id}`}>
                        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200">
                          عرض التفاصيل
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        <div className="text-center mt-12">
            <Link href="/properties">
                <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900">
                    عرض جميع العقارات
                </button>
            </Link>
        </div>
      </section>

      {/* Browse by City Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">تصفح حسب المدينة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {citiesWithCount.map(city => (
                    <Link key={city.name} href={`/properties?city=${city.name}`}>
                        <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-blue-100 transition-colors">
                            <h3 className="font-semibold text-lg text-gray-800">{city.name}</h3>
                            <p className="text-sm text-gray-500">{city.count} عقار</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Browse by Type Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">تصفح حسب النوع</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {typesWithCount.map(type => {
                const Icon = type.icon;
                return (
                    <Link key={type.name} href={`/properties?type=${type.name}`}>
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow">
                            <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-gray-800">{type.name}</h3>
                            <p className="text-gray-500">{type.count} عقار متاح</p>
                        </Card>
                    </Link>
                );
            })}
        </div>
      </section>
    </div>
  );
}
