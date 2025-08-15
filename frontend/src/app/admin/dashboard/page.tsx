"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Package, DollarSign, TrendingUp, Loader2, Settings, FileText, Plus, AlertCircle } from "lucide-react";

// تعريف أنواع البيانات
type Stat = { title: string; value: string | number; icon: string; };
type Activity = { message: string; time: string; status: string; };
type Action = { title: string; description: string; priority: string; };

// مكون لعرض الأيقونات بشكل ديناميكي
const IconComponent = ({ name, className }: { name: string, className?: string }) => {
  const defaultClass = "h-8 w-8 text-gray-500";
  switch (name) {
    case "Users": return <Users className={className || defaultClass} />;
    case "Package": return <Package className={className || defaultClass} />;
    case "DollarSign": return <DollarSign className={className || defaultClass} />;
    case "TrendingUp": return <TrendingUp className={className || defaultClass} />;
    default: return null;
  }
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [pendingActions, setPendingActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/admin/dashboard-data`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error("Failed to fetch dashboard data.");

        const data = await response.json();
        setStats(data.stats || []);
        setRecentActivity(data.recentActivity || []);
        setPendingActions(data.pendingActions || []);
      } catch (err: any) {
        setError("فشل في جلب بيانات لوحة التحكم.");
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-serif space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم المدير</h1>
        <p className="text-gray-500 mt-1">
          نظرة عامة على عمليات أعمال الإيجار الخاصة بك
        </p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : error ? (
            <div className="col-span-4 text-center p-8 text-red-500">{error}</div>
        ) : (
          stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <IconComponent name={stat.icon} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* قسم الأنشطة والإجراءات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* آخر الأنشطة */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 text-right">آخر الأنشطة</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${activity.status === 'success' ? 'bg-green-500' : activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                <div className="text-right">
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الإجراءات المعلقة */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 text-right">الإجراءات المعلقة</h3>
          <div className="space-y-3">
            {pendingActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                <div className="text-right">
                  <p className="font-medium text-sm text-gray-800">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
                <div className="flex items-center">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${action.priority === 'عاجل' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{action.priority}</span>
                    <AlertCircle className={`h-5 w-5 ml-3 ${action.priority === 'عاجل' ? 'text-red-500' : 'text-yellow-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* الإجراءات السريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/admin/properties/new" className="bg-[#D4AF37] text-white text-center p-4 rounded-lg shadow-sm hover:bg-yellow-600 transition-colors">
            <Plus className="mx-auto h-8 w-8 mb-2" />
            <span className="font-semibold">إضافة عقار</span>
          </Link>
          <Link href="/admin/users" className="bg-[#1E3A5F] text-white text-center p-4 rounded-lg shadow-sm hover:bg-blue-900 transition-colors">
            <Users className="mx-auto h-8 w-8 mb-2" />
            <span className="font-semibold">إدارة المستخدمين</span>
          </Link>
          <Link href="#" className="bg-white border border-gray-200 text-gray-700 text-center p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <FileText className="mx-auto h-8 w-8 mb-2" />
            <span className="font-semibold">عرض التقارير</span>
          </Link>
          <Link href="#" className="bg-white border border-gray-200 text-gray-700 text-center p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <Settings className="mx-auto h-8 w-8 mb-2" />
            <span className="font-semibold">إعدادات النظام</span>
          </Link>
      </div>
    </div>
  );
}
