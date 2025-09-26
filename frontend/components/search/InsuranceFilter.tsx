'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { getInsuranceCompanies } from '@/lib/api';
import { InsuranceCompany } from '@/lib/types';

interface InsuranceFilterProps {
  selectedInsurances?: string[];
  onChange?: (insuranceIds: string[]) => void;
}

export function InsuranceFilter({ 
  selectedInsurances = [],
  onChange
}: InsuranceFilterProps) {
  const [insuranceCompanies, setInsuranceCompanies] = useState<InsuranceCompany[]>([]);

  useEffect(() => {
    const fetchInsuranceCompanies = async () => {
      try {
        const companies = await getInsuranceCompanies();
        setInsuranceCompanies(companies);
      } catch (error) {
        console.error('Failed to fetch insurance companies:', error);
        // Fallback to hardcoded data
        setInsuranceCompanies([
          { id: 'asia123', name: 'بیمه آسیا' },
          { id: 'saman456', name: 'بیمه سامان' },
          { id: 'parsian789', name: 'بیمه پارسیان' },
          { id: 'novin123', name: 'بیمه نوین' },
        ]);
      }
    };

    fetchInsuranceCompanies();
  }, []);

  const handleInsuranceChange = (insuranceId: string, checked: boolean) => {
    const newSelected = checked
      ? [...selectedInsurances, insuranceId]
      : selectedInsurances.filter(id => id !== insuranceId);
    
    onChange?.(newSelected);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>شرکت‌های بیمه</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {insuranceCompanies.map(company => (
          <div key={company.id} className="flex items-center space-x-2">
            <Checkbox 
              id={company.id} 
              checked={selectedInsurances.includes(company.id)}
              onCheckedChange={(checked) => handleInsuranceChange(company.id, !!checked)}
            />
            <label
              htmlFor={company.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {company.name}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}