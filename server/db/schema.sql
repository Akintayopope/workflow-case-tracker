CREATE DATABASE workflow_tracker;

CREATE TABLE work_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  assigned_to VARCHAR(100) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Pending',
  priority VARCHAR(20) NOT NULL,
  due_date DATE NOT NULL,
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,

  CONSTRAINT valid_status CHECK (
    status IN ('Pending', 'In Progress', 'Completed')
  ),

  CONSTRAINT valid_priority CHECK (
    priority IN ('Low', 'Medium', 'High')
  )
);

INSERT INTO work_items 
(title, description, assigned_to, status, priority, due_date)
VALUES
(
  'Review case assignment',
  'Check assigned officer and case priority',
  'Jane Smith',
  'Pending',
  'High',
  '2026-06-25'
),
(
  'Update production report',
  'Prepare weekly production summary',
  'John Officer',
  'In Progress',
  'Medium',
  '2026-06-28'
);