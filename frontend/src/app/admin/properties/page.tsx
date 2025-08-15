"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, FilterX, Eye, Edit, Trash2, Loader2, AlertTriangle } from "lucide-react";

// ... (تعريف الأنواع ودوال الألوان تبقى كما هي)
type PropertyImage = { id: number; path: string; };
type Property = {
  id: number;
  title: string;
  address: string;
  city: string;
  type: "شقة" | "فيلا" | "استوديو";
  status: "متاح" | "مؤجر" | "صيانة";
  pricePerNight: number;
  images: PropertyImage[];
};
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "متاح": return "bg-green-100 text-green-700";
    case "مؤجر": return "bg-yellow-100 text-yellow-700";
    case "صيانة": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // حالات جديدة للفلاتر
  const [filters, setFilters] = useState({
    search: '',
    type: 'الكل',
    status: 'الكل',
  });

  // ... (حالات نافذة الحذف تبقى كما هي)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace('/api', '');

  // تحديث دالة جلب البيانات لتشمل الفلاتر
  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("api_token");
      if (!token) throw new Error("Authentication token not found.");

      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.type !== 'الكل') params.append('type', filters.type);
      if (filters.status !== 'الكل') params.append('status', filters.status);

      const apiUrl = `${apiBaseUrl}/api`;
      const response = await fetch(`${apiUrl}/admin/properties?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to fetch properties from the server.');
      
      const data = await response.json();
      setProperties(data);
    } catch (err: any) {
      setError("فشل في جلب بيانات العقارات. يرجى المحاولة مرة أخرى.");
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, filters]);

  useEffect(() => {
    // استخدام Debounce لتأخير طلب البحث بعد الكتابة
    const handler = setTimeout(() => {
        fetchProperties();
    }, 500); // تأخير نصف ثانية

    return () => {
        clearTimeout(handler);
    };
  }, [filters, fetchProperties]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const clearFilters = () => {
      setFilters({ search: '', type: 'الكل', status: 'الكل' });
  };

  // ... (دوال الحذف تبقى كما هي)
  const openDeleteModal = (property: Property) => { setPropertyToDelete(property); setShowDeleteModal(true); setDeleteError(null); };
  const closeDeleteModal = () => { setPropertyToDelete(null); setShowDeleteModal(false); };
  const handleDelete = async () => { /* ... */ };

  return (
    <>
      <div className="space-y-8 font-serif">
        <div className="flex items-center justify-between">
            <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800">إدارة العقارات</h1>
            <p className="text-gray-500 mt-1">
                عرض، تعديل، وإضافة العقارات المتاحة للإيجار
            </p>
            </div>
            <Link href="/admin/properties/new" className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            <Plus size={20} className="ml-2" />
            إضافة عقار
            </Link>
        </div>

        {/* قسم الفلاتر المحدث */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-800 text-right">فلترة العقارات</h3>
            </div>
            <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50 text-right">
                <option value="الكل">كل الأنواع</option>
                <option value="شقة">شقة</option>
                <option value="فيلا">فيلا</option>
                <option value="استوديو">استوديو</option>
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50 text-right">
                <option value="الكل">كل الحالات</option>
                <option value="متاح">متاح</option>
                <option value="مؤجر">مؤجر</option>
                <option value="صيانة">صيانة</option>
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
                    <h3 className="font-semibold text-lg text-gray-800">العقارات ({properties.length})</h3>
                    <p className="text-sm text-gray-500">القائمة الكاملة للعقارات المسجلة</p>
                </div>
                <button onClick={clearFilters} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <FilterX size={16} className="ml-2" />
                    مسح الفلاتر
                </button>
            </div>
            
            {isLoading ? (
                <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin mr-2" size={24} /><span>جاري تحميل العقارات...</span></div>
            ) : error ? (
                <div className="text-center p-8 text-red-500">{error}</div>
            ) : (
            <table className="w-full text-right">
                {/* ... (رأس الجدول يبقى كما هو) ... */}
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
                {properties.map((prop) => {
                    const mainImage = prop.images && prop.images.length > 0
                        ? `${apiBaseUrl}/storage/${prop.images[0].path}`
                        : 'https://placehold.co/100x60/E2E8F0/4A5568?text=No+Image';

                    return (
                    <tr key={prop.id} className="hover:bg-gray-50">
                        <td className="p-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <img src={mainImage} alt={prop.title} className="w-24 h-16 object-cover rounded-md" />
                            <div>
                                <p className="text-gray-900 font-medium">{prop.title}</p>
                                <p className="text-sm text-gray-500">{prop.address}, {prop.city}</p>
                            </div>
                            </div>
                        </td>
                        <td className="p-4 text-gray-700">{prop.type}</td>
                        <td className="p-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(prop.status)}`}>{prop.status}</span>
                        </td>
                        <td className="p-4 text-gray-900 font-medium">
                            {parseFloat(prop.pricePerNight as any).toLocaleString()} د.م.
                        </td>
                        <td className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                                <button className="p-2 rounded-full hover:bg-gray-200 transition-colors text-blue-500"><Eye size={18} /></button>
                                <Link href={`/admin/properties/${prop.id}/edit`} className="p-2 rounded-full hover:bg-gray-200 transition-colors text-green-500"><Edit size={18} /></Link>
                                <button onClick={() => openDeleteModal(prop)} className="p-2 rounded-full hover:bg-gray-200 transition-colors text-red-500"><Trash2 size={18} /></button>
                            </div>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            )}
        </div>
      </div>

      {/* ... (نافذة تأكيد الحذف تبقى كما هي) ... */}
      {showDeleteModal && propertyToDelete && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50" dir="rtl">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div className="ml-4 mr-4">
                <h3 className="text-lg font-medium text-gray-900">حذف العقار</h3>
                <p className="text-sm text-gray-500 mt-1">
                  هل أنت متأكد من رغبتك في حذف العقار "{propertyToDelete.title}"؟ لا يمكن التراجع عن هذا الإجراء.
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
