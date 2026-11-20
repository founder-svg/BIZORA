import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'BIZORA - One Platform. Every Business | Wixfox Technologies',
  description:
    'All-in-one cloud business operating system. GST Invoicing, CRM pipelines, stock inventory, payments, and accounting designed for growing Indian enterprises.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-slate-800 bg-slate-50 selection:bg-blue-600 selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
