import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">HealthInsurance Hub</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/search">
            <Button variant="ghost">جستجو</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}