"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, DollarSign, Users, Home, ClipboardList } from "lucide-react";

// تعريف أنواع البيانات
type MonthlyData = { month: string; revenue?: number; count?: number; };
type TopProperty = { name: string; rentals: number; };
type Kpis = { totalRevenue: number; totalUsers: number; totalProperties: number; totalRentals: number; };

// مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>;

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<{
    monthlyRevenue: MonthlyData[];
    newUsers: MonthlyData[];
    topProperties: TopProperty[];
    kpis: Kpis;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("api_token");
        if (!token) throw new Error("Authentication token not found.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/admin/analytics`;
        const response = await fetch(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error("Failed to fetch analytics data.");

        const data = await response.json();
        setAnalyticsData(data);
      } catch (err: any) {
        setError("فشل في جلب بيانات التحليلات. يرجى المحاولة مرة أخرى.");
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-800" /></div>;
  }

  if (error || !analyticsData) {
    return <div className="text-center p-8 text-red-500">{error || "لا توجد بيانات لعرضها."}</div>;
  }

  const { monthlyRevenue, newUsers, topProperties, kpis } = analyticsData;

  return (
    <div className="p-8 font-serif" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">التحليلات</h1>
        <p className="text-gray-600 mt-2">نظرة شاملة على أداء المنصة</p>
      </div>

      {/* بطاقات الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
            <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500 ml-4" />
                <div>
                    <p className="text-sm text-gray-500">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold">{kpis.totalRevenue.toLocaleString()} د.م.</p>
                </div>
            </div>
        </Card>
        <Card>
            <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500 ml-4" />
                <div>
                    <p className="text-sm text-gray-500">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold">{kpis.totalUsers}</p>
                </div>
            </div>
        </Card>
        <Card>
            <div className="flex items-center">
                <Home className="h-8 w-8 text-purple-500 ml-4" />
                <div>
                    <p className="text-sm text-gray-500">إجمالي العقارات</p>
                    <p className="text-2xl font-bold">{kpis.totalProperties}</p>
                </div>
            </div>
        </Card>
        <Card>
            <div className="flex items-center">
                <ClipboardList className="h-8 w-8 text-yellow-500 ml-4" />
                <div>
                    <p className="text-sm text-gray-500">إجمالي الإيجارات</p>
                    <p className="text-2xl font-bold">{kpis.totalRentals}</p>
                </div>
            </div>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
            <h3 className="font-semibold mb-4">الإيرادات الشهرية (آخر 12 شهر)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="الإيرادات" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
        <Card>
            <h3 className="font-semibold mb-4">المستخدمون الجدد (آخر 12 شهر)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={newUsers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#82ca9d" name="مستخدمون جدد" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
      </div>

      {/* العقارات الأكثر طلباً */}
      <Card>
        <h3 className="font-semibold mb-4">العقارات الأكثر إيجاراً</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-right">
                <thead className="border-b">
                    <tr>
                        <th className="p-2 font-medium text-sm text-gray-500">اسم العقار</th>
                        <th className="p-2 font-medium text-sm text-gray-500">عدد الإيجارات</th>
                    </tr>
                </thead>
                <tbody>
                    {topProperties.map((prop, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                            <td className="p-2 font-medium">{prop.name}</td>
                            <td className="p-2">{prop.rentals}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}
