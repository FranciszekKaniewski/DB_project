# 🌟 Calendar scheduler
Franciszek Kaniewski (Uniwersytet Mikołaja Kopernika w Toruniu inf.inż 1y.)

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FF5733?style=for-the-badge&logo=typeorm&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/username/repo/releases)

## 📖 Table of Contents

- [Project description](#Project-description)
- [Project assumption](#Project-assumption)
- [Instalation](#How-to-run)
- [License](#License)

## ✨ Project description

Calendar scheduler is a simple app that helps you organize your tasks in calendar.

## 🚀 Project assumption

- **Adding tasks to the database:**
    - ***Hard Task (h):***
        - `unlimited time`
        - `only one at a time`
    - ***Soft Task (s):***
        - `unlimited time`,
        - `duration > 6h`
        - `requires 15 minutes free time`
- **Getting tasks from the database:**
    - `For single month`
    - `For single week`
    - `For single day`
- **Ability to edit tasks**
- **Ability to make tasks done/undone**
- **Ability to remove tasks**

## 🛠 How to run
1. Clone the repository:
    ```bash
    git clone https://github.com/FranciszekKaniewski/DB_project.git
    ```
### 💾 Backend:
2. Navigate to the project backend directory:
    ```bash
    cd back
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the application:
    ```bash
    nest start
    ```
### 💻 Frontend:
2. Navigate to the project backend directory:
    ```bash
    cd front
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the application:
    ```bash
    npm run dev
    ```

## 📜 Licencja

This project is licensed under the MIT License.
