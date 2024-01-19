import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.route.js';
import ListingRoute from './routes/listing.route.js'
import path from 'path'

const app=express()
app.use(express.json())
app.use(cookieParser())

dotenv.config()
// Log MongoDB URI for debugging
// console.log('MongoDB URI:', process.env.MONGO);

// Retrieve MongoDB connection URI from environment variable
const mongoDBURI = process.env.MONGO
if (!mongoDBURI) {
  console.error('MongoDB URI is missing in the environment variables');
  process.exit(1);
}
// 'mongodb://127.0.0.1:27017/mern_estate'
mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.listen(3000, () => {
  console.log('Server is running at 3000..!');
});

const __dirname=path.resolve()

app.use('/api/user',UserRouter)
app.use('/api/auth',AuthRouter)
app.use('/api/listing',ListingRoute)

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

// create middleware for comprehensive showing errors and manage    
app.use((err, req ,res ,next)=>{
    const statusCode=err.statusCode || 500;
    const message= err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})