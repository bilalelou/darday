"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";

// تعريف أنواع البيانات الجديدة
type PropertyImage = { id: number; path: string; };
type Property = {
  id: number;
  title: string;
  address: string;
  city: string;
  images: PropertyImage[];
};
type Rental = {
  id: number;
  orderId: string;
  startDate: string;
  endDate: string;
  status: string;
  total: number;
  property: Property;
};

// محاكاة مكونات UI
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => <span className={`px-3 py-1 text-xs font-semibold rounded-full ${className}`}>{children}</span>;

const getStatusColor = (status: string) => {
  switch (status) {
    case "نشط": return "bg-blue-100 text-blue-800";
    case "مكتمل": return "bg-green-100 text-green-800";
    case "قيد الانتظار": return "bg-yellow-100 text-yellow-800";
    case "متأخر": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function RentalsHistoryPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace('/api', '');

  useEffect(() => {
    const fetchRentalsHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/user/rentals-history`;
        const response = await fetch(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        // --- تم التعديل هنا لتشخيص الخطأ ---
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Raw error response from server:", errorText);
            throw new Error("Failed to fetch rentals history. Check console for details.");
        }

        const data = await response.json();
        setRentals(data);
      } catch (err: any) {
        setError("فشل في جلب سجل الإيجارات. يرجى المحاولة مرة أخرى.");
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRentalsHistory();
  }, []);

  return (
    <div className="p-8 font-serif" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">تاريخ الإيجار</h1>
        <p className="text-gray-600 mt-2">عرض وإدارة جميع إيجاراتك السابقة والحالية</p>
      </div>

      {/* قسم الفلاتر */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="relative md:col-span-2">
            <input type="text" placeholder="البحث في الإيجارات..." className="w-full p-2 pr-10 border rounded-md" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <select className="w-full p-2 border rounded-md bg-gray-50">
            <option>جميع الحالات</option>
            <option>نشط</option>
            <option>مكتمل</option>
          </select>
          <select className="w-full p-2 border rounded-md bg-gray-50">
            <option>جميع المدن</option>
          </select>
          <button className="w-full bg-blue-800 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-900 transition-colors">
            تطبيق الفلترة
          </button>
        </div>
      </div>

      {/* قائمة الإيجارات */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-800">جميع الإيجارات ({rentals.length})</h3>
            <span className="text-sm text-gray-500">عرض كل السجلات الخاصة بك</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-16">
            <Loader2 size={32} className="animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">{error}</div>
        ) : rentals.length > 0 ? (
          rentals.map((rental) => {
            const mainImage = rental.property?.images?.[0]
              ? `${apiBaseUrl}/storage/${rental.property.images[0].path}`
              : 'https://placehold.co/80x80/E2E8F0/4A5568?text=...';
            
            return (
              <div key={rental.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <img src={mainImage} alt={rental.property?.title} className="w-20 h-20 object-cover rounded-md ml-4" />
                  <div>
                    <h4 className="font-bold text-gray-800">{rental.property?.title || 'عقار محذوف'}</h4>
                    <p className="text-sm text-gray-500">{rental.property?.address}, {rental.property?.city}</p>
                    <p className="text-xs text-gray-400 mt-1">من {rental.startDate} إلى {rental.endDate} (رقم العقد: {rental.orderId})</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="text-center">
                    <Badge className={getStatusColor(rental.status)}>{rental.status}</Badge>
                    <p className="text-sm text-gray-500 mt-1">الحالة</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg text-gray-800">{rental.total.toLocaleString()} د.م.</p>
                    <p className="text-sm text-gray-500">الإجمالي المدفوع</p>
                  </div>
                  <button className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
            لا توجد أي حجوزات في سجلك حتى الآن.
          </div>
        )}
      </div>
    </div>
  );
}
