<template>
  <div>
    <Navbar :activeTab="currentTab" :counts="taskCounts" @tab-changed="currentTab = $event" />
    <KanbanView :activeTab="currentTab" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import KanbanView from './views/KanbanView.vue';

const currentTab = ref('todo'); // 默认值必须有效
const taskCounts = computed(() => ({
  todo: 2,
  inprogress: 1,
  completed: 0
}));
</script>


<style scoped>
</style>
