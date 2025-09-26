'use client';

import { InsuranceFilter } from '@/components/search/InsuranceFilter';
import { ServiceFilter } from '@/components/search/ServiceFilter';
import { LocationSearch } from '@/components/search/LocationSearch';
import { ResultsList } from '@/components/search/ResultsList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    insuranceIds: ['asia123', 'saman456'],
    services: ['dentistry', 'imaging'],
    location: { lat: 35.6892, lng: 51.3890 },
    radius: 100
  });

  const handleLocationSearch = (location: { lat: number; lng: number }, radius: number) => {
    setFilters(prev => ({
      ...prev,
      location,
      radius
    }));
  };

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
          <InsuranceFilter 
            selectedInsurances={filters.insuranceIds}
            onChange={handleInsuranceChange}
          />
          <ServiceFilter 
            selectedServices={filters.services}
            onChange={handleServiceChange}
          />
          <LocationSearch onSearch={handleLocationSearch} />
        </div>
        
        {/* Results */}
        <div className="lg:col-span-3">
          <ResultsList filters={filters} />
        </div>
      </div>
    </div>
  );
}