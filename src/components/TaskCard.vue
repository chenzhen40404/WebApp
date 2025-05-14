<template>
  <div class="card shadow-sm w-100">
    <img
      v-if="task.image"
      :src="getImageUrl(task.image)"
      alt="Task Image"
      class="card-img-top"
    />
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title fw-bold">{{ task.title }}</h5>
        <p class="card-subtitle text-muted description-text">{{ task.description }}</p>
        <p class="card-text content-text">{{ task.content }}</p>
        <p class="card-text content-text">Created At: {{ task.create }}</p>
      </div>
      <div class="d-flex mt-auto">
        <div class="d-flex gap-2 w-50">
          <template v-if="task.status === 'todo'">
            <button class="btn btn-sm btn-primary flex-fill" @click="$emit('start', task)">Start</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
          <template v-if="task.status === 'inprogress'">
            <button class="btn btn-sm btn-success flex-fill" @click="$emit('completed', task)">Completed</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
          <template v-if="task.status === 'completed'">
            <button class="btn btn-sm btn-warning flex-fill" @click="$emit('back', task)">Back</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: Object
});
defineEmits(['start', 'completed', 'back', 'remove']);

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

.btn-primary {
  background-color: #3e8acb;
  border-color: #3e8acb;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

@media (max-width: 576px) {
  .card-img-top {
    max-height: 120px;
  }

  .w-50 {
    width: 100% !important;
  }
}
</style>