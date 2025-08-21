"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Search, Home, MapPin, DollarSign, Eye, Heart, BedDouble, Bath, Ruler, Filter } from "lucide-react";

// تعريف أنواع البيانات لتتطابق مع Backend
type PropertyImage = { id: number; path: string; };
type Property = {
  id: number;
  title: string;
  address: string;
  city: { name: string };
  property_type: { name: string };
  status: string;
  pricePerNight: number;
  amenities: { name: string }[];
  images: PropertyImage[];
  bedrooms: number;
  bathrooms: number;
  area: number;
};

// مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>;
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => <span className={`px-3 py-1 text-xs font-semibold rounded-md ${className}`}>{children}</span>;

const getStatusColor = (status: string) => {
  switch (status) {
    case "متاح": return "bg-green-100 text-green-800";
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

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("الكل");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("الكل");
  const [selectedPrice, setSelectedPrice] = useState("الكل");

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
        setProperties(data);
        setFilteredProperties(data);
        
        const uniqueCities = [...new Set(data.map((p: Property) => p.city.name))];
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
        p.city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType !== "الكل") {
      filtered = filtered.filter(p => p.property_type.name === selectedType);
    }
    if (selectedCity !== "الكل") {
        filtered = filtered.filter(p => p.city.name === selectedCity);
    }
    if (selectedPrice !== "الكل") {
        const [min, max] = selectedPrice.split('-').map(Number);
        filtered = filtered.filter(p => p.pricePerNight >= min && p.pricePerNight <= max);
    }
    setFilteredProperties(filtered);
  }, [properties, searchTerm, selectedType, selectedCity, selectedPrice]);

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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-800 whitespace-nowrap">تصفية الشقق</h3>
          <div className="w-full flex flex-col md:flex-row items-center gap-4">
            <div className="w-full relative flex-grow">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="البحث في الشقق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <option value="الكل">جميع الأنواع</option>
              <option value="شقة">شقة</option>
              <option value="فيلا">فيلا</option>
              <option value="استوديو">استوديو</option>
            </select>
            <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <option value="الكل">جميع الأسعار</option>
              <option value="0-1000">أقل من 1,000 د.م.</option>
              <option value="1000-2000">1,000 - 2,000 د.م.</option>
              <option value="2000-5000">2,000 - 5,000 د.م.</option>
            </select>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <option value="الكل">جميع المدن</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            <button onClick={clearFilters} className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
              <Filter size={16} className="ml-2" />
              <span>مسح التصفية</span>
            </button>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <p className="text-gray-600">تم العثور على <span className="font-semibold text-blue-600">{filteredProperties.length}</span> عقار</p>
      </div>

      {filteredProperties.length === 0 ? (
        <Card className="p-12 text-center"><h3 className="text-lg font-semibold text-gray-600">لا توجد عقارات تطابق بحثك</h3></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => {
            const mainImage = property.images?.[0]
              ? `${apiBaseUrl}/storage/${property.images[0].path}`
              : 'https://placehold.co/400x300';
            return (
              <Card key={property.id} className="p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200">
                  <img src={mainImage} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3"><Badge className={getStatusColor(property.status)}>{property.status}</Badge></div>
                  <div className="absolute top-3 left-3"><Badge className={getTypeColor(property.property_type.name)}>{property.property_type.name}</Badge></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 ml-1" />
                    <span className="text-sm">{property.city.name}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 ml-1" />
                      <span className="text-lg font-bold text-green-600">{property.pricePerNight.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 mr-1">/الليلة</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="p-2 text-gray-400 hover:text-red-500"><Heart className="h-5 w-5" /></button>
                      <Link href={`/properties/${property.id}`}>
                        <button className="p-2 text-gray-400 hover:text-blue-500"><Eye className="h-5 w-5" /></button>
                      </Link>
                    </div>
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
