import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-montserrat',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tiệm Rau 55 - Thực phẩm hữu cơ & thảo mộc tươi sạch',
  description: 'Chuyên cung cấp rau củ quả hữu cơ VietGAP, trái cây cao cấp nhập khẩu và gia vị thảo mộc tự nhiên. Giao nhanh 2h tốc hành tại Đà Lạt & TP. HCM.',
  keywords: 'rau sach, thuc pham huu co, hoa qua sach, rau da lat, tiem rau 55, trai cay cao cap, gia vi thao moc',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://tiemrau55.com',
    title: 'Tiệm Rau 55 - Thực phẩm hữu cơ & thảo mộc tươi sạch',
    description: 'Chuyên cung cấp rau củ quả hữu cơ VietGAP, trái cây cao cấp nhập khẩu và gia vị thảo mộc tự nhiên.',
    siteName: 'Tiệm Rau 55',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#fcfdfc] text-[#1c2621] font-sans">
        <CartProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
