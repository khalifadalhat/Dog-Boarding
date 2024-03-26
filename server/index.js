const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000;
const authRouter = require("./routes/authRoute");
const petsitterRouter = require("./routes/petsitterRoute");
const cookieParser = require("cookie-parser");
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/user', authRouter);
app.use('/api/petsitter', petsitterRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});