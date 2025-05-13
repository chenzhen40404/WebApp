# Vue3 Todo Kanban Board

This is a simple Kanban-style task management web app built with Vue 3, Pinia, Bootstrap, and Vite.

## Features

- ✅ Create / Read / Update / Delete tasks (CRUD)
- 📦 Fetch data from RESTful API (mockable)
- 🧠 Global state management via Pinia
- 🎨 Bootstrap 5-based responsive UI
- ♿ Accessible with ARIA roles and keyboard-friendly
- 💾 State persistence via localStorage

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

## Project Structure

```
├── public             # Static index.html
├── src
│   ├── assets         # Optional static assets
│   ├── components     # Vue components (CompanyCard, TaskCard, etc.)
│   ├── services       # API interface (Axios)
│   ├── stores         # Pinia store
│   ├── views          # Kanban view page
│   ├── App.vue
│   └── main.js
├── package.json
├── vite.config.js
└── README.md
```

## API Notes

Use any mock API service or local server to simulate RESTful behavior. Update `BASE_URL` in `src/services/api.js` accordingly.
