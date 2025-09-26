'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadMedicalCenters } from '@/components/admin/UploadMedicalCenters';
import { UploadInsuranceCompanies } from '@/components/admin/UploadInsuranceCompanies';
import { UploadContracts } from '@/components/admin/UploadContracts';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">پنل مدیریت</h1>
        <p className="text-muted-foreground mt-2">
          افزودن و ویرایش اطلاعات مراکز درمانی، بیمه‌ها و قراردادها
        </p>
      </div>

      <Tabs defaultValue="centers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="centers">مراکز درمانی</TabsTrigger>
          <TabsTrigger value="insurance">شرکت‌های بیمه</TabsTrigger>
          <TabsTrigger value="contracts">قراردادها</TabsTrigger>
        </TabsList>
        
        <TabsContent value="centers">
          <Card>
            <CardHeader>
              <CardTitle>مدیریت مراکز درمانی</CardTitle>
              <CardDescription>
                افزودن یا به‌روزرسانی مراکز درمانی از طریق فایل اکسل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadMedicalCenters />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>مدیریت شرکت‌های بیمه</CardTitle>
              <CardDescription>
                افزودن یا به‌روزرسانی شرکت‌های بیمه از طریق فایل اکسل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadInsuranceCompanies />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>مدیریت قراردادها</CardTitle>
              <CardDescription>
                افزودن یا به‌روزرسانی قراردادها از طریق فایل اکسل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadContracts />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}