'use client';

import { InsuranceFilter } from '@/components/search/InsuranceFilter';
import { ServiceFilter } from '@/components/search/ServiceFilter';
import { ResultsList } from '@/components/search/ResultsList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    insuranceIds: [] as string[],
    services: [] as string[],
    city: '',
    province: ''
  });

  const handleInsuranceChange = (insuranceIds: string[]) => {
    setFilters(prev => ({
      ...prev,
      insuranceIds
    }));
  };

  const handleServiceChange = (services: string[]) => {
    setFilters(prev => ({
      ...prev,
      services
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      city: e.target.value
    }));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      province: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">جستجوی مراکز درمانی</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          مراکز درمانی معتبر که با بیمه شما قرارداد دارند را پیدا کنید
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>فیلترهای جستجو</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">شهر</Label>
                <Input 
                  id="city" 
                  placeholder="مثلاً تهران" 
                  value={filters.city}
                  onChange={handleCityChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">استان</Label>
                <Input 
                  id="province" 
                  placeholder="مثلاً تهران" 
                  value={filters.province}
                  onChange={handleProvinceChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <InsuranceFilter 
            selectedInsurances={filters.insuranceIds}
            onChange={handleInsuranceChange}
          />
          <ServiceFilter 
            selectedServices={filters.services}
            onChange={handleServiceChange}
          />
        </div>
        
        {/* Results */}
        <div className="lg:col-span-3">
          <ResultsList filters={filters} />
        </div>
      </div>
    </div>
  );
}