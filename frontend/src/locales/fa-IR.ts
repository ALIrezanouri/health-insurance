export default {
  language: 'fa-IR',
  direction: 'rtl',

  header: {
    title: 'هاب بیمه‌های درمانی',
    searchPlaceholder: 'جستجوی مراکز درمانی و شعبات بیمه...',
    nav: {
      home: 'صفحه اصلی',
      search: 'جستجوی مراکز',
      about: 'درباره ما'
    }
  },

  search: {
    title: 'جستجوی مراکز درمانی',
    description: 'مراکز درمانی معتبر که با بیمه شما قرارداد دارند را پیدا کنید',

    filters: {
      insurance: {
        title: 'بیمه‌های مورد نظر',
        placeholder: 'انتخاب بیمه‌ها',
        selectAll: 'انتخاب همه',
        clear: 'پاک کردن'
      },
      services: {
        title: 'انواع خدمات',
        placeholder: 'انتخاب خدمات',
        options: {
          dentistry: 'دندانپزشکی',
          imaging: 'تصویربرداری',
          lab: 'آزمایشگاه',
          general: 'معاینه عمومی',
          specialist: 'معاینه تخصصی'
        }
      },
      location: {
        title: 'موقعیت مکانی',
        useCurrent: 'استفاده از موقعیت فعلی',
        searchPlaceholder: 'جستجوی آدرس...',
        radius: 'شعاع جستجو (کیلومتر)'
      }
    },

    results: {
      noResults: 'مرکزی یافت نشد',
      noResultsDescription: 'متأسفانه با فیلترهای انتخاب شده هیچ مرکز درمانی یافت نشد.',
      showMore: 'نمایش بیشتر',
      insuranceLabel: 'بیمه‌های پذیرفته شده',
      servicesLabel: 'خدمات ارائه شده',
      direction: 'جهت‌یابی'
    }
  },

  common: {
    loading: 'در حال بارگذاری...',
    error: 'خطا در دریافت اطلاعات',
    retry: 'تلاش مجدد',
    phone: 'تلفن',
    address: 'آدرس'
  }
};