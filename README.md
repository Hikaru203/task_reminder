# Task & Note Reminder System 📝

A full-stack application for managing tasks and notes with automated email reminders. Built with Spring Boot (Backend) and Next.js (Frontend).

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
