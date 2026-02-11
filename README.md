# Task & Note Reminder System 📝

A full-stack application for managing tasks and notes with automated email reminders. Built with Spring Boot (Backend) and Next.js (Frontend).


### 🌍 Live Demo: [Task Reminder App](https://hikaru203.github.io/task_reminder/login)

> [!IMPORTANT]
> **Please Read Before Testing:**
> 1. **Backend Cold Start**: The backend is hosted on **Render Free Tier**. If it has been inactive, the first request (Login/Signup) may take **50-60 seconds** to wake up. Please be patient! ⏳
> 2. **Account Required**: You need to **Sign Up** for a new account to use the app.
> 3. **Email**: If you test the reminder feature, check your **Spam folder** for emails.

## 🚀 Tech Stack

**Backend:**
- **Java 25** (Compatible with Java 17+)
- **Spring Boot 3.x** (Web, Data JPA, Security, Mail)
- **PostgreSQL** (Database)
- **JWT** (Stateless Authentication)
- **Maven** (Build Tool)

**Frontend:**
- **Next.js 14+** (App Router)
- **TypeScript** (Type Safety)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)

## ✨ Features

- **🔐 User Authentication**: Secure Sign Up and Login using JWT.
- **📝 Note Management**: Create, Read, Update, and Delete (CRUD) notes.
- **✅ Status Tracking**: Mark notes as Pending, Done, or Cancelled.
- **⏰ Email Reminders**: Automated email notifications sent for tasks due within the next minute.
- **📱 Responsive Design**: Modern UI built with Tailwind CSS that works on desktop and mobile.

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed:
- **Java Development Kit (JDK) 17** or higher.
- **Node.js** (v18 or higher) and npm.
- **PostgreSQL** database server.
- **Git** (optional, for cloning).

## ⚙️ Configuration & Setup

### 1. Database Setup
Create a PostgreSQL database named `task_reminder_db`.
```sql
CREATE DATABASE task_reminder_db;
```

### 2. Backend Configuration
The application needs your database and email credentials to work.

1. Navigate to the configuration directory: `backend/src/main/resources/`.
2. You will see a file named `application.properties.example`.
3. **Copy** or **Rename** this file to `application.properties`.
   *(Note: `application.properties` is ignored by Git to keep your secrets safe)*
4. Open `application.properties` and update the values:

   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/task_reminder_db
   spring.datasource.username=YOUR_DB_USERNAME (e.g., postgres)
   spring.datasource.password=YOUR_DB_PASSWORD

   # Email Configuration (for Reminders)
   spring.mail.username=YOUR_EMAIL@gmail.com
   spring.mail.password=YOUR_APP_PASSWORD
   ```
   *Tip: For Gmail, you must use an [App Password](https://support.google.com/accounts/answer/185833?hl=en), not your login password.*

## 🏃‍♂️ How to Run

### Option 1: One-Click Run (Windows) ✅ **Recommended**
We have included a unified batch script to start everything for you.

1. Double-click `run-app.bat` in the root directory.
2. The script will:
   - Check if Maven is installed. If not, it will **automatically download and install a local version** for you.
   - Start the Backend server.
   - Start the Frontend server.

Backend will run on: `http://localhost:8080`
Frontend will run on: `http://localhost:3000`

