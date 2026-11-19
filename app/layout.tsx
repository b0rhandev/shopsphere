import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "./context/ShopContext";
import { ChatProvider } from "./context/ChatContext";
import CartDrawer from "./components/store/CartDrawer";
import ChatWidget from "./components/chat/ChatWidget";
import WishlistDrawer from "./components/WishlistDrawer";
import { ThemeProvider } from "./context/ThemeContext";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShopSphere | فروشگاه آنلاین",
  description: "خرید آسان محصولات دیجیتال و لوازم هوشمند",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <ShopProvider>
            <ChatProvider>
              {children}
              <CartDrawer />
              <WishlistDrawer />
              <ChatWidget />
            </ChatProvider>
          </ShopProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
