CREATE TABLE aquariums (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE indicators (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  current_value numeric NOT NULL,
  accepted_value numeric NOT NULL,
  min_value numeric NOT NULL,
  max_value numeric NOT NULL
);
