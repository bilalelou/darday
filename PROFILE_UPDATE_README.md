# تحديث صفحة الملف الشخصي

## التحديثات المنجزة

### 1. تحديث UserDashboardController
تم إضافة الدوال التالية إلى `backend/app/Http/Controllers/Api/UserDashboardController.php`:

- `getProfile()`: لجلب بيانات الملف الشخصي للمستخدم
- `updateProfile(Request $request)`: لتحديث بيانات الملف الشخصي
- `updatePassword(Request $request)`: لتحديث كلمة المرور

### 2. إضافة مسارات API جديدة
تم إضافة المسارات التالية إلى `backend/routes/api.php`:

```php
Route::get('/user/profile', [UserDashboardController::class, 'getProfile'])->middleware('auth:sanctum');
Route::put('/user/profile', [UserDashboardController::class, 'updateProfile'])->middleware('auth:sanctum');
Route::put('/user/password', [UserDashboardController::class, 'updatePassword'])->middleware('auth:sanctum');
```

### 3. تحديث صفحة الملف الشخصي
تم تحديث `frontend/src/app/dashboard/profile/page.tsx` لـ:

- استخدام البيانات الحقيقية من API بدلاً من البيانات التجريبية
- جعل حقل البريد الإلكتروني قابل للقراءة فقط (readonly)
- تحديث أنواع البيانات لتتطابق مع نموذج المستخدم في قاعدة البيانات
- استخدام دوال API الجديدة من `utils/api.ts`

### 4. تحديث ملف API Utilities
تم إضافة دوال API جديدة إلى `frontend/src/utils/api.ts`:

```typescript
export const userProfileApi = {
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (data: any) => api.put('/api/user/profile', data),
  updatePassword: (data: { current_password: string; password: string; password_confirmation: string }) => 
    api.put('/api/user/password', data),
};
```

## الميزات الجديدة

### 1. جلب البيانات الحقيقية
- الصفحة الآن تجلب البيانات الحقيقية من قاعدة البيانات
- يتم عرض البيانات الفعلية للمستخدم المسجل دخوله

### 2. حقل البريد الإلكتروني قابل للقراءة فقط
- لا يمكن للمستخدم تعديل البريد الإلكتروني
- يتم عرضه بتنسيق رمادي للإشارة إلى أنه غير قابل للتعديل

### 3. تحديث البيانات
- يمكن للمستخدم تحديث: الاسم الأول، الاسم الأخير، رقم الهاتف، المدينة، العنوان
- يتم التحقق من صحة البيانات قبل الحفظ
- رسائل خطأ واضحة في حالة فشل التحديث

### 4. معالجة الأخطاء
- رسائل خطأ واضحة باللغة العربية
- معالجة أخطاء الاتصال بالخادم
- عرض رسائل النجاح عند التحديث

## الحقول المدعومة

- `first_name`: الاسم الأول (مطلوب)
- `last_name`: الاسم الأخير (مطلوب)
- `email`: البريد الإلكتروني (مطلوب، قابل للقراءة فقط)
- `phone`: رقم الهاتف (اختياري)
- `city`: المدينة (اختياري)
- `address`: العنوان (اختياري)

## متطلبات النظام

- Laravel 10+ مع Sanctum للمصادقة
- قاعدة بيانات تحتوي على الحقول المطلوبة في جدول `users`
- Next.js 13+ مع TypeScript
- Token مصادقة صالح في localStorage

## كيفية الاستخدام

1. تأكد من تسجيل دخول المستخدم
2. انتقل إلى صفحة الملف الشخصي
3. انقر على زر "تعديل" لتعديل البيانات
4. قم بتعديل الحقول المطلوبة
5. انقر على "حفظ" لحفظ التغييرات

## ملاحظات

- حقل البريد الإلكتروني لا يمكن تعديله لأسباب أمنية
- يتم تحديث الاسم الكامل تلقائياً عند تحديث الاسم الأول والأخير
- جميع الطلبات تتطلب مصادقة صالحة
- يتم التحقق من صحة البيانات على الخادم

