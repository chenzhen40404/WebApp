<template>
  <div>
    <Navbar :activeTab="currentTab" :counts="taskCounts" @tab-changed="currentTab = $event" />
    <KanbanView :activeTab="currentTab"  @remove="remove"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import KanbanView from './views/KanbanView.vue';



const currentTab = ref('todo'); // 默认值必须有效
const taskCounts = ref({
    todo: 6,
    inprogress: 5,
    completed: 4
});

const remove = (e) => {
  if (e.type === 'todo') {
    taskCounts.value.todo = e.num;
  } else if (e.type === 'inprogress') {
    taskCounts.value.inprogress = e.num;
  } else if (e.type === 'completed') {
    taskCounts.value.completed = e.num;
  }
  console.log('remove', e);
};
</script>


<style scoped>
</style>
