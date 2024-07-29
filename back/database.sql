CREATE TABLE aquariums (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE indicators (
  id serial PRIMARY KEY,
  aquarium_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  current_value numeric NOT NULL,
  accepted_value numeric NOT NULL,
  min_value numeric NOT NULL,
  max_value numeric NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  last_update timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE fans (
  id serial PRIMARY KEY,
  aquarium_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  "on" BOOL NOT NULL DEFAULT FALSE,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE indicator_historics (
  id serial PRIMARY KEY,
  indicator_id INT NOT NULL,
  "value" numeric NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE buoys (
  id serial PRIMARY KEY,
  aquarium_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  current_value BOOL NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  last_update timestamp NOT NULL DEFAULT NOW()
);

-- Inserts to seed

INSERT INTO public.aquariums(name) VALUES ('Iury Reef');
INSERT INTO public.aquariums(name) VALUES ('Homolog Reef');

INSERT INTO public.indicators(
	aquarium_id, name, unit, description, current_value, accepted_value, min_value, max_value)
	VALUES (2, 'Temperatura', 'C', 'graus', 27, 28, 27, 28);

INSERT INTO public.fans(
	aquarium_id, name)
	VALUES (2, 'Fan');
