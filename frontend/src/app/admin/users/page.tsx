"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Search, FilterX, MoreHorizontal, Loader2, Eye, Edit, MessageSquare, Ban } from "lucide-react";

// 1. تحديث نوع البيانات ليتوافق مع استجابة Laravel
type Role = {
  id: number;
  name: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  status: "active" | "pending" | "banned";
  created_at: string;
  rentals: number; 
  totalSpent: number;
};

// ... (دوال getRoleBadgeColor و getStatusBadgeColor تبقى كما هي)
const getRoleBadgeColor = (roleName: string) => {
  switch (roleName.toLowerCase()) {
    case "admin":
      return "bg-red-100 text-red-700";
    case "premium":
      return "bg-purple-100 text-purple-700";
    case "customer":
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "banned":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('bottom'); // حالة لتحديد موضع القائمة
  const menuRef = useRef<HTMLDivElement>(null);

  // useEffect لجلب البيانات
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error("Failed to parse JSON. Raw response from server:", responseText);
            throw new Error("Received malformed data from the server.");
        }

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch users from the server.');
        }

        const usersWithMockData = data.map((user: any) => ({
            ...user,
            rentals: user.rentals || Math.floor(Math.random() * 20),
            totalSpent: user.totalSpent || Math.floor(Math.random() * 5000),
            status: user.status || 'active',
        }));
        setUsers(usersWithMockData);

      } catch (err: any) {
        setError("فشل في جلب بيانات المستخدمين. يرجى المحاولة مرة أخرى.");
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // useEffect لإغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  // دالة لفتح/إغلاق القائمة وتحديد موضعها
  const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    if (openMenuId === userId) {
      setOpenMenuId(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 220; // ارتفاع تقريبي للقائمة

    if (spaceBelow < dropdownHeight) {
      setMenuPosition('top'); // فتح لأعلى
    } else {
      setMenuPosition('bottom'); // فتح لأسفل
    }

    setOpenMenuId(userId);
  };


  return (
    <div className="space-y-8">
      {/* ... (قسم العنوان والفلاتر يبقى كما هو) ... */}
       <div className="flex items-center justify-between">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">إدارة المستخدمين</h1>
          <p className="text-gray-500 mt-1">
            إدارة حسابات المستخدمين وصلاحياتهم
          </p>
        </div>
        <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <Plus size={20} className="ml-2" />
          إضافة مستخدم
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-800 text-right">فلترة المستخدمين</h3>
          </div>
          <select className="w-full p-2 border rounded-md bg-gray-50 text-right">
            <option>كل الأدوار</option>
            <option>Customer</option>
            <option>Premium</option>
            <option>Admin</option>
          </select>
          <select className="w-full p-2 border rounded-md bg-gray-50 text-right">
            <option>كل الحالات</option>
            <option>Active</option>
            <option>Pending</option>
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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
        <div className="p-4 flex justify-between items-center border-b">
            <div className="text-right">
                <h3 className="font-semibold text-lg text-gray-800">المستخدمون ({users.length})</h3>
                <p className="text-sm text-gray-500">القائمة الكاملة للمستخدمين المسجلين</p>
            </div>
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <FilterX size={16} className="ml-2" />
                مسح الفلاتر
            </button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>جاري تحميل المستخدمين...</span>
          </div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">{error}</div>
        ) : (
          <table className="w-full text-right">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600">الاسم</th>
                <th className="p-4 font-semibold text-sm text-gray-600">البريد الإلكتروني</th>
                <th className="p-4 font-semibold text-sm text-gray-600">الدور</th>
                <th className="p-4 font-semibold text-sm text-gray-600">الحالة</th>
                <th className="p-4 font-semibold text-sm text-gray-600">تاريخ الانضمام</th>
                <th className="p-4 font-semibold text-sm text-gray-600">الإيجارات</th>
                <th className="p-4 font-semibold text-sm text-gray-600">إجمالي الصرف</th>
                <th className="p-4 font-semibold text-sm text-gray-600 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => {
                const userRole = user.roles && user.roles.length > 0 ? user.roles[0].name : 'N/A';
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-900 font-medium">{user.name}</td>
                    <td className="p-4 text-gray-700">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getRoleBadgeColor(userRole)}`}>{userRole}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadgeColor(user.status)}`}>{user.status}</span>
                    </td>
                    <td className="p-4 text-gray-700">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-700">{user.rentals}</td>
                    <td className="p-4 text-gray-700">${user.totalSpent.toLocaleString()}</td>
                    
                    {/* --- خلية الإجراءات مع القائمة المنسدلة --- */}
                    <td className="p-4 text-center">
                      <div className="relative inline-block text-left" ref={openMenuId === user.id ? menuRef : null}>
                        <button
                          onClick={(e) => handleMenuToggle(e, user.id)}
                          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <MoreHorizontal size={20} />
                        </button>
                        {openMenuId === user.id && (
                          <div className={`absolute left-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${
                              menuPosition === 'bottom'
                                ? 'origin-top-right mt-2' // الموضع الافتراضي لأسفل
                                : 'origin-bottom-right bottom-full mb-2' // الموضع الجديد لأعلى
                            }`}
                          >
                            <div className="py-1" role="menu" aria-orientation="vertical">
                              <div className="px-4 py-2 text-sm text-gray-500 border-b">إجراءات</div>
                              <a href="#" className="flex items-center text-right w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <Eye size={16} className="ml-3" />
                                <span>عرض الملف الشخصي</span>
                              </a>
                              <a href="#" className="flex items-center text-right w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <Edit size={16} className="ml-3" />
                                <span>تعديل المستخدم</span>
                              </a>
                              <a href="#" className="flex items-center text-right w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <MessageSquare size={16} className="ml-3" />
                                <span>إرسال رسالة</span>
                              </a>
                              <div className="border-t my-1"></div>
                              <a href="#" className="flex items-center text-right w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">
                                <Ban size={16} className="ml-3" />
                                <span>تعليق المستخدم</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
