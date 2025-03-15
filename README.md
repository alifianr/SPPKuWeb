# Laravel Inertia.js Project

## 📌 Introduction
This project is a Laravel application that utilizes **Inertia.js** to build a seamless single-page application (SPA) while still leveraging the power of server-side rendering and routing.

## 🛠 Tech Stack
- **Laravel** - Backend Framework
- **Inertia.js** - Bridge between Laravel & Frontend
- **React JS** - Frontend (Choose one based on preference)
- **TailwindCSS** - Styling (optional but recommended)
- **MySQL/PostgreSQL** - Database

---

## 🚀 Installation Guide

### **1️⃣ Clone Repository**
```sh
 git clone https://github.com/your-username/your-repo.git
 cd your-repo
```

### **2️⃣ Install Dependencies**
```sh
composer install
npm install
```

### **3️⃣ Configure Environment**
```sh
cp .env.example .env
php artisan key:generate
```
Modify `.env` to set up **database credentials**.

### **4️⃣ Run Migrations**
```sh
php artisan migrate --seed
```
(Optional) Add `--seed` to populate database with dummy data.

### **5️⃣ Start Development Server**
```sh
php artisan serve
```

### **6️⃣ Build Frontend**
For **Vue.js**:
```sh
npm run dev
```
For **React**:
```sh
npm run dev
```

Your application should be running at: `http://127.0.0.1:8000`

---

## 📂 Project Structure
```
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
│   ├── js/    # Frontend files (Vue/React)
│   ├── views/ # Blade templates (fallback for SSR)
├── routes/
│   ├── web.php  # Web Routes
│   ├── api.php  # API Routes
├── storage/
├── tests/
└── ...
```

---

## 📌 Usage
### **🖥 Adding Inertia.js Components**
To return an Inertia component from the controller:
```php
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'user' => auth()->user()
    ]);
});
```

### **🖥 Using Inertia.js in Vue**
```vue
<template>
  <div>
    <h1>Welcome, {{ user.name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>
```

### **🖥 Using Inertia.js in React**
```jsx
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { user } = usePage().props;
    return <h1>Welcome, {user.name}</h1>;
}
```

---

## 🔧 Commands
| Command | Description |
|---------|-------------|
| `php artisan serve` | Start Laravel Server |
| `npm run dev` | Start Frontend Dev Server |
| `php artisan migrate` | Run Migrations |
| `php artisan migrate:refresh --seed` | Reset & Seed Database |
| `npm run build` | Build Frontend for Production |

---

## ⚡ Features
✅ Laravel API-powered backend  
✅ Full-stack SPA experience  
✅ Works with **Vue.js** or **React.js**  
✅ Seamless routing using Inertia.js  
✅ API-first approach (optional)  

---

## 📌 Troubleshooting
**Issue:** `Inertia.js page component not found`
- Make sure components are inside `resources/js/Pages/`
- Check case sensitivity of filenames

**Issue:** `npm run dev` fails
- Ensure Node.js and npm are installed (`node -v`, `npm -v`)
- Try running `npm install` again

---

## 🤝 Contributing
Feel free to submit issues or pull requests! 😊

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

# SPPKuWeb
