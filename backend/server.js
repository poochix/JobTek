// to use import instead of require write "write":"module" in  package.json

import express from "express";
import cookieParser from "cookie-parser"; // use so that the cookies can be accessed in backend
import cors from "cors"; // used to allow or restrict the other domain to access the server resoureces
import dotenv from "dotenv"; // to import the .env files
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"; // you can import with the custom name
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"

dotenv.config({
  /*for specifying path to the dot env file comes her*/
}); //use to load the variable present in dotenv file

const app = express();

// middleware

app.use(express.json()); // to make the incomming data in json format
app.use(express.urlencoded({ extended: true })); // use to parse the incomming url encode data through forms extended - true means that it shall parse complex, nested objects
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // api request from this origin get approved by the cors when
  credentials: true, // the credentials is true
};
app.use(cors(corsOptions)); // to used cors option

const PORT = 3000;

// api
app.use("/api/v1/user", userRoute); //api will beusing this route including the userRoute
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);




app.listen(PORT || process.env.PORT , () => {
  //when process.env.PORT is use // here if the port 3000 is not available the the port mentioned in env will work
  connectDB();
  console.log("server initiated");
});
