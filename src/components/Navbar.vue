<template>
  <div class="nav-container bg-dark text-white d-flex align-items-center justify-content-between px-4">
    <!-- 左侧 LOGO -->
    <div class="fw-bold">Stark</div>

    <!-- 中间标签导航容器：限制最大宽度 50% 且居中 -->
    <div class="nav-tabs-wrapper">
        <div class="nav-tabs-container">
            <div
            v-for="tab in tabs"
            :key="tab.key"
            class="nav-tab"
            :class="{ active: activeTab === tab.key }"
            @click="selectTab(tab.key)"
            >
            <span class="tab-label">{{ tab.label }}</span>
            <span
                v-if="counts[tab.key] > 0"
                class="badge-pill bg-danger text-white"
            >
                {{ counts[tab.key] }} 
            </span>
            </div>
        </div>
    </div>


    <!-- 右侧用户信息 -->
    <div class="user-info d-flex align-items-center gap-3 ms-auto">
      <span class="fw-semibold">Tony Stark</span>
      <a href="#" class="text-white text-decoration-underline" @click.prevent="logout">Log Out</a>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['tab-changed']);

const { activeTab, counts } = defineProps({
  activeTab: {
    type: String,
    required: true
  },
  counts: {
    type: Object,
    default: () => ({ todo: 0, inprogress: 0, completed: 0 })
  }
});

const tabs = [
  { key: 'todo', label: 'Todo' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' }
];

function selectTab(key) {
  emit('tab-changed', key);
}

function logout() {
  alert('Logged out.');
}
</script>

<style scoped>
.nav-tabs-wrapper {
  flex: 0 0 50%;          /* 仅占总宽度的 50% */
  display: flex;
  justify-content: flex-start;
  margin-left: 1rem;
}

.nav-tabs-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 100%;
}

.nav-tab {
  position: relative; /* 关键：让徽章绝对定位相对于它 */
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-tab.active {
  background-color: #444;
  font-weight: 600;
}

.tab-label {
  flex-grow: 1; /* 占据左侧空间 */
}

.badge-pill {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #dc3545;
  border-radius: 999px;
}

</style>
