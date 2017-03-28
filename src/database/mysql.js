var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'dbms.gswcm.net:3306',
  user     : 'hhong',
  password : '219590',
  database : 'Hhong'
});

conn.connect();
var sql = 'select * from curriculum'
conn.query(sql, (err,rows,fields)=>{
    if(err){
        console.log(err);
    }else{
        for(var i=0;i<rows.length;i++){
            console.log(rows[i].description);
        }
        
    }
})
/*
var sql = 'insert into topic (title, description, author) values(?,?,?)';
var params =['Suervisor','Watcher','graphittie'];
conn.query(sql, params, (err,rows,fields)=>{
    if(err){
        console.log(err);
    }else{  
        console.log(rows.insertId);
    }
})

var sql = 'update topic set title=?, author=? where id=?';
var params =['KAKA','hong',1];
conn.query(sql, params, (err,rows,fields)=>{
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
})
var sql = 'delete from topic where id=?';
var params =[1];
conn.query(sql, params, (err,rows,fields)=>{
    if(err){
        .0000001+
        console.log(err);
    }else{
        console.log(rows.insertId);
    }
})



*/
conn.end();