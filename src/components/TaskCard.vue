<template>
  <div class="task-card card shadow-sm">
    <!-- 图片（仅当存在且加载成功时显示） -->
    <img
      v-if="task.image"
      :src="getImageUrl(task.image)"
      alt="Task Image"
      class="card-img-top"
    />

    <div class="card-body d-flex flex-column justify-content-between">
      <!-- 内容部分 -->
      <div>
        <h5 class="card-title fw-bold">{{ task.title }}</h5>
        <p class="card-subtitle text-muted description-text">{{ task.description }}</p>
        <p class="card-text content-text">{{ task.content }}</p>
        <p class="card-text content-text">Created At: {{ task.create }}</p>
      </div>

      <!-- 按钮 -->
      <div class="d-flex mt-auto">
        <div class="button-group-half d-flex gap-2">
          <!-- Todo: Start + Remove -->
          <template v-if="task.status === 'todo'">
            <button class="btn btn-sm btn-primary flex-fill" style="background-color: #3e8acb;" @click="$emit('start', task)">Start</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
          <!-- InProgress: Completed + Remove -->
          <template v-if="task.status === 'inprogress'">
            <button class="btn btn-sm btn-success flex-fill" style="background-color: #28a745;" @click="$emit('completed', task)">Completed</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
          <!-- Completed: Back + Remove -->
          <template v-if="task.status === 'completed'">
            <button class="btn btn-sm btn-warning flex-fill" style="background-color: #ffc107;" @click="$emit('back', task)">Back</button>
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
.task-card {
  width: 320px;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.card-img-top {
  height: 160px;
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
}

.button-group-half {
  width: 50%; /* 占据卡片宽度的一半 */
  justify-content: flex-start;
}
</style>