<template>
  <div class="col-md-4">
    <h5 class="text-center">{{ title }}</h5>
    <CompanyCard v-for="company in companies" :key="company" :name="company" />
    <TaskCard
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @update-status="changeStatus"
      @delete-task="removeTask"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBoardStore } from '../stores/board';
import CompanyCard from './CompanyCard.vue';
import TaskCard from './TaskCard.vue';

const props = defineProps({
  status: String,
  title: String
});

const store = useBoardStore();
const companies = computed(() => store.companies);
const filteredTasks = computed(() => store.tasks.filter(t => t.status === props.status));

function changeStatus(id, newStatus) {
  store.updateTask(id, { status: newStatus });
}

function removeTask(id) {
  store.deleteTask(id);
}
</script>
