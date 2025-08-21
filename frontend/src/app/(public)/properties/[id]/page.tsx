"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, MapPin, BedDouble, Bath, Ruler, Wifi, Wind, Car, Utensils, Tv, Sun, Heart, Star, ChevronLeft, Share2, User } from "lucide-react";

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
  city: { name: string };
  description: string;
  pricePerNight: number;
  amenities: { name: string }[];
  images: PropertyImage[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  phone_number: string;
  reviews_count?: number;
};

// مكون لعرض أيقونات العناصر المتوفرة
const AmenityIcon = ({ name }: { name: string }) => {
    switch (name) {
        case "Wi-Fi": return <Wifi size={24} />;
        case "مكيف هواء": return <Wind size={24} />;
        case "مطبخ": return <Utensils size={24} />;
        case "تلفاز": return <Tv size={24} />;
        case "مسبح": return <Bath size={24} />;
        case "موقف سيارات مجاني": return <Car size={24} />;
        case "غسالة": return <BedDouble size={24} />;
        case "شرفة": return <Sun size={24} />;
        default: return null;
    }
};

// بيانات وهمية للتقييمات
const fakeReviews = [
    { name: 'أحمد', date: 'أغسطس 2025', rating: 5, comment: 'كانت الإقامة رائعة! الشقة نظيفة جداً والموقع ممتاز. بالتأكيد سأعود مرة أخرى.' },
    { name: 'سارة', date: 'يوليو 2025', rating: 4, comment: 'مكان جميل وهادئ. المضيف كان متعاوناً جداً. ينقص فقط بعض أدوات المطبخ.' },
];

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
        
        let amenitiesArray = Array.isArray(data.amenities) ? data.amenities : [];
        if (typeof data.amenities === 'string') {
            try { amenitiesArray = JSON.parse(data.amenities); } catch (e) {}
        }
        
        const formattedProperty = { ...data, amenities: amenitiesArray };
        setProperty(formattedProperty);

        if (data.images && data.images.length > 0) {
            setMainImage(`${apiBaseUrl}/storage/${data.images[0].path}`);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id, apiBaseUrl]);
  
  const openWhatsApp = (propertyTitle: string, phoneNumber: string) => {
    const defaultNumber = "212600000000";
    const targetNumber = phoneNumber || defaultNumber;
    let message = `مرحباً، أود الاستفسار عن العقار التالي: ${propertyTitle}`;

    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-600" /></div>;
  }
  if (error || !property) {
    return <div className="text-center p-8 text-red-500">{error || "لم يتم العثور على العقار."}</div>;
  }

  const mainImageSrc = property.images?.[0] ? `${apiBaseUrl}/storage/${property.images[0].path}` : 'https://placehold.co/1200x600';
  const galleryImages = property.images?.slice(1, 5);

  return (
    <div className="container mx-auto px-6 py-12 font-serif" dir="rtl">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-800">{property.title}</h1>
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-gray-500">
                <Star size={16} className="ml-1 text-yellow-500 fill-current" />
                <span className="font-bold text-gray-700">4.8</span>
                <span className="mx-2">·</span>
                <a href="#reviews" className="underline hover:text-blue-600">{property.reviews_count || 25} تقييم</a>
                <span className="mx-2">·</span>
                <MapPin size={16} className="ml-1" />
                <span>{property.address}, {property.city?.name}</span>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button className="flex items-center text-gray-600 hover:text-blue-600"><Share2 size={18} className="ml-2" /> مشاركة</button>
                <button className="flex items-center text-gray-600 hover:text-red-500"><Heart size={18} className="ml-2" /> حفظ</button>
            </div>
        </div>
      </div>

      <div className="mb-12">
        {property.images && property.images.length > 1 ? (
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden">
                <div className="col-span-1 row-span-2">
                    <img src={mainImage || mainImageSrc} alt={property.title} className="w-full h-full object-cover cursor-pointer" />
                </div>
                {galleryImages?.map((image, index) => (
                    <div key={image.id} className="col-span-1">
                        <img src={`${apiBaseUrl}/storage/${image.path}`} alt={`thumbnail-${index}`} className="w-full h-full object-cover cursor-pointer" />
                    </div>
                ))}
            </div>
        ) : (
            <img src={mainImage || mainImageSrc} alt={property.title} className="w-full h-[500px] object-cover rounded-2xl" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="pb-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">شقة كاملة يستضيفها أحمد</h2>
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-600 mt-2">
                <span>{property.bedrooms} غرف نوم</span>
                <span>·</span>
                <span>{property.bathrooms} حمامات</span>
                <span>·</span>
                <span>{property.area} م²</span>
            </div>
          </div>

          <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">الوصف</h2>
            <p className="text-gray-600 leading-relaxed">{property.description || "لا يوجد وصف متاح."}</p>
          </div>

          <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">العناصر المتوفرة</h2>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities && property.amenities.map(amenity => (
                  <div key={amenity.name} className="flex items-center">
                      <AmenityIcon name={amenity.name} />
                      <span className="mr-3 text-gray-700">{amenity.name}</span>
                  </div>
              ))}
            </div>
          </div>

          <div id="reviews" className="py-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">التقييمات</h2>
            <div className="space-y-6">
                {fakeReviews.map((review, index) => (
                    <div key={index} className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ml-4">
                            <User size={24} className="text-gray-500" />
                        </div>
                        <div>
                            <div className="flex items-center">
                                <h4 className="font-bold">{review.name}</h4>
                                <span className="text-gray-400 text-sm mx-2">·</span>
                                <span className="text-gray-400 text-sm">{review.date}</span>
                            </div>
                            <div className="flex items-center mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={16} className={`ml-1 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg sticky top-28">
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-blue-800">{property.pricePerNight.toLocaleString()} د.م.</span>
              <span className="text-gray-500 mr-1">/الليلة</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border rounded-lg p-2 mb-4">
                <div>
                    <label className="text-xs font-bold">تاريخ الوصول</label>
                    <input type="text" placeholder="أضف تاريخ" className="w-full border-none p-0 focus:ring-0" />
                </div>
                <div className="border-r pr-2">
                    <label className="text-xs font-bold">تاريخ المغادرة</label>
                    <input type="text" placeholder="أضف تاريخ" className="w-full border-none p-0 focus:ring-0" />
                </div>
            </div>
            <button 
              onClick={() => openWhatsApp(property.title, property.phone_number)}
              className="w-full flex items-center justify-center bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold text-lg"
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
