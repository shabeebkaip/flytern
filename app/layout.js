import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const HeaderParent = dynamic(() => import("@/app/shared/components/HeaderParent"));
const MobileNavigator = dynamic(() => import("@/app/shared/components/MobileNavigator"));
const FooterTop = dynamic(() => import("@/app/shared/components/FooterTop"));
const Footer = dynamic(() => import("@/app/shared/components/Footer"));

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flytern NEXT",
  description: "Flights, hotels, and more",
  icons: {
    icon: '/header/logo-green.svg'
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <HeaderParent />
        </header>
        <Suspense fallback={<div>Loading...</div>} >
          <main className="min-h-screen">
            {children}
          </main>
        </Suspense> 
        <footer>
          <MobileNavigator />
          <FooterTop />
          <Footer />
        </footer>
      </body>
    </html >
  );
}
