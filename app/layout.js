import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";

const HeaderParent = dynamic(() => import("@/app/shared/components/HeaderParent"));
const MobileNavigator = dynamic(() => import("@/app/shared/components/MobileNavigator"));
const FooterTop = dynamic(() => import("@/app/shared/components/FooterTop"));
const Footer = dynamic(() => import("@/app/shared/components/Footer"));

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flytern",
  description: "Flights, hotels, and more",
  icons:{
    icon:'/header/logo-green.svg'
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/header/logo-green.svg" sizes="16x16 32x32 48x48 64x64" />
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      <body className={inter.className}>
        <header>
          <HeaderParent />
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer>
          <MobileNavigator />
          <FooterTop />
          <Footer />
        </footer>
      </body>
      </head>
    </html >
  );
}
