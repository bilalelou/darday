"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, FilterX, MoreHorizontal, Loader2, Eye, Edit, Trash2, MessageSquare, Ban, AlertTriangle } from "lucide-react";

// ... (باقي الكود يبقى كما هو)
type Role = { id: number; name: string; };
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
const getRoleBadgeColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin": return "bg-red-100 text-red-700";
    case "premium": return "bg-purple-100 text-purple-700";
    case "customer": default: return "bg-blue-100 text-blue-700";
  }
};
const getStatusBadgeColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active": return "bg-green-100 text-green-700";
    case "pending": return "bg-yellow-100 text-yellow-700";
    case "banned": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // حالات جديدة للفلاتر
  const [filters, setFilters] = useState({
    search: '',
    role: 'الكل',
    status: 'الكل',
  });

  // حالات جديدة لنافذة تأكيد الحذف
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // تحديث دالة جلب البيانات لتشمل الفلاتر
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.role !== 'الكل') params.append('role', filters.role);
      if (filters.status !== 'الكل') params.append('status', filters.status);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/admin/users?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users from the server.');
      }

      const data = await response.json();
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
  }, [filters]);

  useEffect(() => {
    const handler = setTimeout(() => {
        fetchUsers();
    }, 500); // تأخير نصف ثانية بعد الكتابة في حقل البحث

    return () => {
        clearTimeout(handler);
    };
  }, [filters, fetchUsers]);


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const clearFilters = () => {
      setFilters({ search: '', role: 'الكل', status: 'الكل' });
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
    setDeleteError(null);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "فشل حذف المستخدم." }));
        throw new Error(errorData.message);
      }

      setUsers(users.filter(u => u.id !== userToDelete.id));
      closeDeleteModal();

    } catch (err: any) {
      setDeleteError(err.message);
      console.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800">إدارة المستخدمين</h1>
            <p className="text-gray-500 mt-1">
              إدارة حسابات المستخدمين وصلاحياتهم
            </p>
          </div>
          <Link href="/admin/users/new" className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            <Plus size={20} className="ml-2" />
            إضافة مستخدم
          </Link>
        </div>

        {/* قسم الفلاتر */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-800 text-right">فلترة المستخدمين</h3>
            </div>
            <select name="role" value={filters.role} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50 text-right">
                <option value="الكل">كل الأدوار</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50 text-right">
                <option value="الكل">كل الحالات</option>
                <option value="نشط">نشط</option>
                <option value="معلق">معلق</option>
            </select>
            <div className="relative">
                <input
                type="text"
                name="search"
                placeholder="بحث..."
                value={filters.search}
                onChange={handleFilterChange}
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
              <button onClick={clearFilters} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
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
                      
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                            <Link href={`/admin/users/${user.id}`} className="p-2 rounded-full hover:bg-gray-200 transition-colors text-blue-500">
                                <Eye size={18} />
                            </Link>
                            <Link href={`/admin/users/${user.id}/edit`} className="p-2 rounded-full hover:bg-gray-200 transition-colors text-green-500">
                                <Edit size={18} />
                            </Link>
                            <button onClick={() => openDeleteModal(user)} className="p-2 rounded-full hover:bg-gray-200 transition-colors text-red-500">
                                <Trash2 size={18} />
                            </button>
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

      {/* نافذة تأكيد الحذف */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div className="ml-4 mr-4">
                <h3 className="text-lg font-medium text-gray-900">حذف المستخدم</h3>
                <p className="text-sm text-gray-500 mt-1">
                  هل أنت متأكد من رغبتك في حذف المستخدم "{userToDelete.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                </p>
              </div>
            </div>
            {deleteError && (
                <div className="mt-4 text-center text-sm text-red-600">
                    <p><strong>خطأ:</strong> {deleteError}</p>
                </div>
            )}
            <div className="mt-6 flex justify-end space-x-2 rtl:space-x-reverse">
              <button onClick={closeDeleteModal} disabled={isDeleting} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50">
                إلغاء
              </button>
              <button onClick={handleDelete} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 flex items-center">
                {isDeleting && <Loader2 className="animate-spin ml-2" size={16} />}
                نعم، قم بالحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
