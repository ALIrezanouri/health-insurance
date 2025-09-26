<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <h3 class="text-lg font-semibold mb-3">افزودن از طریق اکسل</h3>
    <div class="space-y-4">
      <div 
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
        @drop.prevent="handleDrop"
        @dragover.prevent
        @click="triggerFileInput"
      >
        <i class="fas fa-file-excel text-3xl text-green-500 mb-2"></i>
        <p class="text-gray-600 mb-1">فایل اکسل خود را اینجا بکشید</p>
        <p class="text-sm text-gray-500">یا برای انتخاب فایل کلیک کنید</p>
        <p class="text-xs text-gray-400 mt-2">پشتیبانی از فرمت‌های: .xlsx, .xls, .csv</p>
      </div>
      
      <input 
        type="file" 
        ref="fileInput"
        @change="handleFileSelect"
        accept=".xlsx,.xls,.csv"
        class="hidden"
      />
      
      <div v-if="selectedFile" class="text-sm p-3 bg-blue-50 rounded-lg">
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-gray-800">{{ selectedFile.name }}</p>
            <p class="text-gray-600">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <button @click="removeFile" class="text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <button 
        @click="uploadFile"
        :disabled="!selectedFile || uploading"
        class="w-full px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <i :class="uploading ? 'fas fa-spinner fa-spin' : 'fas fa-upload'"></i>
        {{ uploading ? 'در حال آپلود...' : 'آپلود فایل' }}
      </button>
      
      <div v-if="uploadResult" class="text-sm p-3 rounded-lg" :class="{
        'bg-green-50 text-green-800': uploadResult.success,
        'bg-red-50 text-red-800': !uploadResult.success
      }">
        <p>{{ uploadResult.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const uploadResult = ref<{ success: boolean; message: string } | null>(null)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
  }
}

const removeFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const uploadFile = async () => {
  if (!selectedFile.value) return
  
  uploading.value = true
  uploadResult.value = null
  
  try {
    // شبیه‌سازی فرآیند آپلود
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // در یک برنامه واقعی، اینجا فایل به سرور ارسال می‌شود
    // برای مثال:
    // const formData = new FormData()
    // formData.append('file', selectedFile.value)
    // const response = await fetch('/api/upload', { method: 'POST', body: formData })
    
    uploadResult.value = {
      success: true,
      message: 'فایل با موفقیت آپلود شد. داده‌ها در حال پردازش هستند.'
    }
    
    // بارگذاری مجدد مراکز پس از آپلود موفق
    await searchStore.searchCenters()
    
    // پاک کردن فایل انتخاب شده بعد از موفقیت آمیز بودن آپلود
    removeFile()
  } catch (error) {
    uploadResult.value = {
      success: false,
      message: 'خطا در آپلود فایل. لطفاً دوباره تلاش کنید.'
    }
  } finally {
    uploading.value = false
  }
}
</script>