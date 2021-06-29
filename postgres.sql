1.

CREATE TABLE directors (
  id SERIAL NOT NULL ,
  full_name varchar(45) DEFAULT NULL,
  bio varchar(4000) DEFAULT NULL,
  birth_year int DEFAULT NULL,
  death_year int DEFAULT NULL
) 
CREATE TABLE genres(
id SERIAL NOT NULL ,
  name varchar(45) DEFAULT NULL
)

CREATE TABLE users (
  id SERIAL NOT NULL ,
  username varchar(45) DEFAULT NULL,
  password varchar(45) DEFAULT NULL,
  full_name varchar(45) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  role_id int DEFAULT NULL
) 

CREATE TABLE movies (
  id SERIAL NOT NULL ,
  description varchar(4000) DEFAULT NULL,
  genre_id int DEFAULT NULL,
  director_id int DEFAULT NULL,
  image_url varchar(250) DEFAULT NULL
  
) 

CREATE TABLE user_movies (
  user_id int NOT NULL,
  movie_id int DEFAULT NULL
) 


CREATE VIEW view_movies AS 
SELECT m.*, g.name as genre, d.full_name as director
 FROM movies m JOIN genres g ON m.genre_id=g.id
	JOIN directors d ON m.director_id=d.id

2.

INSERT INTO movies.directors
(full_name,
bio,
birth_year,
death_year)
VALUES
('George Lucas','', 1900, null),
('David Yates','',1900,null),
('David Fincher', '', 1900, null),
('Gene Rodenberry', '', 1900, null),
('Ridley Scott', '', 1900, null),
('Gene Rodenberry', '', 1900, null),
('Ridley Scott', '', 1900, null)



INSERT INTO genres
(name)
VALUES
('Sci Fi'), ('Fiction'), ('Action'), ('Thriller'), ('Comedy')

INSERT INTO users
(
username,
password,
full_name,
email,
role_id)
VALUES
('ryan','Test1234', 'Ryan Tester','ryan@test.com', 1),
('bob','Test1234', 'Bob Tester','bob@test.com', 1),
('admin','Test1234', 'Admin User','admin@test.com', 2)


INSERT INTO movies
(
description,
genre_id,
director_id,
image_url)
VALUES
('Star Wars, new hope', 1,1,''),
('Harry Potter', 2,2,''),
('Star Wars, return of Jedi', 1,1,''),
('Fight Club', 3,3,''),
('Star Wars, the empire strikes back', 1,1,''),
('Fantastic Beast', 2,2,''),
('Seven', 4,3,''),
('Gone Girl', 4,3,''),
('Star Trek, the movie', 1,4,''),
('Gladiator', 4,3,'')


3.

SELECT * FROM genres WHERE name = 'Action'
SELECT * FROM movies WHERE genre_id = 3

UPDATE users SET email = 'bob@gmail.com' WHERE username='bob'

DELETE FROM movies WHERE id=5
