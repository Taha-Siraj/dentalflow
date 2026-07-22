import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/app/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "DentalFlow | Multi-Branch Dental Clinic Management Portal",
  description: "Enterprise Multi-Branch Dental Clinic Management Portal for SmileCare Dental Clinics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFFFFF] text-[#111827] antialiased font-poppins" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
