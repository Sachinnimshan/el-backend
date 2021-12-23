const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', function(req, res){
  db.query('select * from users', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
  });
});

app.post('/signin', function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
		db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				res.status(200).send({data: results, message: "Login Successful"});
			} else {
				res.send({message:'Invalid Username or Password!'});
			}			
			res.end();
		});
	} else {
		res.send({message: 'Please enter Username and Password!'});
		res.end();
	}
});


app.post('/courses', function(req,res){
    const courseName = req.body.courseName;
    const courseInfo = req.body.courseInfo;
    if(courseName && courseInfo){
        db.query('INSERT INTO courses (courseName, courseInfo) values (?,?)', [courseName,courseInfo], function(error, results, fields) {
			if (results) {
				res.status(200).send({data: results, message: "Course Added"});
			} else {
				res.send({message:'Something went wrong'});
			}			
			res.end();
		});
	} else {
		res.send({message: 'Something went wrong'});
		res.end();
	}
});

app.get('/',(req,res)=>{
   res.send('Server is ready');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{ console.log(`server started at port ${PORT}`)});

