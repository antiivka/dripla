import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  display: "swap",
});

export const metadata = { title: "Dripla" };

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body className={`${inter.className} bg-bg text-ink`} style={{background: "var(--bg)", color: "var(--text)"}}>
        {children}
      </body>
    </html>
  );
}
