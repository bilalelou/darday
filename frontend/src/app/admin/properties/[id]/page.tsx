"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, BedDouble, Bath, Wifi, Wind, Car, Utensils, Tv, Sun } from "lucide-react";

// تعريف أنواع البيانات
type PropertyImage = { id: number; path: string; };
type Property = {
  id: number;
  title: string;
  address: string;
  city: string;
  description: string;
  type: "شقة" | "فيلا" | "استوديو";
  status: "متاح" | "مؤجر" | "صيانة";
  pricePerNight: number;
  amenities: string[];
  images: PropertyImage[];
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
        case "غسالة": return <BedDouble size={20} />; // Placeholder icon
        case "شرفة": return <Sun size={20} />;
        default: return null;
    }
};

export default function ViewPropertyPage() {
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
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const apiUrl = `${apiBaseUrl}/api`;
        const response = await fetch(`${apiUrl}/admin/properties/${id}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error("Failed to fetch property data.");

        const data = await response.json();

        // --- تم تبسيط هذا الجزء ---
        // بما أن الواجهة الخلفية ترسل الآن مصفوفة، لم نعد بحاجة للمعالجة المعقدة
        const formattedProperty = { ...data, amenities: Array.isArray(data.amenities) ? data.amenities : [] };
        setProperty(formattedProperty);
        // --- نهاية التبسيط ---

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

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin" /></div>;
  }

  if (error || !property) {
    return <div className="text-center p-8 text-red-500">{error || "لم يتم العثور على العقار."}</div>;
  }

  return (
    <div className="font-serif space-y-8">
      <div className="mb-8">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500">
            <Link href="/admin/properties" className="hover:underline">إدارة العقارات</Link>
            <ArrowRight size={16} className="transform -scale-x-100" />
            <span>{property.title}</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        {/* قسم الصور */}
        <div className="mb-8">
            <img src={mainImage || 'https://placehold.co/1200x600'} alt={property.title} className="w-full h-96 object-cover rounded-lg mb-4" />
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

        {/* قسم التفاصيل */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 text-right">
                <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
                <p className="text-gray-500 mt-1">{property.address}, {property.city}</p>
                
                <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">الوصف</h2>
                <p className="text-gray-600 leading-relaxed">{property.description || "لا يوجد وصف متاح."}</p>
                
                <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">العناصر المتوفرة</h2>
                <div className="grid grid-cols-2 gap-4">
                    {property.amenities && property.amenities.length > 0 ? (
                        property.amenities.map(amenity => (
                            <div key={amenity} className="flex items-center justify-end">
                                <span className="mr-2 text-gray-700">{amenity}</span>
                                <AmenityIcon name={amenity} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">لا توجد عناصر محددة.</p>
                    )}
                </div>
            </div>
            
            {/* بطاقة السعر والإجراءات */}
            <div className="bg-gray-50 p-6 rounded-lg border h-fit">
                 <p className="text-sm text-gray-500 text-right">السعر لليلة</p>
                 <p className="text-3xl font-bold text-gray-900 text-right mb-4">{property.pricePerNight.toLocaleString()} <span className="text-lg">د.م.</span></p>
                 <Link href={`/admin/properties/${property.id}/edit`} className="w-full flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                    تعديل العقار
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
