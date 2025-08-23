# Payflow 💸

**Payflow** is a modern React application for managing and tracking your payments and transactions.
It provides a clean interface to monitor financial activity, ensuring you stay on top of your expenses and income.

---

## 🚀 Features

* 📊 **Track Payments** – Manage and view your transaction history in one place.
* 🔄 **Real-time Data Fetching** – Powered by [SWR](https://swr.vercel.app/) for fast and reliable data fetching.
* 🌐 **Routing** – Built-in navigation using [React Router DOM](https://reactrouter.com/).
* ⚡ **Optimized with Vite** – Lightning-fast dev server and build tool.
* 🌈 **Modern UI** – Styled with [Tailwind CSS](https://tailwindcss.com/) and [Lucide React](https://lucide.dev/) icons.
* 🛡 **Error Boundaries** – Graceful error handling with `react-error-boundary`.
* 🔗 **API Requests** – Integrated with [Axios](https://axios-http.com/) for handling HTTP requests.

---

## 🛠 Tech Stack

* **Frontend:** React 18, TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS, Lucide React
* **Data Fetching:** SWR, Axios
* **Routing:** React Router DOM
* **Error Handling:** React Error Boundary

---

## 📦 Dependencies

### Runtime

* `axios`
* `lucide-react`
* `react`
* `react-dom`
* `react-error-boundary`
* `react-router-dom`
* `swr`

### Dev & Build

* `vite`
* `typescript`
* `tailwindcss`
* `postcss`
* `autoprefixer`
* `eslint`, `@eslint/js`, `typescript-eslint`
* `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
* `globals`

---

## 📂 Project Structure

```
payflow/
├── public/             # Static assets (favicon, logo, etc.)
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Context providers
│   ├── styles/         # Global styles & Tailwind config
│   ├── main.tsx        # App entry point
│   └── App.tsx         # Root component
├── index.html          # Base HTML template
├── tailwind.config.js  # Tailwind config
├── tsconfig.json       # TypeScript config
└── vite.config.ts      # Vite config
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/payflow.git
cd payflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

---

## 🧪 Linting & Code Quality

Run ESLint to check for code issues:

```bash
npm run lint
```

---

## 📱 SEO & Social Preview

The app includes **Open Graph** and **Twitter Card** metadata for better link previews:

* Title: **Payflow**
* Description: *Manage and track your payments with ease.*
* Social Preview Image: `logo.png`

---

## 📜 License

This project is licensed under the **MIT License**.
