DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  size INTEGER NOT NULL,
  folder_id INTEGER NOT NULL,

  CONSTRAINT files_folder_id_fkey
    FOREIGN KEY (folder_id)
    REFERENCES folders(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_file_name_per_folder
    UNIQUE (name, folder_id)
);