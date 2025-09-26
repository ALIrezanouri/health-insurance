'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

export function UploadContracts() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<{success: boolean, message: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadResult({
        success: false,
        message: 'لطفاً یک فایل انتخاب کنید'
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    try {
      // In a real app, you would send the file to your backend here
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      setUploadResult({
        success: true,
        message: 'فایل با موفقیت آپلود شد. 24 قرارداد جدید اضافه شد.'
      });
    } catch (error) {
      clearInterval(interval);
      setUploadResult({
        success: false,
        message: 'خطا در آپلود فایل. لطفاً دوباره تلاش کنید.'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // In a real app, you would generate and download an Excel template
    const templateData = [
      ['center_id', 'insurance_id', 'accepted_services', 'contract_status'],
      ['center1', 'asia123', 'dentistry,orthodontics', 'active'],
      ['center2', 'saman456', 'imaging,mri', 'active']
    ];
    
    const csvContent = templateData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'contracts_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>آپلود قراردادها</CardTitle>
          <CardDescription>
            فایل اکسل حاوی اطلاعات قراردادها را آپلود کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contracts-file">فایل اکسل</Label>
            <Input
              id="contracts-file"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={uploading}
            />
            <p className="text-sm text-muted-foreground">
              فرمت‌های پشتیبانی شده: XLSX, XLS, CSV
            </p>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <p>در حال آپلود...</p>
              <Progress value={uploadProgress} />
            </div>
          )}
          
          {uploadResult && (
            <Alert variant={uploadResult.success ? "default" : "destructive"}>
              <AlertTitle>
                {uploadResult.success ? "موفق" : "خطا"}
              </AlertTitle>
              <AlertDescription>
                {uploadResult.message}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button onClick={handleUpload} disabled={uploading || !file}>
              {uploading ? "در حال آپلود..." : "آپلود فایل"}
            </Button>
            <Button variant="outline" onClick={handleDownloadTemplate}>
              دانلود قالب نمونه
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>راهنمای فرمت فایل</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            فایل اکسل باید شامل ستون‌های زیر باشد:
          </p>
          <ul className="text-sm space-y-1">
            <li>• center_id: شناسه مرکز درمانی</li>
            <li>• insurance_id: شناسه شرکت بیمه</li>
            <li>• accepted_services: خدمات پوشش داده شده (با کاما از هم جدا شوند)</li>
            <li>• contract_status: وضعیت قرارداد (active/inactive)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}