"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MapPin, 
  DollarSign, 
  Home, 
  Bed, 
  Bath, 
  Square, 
  Heart,
  Loader2,
  Trash2,
  Eye,
  MessageCircle
} from "lucide-react";

// تعريف أنواع البيانات
type Property = {
  id: number;
  title: string;
  address: string;
  city: string;
  description: string;
  type: string;
  status: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: Array<{
    id: number;
    path: string;
  }>;
  created_at: string;
};

type Favorite = {
  id: number;
  property: Property;
  created_at: string;
};

// مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${className}`}>
    {children}
  </span>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case "متاح": return "bg-green-100 text-green-800";
    case "محجوز": return "bg-red-100 text-red-800";
    case "قيد الصيانة": return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "شقة": return "bg-blue-100 text-blue-800";
    case "فيلا": return "bg-purple-100 text-purple-800";
    case "استوديو": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingFavorite, setRemovingFavorite] = useState<number | null>(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("api_token");
      if (!token) {
        throw new Error("يجب تسجيل الدخول لعرض المفضلة");
      }

      // جلب العقارات المفضلة من API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/user/favorites`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' 
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.");
        }
        throw new Error("فشل في جلب العقارات المفضلة.");
      }

      const data = await response.json();
      setFavorites(data);
    } catch (err: any) {
      setError(err.message || "فشل في جلب العقارات المفضلة. يرجى المحاولة مرة أخرى.");
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (propertyId: number) => {
    if (!confirm("هل أنت متأكد من إزالة هذا العقار من المفضلة؟")) {
      return;
    }

    setRemovingFavorite(propertyId);
    try {
      const token = localStorage.getItem("api_token");
      if (!token) {
        throw new Error("يجب تسجيل الدخول");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/favorites/${propertyId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' 
        },
      });

      if (!response.ok) {
        throw new Error("فشل في إزالة العقار من المفضلة");
      }

      // إزالة العقار من القائمة المحلية
      setFavorites(prev => prev.filter(fav => fav.property.id !== propertyId));
    } catch (err: any) {
      alert(err.message || "فشل في إزالة العقار من المفضلة");
      console.error(err.message);
    } finally {
      setRemovingFavorite(null);
    }
  };

  const openWhatsApp = (propertyTitle: string) => {
    const phoneNumber = "212600000000"; // <-- ضع رقم هاتفك هنا
    const message = `مرحباً، أود طلب حجز العقار التالي: ${propertyTitle}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <Heart className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">خطأ في تحميل المفضلة</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchFavorites} 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 font-serif" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">العقارات المفضلة</h1>
        <p className="text-gray-600 mt-2">العقارات التي أضفتها إلى قائمة المفضلة</p>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          لديك <span className="font-semibold text-blue-600">{favorites.length}</span> عقار في المفضلة
        </p>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <Card className="p-12 text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد عقارات في المفضلة</h3>
          <p className="text-gray-500 mb-6">لم تقم بإضافة أي عقارات إلى المفضلة بعد</p>
          <Link href="/dashboard/properties">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              تصفح العقارات
            </button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Property Image */}
              <div className="relative h-48 bg-gray-200">
                {favorite.property.images && favorite.property.images.length > 0 ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${favorite.property.images[0].path}`}
                    alt={favorite.property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={getStatusColor(favorite.property.status)}>
                    {favorite.property.status}
                  </Badge>
                </div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={getTypeColor(favorite.property.type)}>
                    {favorite.property.type}
                  </Badge>
                </div>

                {/* Favorite Icon */}
                <div className="absolute top-3 left-16">
                  <Heart className="h-6 w-6 text-red-500 fill-current" />
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {favorite.property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 ml-1" />
                  <span className="text-sm">{favorite.property.city}</span>
                </div>

                {favorite.property.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {favorite.property.description}
                  </p>
                )}

                {/* Property Specs */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{favorite.property.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{favorite.property.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{favorite.property.area} م²</span>
                  </div>
                </div>

                {/* Amenities */}
                {favorite.property.amenities && favorite.property.amenities.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {favorite.property.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {favorite.property.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{favorite.property.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 ml-1" />
                    <span className="text-lg font-bold text-green-600">
                      {favorite.property.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 mr-1">/ليلة</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button 
                      onClick={() => removeFavorite(favorite.property.id)}
                      disabled={removingFavorite === favorite.property.id}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      title="إزالة من المفضلة"
                    >
                      {removingFavorite === favorite.property.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                    
                    <Link href={`/dashboard/properties/${favorite.property.id}`}>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="عرض التفاصيل">
                        <Eye className="h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse pt-3">
                  <button 
                    onClick={() => openWhatsApp(favorite.property.title)}
                    className="flex-1 flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4 ml-2" />
                    طلب حجز
                  </button>
                  
                  <Link href={`/listings/${favorite.property.id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      عرض للجمهور
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
