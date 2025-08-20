const express=require("express");

const app=express();

//all routes

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Courses");
const conatctUsRoutes=require("./routes/ContactUs");

 const database=require("./config/database");
 const cookieParser=require("cookie-parser");

 const cors=require("cors");// use to connect differnt domains securly read in doc
 const {cloudinaryConnect}=require("./config/cloudinary");
 const fileUpload=require("express-fileupload");
 require("dotenv").config();


const PORT=process.env.PORT||4000;

// database connection
database.connect();

// middle wares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://study-notion-yoj3-gilt.vercel.app"
    ],
    credentials: true,
  })
);


app.use(
    fileUpload({
        useTempFiles:true,// we can include a temp file if we include then we have to add temp file dir means path
        tempFileDir:"/temp"
    })
)
cloudinaryConnect();

// mount all routes

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes );
app.use("/api/v1/contact",conatctUsRoutes);
  

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'your server is up and running..',
    });
});


app.listen(PORT , ()=>{
    console.log(`app is running at ${PORT}`);
} )