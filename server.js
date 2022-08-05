const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express()
const register=require('./controllers/register')
const signin=require('./controllers/signin')
const image=require('./controllers/image')
const profile=require('./controllers/profile')

const knex = require('knex');//package to connect with DB and communicate with db
app.use(bodyParser.json());//from body we are sending data in json file format so to convert it into object format this middle wear is reuired
app.use(cors());//security purpose package
const port = 3002

//code to connect with DB
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'Gcoej@@123',
        database: 'smart-brain'
    }
});

//console.log(db.select('*').from('users'));

// const database = {
//     users: [{
//         id:'123',
//         name: 'Sandip',
//         email: 'sandip@123',
//         password: "sandip@123",
//         enteries:0,
//         joined:new Date()
//     },
//     {
//         id:'124',
//         name: 'madhu',
//         email: 'madhu@123',
//         password: "madhu@123",
//         enteries:0,
//         joined:new Date()
//     }
//     ]
// }
app.get('/', (req, res) => {res.json(database.users)})
app.post('/signin',(req,res)=>{signin.handleSign(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)} )
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)} )
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/*
Different Roots
/---->GET = to print or to check connections this is working
/signin--> POST =success/failed 
/register-->POST = user
/profile/:userid -->GET =user
/image--->PUT =user
*/
