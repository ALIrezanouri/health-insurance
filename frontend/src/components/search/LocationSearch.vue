<template>
  <div class="p-4 border rounded-lg">
    <h3 class="font-medium mb-3">{{ $t('search.filters.location.title') }}</h3>
    <div class="space-y-3">
      <button class="w-full py-2 text-sm border rounded flex items-center justify-center">
        <i class="fas fa-location-arrow ml-2"></i>
        {{ $t('search.filters.location.useCurrent') }}
      </button>
      <div>
        <input 
          type="text" 
          :placeholder="$t('search.filters.location.searchPlaceholder')"
          class="w-full p-2 border rounded text-sm"
        />
      </div>
      <div>
        <label class="text-sm">
          {{ $t('search.filters.location.radius') }}:
          <input type="range" min="1" max="50" value="10" class="w-full mt-1" />
        </label>
      </div>
    </div>
  </div>
</template>