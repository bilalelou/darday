"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Loader2, Camera } from "lucide-react";

// تعريف أنواع البيانات
type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  dateOfBirth: string;
  profileImage?: string;
  joinDate: string;
};

// مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-gray-800">{children}</h2>
);

const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-500">{children}</p>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Input = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  disabled = false,
  required = false 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  type?: string;
  disabled?: boolean;
  required?: boolean;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent ${
        disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'
      }`}
    />
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  disabled = false,
  className = ""
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-[#1E3A5F] text-white hover:bg-[#152a4a]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});

  // بيانات تجريبية للملف الشخصي
  const mockProfile: UserProfile = {
    id: "1",
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed.mohamed@example.com",
    phone: "+966 50 123 4567",
    city: "الرياض",
    address: "شارع الملك فهد، حي النزهة",
    dateOfBirth: "1990-05-15",
    profileImage: "/api/placeholder/150/150",
    joinDate: "2023-01-15"
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/user/profile`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        if (!response.ok) {
          // استخدام البيانات التجريبية إذا فشل الاتصال
          setProfile(mockProfile);
          setEditForm(mockProfile);
        } else {
          const data = await response.json();
          setProfile(data);
          setEditForm(data);
        }
      } catch (err: any) {
        // استخدام البيانات التجريبية في حالة الخطأ
        setProfile(mockProfile);
        setEditForm(mockProfile);
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile || {});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profile || {});
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/user/profile`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err: any) {
      setError("فشل في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.");
      console.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={48} className="animate-spin text-[#1E3A5F]" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-8 text-red-500">
        لم يتم العثور على الملف الشخصي
      </div>
    );
  }

  return (
    <div className="p-8 font-serif" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
        <p className="text-gray-600 mt-2">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* معلومات الملف الشخصي */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>المعلومات الشخصية</CardTitle>
                {!isEditing ? (
                  <Button onClick={handleEdit} variant="secondary">
                    <Edit className="h-4 w-4 ml-2" />
                    تعديل
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 ml-2" />
                      )}
                      حفظ
                    </Button>
                    <Button onClick={handleCancel} variant="secondary">
                      <X className="h-4 w-4 ml-2" />
                      إلغاء
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="الاسم الأول"
                  value={editForm.firstName || ""}
                  onChange={(value) => handleInputChange("firstName", value)}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="الاسم الأخير"
                  value={editForm.lastName || ""}
                  onChange={(value) => handleInputChange("lastName", value)}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  value={editForm.email || ""}
                  onChange={(value) => handleInputChange("email", value)}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="رقم الهاتف"
                  type="tel"
                  value={editForm.phone || ""}
                  onChange={(value) => handleInputChange("phone", value)}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="المدينة"
                  value={editForm.city || ""}
                  onChange={(value) => handleInputChange("city", value)}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="تاريخ الميلاد"
                  type="date"
                  value={editForm.dateOfBirth || ""}
                  onChange={(value) => handleInputChange("dateOfBirth", value)}
                  disabled={!isEditing}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="العنوان"
                    value={editForm.address || ""}
                    onChange={(value) => handleInputChange("address", value)}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* معلومات إضافية */}
        <div className="space-y-6">
          {/* صورة الملف الشخصي */}
          <Card>
            <CardHeader>
              <CardTitle>الصورة الشخصية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt="الصورة الشخصية"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-[#1E3A5F] text-white p-2 rounded-full hover:bg-[#152a4a] transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {isEditing && (
                  <p className="text-sm text-gray-500 mt-2">
                    انقر على الكاميرا لتغيير الصورة
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* معلومات الحساب */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات الحساب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">تاريخ الانضمام</p>
                    <p className="text-sm text-gray-500">
                      {new Date(profile.joinDate).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">البريد الإلكتروني</p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">رقم الهاتف</p>
                    <p className="text-sm text-gray-500">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">الموقع</p>
                    <p className="text-sm text-gray-500">{profile.city}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
