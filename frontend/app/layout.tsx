import '../styles/globals.css';
import { Header } from '@/components/layout/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HealthInsurance Hub',
  description: 'Search for medical centers that accept your insurance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}