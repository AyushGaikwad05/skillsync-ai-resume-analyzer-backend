const express=require('express'); 
const app=express(); 
require('dotenv').config();
const cors = require('cors');
const analyzeRoutes = require('./routes/analyzeRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Server Running'); 
})

app.use('/api', analyzeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Runiing on PORT: ${PORT} `)
})