### Option 2: Manual Run

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install  # Run only once to install dependencies
npm run dev
```

## 📂 Project Structure

- `/backend`: Spring Boot source code.
  - `src/main/java`: Java source files (Entities, Controllers, Services).
  - `src/main/resources`: Configuration files.
- `/frontend`: Next.js source code.
  - `app/`: Next.js App Router pages.
  - `components/`: Reusable React components.
  - `lib/`: Utilities (Auth, Axios).
- `/tools`: Contains local Maven installation (created automatically by run script if needed).
- `run-app.bat`: Script to run the full stack app.

## ❓ Troubleshooting

- **Database Connection Error**: Check if your PostgreSQL server is running and the credentials in `application.properties` are correct.
- **Email Not Sending**: Ensure you are using an **App Password** for Gmail and that `spring.mail.username` matches the account generating the password.
- **Port In Use**: Ensure ports `8080` (Backend) and `3000` (Frontend) are not taken by other applications.
- **Maven/Java Errors**: If you have issues with Global Maven, use the `run-app.bat` script which handles a local Maven environment mostly automatically.

## 🚀 Deployment Guide

### 1. Frontend (GitHub Pages)
The frontend is configured to deploy automatically to GitHub Pages via GitHub Actions.

**Steps:**
1. Go to your Repository **Settings** -> **Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. The workflow `.github/workflows/deploy-frontend.yml` will automatically build and deploy your site on every push to `main`.
4. **Important**: By default, it connects to `localhost:8080`. To connect to a live backend:
   - Go to **Settings** -> **Secrets and variables** -> **Actions** -> **Variables**.
   - Add a new Repository Variable:
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: `https://your-backend-url.onrender.com/api` (See Backend section below)

**Troubleshooting:**
- **Error "Failed to create deployment (status: 404)"**:
  - Go to **Settings** -> **Pages**.
  - Ensure **Source** is set to **GitHub Actions** (NOT "Deploy from a branch").
  - If it was wrong, change it and re-run the failed Action or push a small change.

### 2. Backend & Database (Render.com - Recommended Free Tier)
GitHub Pages **cannot** host Java Backends or Databases. You must use a service like Render, Railway, or Heroku.

**How to deploy to Render:**
1. Create a [Render](https://render.com) account.
2. **New > PostgreSQL** (Create a database). Copy the `Internal Database URL`.
3. **New > Web Service** (Connect your GitHub repo).
   - Root Directory: `backend`
   - Runtime: **Docker** (It will use the `Dockerfile` we created).
   - **Environment Variables**:
     - `spring.datasource.url`: `jdbc:postgresql://...` (Replace `postgres://` with `jdbc:postgresql://` from the internal URL).
     - `spring.datasource.username`: (from Render)
     - `spring.datasource.password`: (from Render)
     - `spring.mail.username`: (Your Gmail)
     - `spring.mail.password`: (Your App Password)
4. Deploy! Render will give you a backend URL (e.g., `https://task-reminder.onrender.com`).
5. Go back to GitHub Variables and update `NEXT_PUBLIC_API_URL` with this URL.

### 3. Final Step
Once both are deployed, your Task Reminder App will be fully live on the internet! 🌍

## 🐳 Docker Configuration

The backend is containerized using **Docker** to ensure consistency across different environments (Dev, Test, Production).

**How it works (`backend/Dockerfile`):**
1.  **Multi-Stage Build**:
    - **Stage 1 (Build)**: Uses a `maven` image to compile the Java code and package it into a `.jar` file. This means you don't even need Maven installed on your host machine to build the image.
    - **Stage 2 (Run)**: Uses a lightweight `eclipse-temurin:17-jre-alpine` image to run the application. This keeps the final image size small and secure.
2.  **Deployment**: This Docker image is what platforms like **Render** use to run your backend.

## 🏗️ Architecture & How It Works

This application follows a **Client-Server** architecture with a background scheduler.

### 1. 🌐 The Flow
1.  **User Action**: User creates a Task/Note on the **Next.js Frontend**.
2.  **API Request**: Frontend sends a `POST` request to the **Spring Boot Backend** (`/api/notes`).
3.  **Processing**:
    - `NoteController` receives the request.
    - `NoteService` processes the business logic.
    - `NoteRepository` saves the data to **PostgreSQL**.
4.  **Feedback**: The server responds with the created note, and the UI updates.

### 2. ⏰ The Reminder System (Background Job)
The application has a background worker that runs automatically to send email reminders.

- **Component**: `NoteScheduler.java`
- **Frequency**: Runs **every minute**.
- **Logic**:
    1.  Checks the database for tasks that are:
        - Status: `PENDING`
        - Reminder Time: `Before Now` (Due)
        - Reminder Sent: `False`
    2.  If found, it calls `EmailService` to send an email to the user.
    3.  Marks the task as `reminderSent = true` to prevent duplicate emails.
