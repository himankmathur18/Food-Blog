const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDb = require('./config/connectionDb');
const cors=require('cors')

const port = process.env.PORT || 3000;
connectDb();

app.use(express.json());
app.use(cors());

app.use("/", require("./Routes/user"));
app.use("/", require('./Routes/recipe'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 

module.exports = connectDb;