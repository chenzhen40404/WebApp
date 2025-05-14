<template>
  <!-- 移除默认的 navbar-light bg-light，改用自定义容器 -->
  <nav class="nav-container bg-dark text-white">
    <div class="container d-flex align-items-center justify-content-between px-4">
      <!-- 左侧 LOGO -->
      <a class="fw-bold text-white text-decoration-none" href="#">Kanban</a>

      <!-- 中间导航标签 -->
      <div class="nav-tabs-wrapper">
        <ul class="nav-tabs-container navbar-nav">
          <li 
            v-for="tab in tabs"
            :key="tab.key"
            class="nav-item position-relative"
            :class="{ active: activeTab === tab.key }"
            @click="setTab(tab.key)"
          >
            <div class="nav-link">
              <span class="tab-label">{{ tab.label }}</span>
              <span 
                v-if="taskCounts[tab.key] > 0"
                class="badge-pill bg-danger"
                :aria-label="`${tab.label} 任务数量: ${taskCounts[tab.key] || 0}`"
              >
                {{ taskCounts[tab.key] || 0 }}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 右侧用户信息 -->
      <div class="user-info d-flex align-items-center gap-3 ms-auto">
        <span class="fw-semibold">Tony Stark</span>
        <a href="#" class="text-white text-decoration-underline" @click.prevent="logout">Log Out</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  activeTab: String,
  taskCounts: {
    type: Object,
    default: () => ({ todo: 0, inprogress: 0, completed: 0 })
  }
});

const tabs = [
  { key: 'todo', label: 'Todo' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' }
];

/* 事件传递逻辑保持不变 */
const emit = defineEmits(['update:activeTab']);
const setTab = (tab) => emit('update:activeTab', tab);
</script>

<style scoped>
/* 容器样式 */
.nav-container {
  height: 60px;
  background-color: var(--bs-dark);
}

/* 导航标签容器 */
.nav-tabs-wrapper {
  flex: 0 0 50%;
  margin-left: 1rem;
}

.nav-tabs-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

/* 导航项交互样式 */
.nav-item {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
}

.nav-item.active {
  background-color: #444;
  font-weight: 600;
}

/* 徽章定位 */
.badge-pill {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  border-radius: 999px;
}
</style>
