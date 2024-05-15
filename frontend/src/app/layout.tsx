import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Yekan } from "@/utils/fonts";
import Layouts from "@/layouts/Layouts";

export const metadata: Metadata = {
   title: "مووی فو یو | دانلود و تماشای فیلم و سریال با زیرنویس فارسی چسیبده",
   description:
      "دانلود فیلم , دانلود سریال , دانلود و تماشای فیلم و سریال جدید با زیرنویس فارسی چسبیده , دانلود رایگان فیلم بدون سانسور از مووی فو یو , مووی فو یو , movieforyou",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {

   return (
      <html lang="fa" dir="rtl">
         <body className={Yekan.className}>
            <Providers>
               <Layouts>{children}</Layouts>
            </Providers>
         </body>
      </html>
   );
}
