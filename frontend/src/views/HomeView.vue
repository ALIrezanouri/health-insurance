<template>
  <div class="min-h-screen bg-gradient-bg">
    <header class="border-b">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold">{{ $t('header.title') }}</h1>
          <nav class="hidden md:flex space-x-4">
            <router-link to="/" class="hover:text-primary">{{ $t('header.nav.home') }}</router-link>
            <router-link to="/search" class="hover:text-primary">{{ $t('header.nav.search') }}</router-link>
            <router-link to="/about" class="hover:text-primary">{{ $t('header.nav.about') }}</router-link>
          </nav>
          <div class="md:hidden">
            <button class="p-2">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ $t('header.title') }}</h1>
        <p class="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
          مراکز درمانی معتبر که با بیمه شما قرارداد دارند را پیدا کنید
        </p>
        <router-link to="/search">
          <button class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            شروع جستجو
          </button>
        </router-link>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-card p-6 rounded-xl">
          <i class="fas fa-search text-2xl text-primary mb-4"></i>
          <h3 class="text-lg font-semibold mb-2">جستجوی هوشمند</h3>
          <p class="text-muted-foreground">
            با استفاده از فیلترهای پیشرفته مراکز درمانی مورد نظر خود را پیدا کنید
          </p>
        </div>
        
        <div class="glass-card p-6 rounded-xl">
          <i class="fas fa-shield-alt text-2xl text-primary mb-4"></i>
          <h3 class="text-lg font-semibold mb-2">بیمه‌های معتبر</h3>
          <p class="text-muted-foreground">
            پشتیبانی از تمامی بیمه‌های درمانی معتبر کشور
          </p>
        </div>
        
        <div class="glass-card p-6 rounded-xl">
          <i class="fas fa-map-marker-alt text-2xl text-primary mb-4"></i>
          <h3 class="text-lg font-semibold mb-2">موقعیت مکانی</h3>
          <p class="text-muted-foreground">
            پیدا کردن مراکز نزدیک به موقعیت مکانی شما
          </p>
        </div>
      </div>
    </main>
  </div>
</template>