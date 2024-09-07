import express from 'express';
import colors from 'colors';
import 'dotenv/config';
import morgan from 'morgan';
import connectDB from './config/db.js';

// database config
connectDB();

//rest object creating FOR API CREATION
const app = express()

// middlewares
app.use(express.json())  // it makes sure our app can understand JOSN data
app.use(morgan('dev'))  // it logs information about the incoming requests

//rest api's creation
app.get('/', (req,res) => {
    res.send("<h1>Welcome to Ecommerce App</h1>");
})

//PORT
const PORT = process.env.PORT || 8080;

//run/listen app
app.listen(PORT , () => {
    console.log(`server running on development mode on port ${PORT} successfully`.bgCyan.white);
    
})