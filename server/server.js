const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const recipeRoutes = require('./Routes/recipeRoutes')
const reviewRoutes = require("./Routes/reviewRoutes");
const genAIRoutes = require("./Routes/genAIRoutes");
require("./Connection/conn")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')

const dirname = path.resolve();


app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())


app.use(authRoutes)
app.use(recipeRoutes)
app.use("/api/recipes", reviewRoutes); 
app.use(genAIRoutes);

app.use(express.static(path.join(dirname,"/client/dist")))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(dirname,"client","dist","index.html"))
})

app.listen(process.env.PORT || 7000, () => {
  console.log('Server started');
});



