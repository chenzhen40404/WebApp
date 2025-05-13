import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useBoardStore = defineStore('board', () => {
  const tasks = ref([]);
  const companies = ref([]);

  function setTasks(data) {
    tasks.value = data;
  }

  function setCompanies(data) {
    companies.value = data;
  }

  function addTask(task) {
    tasks.value.push(task);
  }

  function updateTask(id, updated) {
    const index = tasks.value.findIndex(t => t.id === id);
    if (index !== -1) tasks.value[index] = { ...tasks.value[index], ...updated };
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id);
  }

  // 持久化状态（localStorage）
  watch([tasks, companies], ([t, c]) => {
    localStorage.setItem('tasks', JSON.stringify(t));
    localStorage.setItem('companies', JSON.stringify(c));
  }, { deep: true });

  // 加载持久化数据
  function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    const savedCompanies = localStorage.getItem('companies');
    if (savedTasks) tasks.value = JSON.parse(savedTasks);
    if (savedCompanies) companies.value = JSON.parse(savedCompanies);
  }

  return {
    tasks,
    companies,
    setTasks,
    setCompanies,
    addTask,
    updateTask,
    deleteTask,
    loadFromLocalStorage
  };
});