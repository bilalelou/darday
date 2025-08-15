"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Loader2, Shield } from "lucide-react";

// هذه المكونات يفترض أنها موجودة في مشروعك كما في الكود الذي أرسلته
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";

// سنقوم بمحاكاة هذه المكونات باستخدام عناصر HTML عادية مع Tailwind CSS
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`bg-white p-8 rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-6">{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <div className="flex items-center text-xl font-semibold text-gray-800">{children}</div>;
const CardDescription = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => <label className="block text-sm font-medium text-gray-700 mb-1" {...props}>{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`w-full p-2 border rounded-md ${props.className}`} />;
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} className={`w-full p-2 border rounded-md ${props.className}`} />;
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>;
const Switch = ({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (checked: boolean) => void }) => (
    <button type="button" onClick={() => onCheckedChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);


export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    role: "customer",
    status: "نشط",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // دمج first_name و last_name في حقل name
    const dataToSend = {
        ...formData,
        name: `${formData.first_name} ${formData.last_name}`
    };

    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/admin/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessages = Object.values(errorData.errors || {}).flat().join(', ');
        throw new Error(errorMessages || "فشل في إضافة المستخدم.");
      }

      router.push('/admin/users');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <Link href="/admin/users">
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-300 px-3 py-1 rounded-md">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة إلى المستخدمين
            </button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">إضافة مستخدم جديد</h1>
        <p className="text-gray-600 mt-2">إنشاء حساب مستخدم جديد في النظام</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <User className="ml-2 h-5 w-5" />
                  المعلومات الأساسية
                </CardTitle>
                <CardDescription>معلومات المستخدم الأساسية والاتصال</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">الاسم الأول *</Label>
                            <Input id="first_name" value={formData.first_name} onChange={(e) => handleChange("first_name", e.target.value)} placeholder="أدخل الاسم الأول" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name">اسم العائلة *</Label>
                            <Input id="last_name" value={formData.last_name} onChange={(e) => handleChange("last_name", e.target.value)} placeholder="أدخل اسم العائلة" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <div className="relative">
                            <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="pr-10" placeholder="أدخل البريد الإلكتروني" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <div className="relative">
                            <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="pr-10" placeholder="أدخل رقم الهاتف" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">العنوان</Label>
                        <div className="relative">
                            <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} className="pr-10" placeholder="أدخل العنوان" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">المدينة</Label>
                        <Input id="city" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="أدخل المدينة" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">ملاحظات</Label>
                        <Textarea id="notes" value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} placeholder="أدخل أي ملاحظات إضافية" rows={3} />
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحساب</CardTitle>
                <CardDescription>دور المستخدم والإعدادات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">كلمة المرور *</Label>
                        <Input id="password" type="password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="********" required minLength={8} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">الدور *</Label>
                        <select id="role" value={formData.role} onChange={(e) => handleChange("role", e.target.value)} className="w-full p-2 border rounded-md">
                            <option value="user">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">حالة الحساب</Label>
                        <select id="status" value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="w-full p-2 border rounded-md">
                            <option value="نشط">نشط</option>
                            <option value="معلق">معلق</option>
                        </select>
                    </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-3">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center bg-gray-800 text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-gray-900 transition-colors disabled:bg-gray-400">
                {isLoading ? <Loader2 className="animate-spin" /> : <><Save className="ml-2 h-4 w-4" /><span>حفظ المستخدم</span></>}
              </button>
              <Link href="/admin/users" className="block">
                <button type="button" className="w-full bg-transparent border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                  إلغاء
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
