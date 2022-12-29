const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/db')
const {ProjectRouter,UserRouter,TaskRouter} = require('./routes/index.js');
const app = express()
require('dotenv').config();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());
app.use('/project',ProjectRouter);
app.use('/user',UserRouter);
app.use('/task',TaskRouter);
app.get('/', (req, res) => res.send('hello'))

dbConnect().then(()=>{  
    app.listen(8080, () => {console.log('server started on port 8080')})
})