import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PublicPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          پیدا کردن مراکز درمانی پذیرنده بیمه
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          با استفاده از HealthInsurance Hub می‌توانید مراکز درمانی نزدیک خود را که با بیمه‌های 
          شما قرارداد دارند پیدا کنید.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/search">
            <Button size="lg" className="text-base">
              شروع جستجو
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" className="text-base">
              مشاهده همه مراکز
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card rounded-lg border">
            <h3 className="font-bold text-lg mb-2">جستجوی پیشرفته</h3>
            <p className="text-muted-foreground">
              جستجو بر اساس نوع بیمه، خدمات و موقعیت مکانی
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <h3 className="font-bold text-lg mb-2">اطلاعات به‌روز</h3>
            <p className="text-muted-foreground">
              اطلاعات تماس و خدمات مراکز درمانی به‌روز و دقیق
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <h3 className="font-bold text-lg mb-2">قابلیت اطمینان</h3>
            <p className="text-muted-foreground">
              تنها مراکزی که قرارداد فعال با بیمه‌ها دارند نمایش داده می‌شوند
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}