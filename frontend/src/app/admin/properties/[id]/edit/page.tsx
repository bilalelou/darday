"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight, Loader2, UploadCloud, X } from "lucide-react";

const availableAmenities = [
  "Wi-Fi", "مكيف هواء", "مطبخ", "تلفاز", "مسبح", "موقف سيارات مجاني", "غسالة", "شرفة",
];

type PropertyImage = {
  id: number;
  path: string;
};

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState({
    title: "", address: "", city: "", description: "", type: "شقة", status: "متاح", pricePerNight: "",
  });
  const [amenities, setAmenities] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<PropertyImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setFormData({
          title: data.title,
          address: data.address,
          city: data.city || "",
          description: data.description || "",
          type: data.type,
          status: data.status,
          pricePerNight: data.pricePerNight,
        });
        setAmenities(data.amenities || []);
        setExistingImages(data.images || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id, apiBaseUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setAmenities(prev => checked ? [...prev, value] : prev.filter(a => a !== value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...filesArray]);

      const previewsArray = filesArray.map(file => URL.createObjectURL(file));
      setNewImagePreviews(prev => [...prev, ...previewsArray]);
    }
  };

  const removeExistingImage = (imageId: number) => {
    setExistingImages(prev => prev.filter(img => img.id !== imageId));
    setImagesToDelete(prev => [...prev, imageId]);
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const data = new FormData();
    // استخدام _method لتوجيه Laravel لاستخدام دالة PUT/PATCH
    data.append('_method', 'POST'); 
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    amenities.forEach(a => data.append('amenities[]', a));
    imagesToDelete.forEach(id => data.append('imagesToDelete[]', String(id)));
    newImages.forEach(img => data.append('images[]', img));

    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const apiUrl = `${apiBaseUrl}/api`;
      const response = await fetch(`${apiUrl}/admin/properties/${id}`, {
        method: 'POST', // استخدام POST دائماً مع FormData
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في تحديث العقار.");
      }

      router.push('/admin/properties');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="font-serif">
      <div className="mb-8">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500">
            <a href="/admin/properties" className="hover:underline">إدارة العقارات</a>
            <ArrowRight size={16} className="transform -scale-x-100" />
            <span>تعديل العقار</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">تعديل العقار: {formData.title}</h1>
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
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-right mb-1">المدينة</label>
              <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="w-full p-2 border rounded-md text-right" />
            </div>
          </div>
          
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-2">العناصر المتوفرة</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center justify-end">
                        <label htmlFor={amenity} className="text-sm text-gray-700 mr-2">{amenity}</label>
                        <input id={amenity} name="amenities" type="checkbox" value={amenity} checked={amenities.includes(amenity)} onChange={handleAmenityChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                ))}
            </div>
          </div>
          
          {/* قسم إدارة الصور */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-2">إدارة الصور</label>
            {/* عرض الصور الحالية */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 text-right mb-2">الصور الحالية:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {existingImages.map(image => (
                    <div key={image.id} className="relative">
                      <img src={`${apiBaseUrl}/storage/${image.path}`} alt="Existing" className="h-24 w-full object-cover rounded-md" />
                      <button type="button" onClick={() => removeExistingImage(image.id)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* رفع صور جديدة */}
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500">
                    <span>إضافة صور جديدة</span>
                    <input id="file-upload" name="images" type="file" multiple onChange={handleImageChange} className="sr-only" />
                  </label>
                </div>
              </div>
            </div>
            {newImagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {newImagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-md" />
                    <button type="button" onClick={() => removeNewImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={isSaving} className="flex items-center justify-center bg-green-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-green-700 transition-colors disabled:bg-green-300">
              {isSaving ? <Loader2 className="animate-spin" /> : 'حفظ التعديلات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
