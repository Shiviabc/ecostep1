/*
  # Create carbon entries table

  1. New Tables
    - `carbon_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `category` (text)
      - `amount` (numeric)
      - `details` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `carbon_entries` table
    - Add policies for authenticated users to:
      - Insert their own entries
      - Read their own entries
*/

CREATE TABLE IF NOT EXISTS carbon_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  category text NOT NULL,
  amount numeric NOT NULL,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE carbon_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own entries"
  ON carbon_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own entries"
  ON carbon_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);