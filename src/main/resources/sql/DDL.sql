-- DDL : Data Definition Language

-- Making Database
USE 'Group 2';

-- Making Tables
CREATE TABLE CURRICULUM(
cl_crseno integer,
deg_level varchar(20),
curi_area varchar(20),
deg_major varchar(40),
curi_groupnum integer
);

CREATE TABLE CLASS(
cl_crseno integer,
cl_subjcode varchar(20)
);

-- Insert Dummy data
insert into CURRICULUM VALUES(1000,'master','major','computer science',1);
