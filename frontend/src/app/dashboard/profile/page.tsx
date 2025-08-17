"use client";

import React, { useState, useEffect } from "react";
import { Loader2, User, Lock } from "lucide-react";

// محاكاة مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`bg-white p-8 rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-6">{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <div className="flex items-center text-xl font-semibold text-gray-800">{children}</div>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => <label className="block text-sm font-medium text-gray-700 mb-1" {...props}>{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`w-full p-2 border rounded-md ${props.className}`} />;

// دالة مساعدة لبناء عنوان URL بشكل صحيح
const getApiUrl = (path: string) => {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/api$/, '');
    return `${baseUrl}/api${path}`;
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    first_name: "", last_name: "", email: "", phone: "", address: "", city: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "", password: "", password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [error, setError] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError({});
      try {
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch(getApiUrl('/user/profile'), {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `Failed to fetch data (Status: ${response.status})`);
        }
        
        const data = await response.json();
        setProfileData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            city: data.city || '',
        });
      } catch (err: any) {
        setError({ general: err.message });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setError({});
    setSuccess(null);
    try {
        const token = localStorage.getItem("api_token");
        const response = await fetch(getApiUrl('/user/profile'), {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(profileData)
        });
        if (!response.ok) {
            const errData = await response.json();
            setError(errData.errors || { profile: "فشل تحديث الملف الشخصي." });
            throw new Error("Update failed");
        }
        setSuccess("تم تحديث الملف الشخصي بنجاح!");
    } catch (err) {
        // تم التعامل مع الخطأ أعلاه
    } finally {
        setIsSavingProfile(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPassword(true);
    setError({});
    setSuccess(null);
    try {
        const token = localStorage.getItem("api_token");
        const response = await fetch(getApiUrl('/user/password'), {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(passwordData)
        });
        if (!response.ok) {
            const errData = await response.json();
            setError(errData.errors || { password: "فشل تحديث كلمة المرور." });
            throw new Error("Update failed");
        }
        setSuccess("تم تحديث كلمة المرور بنجاح!");
        setPasswordData({ current_password: "", password: "", password_confirmation: "" });
    } catch (err) {
        // تم التعامل مع الخطأ أعلاه
    } finally {
        setIsSavingPassword(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="p-8 font-serif" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ملفي الشخصي</h1>
        <p className="text-gray-600 mt-2">إدارة معلومات حسابك وإعدادات الخصوصية</p>
      </div>

      {success && <div className="mb-4 p-4 text-center text-green-800 bg-green-100 rounded-lg">{success}</div>}
      {error.general && <div className="mb-4 p-4 text-center text-red-800 bg-red-100 rounded-lg">{error.general}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* معلومات الملف الشخصي */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle><User className="ml-2 h-5 w-5" />المعلومات الشخصية</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">الاسم الأول</Label>
                                <Input id="first_name" name="first_name" value={profileData.first_name} onChange={handleProfileChange} required />
                                {error.first_name && <p className="text-sm text-red-500">{error.first_name[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name">اسم العائلة</Label>
                                <Input id="last_name" name="last_name" value={profileData.last_name} onChange={handleProfileChange} required />
                                {error.last_name && <p className="text-sm text-red-500">{error.last_name[0]}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange} required />
                            {error.email && <p className="text-sm text-red-500">{error.email[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input id="phone" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">العنوان</Label>
                            <Input id="address" name="address" value={profileData.address} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">المدينة</Label>
                            <Input id="city" name="city" value={profileData.city} onChange={handleProfileChange} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" disabled={isSavingProfile} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                                {isSavingProfile ? <Loader2 className="animate-spin" /> : 'حفظ التغييرات'}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        
        {/* تغيير كلمة المرور */}
        <div>
            <Card>
                <CardHeader>
                    <CardTitle><Lock className="ml-2 h-5 w-5" />تغيير كلمة المرور</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current_password">كلمة المرور الحالية</Label>
                            <Input id="current_password" name="current_password" type="password" value={passwordData.current_password} onChange={handlePasswordChange} required />
                            {error.current_password && <p className="text-sm text-red-500">{error.current_password[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور الجديدة</Label>
                            <Input id="password" name="password" type="password" value={passwordData.password} onChange={handlePasswordChange} required />
                            {error.password && <p className="text-sm text-red-500">{error.password[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">تأكيد كلمة المرور الجديدة</Label>
                            <Input id="password_confirmation" name="password_confirmation" type="password" value={passwordData.password_confirmation} onChange={handlePasswordChange} required />
                        </div>
                        <div className="flex justify-end pt-2">
                            <button type="submit" disabled={isSavingPassword} className="flex items-center justify-center bg-gray-800 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-gray-900 transition-colors disabled:bg-gray-400">
                                {isSavingPassword ? <Loader2 className="animate-spin" /> : 'تحديث كلمة المرور'}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
