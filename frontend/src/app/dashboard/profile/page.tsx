"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, User, Camera } from "lucide-react";

// تعريف أنواع البيانات
type UserProfile = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  region: string;
  postal_code: string;
  bio: string;
  profile_image?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace('/api', '');

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/user/profile`;
        const response = await fetch(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error("Failed to fetch profile data.");
        
        const data = await response.json();
        setProfile(data);
        if (data.profile_image) {
            setImagePreview(`${apiBaseUrl}/storage/${data.profile_image}`);
        }
      } catch (err) {
        setError({ general: "فشل في جلب البيانات." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [apiBaseUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    setError({});
    setSuccess(null);

    const formData = new FormData();
    // إضافة _method لمحاكاة PUT
    formData.append('_method', 'PUT');
    Object.entries(profile).forEach(([key, value]) => {
        if (value !== null && key !== 'profile_image') {
            formData.append(key, value);
        }
    });
    if (imageFile) {
        formData.append('profile_image', imageFile);
    }

    try {
        const token = localStorage.getItem("api_token");
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/user/profile`;
        // ملاحظة: Laravel لا يفهم PUT مع FormData، لذلك نستخدم POST ونعتمد على _method
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Accept': 'application/json' 
            },
            body: formData
        });
        
        if (!response.ok) {
            const errData = await response.json();
            setError(errData.errors || { general: "فشل تحديث الملف الشخصي." });
            throw new Error("Update failed");
        }
        setSuccess("تم تحديث الملف الشخصي بنجاح!");
    } catch (err) {
        // تم التعامل مع الخطأ أعلاه
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-800" /></div>;
  }

  return (
    <div className="p-8 font-serif" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">إعدادات الملف الشخصي</h1>
        <p className="text-gray-600 mt-2">إدارة معلوماتك الشخصية وتفضيلاتك</p>
      </div>

      {success && <div className="mb-4 p-4 text-center text-green-800 bg-green-100 rounded-lg">{success}</div>}
      {error.general && <div className="mb-4 p-4 text-center text-red-800 bg-red-100 rounded-lg">{error.general}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* العمود الأيسر: الصورة الشخصية */}
        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">الصورة الشخصية</h3>
                <p className="text-sm text-gray-500 mb-4">تحديث صورة الملف الشخصي</p>
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center overflow-hidden mb-4">
                    {imagePreview ? (
                        <img src={imagePreview} alt="الصورة الشخصية" className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-16 h-16 text-gray-400" />
                    )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full mb-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm">
                    رفع صورة جديدة
                </button>
                <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }} className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-sm">
                    إزالة الصورة
                </button>
            </div>
        </div>

        {/* العمود الأيمن: المعلومات الشخصية */}
        <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">المعلومات الشخصية</h3>
                <p className="text-sm text-gray-500 mb-6">تحديث تفاصيلك ومعلومات الاتصال</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-sm">الاسم الأول</label><input name="first_name" value={profile?.first_name || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div><label className="text-sm">اسم العائلة</label><input name="last_name" value={profile?.last_name || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div><label className="text-sm">البريد الإلكتروني</label><input name="email" type="email" value={profile?.email || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div><label className="text-sm">رقم الهاتف</label><input name="phone" value={profile?.phone || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div className="md:col-span-2"><label className="text-sm">الشركة (اختياري)</label><input name="company" value={profile?.company || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div className="md:col-span-2"><label className="text-sm">العنوان</label><input name="address" value={profile?.address || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div><label className="text-sm">المدينة</label><input name="city" value={profile?.city || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div><label className="text-sm">المنطقة</label><input name="region" value={profile?.region || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div className="md:col-span-2"><label className="text-sm">الرمز البريدي</label><input name="postal_code" value={profile?.postal_code || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    <div className="md:col-span-2"><label className="text-sm">نبذة شخصية (اختياري)</label><textarea name="bio" value={profile?.bio || ''} onChange={handleInputChange} rows={3} className="w-full mt-1 p-2 border rounded-md"></textarea></div>
                </div>
                <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-6">
                    <button type="button" onClick={() => window.location.reload()} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">إلغاء</button>
                    <button type="submit" disabled={isSaving} className="flex items-center justify-center bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 disabled:bg-blue-300">
                        {isSaving ? <Loader2 className="animate-spin" /> : 'حفظ التغييرات'}
                    </button>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
}
