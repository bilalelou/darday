"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, FilterX, Eye, Edit, Trash2, Loader2 } from "lucide-react";

// 1. تعريف نوع البيانات للعقار ليتوافق مع استجابة Laravel
type Property = {
  id: number; // Laravel يرسل id كرقم
  title: string;
  address: string;
  type: "شقة" | "فيلا" | "استوديو";
  status: "متاح" | "مؤجر" | "صيانة";
  pricePerNight: number;
  imageUrl: string;
};

// دالة لتحديد لون شارة الحالة
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "متاح":
      return "bg-green-100 text-green-700";
    case "مؤجر":
      return "bg-yellow-100 text-yellow-700";
    case "صيانة":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("api_token");
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/admin/properties`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
           // تحسين رسالة الخطأ لتشمل حالة الاستجابة
          throw new Error(`Failed to fetch properties from the server. Status: ${response.status}`);
        }
        
        const data = await response.json();
        setProperties(data);

      } catch (err: any) {
        // --- تم التعديل هنا لتحسين تشخيص الخطأ ---
        setError("فشل الاتصال بالخادم. يرجى التأكد من أن الخادم يعمل وأن عنوان API صحيح.");
        console.error("Full fetch error details:", err); // طباعة الخطأ الكامل في الـ Console
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="space-y-8 font-serif">
      {/* قسم العنوان وزر الإضافة */}
      <div className="flex items-center justify-between">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">إدارة العقارات</h1>
          <p className="text-gray-500 mt-1">
            عرض، تعديل، وإضافة العقارات المتاحة للإيجار
          </p>
        </div>
        <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <Plus size={20} className="ml-2" />
          إضافة عقار
        </button>
      </div>

      {/* قسم الفلاتر */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-800 text-right">فلترة العقارات</h3>
          </div>
          <select className="w-full p-2 border rounded-md bg-gray-50 text-right">
            <option>كل الأنواع</option>
            <option>شقة</option>
            <option>فيلا</option>
            <option>استوديو</option>
          </select>
          <select className="w-full p-2 border rounded-md bg-gray-50 text-right">
            <option>كل الحالات</option>
            <option>متاح</option>
            <option>مؤجر</option>
            <option>صيانة</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              className="w-full p-2 pr-10 border rounded-md text-right"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* قسم الجدول */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
        <div className="p-4 flex justify-between items-center border-b">
            <div className="text-right">
                <h3 className="font-semibold text-lg text-gray-800">العقارات ({properties.length})</h3>
                <p className="text-sm text-gray-500">القائمة الكاملة للعقارات المسجلة</p>
            </div>
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <FilterX size={16} className="ml-2" />
                مسح الفلاتر
            </button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>جاري تحميل العقارات...</span>
          </div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">{error}</div>
        ) : (
          <table className="w-full text-right">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600">العقار</th>
                <th className="p-4 font-semibold text-sm text-gray-600">النوع</th>
                <th className="p-4 font-semibold text-sm text-gray-600">الحالة</th>
                <th className="p-4 font-semibold text-sm text-gray-600">السعر/الليلة</th>
                <th className="p-4 font-semibold text-sm text-gray-600 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <img src={prop.imageUrl} alt={prop.title} className="w-24 h-16 object-cover rounded-md" />
                      <div>
                        <p className="text-gray-900 font-medium">{prop.title}</p>
                        <p className="text-sm text-gray-500">{prop.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{prop.type}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(prop.status)}`}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-900 font-medium">
                    {parseFloat(prop.pricePerNight as any).toLocaleString()} د.م.
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors text-blue-500">
                            <Eye size={18} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors text-green-500">
                            <Edit size={18} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors text-red-500">
                            <Trash2 size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
