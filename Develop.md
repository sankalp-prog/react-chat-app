# Notes While Developing

## Database Setup

- Script for creating the `users` table

  ```sql
  -- NOTE: Ran the 3 steps seperately but shouldn't be an issue to run this all at once

  -- 1. Create the Table:
  -- Creates a 'users' table with 'created_at' and 'updated_at' columns that automatically handle timestamps on insert and update

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    full_name VARCHAR(255),
    password VARCHAR(255),
    profile_pic VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );

  -- 2. Create the Trigger Function:
  -- This function updates 'updated_at' every time a row is updated

  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- 3. Create the Trigger:
  -- This attaches the function to the users table to run before each update

  CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
  ```

- Script for creating the `messages` table

  ```sql
  -- NOTE: Ran all these at once

  -- 1. Create the table
  CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    text TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
  );

  -- 2. Create the trigger function
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
  END;

  $$
  LANGUAGE plpgsql;

  -- 3. Create the trigger
  CREATE TRIGGER trigger_update_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
  ```
