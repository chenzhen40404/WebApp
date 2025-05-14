<template>
  <div class="container mt-4">
    <div v-if="store.error" class="alert alert-danger" role="alert">
      {{ store.error }}
    </div>
    <div v-if="store.isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">加载中...</span>
      </div>
    </div>
    <h3 class="mb-4 fw-bold">{{ taskTitle }}</h3>
    <div v-if="activeTab === 'todo'" class="mb-4">
      <button class="btn btn-outline-primary w-100" @click="toggleForm" v-if="!showForm">
        + 添加任务
      </button>
      <div v-if="showForm" class="card p-3 shadow-sm">
        <form @submit.prevent="addNewTask">
          <div class="mb-2">
            <input v-model="newTask.title" type="text" class="form-control" placeholder="标题" required aria-label="任务标题" />
          </div>
          <div class="mb-2">
            <input v-model="newTask.description" type="text" class="form-control" placeholder="描述" required aria-label="任务描述" />
          </div>
          <div class="mb-2">
            <textarea v-model="newTask.content" class="form-control" placeholder="内容" rows="3" required aria-label="任务内容"></textarea>
          </div>
          <div class="mb-2">
            <input v-model="newTask.image" type="text" class="form-control" placeholder="图片路径 (如 /img/picture.png)" required aria-label="任务图片路径" />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-sm btn-primary">提交</button>
            <button type="button" class="btn btn-sm btn-secondary" @click="toggleForm">取消</button>
          </div>
        </form>
      </div>
    </div>
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="搜索任务..."
        aria-label="搜索任务"
      />
    </div>
    <div class="row">
      <div v-if="filteredTasks.length === 0" class="col-12 text-center mb-4">
        <p>暂无任务</p>
      </div>
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
        v-for="task in filteredTasks"
        :key="task.id"
      >
        <TaskCard
          :task="task"
          @start="startTask"
          @completed="completeTask"
          @back="backTask"
          @remove="removeTask"
          @update:task="updateTask"
        />
      </div>
    </div>
    <h3 class="mt-5 mb-4 fw-bold">Company News</h3>
    <div class="row">
      <div v-if="companies.length === 0" class="col-12 text-center mb-4">
        <p>暂无公司</p>
      </div>
      <div
        class="col-12 mb-4"
        v-for="(company, index) in companies"
        :key="company.id"
      >
        <CompanyCard :company="company" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useBoardStore } from '../stores/board';
import TaskCard from '../components/TaskCard.vue';
import CompanyCard from '../components/CompanyCard.vue';

const store = useBoardStore();
const searchQuery = ref('');

onMounted(() => {
  store.loadData();
});

const tasks = computed(() => store.tasks);
const companies = computed(() => store.companies);
const counts = computed(() => store.taskCounts);
const { activeTab } = defineProps({ activeTab: String });
const emit = defineEmits(['updateCounts']);

const filteredTasks = computed(() =>
  tasks.value.filter(
    (t) =>
      (t.status === activeTab || !activeTab) &&
      (t.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
       t.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
);

const taskTitle = computed(() => {
  switch (activeTab) {
    case 'todo':
      return 'Todo';
    case 'inprogress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    default:
      return 'Tasks';
  }
});

const showForm = ref(false);
const newTask = ref({
  title: '',
  description: '',
  content: '',
  image: ''
});

function toggleForm() {
  showForm.value = !showForm.value;
}

function addNewTask() {
  if (!newTask.value.title.trim()) return;
  const maxId = Math.max(...store.tasks.map(t => t.id), 0);
  const task = {
    id: maxId + 1,
    title: newTask.value.title.trim(),
    description: newTask.value.description.trim(),
    content: newTask.value.content.trim(),
    create: new Intl.DateTimeFormat('en-GB', {
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    }).format(new Date()),
    status: 'todo',
    image: newTask.value.image.trim()
  };
  store.addTask(task);
  newTask.value = { title: '', description: '', content: '', image: '' };
  showForm.value = false;
  updateTaskCounts();
}

function startTask(task) {
  task.status = 'inprogress';
  store.updateTask(task);
  updateTaskCounts();
}

function completeTask(task) {
  task.status = 'completed';
  store.updateTask(task);
  updateTaskCounts();
}

function backTask(task) {
  task.status = 'inprogress';
  store.updateTask(task);
  updateTaskCounts();
}

function removeTask(id) {
  store.removeTask(id);
  updateTaskCounts();
}

function updateTask(updatedTask) {
  store.updateTask(updatedTask);
  updateTaskCounts();
}

function updateTaskCounts() {
  console.log('Emitting counts:', counts.value); // 调试
  emit('updateCounts', counts.value);
}

watch(
  () => activeTab,
  () => {
    updateTaskCounts();
  },
  { immediate: true }
);
</script>

<style scoped>
.card-body {
  padding: 1rem;
  min-height: 150px;
}
</style>