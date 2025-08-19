"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Upload, X, Building, MapPin, DollarSign, Info, BedDouble, Bath, Ruler } from "lucide-react";

// تعريف أنواع البيانات الجديدة
type Amenity = { id: number; name: string; };
type City = { id: number; name: string; };
type PropertyType = { id: number; name: string; };

export default function AddPropertyPage() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city_id: "",
    property_type_id: "",
    description: "",
    status: "متاح",
    pricePerNight: "",
    bedrooms: "1",
    bathrooms: "1",
    area: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // جلب المدن والأنواع والعناصر من قاعدة البيانات
  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("api_token");
            if (!token) throw new Error("Authentication token not found.");
            const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' };
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

            const [amenitiesRes, citiesRes, typesRes] = await Promise.all([
                fetch(`${apiUrl}/admin/amenities`, { headers }),
                fetch(`${apiUrl}/admin/cities`, { headers }),
                fetch(`${apiUrl}/admin/property-types`, { headers }),
            ]);

            if (!amenitiesRes.ok || !citiesRes.ok || !typesRes.ok) {
                throw new Error("Failed to fetch form data.");
            }

            setAvailableAmenities(await amenitiesRes.json());
            setCities(await citiesRes.json());
            setPropertyTypes(await typesRes.json());

        } catch (err: any) {
            setError(err.message);
        }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amenityId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    if (isChecked) {
        setSelectedAmenities(prev => [...prev, amenityId]);
    } else {
        setSelectedAmenities(prev => prev.filter(id => id !== amenityId));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...filesArray]);
      const previewsArray = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prevPreviews => [...prevPreviews, ...previewsArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    selectedAmenities.forEach(amenityId => data.append('amenities[]', String(amenityId)));
    images.forEach(image => data.append('images[]', image));

    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/admin/properties`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessages = Object.values(errorData.errors || {}).flat().join(', ');
        throw new Error(errorMessages || "فشل في إضافة العقار.");
      }

      router.push('/admin/properties');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-serif" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إضافة عقار جديد</h1>
          <p className="text-gray-500 mt-1">إضافة عقار جديد إلى قائمة الإيجارات</p>
        </div>
        <Link href="/admin/properties" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
          <ArrowLeft size={16} className="ml-2" />
          <span>العودة إلى العقارات</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* العمود الأيمن: المعلومات الرئيسية */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-6"><Building className="text-blue-600" size={24} /><h2 className="text-xl font-semibold text-gray-800 mr-3">المعلومات الأساسية</h2></div>
                <div className="space-y-6">
                    <div><label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">عنوان العقار *</label><input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded-md" placeholder="مثال: شقة فاخرة في وسط المدينة" /></div>
                    <div><label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">الوصف *</label><textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full p-2 border rounded-md" placeholder="وصف مفصل للعقار ومميزاته"></textarea></div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-6"><MapPin className="text-blue-600" size={24} /><h2 className="text-xl font-semibold text-gray-800 mr-3">الموقع</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">العنوان التفصيلي *</label><input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded-md" placeholder="مثال: شارع محمد الخامس، إقامة السلام" /></div>
                    <div><label htmlFor="city_id" className="block text-sm font-medium text-gray-700 mb-1">المدينة *</label>
                        <select name="city_id" id="city_id" value={formData.city_id} onChange={handleChange} required className="w-full p-2 border rounded-md bg-white">
                            <option value="">اختر مدينة</option>
                            {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-6"><Upload className="text-blue-600" size={24} /><h2 className="text-xl font-semibold text-gray-800 mr-3">صور العقار</h2></div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <label htmlFor="images" className="cursor-pointer"><span className="text-blue-600 hover:underline">اضغط لرفع الصور</span><span className="text-gray-500"> أو اسحب الصور هنا</span><input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" /></label>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF حتى 2MB</p>
                </div>
                {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imagePreviews.map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image} alt={`صورة ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                                <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center"><X className="h-4 w-4" /></button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* العمود الأيسر: التفاصيل */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm h-fit">
            <div className="flex items-center mb-6"><Info className="text-blue-600" size={24} /><h2 className="text-xl font-semibold text-gray-800 mr-3">التفاصيل والحالة</h2></div>
            <div className="space-y-6">
              <div><label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 mb-1">السعر/الليلة (د.م.) *</label><div className="relative"><input type="number" name="pricePerNight" id="pricePerNight" value={formData.pricePerNight} onChange={handleChange} required className="w-full p-2 pl-10 border rounded-md" placeholder="850" /><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /></div></div>
              <div><label htmlFor="property_type_id" className="block text-sm font-medium text-gray-700 mb-1">نوع العقار *</label>
                <select name="property_type_id" id="property_type_id" value={formData.property_type_id} onChange={handleChange} required className="w-full p-2 border rounded-md bg-white">
                  <option value="">اختر النوع</option>
                  {propertyTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
              </div>
              <div><label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">حالة العقار</label><select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md bg-white"><option value="متاح">متاح</option><option value="مؤجر">مؤجر</option><option value="صيانة">صيانة</option></select></div>
              <div className="grid grid-cols-3 gap-4">
                  <div><label className="text-sm">غرف النوم</label><input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                  <div><label className="text-sm">الحمامات</label><input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                  <div><label className="text-sm">المساحة</label><input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" /></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">العناصر المتوفرة</h2>
            <div className="space-y-3">
              {availableAmenities.map(amenity => (
                <div key={amenity.id} className="flex items-center justify-between">
                  <label htmlFor={`amenity-${amenity.id}`} className="text-sm text-gray-700">{amenity.name}</label>
                  <input id={`amenity-${amenity.id}`} type="checkbox" value={amenity.id} onChange={handleAmenityChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center bg-blue-800 text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-blue-900 transition-colors disabled:bg-blue-300">
              {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} className="ml-2"/><span>حفظ العقار</span></>}
            </button>
            <button type="button" onClick={() => router.back()} className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
              إلغاء
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
