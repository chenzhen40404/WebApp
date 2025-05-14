<template>
  <div class="card shadow-sm w-100" role="region" aria-label="Company Info">
    <img
      v-if="company.img"
      :src="getImageUrl(company.img)"
      alt="Company Image"
      class="card-img-top"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold">{{ company.title }}</h5>
      <p class="card-subtitle text-muted description-text">{{ company.description }}</p>
      <p class="card-text content-text">{{ company.content }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  company: Object
});

function getImageUrl(relativePath) {
  if (!relativePath) return '';
  return new URL(`${relativePath}`, import.meta.url).href;
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.card-img-top {
  max-height: 160px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.description-text {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.content-text {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

@media (max-width: 576px) {
  .card-img-top {
    max-height: 120px;
  }
}
</style>