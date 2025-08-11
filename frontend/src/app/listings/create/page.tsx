"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LOGO_SVG = () => (
  <svg
    width="130"
    height="34"
    viewBox="0 0 260 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="260" height="68" rx="8" fill="#1E3A5F" />
    <text
      x="28"
      y="43"
      fill="#FFFFFF"
      fontFamily="Inter, system-ui, -apple-system"
      fontWeight="700"
      fontSize="28"
    >
      DarDay<span style={{ fill: "#D4AF37" }}> .ma</span>
    </text>
  </svg>
);

export default function CreateListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    rooms: "",
    phone_number: "",
    is_furnished: false,
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length + images.length > 30) {
        alert("لا يمكنك تحميل أكثر من 30 صورة.");
        return;
      }
      setImages([...images, ...filesArray]);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'is_furnished') {
        data.append(key, value ? '1' : '0');
      } else {
        data.append(key, value as string);
      }
    });

    images.forEach((image) => {
      data.append("images[]", image);
    });

    try {
      const response = await fetch(`${apiBaseUrl}/listings`, {
        method: "POST",
        credentials: "include",
        body: data, // FormData sets the Content-Type header automatically
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/dashboard/user");
      } else if (response.status === 422) {
        setErrors(result.errors);
      } else {
        const genericError = "An unexpected error occurred. Please try again.";
        setErrors({ form: [genericError] });
      }
    } catch (error) {
      const genericError = "An unexpected error occurred. Please try again.";
      setErrors({ form: [genericError] });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div aria-hidden>
              <LOGO_SVG />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link className="hover:underline px-2" href="/">الرئيسية</Link>
            <Link className="hover:underline px-2" href="/dashboard/user">لوحة المستخدم</Link>
            <a className="hover:underline px-2" href="#contact">اتصل بنا</a>
          </nav>
          <div className="md:hidden">
            <button aria-label="menu" className="p-2 bg-white bg-opacity-10 rounded">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-[#F7F7F7] px-4 py-10">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-[#1E3A5F] mb-6 text-center">
            أضف عقاراً جديداً
          </h1>

          {errors.form && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm border border-red-200">
              {errors.form[0]}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm text-gray-600 mb-1">
                  العنوان
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm text-gray-600 mb-1">
                  السعر (درهم)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm text-gray-600 mb-1">
                الوصف
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm text-gray-600 mb-1">
                  المدينة
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city[0]}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm text-gray-600 mb-1">
                  العنوان
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rooms */}
              <div>
                <label htmlFor="rooms" className="block text-sm text-gray-600 mb-1">
                  عدد الغرف
                </label>
                <input
                  id="rooms"
                  name="rooms"
                  type="number"
                  required
                  value={formData.rooms}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                {errors.rooms && <p className="text-red-500 text-xs mt-1">{errors.rooms[0]}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_number" className="block text-sm text-gray-600 mb-1">
                  رقم الهاتف
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  required
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number[0]}</p>}
              </div>
            </div>

            {/* Is Furnished */}
            <div className="flex items-center gap-2">
              <input
                id="is_furnished"
                name="is_furnished"
                type="checkbox"
                checked={formData.is_furnished}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <label htmlFor="is_furnished" className="text-sm text-gray-600">
                مفروشة
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                الصور (حد أقصى 30)
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">انقر للتحميل</span> أو اسحب وأفلت
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB per image)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images[0]}</p>}
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {previews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-full object-cover rounded-md"
                    onLoad={() => URL.revokeObjectURL(preview)}
                  />
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] text-[#102030] py-2 rounded-md font-semibold hover:opacity-95 disabled:opacity-60"
            >
              {isSubmitting ? "جاري الإضافة..." : "أضف العقار"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#102030] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="mb-3">
              <LOGO_SVG />
            </div>
            <p className="text-sm text-gray-200">
              منصة لعرض شقق الكراء اليومي والشهري في المغرب.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-2">روابط</h5>
            <ul className="text-sm text-gray-200 space-y-1">
              <li>الأسئلة المتكررة</li>
              <li>شروط الاستخدام</li>
              <li>سياسة الخصوصية</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">اتصل بنا</h5>
            <p className="text-sm text-gray-200">info@darday.ma</p>
            <p className="text-sm text-gray-200">+212 6X XX XX XX</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DarDay.ma — كل الحقوق محفوظة
        </div>
      </footer>
    </div>
  );
}
