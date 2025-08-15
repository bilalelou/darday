"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, UploadCloud, X } from "lucide-react";

// قائمة العناصر المتاحة للاختيار
const availableAmenities = [
  "Wi-Fi",
  "مكيف هواء",
  "مطبخ",
  "تلفاز",
  "مسبح",
  "موقف سيارات مجاني",
  "غسالة",
  "شرفة",
];

export default function AddPropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "", // <-- حقل الوصف الجديد
    type: "شقة",
    status: "متاح",
    pricePerNight: "",
  });
  const [amenities, setAmenities] = useState<string[]>([]); // <-- حالة جديدة للعناصر
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  // دالة لمعالجة اختيار العناصر
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
        setAmenities(prev => [...prev, value]);
    } else {
        setAmenities(prev => prev.filter(amenity => amenity !== value));
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
    // إضافة بيانات النموذج
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    // إضافة العناصر كمصفوفة
    amenities.forEach(amenity => {
        data.append('amenities[]', amenity);
    });
    // إضافة الصور
    images.forEach(image => {
      data.append('images[]', image);
    });

    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/admin/properties`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في إضافة العقار.");
      }

      router.push('/admin/properties');

    } catch (err: any) {
      setError(err.message);
      console.error("Failed to add property:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-serif">
      <div className="mb-8">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500">
              <a href="/admin/properties" className="hover:underline">إدارة العقارات</a>
              <ArrowRight size={16} className="transform -scale-x-100" />
              <span>إضافة عقار جديد</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">نموذج إضافة عقار</h1>
          <p className="text-gray-500 mt-1">
            املأ الحقول أدناه لإضافة عقار جديد إلى النظام.
          </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 text-right mb-1">عنوان العقار</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded-md text-right" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 text-right mb-1">العنوان</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded-md text-right" />
            </div>
          </div>
          
          {/* حقل الوصف الجديد */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-right mb-1">الوصف</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded-md text-right"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 text-right mb-1">النوع</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-md text-right">
                <option>شقة</option>
                <option>فيلا</option>
                <option>استوديو</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 text-right mb-1">الحالة</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md text-right">
                <option>متاح</option>
                <option>مؤجر</option>
                <option>صيانة</option>
              </select>
            </div>
            <div>
              <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 text-right mb-1">السعر/الليلة (د.م.)</label>
              <input type="number" name="pricePerNight" id="pricePerNight" value={formData.pricePerNight} onChange={handleChange} required className="w-full p-2 border rounded-md text-right" />
            </div>
          </div>
          
          {/* قسم العناصر المتوفرة الجديد */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-2">العناصر المتوفرة</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center justify-end">
                        <label htmlFor={amenity} className="text-sm text-gray-700 mr-2">{amenity}</label>
                        <input id={amenity} name="amenities" type="checkbox" value={amenity} onChange={handleAmenityChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-2">صور العقار (30 كحد أقصى)</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500">
                    <span>اختر الملفات</span>
                    <input id="file-upload" name="images" type="file" multiple onChange={handleImageChange} className="sr-only" />
                  </label>
                  <p className="pl-1">أو اسحبها وأفلتها هنا</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF حتى 2MB</p>
              </div>
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-md" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={isLoading} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300">
              {isLoading ? <Loader2 className="animate-spin" /> : 'حفظ العقار'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
