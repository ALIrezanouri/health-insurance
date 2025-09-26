'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getMedicalCenters } from '@/lib/api';
import { MedicalCenter } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function ResultsList({ filters }: { filters?: any }) {
  const [centers, setCenters] = useState<MedicalCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMedicalCenters(filters || {});
        setCenters(data);
      } catch (err) {
        setError('خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.');
        console.error('Error fetching medical centers:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...Array(2)].map((_, j) => (
                    <Skeleton key={j} className="h-6 w-24" />
                  ))}
                </div>
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex items-center justify-center p-4">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (centers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">مرکزی یافت نشد</h3>
        <p className="text-muted-foreground">
          متأسفانه با فیلترهای انتخاب شده هیچ مرکز درمانی یافت نشد.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {centers.map(center => (
        <Card key={center.id} className="overflow-hidden">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">{center.name}</CardTitle>
                <CardDescription>{center.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {center.accepted_insurance.map(ins => (
                    <Badge key={ins.id} variant="secondary">
                      {ins.name} 
                      {ins.services.length > 0 && 
                        ` (${ins.services.join(', ')})`}
                    </Badge>
                  ))}
                </div>
                {center.phone && (
                  <p className="text-sm text-muted-foreground">
                    تلفن: {center.phone}
                  </p>
                )}
              </CardContent>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted/50">
              <Button variant="outline">جهت‌یابی</Button>
            </div>
          </div>
        </Card>
      ))}
      
      {centers.length >= 10 && (
        <div className="flex justify-center mt-6">
          <Button variant="outline">نمایش بیشتر</Button>
        </div>
      )}
    </div>
  );
}