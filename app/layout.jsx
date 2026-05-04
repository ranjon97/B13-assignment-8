import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "NewBooks — Digital Library Reimagined",
  description:
    "A premium digital library experience with thousands of books at your fingertips. Modern, secure, and beautifully designed.",
  keywords: "digital library, books, ebooks, online library, modern library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="dark">
      <body className="bg-bg-primary text-gray-200 antialiased noise">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(15, 15, 23, 0.95)",
              backdropFilter: "blur(20px)",
              color: "#e5e7eb",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            },
            success: {
              iconTheme: { primary: "#10b981", secondary: "#0a0a0f" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#0a0a0f" },
            },
          }}
        />
      </body>
    </html>
  );
}
