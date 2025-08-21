"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

// تعريف أنواع البيانات
type Item = { id: number; name: string; };
type TabType = 'cities' | 'property-types' | 'amenities';

// مكون لإدارة كل قسم (المدن، الأنواع، العناصر)
const SettingsSection = ({ title, endpoint }: { title: string, endpoint: TabType }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Item | null>(null);
    const [newItemName, setNewItemName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("api_token");
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/admin/${endpoint}`;
            const response = await fetch(apiUrl, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
            });
            if (!response.ok) throw new Error(`Failed to fetch ${title}`);
            const data = await response.json();
            setItems(data);
        } catch (err: any) {
            setError(err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [endpoint, title]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSave = async () => {
        const token = localStorage.getItem("api_token");
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/admin/${endpoint}`;
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${apiUrl}/${isEditing.id}` : apiUrl;
        const name = isEditing ? isEditing.name : newItemName;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || `Failed to save ${title}`);
            }
            setIsEditing(null);
            setNewItemName("");
            fetchData(); // إعادة جلب البيانات
        } catch (err: any) {
            setError(err.message);
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("هل أنت متأكد من رغبتك في الحذف؟")) return;
        try {
            const token = localStorage.getItem("api_token");
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/admin/${endpoint}/${id}`;
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
            });
            if (!response.ok) throw new Error(`Failed to delete ${title}`);
            fetchData(); // إعادة جلب البيانات
        } catch (err: any) {
            setError(err.message);
            console.error(err);
        }
    };

    return (
        <div className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={isEditing ? isEditing.name : newItemName}
                    onChange={(e) => isEditing ? setIsEditing({ ...isEditing, name: e.target.value }) : setNewItemName(e.target.value)}
                    placeholder={`إضافة أو تعديل ${title}...`}
                    className="flex-grow p-2 border rounded-md"
                />
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    {isEditing ? 'حفظ' : <Plus size={20} />}
                </button>
                {isEditing && (
                    <button onClick={() => setIsEditing(null)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                        إلغاء
                    </button>
                )}
            </div>
            {isLoading ? <Loader2 className="animate-spin" /> : (
                <ul className="space-y-2">
                    {items.map(item => (
                        <li key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span>{item.name}</span>
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditing(item)} className="p-2 text-gray-500 hover:text-blue-600"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('cities');

    const tabs: { key: TabType; label: string }[] = [
        { key: 'cities', label: 'المدن' },
        { key: 'property-types', label: 'أنواع العقارات' },
        { key: 'amenities', label: 'العناصر المتوفرة' },
    ];

    return (
        <div className="p-8 font-serif" dir="rtl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">إعدادات النظام</h1>
                <p className="text-gray-600 mt-2">إدارة الخيارات المتاحة في الموقع</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                {/* التبويبات */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-6 rtl:space-x-reverse">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.key
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* محتوى التبويب النشط */}
                <div>
                    {activeTab === 'cities' && <SettingsSection title="مدينة" endpoint="cities" />}
                    {activeTab === 'property-types' && <SettingsSection title="نوع عقار" endpoint="property-types" />}
                    {activeTab === 'amenities' && <SettingsSection title="عنصر" endpoint="amenities" />}
                </div>
            </div>
        </div>
    );
}
