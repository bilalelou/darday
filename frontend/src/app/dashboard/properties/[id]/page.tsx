"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, MapPin, BedDouble, Bath, Ruler, Wifi, Wind, Car, Utensils, Tv, Sun } from "lucide-react";

// أيقونة واتساب كـ SVG
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

// تعريف أنواع البيانات
type PropertyImage = { id: number; path: string; };
type Property = {
  id: number;
  title: string;
  address: string;
  city: string;
  description: string;
  pricePerNight: number;
  amenities: string[];
  images: PropertyImage[];
  bedrooms: number;
  bathrooms: number;
  area: number;
};

// مكون لعرض أيقونات العناصر المتوفرة
const AmenityIcon = ({ name }: { name: string }) => {
    switch (name) {
        case "Wi-Fi": return <Wifi size={20} />;
        case "مكيف هواء": return <Wind size={20} />;
        case "مطبخ": return <Utensils size={20} />;
        case "تلفاز": return <Tv size={20} />;
        case "مسبح": return <Bath size={20} />;
        case "موقف سيارات مجاني": return <Car size={20} />;
        case "غسالة": return <BedDouble size={20} />;
        case "شرفة": return <Sun size={20} />;
        default: return null;
    }
};

export default function PropertyDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace('/api', '');

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/properties/${id}`;
        const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

        if (!response.ok) throw new Error("Failed to fetch property data.");

        const data = await response.json();
        const formattedData = {
            ...data,
            amenities: Array.isArray(data.amenities) ? data.amenities : JSON.parse(data.amenities || '[]')
        };
        setProperty(formattedData);
        if (formattedData.images && formattedData.images.length > 0) {
            setMainImage(`${apiBaseUrl}/storage/${formattedData.images[0].path}`);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id, apiBaseUrl]);
  
  const openWhatsApp = (propertyTitle: string) => {
    const phoneNumber = "212600000000"; // <-- ضع رقم هاتفك هنا
    const message = `مرحباً، أود طلب حجز العقار التالي: ${propertyTitle}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-600" /></div>;
  }
  if (error || !property) {
    return <div className="text-center p-8 text-red-500">{error || "لم يتم العثور على العقار."}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 font-serif" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* العمود الأيمن: الصور والتفاصيل */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{property.title}</h1>
            <div className="flex items-center text-gray-500 mt-2">
              <MapPin size={16} className="ml-2" />
              <span>{property.address}, {property.city}</span>
            </div>
          </div>
          
          {/* معرض الصور */}
          <div className="mb-8">
            <img src={mainImage || 'https://placehold.co/1200x600'} alt={property.title} className="w-full h-[500px] object-cover rounded-lg mb-4" />
            <div className="grid grid-cols-5 gap-4">
                {property.images.map(image => (
                    <img 
                        key={image.id}
                        src={`${apiBaseUrl}/storage/${image.path}`} 
                        alt="thumbnail"
                        onClick={() => setMainImage(`${apiBaseUrl}/storage/${image.path}`)}
                        className={`w-full h-24 object-cover rounded-md cursor-pointer border-2 ${mainImage === `${apiBaseUrl}/storage/${image.path}` ? 'border-blue-500' : 'border-transparent'}`}
                    />
                ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">الوصف</h2>
              <p className="text-gray-600 leading-relaxed">{property.description || "لا يوجد وصف متاح."}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">التفاصيل</h2>
              <div className="flex items-center space-x-8 rtl:space-x-reverse text-lg text-gray-700">
                  <div className="flex items-center"><BedDouble size={20} className="ml-2 text-blue-600" /><span>{property.bedrooms} غرف نوم</span></div>
                  <div className="flex items-center"><Bath size={20} className="ml-2 text-blue-600" /><span>{property.bathrooms} حمامات</span></div>
                  <div className="flex items-center"><Ruler size={20} className="ml-2 text-blue-600" /><span>{property.area} م²</span></div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">العناصر المتوفرة</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map(amenity => (
                      <div key={amenity} className="flex items-center">
                          <AmenityIcon name={amenity} />
                          <span className="mr-2 text-gray-700">{amenity}</span>
                      </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأيسر: بطاقة الحجز */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg sticky top-28">
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-blue-800">{property.pricePerNight.toLocaleString()} د.م.</span>
              <span className="text-gray-500 mr-1">/الليلة</span>
            </div>
            <button 
              onClick={() => openWhatsApp(property.title)}
              className="w-full flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
            >
              <WhatsAppIcon />
              <span>اطلب الحجز عبر واتساب</span>
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">لن يتم محاسبتك بعد</p>
          </div>
        </div>
      </div>
    </div>
  );
}
