CREATE TABLE "users" ("id" SERIAL PRIMARY KEY, "username" varchar, "password" varchar, "admin" boolean);
CREATE TABLE "run" ("id" SERIAL PRIMARY KEY, "user_id" int, "game_id" int, "platform_id" int, "time" varchar, "valid" boolean,  "category_id" int);
CREATE TABLE "game" ("id" SERIAL PRIMARY KEY, "title" varchar);
CREATE TABLE "category" ("id" SERIAL PRIMARY KEY, "category_title" varchar);
CREATE TABLE "platform" ("id" SERIAL PRIMARY KEY, "name" varchar);
ALTER TABLE "run" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "run" ADD FOREIGN KEY ("game_id") REFERENCES "game" ("id");
ALTER TABLE "run" ADD FOREIGN KEY ("platform_id") REFERENCES "platform" ("id");
ALTER TABLE "run" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

/*
DROP TABLE platform CASCADE;
DROP TABLE category CASCADE;
DROP TABLE users CASCADE;
DROP TABLE run CASCADE;
DROP TABLE game CASCADE; */

INSERT INTO platform (name) VALUES ('PC');
INSERT INTO platform (name) VALUES ('Playstation 4');
INSERT INTO platform (name) VALUES ('Xbox One');
INSERT INTO platform (name) VALUES ('Nintendo Switch');
INSERT INTO platform (name) VALUES ('Nintendo 64');
INSERT INTO platform (name) VALUES ('Super Nintendo');

INSERT INTO game (title) VALUES ('Sekiro');
INSERT INTO game (title) VALUES ('The Legend of Zelda: A Link to the Past');
INSERT INTO game (title) VALUES ('The Legend of Zelda: Ocarina of Time');
INSERT INTO game (title) VALUES ('Super Metroid');
INSERT INTO game (title) VALUES ('Celeste');
INSERT INTO game (title) VALUES ('Hollow Knight');
INSERT INTO game (title) VALUES ('Dead Cells');
INSERT INTO game (title) VALUES ('River City Girls');
INSERT INTO game (title) VALUES ('A Hat in Time');
INSERT INTO game (title) VALUES ('Dark Souls');
INSERT INTO game (title) VALUES ('Dark Souls II');
INSERT INTO game (title) VALUES ('Dark Souls III');
INSERT INTO game (title) VALUES ('Super Mario 64');
INSERT INTO game (title) VALUES ('Trine');
INSERT INTO game (title) VALUES ('Trine 2');
INSERT INTO game (title) VALUES ('Portal');

INSERT INTO users (username, password, admin) VALUES ('admin', 'CS313', True);
INSERT INTO users (username, password, admin) VALUES ('Cadfel', 'password', False);
INSERT INTO users (username, password, admin) VALUES ('Distortion2', '123qwe,./', False);
INSERT INTO users (username, password, admin) VALUES ('LilAggy', 'stuff', False);
INSERT INTO users (username, password, admin) VALUES ('sTaTic_dr0P', 'junk', False);
INSERT INTO users (username, password, admin) VALUES ('Shorty Da Moose', 'nerd', False);
INSERT INTO users (username, password, admin) VALUES ('Alexden96', 'hotstuff4242', False);

INSERT INTO category (category_title) VALUES ('100%');
INSERT INTO category (category_title) VALUES ('Any %');
INSERT INTO category (category_title) VALUES ('All Bosses');
INSERT INTO category (category_title) VALUES ('Glitchless');
INSERT INTO category (category_title) VALUES ('Out of Bounds');

INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (2, 1, 1, '00:21:42', True, 2);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (3, 1, 2, '00:19:55', True, 2);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (5, 4, 6, '01:41:30', True, 1);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (7, 16, 1, '00:16:14', True, 4);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (7, 16, 1, '00:07:46', True, 5);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (4, 1, 2, '00:25:35', False, 2);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (6, 5, 4, '00:34:17', True, 2);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (2, 1, 1, '03:54:39', True, 4);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (2, 1, 1, '01:13:45', True, 3);
INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (7, 6, 1, '00:47:46', True, 3);

/* Displaying table with | username | Game | Category | Time | Platform | Validated | */
SELECT users.username, game.title, category.category_title, run.time, platform.name, run.valid FROM users, run, platform, game, category WHERE run.user_id = users.id AND platform_id = platform.id AND run.game_id = game.id AND run.category_id = category.id ORDER BY run.time;

/* Grabing list of game id's and game titles from database with duplicates removed */
SELECT DISTINCT run.game_id, game.title FROM run, game WHERE run.game_id = game.id ORDER BY game.title;
SELECT DISTINCT run.category_id, category.category_title FROM run, category WHERE run.category_id = category.id AND run.game_id=16;
SELECT DISTINCT users.username, run.time, category.category_title, platform.name, run.valid FROM users, run, platform, category WHERE run.user_id = users.id AND platform_id = platform.id AND run.game_id = 1 AND run.category_id = category.id ORDER BY run.time;
SELECT DISTINCT game.title, run.time, category.category_title, platform.name, run.valid FROM users, run, platform, category, game WHERE run.user_id = users.id AND users.username='Cadfel' AND platform_id = platform.id AND run.game_id = game.id AND run.category_id = category.id ORDER BY run.time;
SELECT * from users WHERE username='Cadfel';

/* CREATE USER serveradmin WITH PASSWORD 'password';
GRANT SELECT,INSERT, UPDATE ON run TO serveradmin; */