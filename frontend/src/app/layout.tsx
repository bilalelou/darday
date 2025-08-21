// app/layout.tsx (الملف الرئيسي الجديد)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DarDay.ma",
  description: "منصة DarDay لإدارة وتأجير العقارات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-serif">
        {children}
      </body>
    </html>
  );
}