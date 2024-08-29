import express from 'express';
import colors from 'colors';
import 'dotenv/config';


//rest object creating FOR API CREATION
const app = express()

//rest api's creation
app.get('/', (req,res) => {
    res.send("<h1>Welcome to Ecommerce App</h1>");
})

//PORT
const PORT = process.env.PORT || 8080;

//run/listen app
app.listen(PORT , () => {
    console.log(`server running on ${PORT} successfully`.bgCyan.white);
    
})