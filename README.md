## Demo

![Desktop Demo](https://oktayshakirov.com/assets/images/projects/ogno-dashboard.png 'Desktop Demo')

<p align="center">
  <a href="https://ogno.netlify.app/"><strong>➥ Live Demo</strong></a>
</p>

This project is a **front-end demonstration** designed to showcase a modern and interactive user interface for an analytics dashboard. The primary goal is to visualize data effectively using the **Recharts library** for React. Please note that this is a client-side application for demo purposes and does not connect to a live backend.

***

## Features

This dashboard is packed with features designed to provide a comprehensive overview of your data and workflow.

* **📊 Data Visualization**: Interactive charts and graphs powered by **Recharts** to visualize various analytics.
* **📋 Kanban Board**: A drag-and-drop interface to manage tasks and workflows efficiently.
* **💬 Chat**: A built-in chat feature for seamless communication.
* **🏠 Overview & Summary Pages**: Get a bird's-eye view of your most important metrics and a detailed summary of your data.
* **🚀 Campaigns**: A dedicated section to track and manage your marketing campaigns.
* **👥 User Lists with Filtering**: View a list of all users with the ability to filter and search.
* **📅 Calendar**: Keep track of calls and appointments with an integrated calendar.
* **📂 File Management**: A simple interface to manage your files.
* **⚙️ Profile & Settings**: Customize your profile and application settings.

The **core function** of this dashboard is the **client-based filtering**. Selecting a client will dynamically update the data across the entire application, providing a tailored and focused view of your analytics.

***

## Getting Started

### Dev

To get started with the development environment, follow these steps:

1.  Copy the `.env` file to `.env.local` and set the following environment variable:
    ```
    VITE_BACKEND_URL="http://localhost:3000/fake"
    ```

2.  Install the necessary dependencies using your preferred package manager:
    ```bash
    yarn install
    ```
    or
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    yarn dev
    ```
    or
    ```bash
    npm run dev
    ```
