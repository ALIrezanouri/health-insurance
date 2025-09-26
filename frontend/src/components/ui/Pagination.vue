<template>
  <nav aria-label="Pagination">
    <ul class="inline-flex -space-x-px rounded-md shadow-sm">
      <li>
        <button class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
          Previous
        </button>
      </li>
      <li>
        <button class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
          1
        </button>
      </li>
      <li>
        <button class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// This will be driven by props like currentPage and totalPages, and will emit page-change events.
</script>