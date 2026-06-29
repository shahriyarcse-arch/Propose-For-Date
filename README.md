# 💖 Date Proposal Web App

An interactive, responsive, and visually stunning web application for proposing a date. It features realistic animations, a playful escaping "No" button using spring physics, custom vector SVG graphics, and a passcode-protected admin dashboard to track responses in real-time.

Built with **React (Vite)**, **Framer Motion**, **Tailwind CSS**, and **Supabase**.

---

## 🚀 Getting Started

### 1. Run Locally
```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** to see it live!

### 2. Enter the Admin Dashboard
- Click the secret floating key icon (**🔑**) in the bottom-right corner of the proposal screen.
- Enter the default passcode: **`1234`**

---

## ☁️ Setting Up Supabase Database (Required)
Since local storage fallback is disabled, you must connect a Supabase database to save and read responses:

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
6. Restart your development server (`npm run dev`).

---

## ⏰ Keep-Alive Cron Job (Prevent Supabase from Pausing)
On the free tier, Supabase automatically pauses projects after 7 days of inactivity. To prevent this from ever happening, you can set up a free keep-alive cron job in 2 minutes:

1. Go to [cron-job.org](https://cron-job.org/) and create a free account.
2. Click **Create Cronjob**.
3. Fill in the following details:
   - **Title**: Supabase Keep-Alive
   - **Address**: `https://your-project-id.supabase.co/rest/v1/responses?select=id&limit=1` *(Replace `your-project-id` with your actual Supabase project ID)*
   - **Schedule**: Everyday (or every 3 days)
   - **Request Method**: `GET`
4. Under **Request Headers**, add these two headers:
   - `apikey` : `your_supabase_anon_key` *(Replace with your actual Anon Key)*
   - `Authorization` : `Bearer your_supabase_anon_key` *(Replace with your actual Anon Key)*
5. Click **Create**. This cron job will automatically query your database daily, ensuring your project remains 100% active and never pauses!

---

## 🛠️ Tech Stack & Architecture
- **Framework**: Vite + React
- **Animations**: Framer Motion (Spring-physics based button escape, fluent page-slide transitions)
- **Styling**: Tailwind CSS + Custom Ambient Mesh Backgrounds
- **Database Client**: Supabase JS Client (Direct integration)
