import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    companies: JSON.parse(localStorage.getItem('companies')) || [],
    error: null,
    isLoading: false
  }),
  getters: {
    taskCounts: (state) => ({
      todo: state.tasks.filter(t => t.status === 'todo').length,
      inprogress: state.tasks.filter(t => t.status === 'inprogress').length,
      completed: state.tasks.filter(t => t.status === 'completed').length
    })
  },
  actions: {
    async loadData() {
      this.isLoading = true;
      try {
        const [tasksRes, companiesRes] = await Promise.all([
          fetch('http://localhost:3001/tasks'),
          fetch('http://localhost:3001/companies')
        ]);
        if (!tasksRes.ok) throw new Error(`任务数据加载失败: ${tasksRes.status}`);
        if (!companiesRes.ok) throw new Error(`公司数据加载失败: ${companiesRes.status}`);
        const tasksData = await tasksRes.json();
        const companiesData = await companiesRes.json();
        if (!Array.isArray(tasksData)) throw new Error('任务数据格式无效');
        if (!Array.isArray(companiesData)) throw new Error('公司数据格式无效');
        this.tasks = tasksData;
        this.companies = companiesData;
        this.error = null;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('companies', JSON.stringify(this.companies));
        console.log('Tasks loaded:', this.tasks);
      } catch (err) {
        this.error = err.message;
        this.tasks = [];
        this.companies = [];
        console.error('数据加载错误:', err);
      } finally {
        this.isLoading = false;
      }
    },
    async addTask(task) {
      try {
        const response = await fetch('http://localhost:3001/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task)
        });
        if (!response.ok) throw new Error('添加任务失败');
        const newTask = await response.json();
        this.tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } catch (err) {
        console.error('添加任务错误:', err);
        this.error = err.message;
      }
    },
    async updateTask(updatedTask) {
      try {
        const response = await fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask)
        });
        if (!response.ok) throw new Error('更新任务失败');
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
      } catch (err) {
        console.error('更新任务错误:', err);
        this.error = err.message;
      }
    },
    async removeTask(id) {
      try {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('删除任务失败');
        this.tasks = this.tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } catch (err) {
        console.error('删除任务错误:', err);
        this.error = err.message;
      }
    }
  }
});