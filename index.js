// Using Express engine
var express = require('express');
var session = require('express-session');
//var MySQLStore = require('express-mysql-session')(session);
var app = express();

// To process post request
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//View Engine
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('./src/resources')); // using static file from here.

// DB connection
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'dbms.gswcm.net',
    user: 'hhong',
    password: '219590',
    database: 'Group 2' // Real DB
    //database : 'Hhong' // Test DB
});
conn.connect();

//Session Managing on file
app.use(session({
    secret: 'ad23kdjfajajf',
    resave: false,
    saveUninitialized: true,

    /* in case of managing MYSQL
    secret: '1234DSFs@adf1234!@#$asd',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: 'dbms.gswcm.net',
        port: 3306,
        user: 'hhong',
        password: '219590',
        database: 'Group 2'
    })
    */
}));


// Passport API for Authentication
// PBKDF2 for cryptographic function
var bkfd2Password = require("pbkdf2-password");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hasher = bkfd2Password();
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log('SerializeUser func passed', user.mem_email)
    done(null, user.mem_email);
});
passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    var sql = 'select * from member where mem_email=?';
    conn.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            done('There is no Users');
        } else {
            done(null, results[0]);
        }
    })
});
passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('Enter Strategy ', username)
        var sql = 'select * from member where mem_email=?';
        conn.query(sql, [username], (err, results) => {
            if (err) {
                return done('There is no users');
            }
            var user = results[0];
            return hasher({ password: password, salt: user.salt }, (err, pass, salt, hash) => {
                if (hash === user.mem_pw) {
                    console.log('Password correct');
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
        })
    }
));

//Module - sending new password
var pwsender = require('./src/model/email');

//Module - loading schedule from DB
var schedule = require('./src/model/schedule');

//Module - loading curriculum from DB
var curriculum = require('./src/model/curriculum');

//Module - loading transcript from DB
var transcript = require('./src/model/transcript');

//Module - loading register from DB
var register = require('./src/model/register');

//Module - loading myschedule from DB
var myschedule = require('./src/model/myschedule');

//Global variable
var level = "";
var major = "";
var year = "";
var semester = "";


// --------------------------------------------Router Start ---------------------------------------------------------------
//Initial Page
app.get('/', (req, res) => {
    res.render('index')
})

//Sign in Process
app.post('/signin', passport.authenticate(
    'local',
    {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: false
    }
));

// After sucess Sign in
app.get('/main', (req, res) => {
    if (req.user !== undefined) {
        level = req.user.deg_level;
        major = req.user.deg_major;
        startyear = req.user.mem_startyear;
        semester = "summer"; //->Why this is required?        
        schedule.getSchedule(conn, 2017, semester).then((schedule) => {
            curriculum.getCurriculum(conn, '2016-2017', level, major).then((curriculum) => { // not clear curriculum year 2017 and 2016-2017
                if (major === "ComputerScience") major = "Computer Science"; // Temporary solution instead of changing whole DB
                res.render('main', {
                    id: req.user.mem_email,
                    major: major,
                    level: level,
                    startyear: startyear,
                    schedule: schedule,
                    curriculum: curriculum,
                })
            });
        }).catch((error) => {
            console.log(error);
            res.render('/')
        });
    } else {
        res.redirect('/');
    }
});

//Signup Process
app.post('/signup', (req, res) => {
    hasher({ password: req.body.password }, function (err, pass, salt, hash) {
        var user = {
            mem_email: req.body.mem_email,
            mem_pw: hash,
            mem_startyear: req.body.mem_startyear,
            deg_level: req.body.deg_level,
            deg_major: req.body.deg_major,
            salt: salt,
        };
        var sql = 'INSERT INTO member SET ?';
        conn.query(sql, user, function (err, results) {
            if (err) {
                console.log(err);
                res.status(500);
            } else {
                req.login(user, (err) => {
                    req.session.save(() => {
                        res.redirect('/main');
                    })
                })

            }
        });
    });
});


//Finding password page
app.get('/findpw', (req, res) => {
    res.render('findpw')
})

//Finding password process
app.post('/findpw', (req, res) => {
    var id = req.body.id;
    pwsender.sendEmail(id).then((result) => {
        console.log(result);
        hasher({ password: 'abcd1234' }, function (err, pass, salt, hash) {

            var sql = 'UPDATE member SET mem_pw=?, salt=? where mem_email=?'
            var params = [hash, salt, id,];
            conn.query(sql, params, function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else {
                    console.log('Update Database password Sucess');
                    res.render('findpwsuccess')
                }
            });
        });
    }).catch((error) => {
        console.log(error);
        res.render('findpwfail')
    })
})

// Logout
app.post('/logout', (req, res) => {
    req.logout();
    req.session.save(function () {
        res.redirect('/');
    });
});

// Ajax request for new schedule 
app.post('/updateSchedule', (req, res) => {
    schedule.getSchedule(conn, req.body.year, req.body.semester).then((html) => {
        res.send(html);
    });
});

//Ajax request for saving taken subject
app.post('/save_taken_subject', (req, res) => {
    var mem_email = req.body.mem_email;
    var subj = req.body.subj;
    var crse = req.body.crse;
    var grade = req.body.grade;
    var sql = 'INSERT INTO transcript(mem_email,cl_SubjCode,cl_CrseNo,tran_grade) values(?,?,?,?)';
    var params = [mem_email, subj, crse, grade];
    conn.query(sql, params, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            res.send('Saved ' + subj + ' ' + crse + ' with ' + grade + ' grade.');
        }
    });
});

//Ajax request for get transcript
app.post('/get_transcript', (req, res) => {
    transcript.get_transcript(conn, req.body.mem_email).then((html) => {
        res.send(html);
    });
});

//Ajax request for get transcript
app.post('/transcript_delete', (req, res) => {
    transcript.delete_transcript(conn, req.body.mem_email, req.body.subj, req.body.crse).then((html) => {
        res.send(html);
    });
});


//Ajax request for register
app.post('/register', (req, res) => {
    register(conn, req.body.mem_email, req.body.crn, req.body.year, req.body.semester).then((html) => {
        if (html) {
            console.log("heel");
            res.send(html);
        } else {
            console.log("Nope");
        }
    });
});

//Ajax request for schedule
app.post('/myschedule', (req, res) => {
    myschedule(conn, req.body.mem_email,req.body.year,req.body.semester).then((html) => {
        if (html) {
            res.send(html);
        } else {
            
        }
    });
});

// --------------------------------------------Router End---------------------------------------------------------------





//Server Launch
var port = 4321
app.listen(port, () => {
    console.log('Connected to port: ' + port);
})