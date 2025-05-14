<template>
  <div class="card shadow-sm w-100">
    <img
      v-if="task.image"
      :src="getImageUrl(task.image)"
      alt="任务图片"
      class="card-img-top"
      @click="startEditing"
      style="cursor: pointer;"
    />
    <div class="card-body d-flex flex-column justify-content-between">
      <!-- 编辑模式 -->
      <form v-if="isEditing" @submit.prevent="saveChanges" class="edit-form">
        <div class="mb-3">
          <input
            v-model="editedTask.title"
            type="text"
            class="form-control"
            placeholder="标题"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="editedTask.description"
            type="text"
            class="form-control"
            placeholder="描述"
            required
          />
        </div>
        <div class="mb-3">
          <textarea
            v-model="editedTask.content"
            class="form-control"
            placeholder="内容"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <input
            v-model="editedTask.image"
            type="text"
            class="form-control"
            placeholder="图片路径 (如 /img/picture.png)"
            required
          />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-sm btn-primary">保存</button>
          <button type="button" class="btn btn-sm btn-secondary" @click="cancelEdit">取消</button>
        </div>
      </form>
      <!-- 显示模式 -->
      <div v-else>
        <h5 class="card-title fw-bold" @click="startEditing" style="cursor: pointer;">
          {{ task.title }}
        </h5>
        <p class="card-subtitle text-muted description-text" @click="startEditing" style="cursor: pointer;">
          {{ task.description }}
        </p>
        <p class="card-text content-text" @click="startEditing" style="cursor: pointer;">
          {{ task.content }}
        </p>
        <p class="card-text content-text">Created At: {{ task.create }}</p>
      </div>
      <div class="d-flex mt-auto">
        <div class="d-flex gap-2 w-50">
          <template v-if="task.status === 'todo' && !isEditing">
            <button class="btn btn-sm btn-primary flex-fill" @click="$emit('start', task)">Start</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
          <template v-if="task.status === 'inprogress' && !isEditing">
            <button class="btn btn-sm btn-success flex-fill" @click="$emit('completed', task)">Completed</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
          <template v-if="task.status === 'completed' && !isEditing">
            <button class="btn btn-sm btn-warning flex-fill" @click="$emit('back', task)">back</button>
            <button class="btn btn-sm btn-light border flex-fill" @click="$emit('remove', task.id)">Remove</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  task: Object
});
const emit = defineEmits(['start', 'completed', 'back', 'remove', 'update:task']);

const isEditing = ref(false);
const editedTask = ref({ ...props.task });

function getImageUrl(relativePath) {
  if (!relativePath) return '';
  return new URL(`${relativePath}`, import.meta.url).href;
}

function startEditing() {
  editedTask.value = { ...props.task };
  isEditing.value = true;
}

function saveChanges() {
  emit('update:task', { ...editedTask.value });
  isEditing.value = false;
}

function cancelEdit() {
  isEditing.value = false;
  editedTask.value = { ...props.task };
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

.edit-form {
  width: 100%;
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