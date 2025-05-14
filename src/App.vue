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
    todo: 0,
    inprogress: 0,
    completed: 0
});

const remove = (e) => {
  if (e.type === 'all' && e.counts) {
    taskCounts.value.todo = e.counts.todo;
    taskCounts.value.inprogress = e.counts.inprogress;
    taskCounts.value.completed = e.counts.completed;
  } else if (e.type && e.num !== undefined) {
    if (['todo', 'inprogress', 'completed'].includes(e.type)) {
      taskCounts.value[e.type] = e.num;
    }
  } else {
    console.warn('Invalid event data:', e);
  }
  console.log('remove', e);
};
</script>


<style scoped>
</style>
