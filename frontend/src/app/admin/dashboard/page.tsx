"use client";

import React from "react";
// In a real Next.js app, you would use:
// import { useRouter } from "next/navigation";
import { Users, Package, DollarSign, TrendingUp, Settings, LogOut, LayoutGrid, Shield } from "lucide-react";

// --- A simple router replacement for preview purposes ---
// This function simulates the behavior of Next.js's router for this environment.
const useRouter = () => {
    return {
        push: (path) => {
            // In a real app, this would change the URL.
            // For this preview, we'll navigate by changing the window location.
            window.location.href = path;
        }
    };
};


// --- المكون الرئيسي للوحة التحكم ---
export default function AdminDashboardPage() {
  // We use our preview-safe router here.
  const router = useRouter(); 

  // بيانات وهمية باللغة العربية
  const stats = [
    { title: "إجمالي المستخدمين", value: "1,234", change: "+12% عن الشهر الماضي", icon: <Users className="h-6 w-6 text-gray-500" /> },
    { title: "العقارات النشطة", value: "89", change: "+5% عن الشهر الماضي", icon: <Package className="h-6 w-6 text-gray-500" /> },
    { title: "الإيرادات الشهرية", value: "45,678 درهم", change: "+18% عن الشهر الماضي", icon: <DollarSign className="h-6 w-6 text-gray-500" /> },
    { title: "نسبة الإشغال", value: "78%", change: "-3% عن الشهر الماضي", changeColor: "text-red-500", icon: <TrendingUp className="h-6 w-6 text-gray-500" /> },
  ];

  const recentActivity = [
    { message: "تم إنشاء حجز جديد بواسطة أحمد علي", time: "قبل دقيقتين", status: "success" },
    { message: "تسجيل مستخدم جديد: سارة كرم", time: "قبل 15 دقيقة", status: "info" },
    { message: "تم استلام دفعة للطلب #R001", time: "قبل ساعة", status: "success" },
    { message: "صيانة مستحقة للعقار: شقة #EX-001", time: "قبل ساعتين", status: "warning" },
  ];

  const pendingActions = [
      { title: "تحقق من المستخدمين معلق", description: "5 مستخدمين ينتظرون التحقق من الحساب", priority: "عاجل" },
      { title: "عقود إيجار متأخرة", description: "3 عقود تجاوزت تاريخ انتهاءها", priority: "عاجل" },
      { title: "صيانة مجدولة", description: "12 عقاراً مجدول للصيانة هذا الأسبوع", priority: "متوسط" },
  ];

  const handleLogout = async () => {
    // 1. Get the token from localStorage to authenticate the request
    const token = localStorage.getItem('api_token');
    if (!token) {
        console.error("No authentication token found. Cannot log out.");
        router.push('/login');
        return;
    }

    // Use your API URL from environment variables
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/logout`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', 
      });

      if (response.ok) {
        console.log("Logged out successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Logout failed:', response.status, errorData);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    } finally {
        // ALWAYS clean up and redirect, regardless of success or failure.
        // This prevents the user from being stuck in a logged-in state if the token is invalid.
        localStorage.removeItem('api_token');
        router.push('/login');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      {/* --- القائمة الجانبية --- */}
      <aside className="w-64 flex-shrink-0 bg-[#1E3A5F] text-gray-300 flex flex-col font-serif">
        <div className="h-16 flex items-center px-6 space-x-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-md flex items-center justify-center text-2xl font-bold text-[#1E3A5F]">D</div>
          <span className="text-xl font-bold text-white tracking-wider">DarDay Admin</span>
        </div>
        <div className="p-4">
            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-700">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="mr-3">مدير النظام</span>
            </div>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-2">
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-semibold rounded-md bg-[#D4AF37] text-[#1E3A5F]">
            <LayoutGrid className="h-5 w-5" /> <span className="mr-3">لوحة التحكم</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-700/50">
            <Users className="h-5 w-5" /> <span className="mr-3">المستخدمون</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-700/50">
            <Package className="h-5 w-5" /> <span className="mr-3">العقارات</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-700/50">
            <TrendingUp className="h-5 w-5" /> <span className="mr-3">التحليلات</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-700/50">
            <Settings className="h-5 w-5" /> <span className="mr-3">الإعدادات</span>
          </a>
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
            <button onClick={handleLogout} className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200">
                <LogOut className="h-5 w-5" />
                <span className="mr-3">تسجيل الخروج</span>
            </button>
        </div>
      </aside>

      {/* --- المحتوى الرئيسي --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم المدير</h1>
            <p className="text-gray-500 mt-1">نظرة عامة على عمليات أعمال الإيجار الخاصة بك</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.changeColor || 'text-green-500'}`}>{stat.change}</p>
                  </div>
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">آخر الأنشطة</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${activity.status === 'success' ? 'bg-green-500' : activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                    <div>
                      <p className="text-sm text-gray-700">{activity.message}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Actions */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">آخر الإجراءات المعلقة</h3>
              <div className="space-y-3">
                {pendingActions.map((action, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${action.priority === 'عاجل' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{action.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
