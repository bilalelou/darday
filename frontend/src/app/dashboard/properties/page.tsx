"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Search, MapPin, Heart, BedDouble, Bath, Ruler, Filter } from "lucide-react";

// أيقونة واتساب كـ SVG
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

// تعريف أنواع البيانات لتتطابق مع Backend
type PropertyImage = { id: number; path: string; };
type Property = {
  id: number;
  title: string;
  address: string;
  city: string;
  description: string;
  type: string;
  status: string;
  pricePerNight: number;
  amenities: string[];
  images: PropertyImage[];
  bedrooms: number;
  bathrooms: number;
  area: number;
};

// مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>;
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => <span className={`px-3 py-1 text-xs font-semibold rounded-md ${className}`}>{children}</span>;

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // حالات جديدة للفلاتر
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("الكل");
  const [selectedCity, setSelectedCity] = useState("الكل");
  const [selectedPrice, setSelectedPrice] = useState("الكل");
  const [cities, setCities] = useState<string[]>([]);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace('/api', '');

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/properties`;
        const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

        if (!response.ok) throw new Error("Failed to fetch properties.");

        const data = await response.json();
    const formattedData = data.map((prop: any) => ({
      ...prop,
      amenities: Array.isArray(prop.amenities) ? prop.amenities : []
    }));
        setProperties(formattedData);
        setFilteredProperties(formattedData);
        
        // استخراج المدن الفريدة من البيانات
        const uniqueCities = [...new Set(formattedData.map((p: Property) => p.city))];
        setCities(uniqueCities);

      } catch (err: any) {
        setError("فشل في جلب العقارات. يرجى المحاولة مرة أخرى.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType !== "الكل") {
      filtered = filtered.filter(p => p.type === selectedType);
    }
    if (selectedCity !== "الكل") {
      filtered = filtered.filter(p => p.city === selectedCity);
    }
    if (selectedPrice !== "الكل") {
        const [min, max] = selectedPrice.split('-').map(Number);
        filtered = filtered.filter(p => p.pricePerNight >= min && p.pricePerNight <= max);
    }

    setFilteredProperties(filtered);
  }, [properties, searchTerm, selectedType, selectedCity, selectedPrice]);
  
  const openWhatsApp = (propertyTitle: string) => {
    const phoneNumber = "212600000000"; // <-- ضع رقم هاتفك هنا
    const message = `مرحباً، أود طلب حجز العقار التالي: ${propertyTitle}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const clearFilters = () => {
      setSearchTerm("");
      setSelectedType("الكل");
      setSelectedCity("الكل");
      setSelectedPrice("الكل");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-600" /></div>;
  }
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 font-serif" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">العقارات المتاحة</h1>
        <p className="text-gray-600 mt-2">تصفح العقارات المتاحة للإيجار</p>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-gray-800">تصفية الشقق</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في الشقق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <option value="الكل">جميع الأنواع</option>
            <option value="شقة">شقة</option>
            <option value="فيلا">فيلا</option>
            <option value="استوديو">استوديو</option>
          </select>
          <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <option value="الكل">جميع الأسعار</option>
            <option value="0-1000">أقل من 1,000 د.م.</option>
            <option value="1000-2000">1,000 - 2,000 د.م.</option>
            <option value="2000-5000">2,000 - 5,000 د.م.</option>
          </select>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <option value="الكل">جميع المدن</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <button onClick={clearFilters} className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
            <Filter size={16} className="ml-2" />
            <span>مسح التصفية</span>
          </button>
        </div>
      </Card>

      <div className="mb-6">
        <p className="text-gray-600">تم العثور على <span className="font-semibold text-blue-600">{filteredProperties.length}</span> عقار</p>
      </div>

      {filteredProperties.length === 0 ? (
        <Card className="p-12 text-center"><h3 className="text-lg font-semibold text-gray-600">لا توجد عقارات تطابق بحثك</h3></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => {
            const mainImage = property.images?.[0]
              ? `${apiBaseUrl}/storage/${property.images[0].path}`
              : 'https://placehold.co/400x300';
            return (
              <Card key={property.id} className="p-0 overflow-hidden group transition-shadow duration-300">
                <div className="relative h-56">
                  <img src={mainImage} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-100 text-green-800">{property.status}</Badge>
                  </div>
                  <button className="absolute top-3 left-3 bg-white/80 p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span className="text-sm">{property.address}, {property.city}</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    {property.pricePerNight.toLocaleString()} د.م.<span className="text-sm text-gray-500 font-normal">/شهر</span>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 border-t pt-4">
                      <div className="flex items-center"><BedDouble size={16} className="ml-1 text-gray-400" /><span>{property.bedrooms} غرف</span></div>
                      <div className="flex items-center"><Bath size={16} className="ml-1 text-gray-400" /><span>{property.bathrooms} حمامات</span></div>
                      <div className="flex items-center"><Ruler size={16} className="ml-1 text-gray-400" /><span>{property.area} م²</span></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 2).map((amenity) => (
                        <Badge key={amenity} className="bg-gray-100 text-gray-700">{amenity}</Badge>
                    ))}
                    {property.amenities.length > 2 && (
                        <Badge className="bg-gray-100 text-gray-700">+{property.amenities.length - 2} المزيد</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse pt-4 border-t">
                    <button onClick={() => openWhatsApp(property.title)} className="flex-1 flex items-center justify-center bg-blue-800 text-white px-4 py-2.5 rounded-lg hover:bg-blue-900 transition-colors font-semibold">
                        <WhatsAppIcon />
                        <span>طلب حجز</span>
                    </button>
                    <Link href={`/dashboard/properties/${property.id}`} className="flex-1">
                        <button className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
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
    </div>
  );
}
