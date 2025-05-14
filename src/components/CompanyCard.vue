<template>
  <div class="card shadow-sm w-100" :class="{ 'flex-row-reverse': isEven }" role="region" aria-label="Company Info">
    <div class="image-container">
      <img
        v-if="company.img"
        :src="getImageUrl(company.img)"
        alt="Company Image"
        class="company-img"
      />
    </div>
    <div class="content-container">
      <div class="card-body">
        <h3 class="card-title fw-bold mb-3">{{ company.title }}</h3>
        <p class="card-subtitle fw-bold description-text mb-3">{{ company.description }}</p>
        <p class="card-text content-text">{{ company.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  company: Object,
  index: Number,
});

function getImageUrl(relativePath) {
  if (!relativePath) return '';
  return new URL(`${relativePath}`, import.meta.url).href;
}

const isEven = computed(() => {
  console.log('Index:', props.index, 'Is Even:', props.index % 2 === 1); // 调试
  return props.index % 2 === 1;
});
</script>

<style scoped>
.card {
  border: none;
  display: flex;
  flex-direction: row;
  min-height: 250px;
}

.card-body {
  padding: 1rem;
  min-height: 120px; /* 防止内容过短 */
}

.card.flex-row-reverse {
  flex-direction: row-reverse; /* 宽屏下奇数行反转 */
}

.image-container {
  flex: 0 0 40%;
  padding: 0 1.5rem;
}

.content-container {
  flex: 0 0 60%;
  display: flex;
  align-items: center;
}

.company-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: none;
}

.card-title {
  font-size: 2rem;
}

.description-text {
  font-size: 1rem;
  font-weight: bold;
}

.content-text {
  font-size: 0.875rem;
  line-height: 1.8;
}

@media (max-width: 767px) {
  .card,
  .card.flex-row-reverse {
    display: flex !important;
    flex-direction: column !important;
    flex-wrap: nowrap !important;
    transition: flex-direction 0.3s ease;
  }

  .image-container {
    flex: 0 0 auto;
    padding: 0;
    margin-bottom: 1rem;
    order: 1 !important; /* 强制图片在上 */
  }

  .content-container {
    flex: 0 0 auto;
    order: 2 !important; /* 强制内容在下 */
  }

  .company-img {
    height: 150px;
  }
}

@media (max-width: 576px) {
  .company-img {
    height: 120px;
  }

  .card-title {
    font-size: 1.5rem;
  }
}
</style>