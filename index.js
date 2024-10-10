
import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './Roots/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './Roots/galleryItemRoute.js'
import jwt from 'jsonwebtoken'
const app = express()


app.use(bodyParser.json())

const connectionString = "mongodb+srv://tester2:321@cluster0.daong.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


//authentication middlewear
app.use((req,res,next)=>{

  const token = req.header("Authorization")?.replace("Bearer ", "") //check is there is a token

  if(token != null){
    jwt.verify(token,"secret",
      (err,decoded)=>{
      if(decoded != null){
        req.user = decoded
        next()
      }else{
        next()
      }

    }
  )
  }else{
    next()
  }

});



mongoose.connect(connectionString).then(
  ()=>{
    console.log("Connected to the database")
  }
).catch(
  ()=>{
    console.log("Connection failed")
  }
)


app.use("/api/users",userRouter)
app.use("/api/gallery",galleryItemRouter)



app.listen(5000,(req,res)=>{
  console.log("Sever is running on on port 5000")
});

