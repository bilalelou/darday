"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

// مكونات UI
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>;
const Switch = ({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (checked: boolean) => void }) => (
    <button type="button" onClick={() => onCheckedChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-800' : 'bg-gray-200'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);
const NotificationItem = ({ title, description, isEnabled, onToggle }: { title: string, description: string, isEnabled: boolean, onToggle: (isEnabled: boolean) => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
        <div className="text-right">
            <p className="font-medium text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Switch checked={isEnabled} onCheckedChange={onToggle} />
    </div>
);
const SecurityItem = ({ title, description, buttonText, onClick }: { title: string, description: string, buttonText: string, onClick: () => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
        <div className="text-right">
            <p className="font-medium text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button onClick={onClick} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            {buttonText}
        </button>
    </div>
);

// مكون Toaster الجديد
const Toaster = ({ message, type, onDismiss }: { message: string; type: 'success' | 'error'; onDismiss: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000); // إخفاء الإشعار بعد 4 ثوانٍ
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div className={`fixed top-5 left-5 p-4 rounded-lg text-white shadow-lg z-50 flex items-center ${bgColor}`} dir="rtl">
      <Icon className="ml-3" />
      <span>{message}</span>
    </div>
  );
};


export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    general: true, promotions: false, security: true, reminders: false,
  });
  const [preferences, setPreferences] = useState({
    language: "العربية", timezone: "UTC+1", currency: "MAD",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toaster, setToaster] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  useEffect(() => {
    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("api_token");
            if (!token) throw new Error("Authentication token not found.");

            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/user/settings`;
            const response = await fetch(apiUrl, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
            });

            if (!response.ok) throw new Error("Failed to fetch settings.");

            const data = await response.json();
            setNotifications(data.notifications || { general: true, promotions: false, security: true, reminders: false });
            setPreferences(data.preferences || { language: "العربية", timezone: "UTC+1", currency: "MAD" });
        } catch (err: any) {
            setToaster({ message: "فشل في جلب الإعدادات.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    fetchSettings();
  }, []);

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setToaster({ message: '', type: null });
    try {
        const token = localStorage.getItem("api_token");
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/user/settings`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notifications, preferences })
        });

        if (!response.ok) throw new Error("Failed to save settings.");

        setToaster({ message: "تم حفظ الإعدادات بنجاح!", type: 'success' });
    } catch (err: any) {
        setToaster({ message: "فشل في حفظ الإعدادات. يرجى المحاولة مرة أخرى.", type: 'error' });
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) {
      return <div className="flex justify-center items-center h-screen"><Loader2 size={48} className="animate-spin text-blue-800" /></div>
  }

  return (
    <div className="p-8 font-serif" dir="rtl">
      {toaster.type && <Toaster message={toaster.message} type={toaster.type} onDismiss={() => setToaster({ message: '', type: null })} />}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">الإعدادات</h1>
        <p className="text-gray-600 mt-2">إدارة تفضيلات حسابك والإشعارات</p>
      </div>

      <div className="space-y-8">
        {/* قسم الإشعارات */}
        <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">الإشعارات</h2>
            <p className="text-sm text-gray-500 mb-4">اختر كيف تريد أن نتواصل معك بشأن نشاط حسابك.</p>
            <NotificationItem 
                title="الإشعارات العامة"
                description="تلقي تحديثات حول الميزات الجديدة وإعلانات الخدمة."
                isEnabled={notifications.general}
                onToggle={() => handleNotificationToggle('general')}
            />
            <NotificationItem 
                title="إشعارات البريد الإلكتروني"
                description="تلقي تحديثات البريد الإلكتروني والعروض الترويجية حول إيجاراتك."
                isEnabled={notifications.promotions}
                onToggle={() => handleNotificationToggle('promotions')}
            />
            <NotificationItem 
                title="رسائل نصية"
                description="تلقي رسائل نصية لتحديثات الحساب المهمة."
                isEnabled={notifications.security}
                onToggle={() => handleNotificationToggle('security')}
            />
            <NotificationItem 
                title="تذكيرات الإيجار"
                description="احصل على تذكيرات حول مواعيد بدء وانتهاء الإيجار القادمة."
                isEnabled={notifications.reminders}
                onToggle={() => handleNotificationToggle('reminders')}
            />
        </Card>

        {/* قسم التفضيلات */}
        <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">التفضيلات</h2>
            <p className="text-sm text-gray-500 mb-6">تخصيص تفضيلات حسابك.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اللغة</label>
                    <select name="language" value={preferences.language} onChange={handlePreferenceChange} className="w-full p-2 border rounded-md bg-gray-50">
                        <option>العربية</option>
                        <option>English</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المنطقة الزمنية</label>
                    <select name="timezone" value={preferences.timezone} onChange={handlePreferenceChange} className="w-full p-2 border rounded-md bg-gray-50">
                        <option>توقيت المغرب (UTC+1)</option>
                        <option>توقيت غرينتش (UTC+0)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">العملة</label>
                    <select name="currency" value={preferences.currency} onChange={handlePreferenceChange} className="w-full p-2 border rounded-md bg-gray-50">
                        <option>الدرهم المغربي (MAD)</option>
                        <option>الدولار الأمريكي (USD)</option>
                    </select>
                </div>
            </div>
        </Card>

        {/* قسم الأمان */}
        <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">الأمان</h2>
            <p className="text-sm text-gray-500 mb-4">إدارة إعدادات أمان حسابك.</p>
            <SecurityItem 
                title="كلمة المرور"
                description="آخر تغيير منذ 3 أشهر"
                buttonText="تغيير كلمة المرور"
                onClick={() => { /* يمكنك توجيه المستخدم لصفحة تغيير كلمة المرور هنا */ }}
            />
            <SecurityItem 
                title="المصادقة الثنائية"
                description="أضف طبقة حماية إضافية لحسابك."
                buttonText="تفعيل المصادقة الثنائية"
                onClick={() => {}}
            />
            <SecurityItem 
                title="الجلسات النشطة"
                description="إدارة جلسات تسجيل الدخول النشطة."
                buttonText="عرض الجلسات"
                onClick={() => {}}
            />
        </Card>

        {/* زر الحفظ */}
        <div className="flex justify-end">
            <button 
                onClick={handleSaveChanges} 
                disabled={isSaving}
                className="flex items-center justify-center bg-blue-800 text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-blue-900 transition-colors disabled:bg-blue-300"
            >
                {isSaving ? <Loader2 className="animate-spin" /> : 'حفظ الإعدادات'}
            </button>
        </div>
      </div>
    </div>
  );
}
