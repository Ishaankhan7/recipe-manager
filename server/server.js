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


app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.use(authRoutes)
app.use(recipeRoutes)
app.use("/api/recipes", reviewRoutes); 
app.use(genAIRoutes);


app.listen(process.env.PORT, () => {
  console.log('Server started');
});



