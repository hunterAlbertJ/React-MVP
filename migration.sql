DROP TABLE IF EXISTS events;

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name text NOT NULL,
    event_date date NOT NULL
);
INSERT INTO events (event_name, event_date) VALUES ('ETS', '2022-05-06');