"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, DollarSign, Home, Phone, Star, Loader2 } from "lucide-react";

// تعريف أنواع البيانات
type Stat = { label: string; value: string | number; color: string; };
type Rental = {
  id: string;
  item: string; // اسم العقار
  city: string; // مدينة العقار
  startDate: string;
  endDate: string;
  status: string;
  total: number;
};

// محاكاة مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-bold text-gray-800">{children}</h2>;
const CardDescription = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-gray-500">{children}</p>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => <span className={`px-3 py-1 text-xs font-semibold rounded-full ${className}`}>{children}</span>;

const getStatusColor = (status: string) => {
  switch (status) {
    case "نشط": return "bg-blue-100 text-blue-800";
    case "مكتمل": return "bg-green-100 text-green-800";
    case "قيد الانتظار": return "bg-yellow-100 text-yellow-800";
    case "متأخر": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentRentals, setRecentRentals] = useState<Rental[]>([]);
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
        const response = await fetch(`${apiUrl}/user/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error("Failed to fetch dashboard data.");

        const data = await response.json();
        setUserName(data.userName);
        setStats(data.stats);
        setRecentRentals(data.recentRentals);
      } catch (err: any) {
        setError("فشل في جلب البيانات. يرجى المحاولة مرة أخرى.");
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-600" /></div>;
  }
  
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 font-serif" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">مرحباً بك، {userName}!</h1>
        <p className="text-gray-600 mt-2">إليك ما يحدث مع إيجاراتك</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Rentals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>الإيجارات الأخيرة</CardTitle>
              <CardDescription>نشاط الإيجار الأخير</CardDescription>
            </div>
            <Link href="/dashboard/history">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">عرض الكل</button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRentals.map((rental) => (
              <div key={rental.id} className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="font-semibold text-gray-800">{rental.item}</h3>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mt-1">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{rental.city}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">من {rental.startDate} إلى {rental.endDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Badge className={getStatusColor(rental.status)}>{rental.status}</Badge>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <DollarSign className="h-5 w-5 text-gray-800" />
                    <span className="font-semibold text-gray-800">{rental.total.toLocaleString()} د.م.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/apartments">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="text-center">
              <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">تصفح الشقق</h3>
              <p className="text-sm text-gray-600">ابحث عن الشقة المثالية لإقامتك القادمة</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/support">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">الحصول على الدعم</h3>
              <p className="text-sm text-gray-600">تحتاج مساعدة؟ فريقنا هنا لمساعدتك</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/reviews">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">اترك تقييماً</h3>
              <p className="text-sm text-gray-600">شارك تجربتك مع المستخدمين الآخرين</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
