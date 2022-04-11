DROP TABLE IF EXISTS events;

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name text NOT NULL,
    event_date date NOT NULL
);
INSERT INTO events (event_name, event_date) VALUES ('ets', '1999-09-30');