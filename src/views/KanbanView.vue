<template>
    <div class="container mt-4">
      <div class="row">
        <div
          class="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
          v-for="task in filteredTasks"
          :key="task.id"
        >
          <TaskCard :task="task" @start="startTask" @remove="removeTask" />
        </div>
        <div>
            <CompanyCard />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import TaskCard from '../components/TaskCard.vue';
  import CompanyCard from '../components/CompanyCard.vue'
  
  const tasks = ref([
    {
      id: 1,
      title: 'Task Title 1',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'todo',
      image: '/img/picture.png'
    },
    {
      id: 2,
      title: 'Task Title 2',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'inprogress',
      image: '/img/picture.png'
    },
    {
      id: 3,
      title: 'Task Title 3',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'completed',
      image: '/img/picture.png'
    },
    {
      id: 4,
      title: 'Task Title 4',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'todo',
      image: '/img/picture.png'
    },
    {
      id: 5,
      title: 'Task Title 5',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'todo',
      image: '/img/picture.png'
    },
    {
      id: 6,
      title: 'Task Title 6',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'todo',
      image: '/img/picture.png'
    },
    {
      id: 7,
      title: 'Task Title 7',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'todo',
      image: '/img/picture.png'
    },
    {
      id: 8,
      title: 'Task Title 8',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'todo',
      image: '/img/picture.png'
    },
    {
      id: 9,
      title: 'Task Title 9',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'inprogress',
      image: '/img/picture.png'
    },
    {
      id: 10,
      title: 'Task Title 10',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'inprogress',
      image: '/img/picture.png'
    },
    {
      id: 11,
      title: 'Task Title 11',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'inprogress',
      image: '/img/picture.png'
    },
    {
      id: 12,
      title: 'Task Title 12',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'inprogress',
      image: '/img/picture.png'
    },
    {
      id: 13,
      title: 'Task Title 13',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'completed',
      image: '/img/picture.png'
    },
    {
      id: 14,
      title: 'Task Title 14',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'completed',
      image: '/img/picture.png'
    },
    {
      id: 15,
      title: 'Task Title 15',
      description: 'Task description',
      content: 'Cras justo odio, dapibus ac facilisis in, egestaseget quam. Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultri ...',
      create: ' 01 Jan 2024',
      status: 'completed',
      image: '/img/picture.png'
    }
  ]);
  
  const { activeTab } = defineProps({ activeTab: String });
  const emit = defineEmits(['start', 'remove']);
  const filteredTasks = computed(() =>
    tasks.value.filter((t) => t.status === activeTab || !activeTab)
    );

  function startTask(task) {
    console.log('Start:', task.title);
  }
  
  function removeTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
    const remainingTasksCount = tasks.value.filter(
    (t) => t.status === activeTab
  ).length;
    emit('remove', { type: activeTab, num: remainingTasksCount});
  }
  </script>
  