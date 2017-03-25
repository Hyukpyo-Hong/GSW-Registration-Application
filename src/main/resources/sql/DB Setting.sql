--Create new user (Required root account)
use mysql; 
select host, user from user; 

-- % means this user can connect from remote
create user 'hhong'@'%' identified by '219590';

-- Give all grant on db
grant all privileges on gsw_registration.* to 'hhong'@'%' identified by '219590'; 

-- Kind of Commit
flush privileges; 

--Check the result
show grants for 'hhong'@'%'; 

-- Find mysql port
SHOW VARIABLES WHERE Variable_name = 'port';


