# Workflow Case Tracker

Workflow Case Tracker is a full-stack web application for tracking and managing work items. It allows users to create, view, update, filter, and delete work items.

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

## Features

* View all work items
* Add a new work item
* Edit an existing work item
* Update work item status
* Delete a work item
* Search work items by title or description
* Filter work items by status
* Filter work items by priority

## Project Structure

```text
workflow-case-tracker/
  src/
    components/
      WorkItemFilter.jsx
      WorkItemForm.jsx
      WorkItemRow.jsx
      WorkItemSection.jsx
      WorkItemTable.jsx
    App.jsx
    index.css

  server/
    index.js
    db.cjs
    routes/
      workItemRoutes.cjs
    controllers/
      workItemController.cjs
    services/
      workItemService.cjs
    db/
      schema.sql
```

## Backend Architecture

The backend uses a layered structure:

```text
Route -> Controller -> Service -> Database
```

### Routes

Routes define the API endpoints and connect each URL to the correct controller function.

Examples:

```text
GET    /api/work-items
POST   /api/work-items
PUT    /api/work-items/:id
DELETE /api/work-items/:id
```

### Controllers

Controllers handle the request and response. They validate input, call the service layer, and return a response to the frontend.

### Services

Services contain the database logic. They use PostgreSQL queries to create, read, update, and delete work items.

## API Endpoints

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/api/work-items`     | Get all work items     |
| POST   | `/api/work-items`     | Create a new work item |
| PUT    | `/api/work-items/:id` | Update a work item     |
| DELETE | `/api/work-items/:id` | Delete a work item     |

## Database Table

The main database table is `work_items`.

Important fields:

```text
id
title
description
assigned_to
status
priority
due_date
created_date
```

## Environment Variables

The backend uses a `.env` file for database connection settings.

Example:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=workflow_tracker
DB_PASSWORD=your_password_here
DB_PORT=5432
```

The `.env` file is ignored by Git for security.

## How to Run the Project

### Start the backend

```powershell
cd server
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Start the frontend

From the project root:

```powershell
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```


