"use client";

import React, { useState } from "react";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // محاكاة إرسال الرسالة
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setSuccessMessage("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-50 font-serif" dir="rtl">
      {/* Header Section */}
      <section 
        className="relative py-28 bg-cover bg-center text-white"
        style={{backgroundImage: "url('https://placehold.co/1920x600/1E3A5F/FFFFFF?text=DarDay.ma')"}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            تواصل معنا
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            نحن هنا لمساعدتك. سواء كان لديك سؤال، اقتراح، أو تحتاج إلى دعم، لا تتردد في التواصل معنا.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8 text-right">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">معلومات الاتصال</h2>
                    <p className="text-gray-600 mb-6">املأ النموذج وسيقوم فريقنا بالرد عليك في غضون 24 ساعة.</p>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-full ml-4"><Phone className="h-6 w-6 text-blue-600" /></div>
                        <div>
                            <h3 className="font-semibold text-gray-800">الهاتف</h3>
                            <p className="text-gray-600">+212 6 00 00 00 00</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-full ml-4"><Mail className="h-6 w-6 text-blue-600" /></div>
                        <div>
                            <h3 className="font-semibold text-gray-800">البريد الإلكتروني</h3>
                            <p className="text-gray-600">contact@darday.ma</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-full ml-4"><MapPin className="h-6 w-6 text-blue-600" /></div>
                        <div>
                            <h3 className="font-semibold text-gray-800">العنوان</h3>
                            <p className="text-gray-600">شارع محمد الخامس، فاس، المغرب</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {successMessage ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-green-50 text-green-700 rounded-lg">
                  <h3 className="font-semibold text-2xl mb-2">شكراً لك!</h3>
                  <p>{successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                      <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-md" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                      <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                    <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 border rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">رسالتك</label>
                    <textarea name="message" id="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full p-3 border rounded-md"></textarea>
                  </div>
                  <div className="text-left">
                    <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-800 text-white px-8 py-3 rounded-lg shadow-sm hover:bg-blue-900 transition-colors disabled:bg-blue-300">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'إرسال الرسالة'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section>
        <div className="w-full h-96 bg-gray-200">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211626.33333333334!2d-5.087445!3d34.03313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b484d445a3d%3A0x5e4123c5a8e3d437!2sFes!5e0!3m2!1sen!2sma!4v1678886400000!5m2!1sen!2sma"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
      </section>
    </div>
  );
}
