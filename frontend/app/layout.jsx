import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/app/providers";
import { getLocale, getMessages } from "next-intl/server";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "DentalFlow | Multi-Branch Dental Clinic Management Portal",
  description: "Enterprise Multi-Branch Dental Clinic Management Portal for SmileCare Dental Clinics",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "fr": "/fr",
      "ar": "/ar",
      "es": "/es",
      "ur": "/ur",
    },
  },
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRtl = ["ar", "ur"].includes(locale);

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFFFFF] text-[#111827] antialiased font-poppins" suppressHydrationWarning>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
