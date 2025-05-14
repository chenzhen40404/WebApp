<template>
  <div>
    <Navbar :activeTab="activeTab" :taskCounts="taskCounts" @update:activeTab="updateTab" />
    <KanbanView :activeTab="activeTab" @updateCounts="updateCounts" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import KanbanView from './views/KanbanView.vue';

const activeTab = ref('todo');
const taskCounts = ref({
  todo: 0,
  inprogress: 0,
  completed: 0
});

function updateTab(tab) {
  activeTab.value = tab;
}

function updateCounts(counts) {
  console.log('Received counts:', counts); // 调试
  taskCounts.value = counts;
}
</script>