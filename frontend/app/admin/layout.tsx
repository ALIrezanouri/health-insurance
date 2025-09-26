import { Header } from '@/components/layout/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پنل مدیریت | HealthInsurance Hub',
  description: 'پنل مدیریت برای افزودن و ویرایش مراکز درمانی',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
}