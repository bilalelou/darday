"use client";

import React, { useState, useEffect } from "react";
import { Download, Search, FilterX, Edit, Eye, Plus } from "lucide-react";

// 1. تعريف نوع بيانات جديد للإيجارات ليناسب التصميم
type Rental = {
  orderId: string;
  customerName: string;
  item: string;
  category: "تصوير" | "بناء" | "مناسبات";
  startDate: string;
  endDate: string;
  status: "نشط" | "مكتمل" | "قيد الانتظار" | "متأخر";
  total: number;
};

// بيانات وهمية جديدة
const fakeApiRentals: Rental[] = [
  {
    orderId: "R001",
    customerName: "John Doe",
    item: "مجموعة كاميرا احترافية",
    category: "تصوير",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    status: "نشط",
    total: 267.00,
  },
  {
    orderId: "R002",
    customerName: "Sarah Johnson",
    item: "حفار بناء",
    category: "بناء",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    status: "مكتمل",
    total: 1350.00,
  },
  {
    orderId: "R003",
    customerName: "Mike Chen",
    item: "نظام صوت للمناسبات",
    category: "مناسبات",
    startDate: "2024-01-08",
    endDate: "2024-01-09",
    status: "مكتمل",
    total: 240.00,
  },
  {
    orderId: "R004",
    customerName: "Lisa Rodriguez",
    item: "قوس زفاف",
    category: "مناسبات",
    startDate: "2024-01-20",
    endDate: "2024-01-21",
    status: "قيد الانتظار",
    total: 150.00,
  },
    {
    orderId: "R005",
    customerName: "John Doe",
    item: "مجموعة أدوات كهربائية",
    category: "بناء",
    startDate: "2024-01-18",
    endDate: "2024-01-19",
    status: "متأخر",
    total: 180.00,
  },
];

// بيانات وهمية لبطاقات الإحصائيات
const stats = [
    { label: "متأخر", value: 3, color: "text-red-500" },
    { label: "قيد الانتظار", value: 8, color: "text-yellow-500" },
    { label: "مكتمل", value: 45, color: "text-green-500" },
    { label: "إيجارات نشطة", value: 12, color: "text-blue-500" },
];

// دالة لتحديد لون شارة الحالة
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "نشط":
      return "bg-blue-100 text-blue-700";
    case "مكتمل":
      return "bg-green-100 text-green-700";
    case "قيد الانتظار":
      return "bg-yellow-100 text-yellow-700";
    case "متأخر":
        return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function RentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      setIsLoading(false);
      // في تطبيق حقيقي، قم بجلب البيانات من API هنا
      setRentals(fakeApiRentals);
    };
    fetchRentals();
  }, []);

  return (
    <div className="space-y-8 font-serif">
      {/* قسم العنوان وزر الإضافة */}
      <div className="flex items-start justify-between">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">إدارة الإيجارات</h1>
          <p className="text-gray-500 mt-1">
            مراقبة وإدارة جميع معاملات الإيجار
          </p>
        </div>
        {/* تم تعديل هذا الزر */}
        <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <Plus size={18} className="ml-2" />
          إضافة شقة
        </button>
      </div>

      {/* قسم بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 mt-1">{stat.label}</p>
            </div>
        ))}
      </div>

      {/* قسم الفلاتر */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <h3 className="font-semibold text-gray-800 text-right">فلترة الإيجارات</h3>
          <div className="relative md:col-span-2">
            <input
              type="text"
              placeholder="بحث..."
              className="w-full p-2 pr-10 border rounded-md text-right"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <select className="w-full p-2 border rounded-md bg-gray-50 text-right">
            <option>الحالة</option>
            <option>نشط</option>
            <option>مكتمل</option>
          </select>
          <select className="w-full p-2 border rounded-md bg-gray-50 text-right">
            <option>الفئة</option>
            <option>تصوير</option>
            <option>بناء</option>
          </select>
          <button className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900">
            <FilterX size={16} className="ml-2" />
            مسح الفلاتر
          </button>
        </div>
      </div>

      {/* قسم الجدول */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
        <div className="p-4 flex justify-between items-center border-b">
            <div className="text-right">
                <h3 className="font-semibold text-lg text-gray-800">جميع الإيجارات</h3>
                <p className="text-sm text-gray-500">القائمة الكاملة لمعاملات الإيجار</p>
            </div>
        </div>
        
        <table className="w-full text-right">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600">معرف الطلب</th>
                <th className="p-4 font-semibold text-sm text-gray-600">العميل</th>
                <th className="p-4 font-semibold text-sm text-gray-600">العنصر</th>
                <th className="p-4 font-semibold text-sm text-gray-600">الفئة</th>
                <th className="p-4 font-semibold text-sm text-gray-600">تاريخ البدء</th>
                <th className="p-4 font-semibold text-sm text-gray-600">تاريخ الانتهاء</th>
                <th className="p-4 font-semibold text-sm text-gray-600">الحالة</th>
                <th className="p-4 font-semibold text-sm text-gray-600">الإجمالي</th>
                <th className="p-4 font-semibold text-sm text-gray-600 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rentals.map((rental) => (
                <tr key={rental.orderId} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-700 font-mono">{rental.orderId}</td>
                  <td className="p-4 text-gray-900 font-medium">{rental.customerName}</td>
                  <td className="p-4 text-gray-700">{rental.item}</td>
                  <td className="p-4 text-gray-700">{rental.category}</td>
                  <td className="p-4 text-gray-700">{rental.startDate}</td>
                  <td className="p-4 text-gray-700">{rental.endDate}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(rental.status)}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-900 font-medium">
                    ${rental.total.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                        <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold py-1 px-3 rounded">
                            <Eye size={14} className="ml-1" />
                            عرض
                        </button>
                        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded">
                            <Edit size={14} className="ml-1" />
                            تعديل
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}
