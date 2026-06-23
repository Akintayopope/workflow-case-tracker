CREATE DATABASE workflow_tracker;

CREATE TABLE officers (
  user_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE work_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  assigned_to_user_id VARCHAR(10) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Pending',
  priority VARCHAR(20) NOT NULL,
  due_date DATE NOT NULL,
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,

  CONSTRAINT fk_assigned_officer
    FOREIGN KEY (assigned_to_user_id)
    REFERENCES officers(user_id),

  CONSTRAINT valid_status CHECK (
    status IN ('Pending', 'In Progress', 'Completed')
  ),

  CONSTRAINT valid_priority CHECK (
    priority IN ('Low', 'Medium', 'High')
  )
);

INSERT INTO officers (user_id, name)
VALUES
('GGF654', 'John Officer'),
('ABC245', 'Jane Smith'),
('TRP981', 'Mike Brown'),
('QWE312', 'Sarah Lee'),
('HJK778', 'David Johnson'),
('MNO456', 'Mary Williams'),
('RST902', 'Peter Adams'),
('LMN234', 'Grace Wilson'),
('XYZ567', 'Daniel Clark'),
('PQR111', 'Linda Thomas');

INSERT INTO work_items 
(title, description, assigned_to_user_id, status, priority, due_date)
VALUES
(
  'Review case assignment',
  'Check assigned officer and case priority',
  'GGF654',
  'Pending',
  'High',
  '2026-06-25'
),
(
  'Update production report',
  'Prepare weekly production summary',
  'TRP981',
  'In Progress',
  'Medium',
  '2026-06-28'
);