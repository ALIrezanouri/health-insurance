'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface ServiceFilterProps {
  selectedServices?: string[];
  onChange?: (services: string[]) => void;
}

export function ServiceFilter({ 
  selectedServices = [],
  onChange
}: ServiceFilterProps) {
  // In a real app, this would be fetched from the API or defined in a config
  const services = [
    { id: 'dentistry', name: 'دندانپزشکی' },
    { id: 'imaging', name: 'تصویربرداری' },
    { id: 'laboratory', name: 'آزمایشگاه' },
    { id: 'physiotherapy', name: 'فیزیوتراپی' },
    { id: 'optometry', name: 'چشم پزشکی' },
    { id: 'orthodontics', name: 'اورتودنسی' },
    { id: 'mri', name: 'رنوگرافی (MRI)' },
    { id: 'ctscan', name: 'توموگرافی (CT)' },
    { id: 'blood_test', name: 'آزمایش خون' },
    { id: 'urine_test', name: 'آزمایش ادرار' },
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const newSelected = checked
      ? [...selectedServices, serviceId]
      : selectedServices.filter(id => id !== serviceId);
    
    onChange?.(newSelected);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>نوع خدمات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {services.map(service => (
          <div key={service.id} className="flex items-center space-x-2">
            <Checkbox 
              id={service.id} 
              checked={selectedServices.includes(service.id)}
              onCheckedChange={(checked) => handleServiceChange(service.id, !!checked)}
            />
            <label
              htmlFor={service.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {service.name}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}