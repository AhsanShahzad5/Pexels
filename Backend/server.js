//imports
import express, { json, urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary'
//export the routers from our routes
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'


const app = express();
//env 
import dotenv from 'dotenv';
//mongodb connection
import connectToMongo from './databaseConnection.js' 
import cors from 'cors'

connectToMongo()

dotenv.config()
//port
const PORT = process.env.PORT || 5000

//cloudinary config
cloudinary.config({
cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
api_key : process.env.CLOUDINARY_API_KEY,
api_secret : process.env.CLOUDINARY_API_SECRET 
});


//const app = express()


const allowedOrigins = ['http://localhost:8081'];
  
  // Configure CORS options
  const corsOptions = {
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
  };
  
  app.use(cors(corsOptions));


//necessary middlewares
app.use(express.json({limit : "50mb"}))     //to pass json in request.body
app.use(urlencoded({extended : true}))   // req.body can parse nested data from forms
app.use(cookieParser());


//routing
app.get('/', (req, res) => {
  res.send('Hello to pexels')
})
app.use('/api/users' , userRoutes);
app.use('/api/posts' , postRoutes );
//8000 -> backend
//3000->frontend
// but we need both frontend and backend on 8000





app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
  })