<template>
  <div class="container mt-4">
    <!-- 任务区域 -->
    <h3 class="mb-4 fw-bold">{{ taskTitle }}</h3>
    <div class="row">
      <div v-if="filteredTasks.length === 0" class="col-12 text-center mb-4">
        <p>暂无任务</p>
      </div>
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
        v-for="task in filteredTasks"
        :key="task.id"
      >
        <TaskCard :task="task" @start="startTask" @completed="completeTask" @back="backTask" @remove="removeTask" @update:task="updateTask" />
      </div>
      <div v-if="activeTab === 'todo'" class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
            <div class="card p-3 w-100 shadow-sm">
                <button class="btn btn-outline-primary w-100" @click="toggleForm" v-if="!showForm">+ 添加任务</button>

                <form v-if="showForm" @submit.prevent="addNewTask">
                <div class="mb-2">
                    <input v-model="newTask.title" type="text" class="form-control" placeholder="标题" required />
                </div>
                <div class="mb-2">
                    <input v-model="newTask.description" type="text" class="form-control" placeholder="描述" required/>
                </div>
                <div class="mb-2">
                    <textarea v-model="newTask.content" class="form-control" placeholder="内容" rows="3" required></textarea>
                </div>
                <div class="mb-2">
                    <input v-model="newTask.image" type="text" class="form-control" placeholder="图片路径 (如 /img/picture.png)"  required/>
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-sm btn-primary">提交</button>
                    <button type="button" class="btn btn-sm btn-secondary" @click="toggleForm">取消</button>
                </div>
                </form>
            </div>
        </div>
    </div>

    <!-- 公司区域 -->
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
import { ref, computed, watch } from 'vue';
import TaskCard from '../components/TaskCard.vue';
import CompanyCard from '../components/CompanyCard.vue';

const tasks = ref([
  {
    id: 1,
    title: 'Task Title 1',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'todo',
    image: '/img/picture.png'
  },
  {
    id: 2,
    title: 'Task Title 2',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'inprogress',
    image: '/img/picture.png'
  },
  {
    id: 3,
    title: 'Task Title 3',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'completed',
    image: '/img/picture.png'
  },
  {
    id: 4,
    title: 'Task Title 4',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'todo',
    image: '/img/picture.png'
  },
  {
    id: 5,
    title: 'Task Title 5',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'todo',
    image: '/img/picture.png'
  },
  {
    id: 6,
    title: 'Task Title 6',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'todo',
    image: '/img/picture.png'
  },
  {
    id: 7,
    title: 'Task Title 7',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'todo',
    image: '/img/picture.png'
  },
  {
    id: 8,
    title: 'Task Title 8',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'todo',
    image: '/img/picture.png'
  },
  {
    id: 9,
    title: 'Task Title 9',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'inprogress',
    image: '/img/picture.png'
  },
  {
    id: 10,
    title: 'Task Title 10',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'inprogress',
    image: '/img/picture.png'
  },
  {
    id: 11,
    title: 'Task Title 11',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'inprogress',
    image: '/img/picture.png'
  },
  {
    id: 12,
    title: 'Task Title 12',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'inprogress',
    image: '/img/picture.png'
  },
  {
    id: 13,
    title: 'Task Title 13',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'completed',
    image: '/img/picture.png'
  },
  {
    id: 14,
    title: 'Task Title 14',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'completed',
    image: '/img/picture.png'
  },
  {
    id: 15,
    title: 'Task Title 15',
    description: 'Task description',
    content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
    create: '01 Jan 2024',
    status: 'completed',
    image: '/img/picture.png'
  }
]);

const companies = ref([
  {
    id: 1,
    title: 'News Title 1',
    description: 'Some default text to fill some space, and something more so there is more text.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    img: '/img/new.png'
  },
  {
    id: 2,
    title: 'News Title 2',
    description: 'Company description',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    img: '/img/new.png'
  },
  {
    id: 3,
    title: 'News Title 3',
    description: 'Company description',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    img: '/img/new.png'
  }
]);

const { activeTab } = defineProps({ activeTab: String });
const emit = defineEmits(['start', 'remove']);

const filteredTasks = computed(() =>
  tasks.value.filter((t) => t.status === activeTab || !activeTab)
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
      return 'All Tasks';
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

  // 自动计算 id（从当前 tasks 中找最大 id + 1）
  const maxId = Math.max(...tasks.value.map(t => t.id), 0);
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

  tasks.value.push(task);

  // 重置表单并关闭
  newTask.value = { title: '', description: '', content: '', image: '' };
  showForm.value = false;

  updateTaskCounts();
}

function startTask(task) {
  console.log('Start:', task.title);
  task.status = 'inprogress';
  updateTaskCounts();
}

function completeTask(task) {
  console.log('Completed:', task.title);
  task.status = 'completed';
  updateTaskCounts();
}

function backTask(task) {
  console.log('Back:', task.title);
  task.status = 'inprogress';
  updateTaskCounts();
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  updateTaskCounts();
}

function updateTaskCounts() {
  const counts = {
    todo: tasks.value.filter((t) => t.status === 'todo').length,
    inprogress: tasks.value.filter((t) => t.status === 'inprogress').length,
    completed: tasks.value.filter((t) => t.status === 'completed').length
  };
  emit('remove', { type: 'all', counts });
}

function updateTask(updatedTask) {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = { ...updatedTask };
    updateTaskCounts();
  }
}

watch(
  () => activeTab,
  () => {
    const counts = {
      todo: tasks.value.filter((t) => t.status === 'todo').length,
      inprogress: tasks.value.filter((t) => t.status === 'inprogress').length,
      completed: tasks.value.filter((t) => t.status === 'completed').length
    };
    emit('remove', { type: 'all', counts });
  },
  { immediate: true }
);
</script>