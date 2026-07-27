import { Poppins, Fraunces, Inter, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/app/providers";
import { SmoothScroll } from "@/components/smooth-scroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: "DentalFlow | Modern Multi-Branch Dental Clinics in Canada",
  description: "Enterprise Multi-Branch Dental Practice Portal across Toronto, Vancouver, Calgary, Ottawa, and Mississauga.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased font-poppins" suppressHydrationWarning>
        <SmoothScroll>
          <Providers>{children}</Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
