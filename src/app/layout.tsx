import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ProductProvider } from "@/context/ProductContext";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Table Data",
  description: "Table Data for testing offer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <ThemeProvider
          defaultTheme="light"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <ProductProvider>
            {children}
            <Toaster />
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
