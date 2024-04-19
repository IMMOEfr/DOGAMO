import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "USC Contact Tracing App",
  description: "A contact tracing app for the University of San Carlos. by Mohan Francis, Dony Amorganda, and Galen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
