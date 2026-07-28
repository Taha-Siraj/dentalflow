import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='12' fill='%230F766E'/><path d='M20 7C15.8 7 12.5 10.3 12.5 14.5C12.5 17.1 13.8 19.4 15.8 20.8L16.3 28.5C16.4 30.3 17.9 31.7 19.7 31.7C20.6 31.7 21.5 31.3 22.1 30.7C22.7 30.1 23.1 29.3 23.2 28.5L23.7 20.8C25.7 19.4 27 17.1 27 14.5C27 10.3 23.7 7 20 7Z' fill='%23FFFFFF' fill-opacity='0.25'/><path d='M11 20H15L17.5 14L20.5 25L23.5 17L25 20H29' stroke='%23FFFFFF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>" />
      </head>
      <body className="font-poppins bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#0F766E] selection:text-white">
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
