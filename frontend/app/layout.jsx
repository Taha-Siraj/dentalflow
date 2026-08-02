import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "DentalFlow™ | Multi-Branch Dental Practice Management Portal",
  description: "Unified enterprise dental practice management platform connecting Canadian multi-branch clinics with real-time EMR, automated appointments, digital prescriptions, and direct insurance billing.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body
        className={`${poppins.className} font-poppins bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#0F766E] selection:text-white overflow-x-hidden w-full`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
