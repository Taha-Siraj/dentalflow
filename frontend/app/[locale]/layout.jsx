import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/app/providers";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
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
