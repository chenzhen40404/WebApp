<template>
  <form @submit.prevent="submit" class="mb-4" role="form" aria-label="Add Task Form">
    <div class="input-group">
      <input
        v-model="title"
        type="text"
        class="form-control"
        placeholder="Enter new task"
        aria-label="Task title"
        required
      />
      <button class="btn btn-primary" type="submit">Add</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useBoardStore } from '../stores/board';

const store = useBoardStore();
const title = ref('');

function submit() {
  if (!title.value.trim()) return;
  const task = {
    id: Date.now(),
    title: title.value.trim(),
    status: 'todo'
  };
  store.addTask(task);
  title.value = '';
}
</script>