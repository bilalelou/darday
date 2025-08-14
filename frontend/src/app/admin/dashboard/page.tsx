"use client";

import React from "react";
import { Users, Package, DollarSign, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  // بيانات وهمية باللغة العربية
  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,234",
      change: "+12% عن الشهر الماضي",
      icon: <Users className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "العقارات النشطة",
      value: "89",
      change: "+5% عن الشهر الماضي",
      icon: <Package className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "الإيرادات الشهرية",
      value: "45,678 درهم",
      change: "+18% عن الشهر الماضي",
      icon: <DollarSign className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "نسبة الإشغال",
      value: "78%",
      change: "-3% عن الشهر الماضي",
      changeColor: "text-red-500",
      icon: <TrendingUp className="h-6 w-6 text-gray-500" />,
    },
  ];

  const recentActivity = [
    {
      message: "تم إنشاء حجز جديد بواسطة أحمد علي",
      time: "قبل دقيقتين",
      status: "success",
    },
    { message: "تسجيل مستخدم جديد: سارة كرم", time: "قبل 15 دقيقة", status: "info" },
    {
      message: "تم استلام دفعة للطلب #R001",
      time: "قبل ساعة",
      status: "success",
    },
    {
      message: "صيانة مستحقة للعقار: شقة #EX-001",
      time: "قبل ساعتين",
      status: "warning",
    },
  ];

  const pendingActions = [
    {
      title: "تحقق من المستخدمين معلق",
      description: "5 مستخدمين ينتظرون التحقق من الحساب",
      priority: "عاجل",
    },
    {
      title: "عقود إيجار متأخرة",
      description: "3 عقود تجاوزت تاريخ انتهاءها",
      priority: "عاجل",
    },
    {
      title: "صيانة مجدولة",
      description: "12 عقاراً مجدول للصيانة هذا الأسبوع",
      priority: "متوسط",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم المدير</h1>
        <p className="text-gray-500 mt-1">
          نظرة عامة على عمليات أعمال الإيجار الخاصة بك
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 ${stat.changeColor || "text-green-500"}`}>
                  {stat.change}
                </p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            آخر الأنشطة
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 rtl:space-x-reverse"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                    activity.status === "success"
                      ? "bg-green-500"
                      : activity.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />
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
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            آخر الإجراءات المعلقة
          </h3>
          <div className="space-y-3">
            {pendingActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-sm text-gray-800">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    action.priority === "عاجل"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {action.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}