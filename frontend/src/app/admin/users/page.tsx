"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";

// يمكنك لاحقًا جلب هذه البيانات من قاعدة البيانات الخاصة بك
const users = [
  {
    id: "USR001",
    name: "أحمد علي",
    email: "ahmed.ali@example.com",
    role: "مستخدم",
    status: "نشط",
  },
  {
    id: "USR002",
    name: "سارة كرم",
    email: "sara.karam@example.com",
    role: "مستخدم",
    status: "نشط",
  },
  {
    id: "USR003",
    name: "ياسين بوحفة",
    email: "yassine.bouhfa@example.com",
    role: "مدير",
    status: "نشط",
  },
  {
    id: "USR004",
    name: "فاطمة الزهراء",
    email: "fatima.z@example.com",
    role: "مستخدم",
    status: "معلق",
  },
];

export default function UsersPage() {
  return (
    <>
      {/* عنوان الصفحة */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">إدارة المستخدمين</h1>
        <p className="text-gray-500 mt-1">
          عرض، تعديل، وحذف المستخدمين من النظام
        </p>
      </div>

      {/* جدول عرض المستخدمين */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-right">
          <thead className="border-b-2 border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600">المعرّف</th>
              <th className="p-4 font-semibold text-gray-600">الاسم</th>
              <th className="p-4 font-semibold text-gray-600">البريد الإلكتروني</th>
              <th className="p-4 font-semibold text-gray-600">الدور</th>
              <th className="p-4 font-semibold text-gray-600">الحالة</th>
              <th className="p-4 font-semibold text-gray-600 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 text-gray-700">{user.id}</td>
                <td className="p-4 text-gray-900 font-medium">{user.name}</td>
                <td className="p-4 text-gray-700">{user.email}</td>
                <td className="p-4 text-gray-700">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.status === "نشط"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <button className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}