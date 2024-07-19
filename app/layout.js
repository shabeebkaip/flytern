import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./shared/components/Header";
import MobileNavigator from "@/app/shared/components/MobileNavigator";
import FooterTop from "./shared/components/FooterTop";
import Footer from "./shared/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flytern NEXT",
  description: "Flights, hotels, and more",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <MobileNavigator />
          <FooterTop />
          <Footer />
        </footer>
      </body>
    </html >
  );
}
