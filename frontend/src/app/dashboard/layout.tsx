import Layouts from "@/layouts/dashboard/Layouts";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "مووی فور یو | پنل مدیریت",
  };

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {



   return <Layouts>{children}</Layouts>;
}
