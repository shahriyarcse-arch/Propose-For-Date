# 💖 Date Proposal Web App

An interactive, responsive, and visually stunning web application for proposing a date. It features realistic 3D-like animations, a playful escaping "No" button using spring physics, custom vector SVG graphics, and a passcode-protected admin dashboard to track responses in real-time.

Built with **React (Vite)**, **Framer Motion**, **Tailwind CSS**, and **Supabase**.

---

## 🚀 Getting Started

### 1. Run Locally (Offline / Zero-Setup Demo)
By default, if no database configuration is present, the app automatically falls back to your browser's `localStorage`. You can run, test, and preview the app immediately!

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** to see it live!

### 2. Enter the Admin Dashboard
- Click the secret floating key icon (**`🔑`**) in the bottom-right corner of the proposal screen.
- Enter the default passcode: **`1234`**

---

## ☁️ Setting Up Supabase Database (For Syncing Devices)
If you want to send the website link to someone else and receive their responses instantly on your own device, you must connect a database:

1. Go to [Supabase](https://supabase.com/) and create a free account.
2. Create a new project.
3. In your Supabase SQL Editor, run the following query to create the `responses` table:
   ```sql
   create table responses (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     location text,
     food text,
     date date,
     time text,
     timestamp timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```
4. Copy your project's **Project URL** and **API Anon Key** from your Project Settings -> API page.
5. Create a `.env` file in the root of this project and paste your keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
6. Restart your development server (`npm run dev`). Responses will now save to the cloud database and sync instantly!

---

## 🛠️ Tech Stack & Architecture
- **Framework**: Vite + React
- **Animations**: Framer Motion (Spring-physics based button escape, fluent page-slide transitions)
- **Styling**: Tailwind CSS + Custom Ambient Mesh Backgrounds
- **Database Client**: Supabase JS Client with seamless local storage sync
