<template>
  <div class="card mb-2 bg-light" role="region" aria-label="Company Info">
    <div class="card-body p-2">
      <small class="text-muted">🔔 News from {{ name }}</small>
    </div>
  </div>
</template>

<script setup>
defineProps({ name: String });
</script>