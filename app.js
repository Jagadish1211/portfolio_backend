const express = require("express");
const compression = require("compression");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ProjectInteractions = require("./src/models/project-interactions");
const initialize = require("./src/config/master-data/index");
const ProjectInteractionRouter = require('./src/routes/project-interactions').router;

app.use(cors()); // Using Cors policy for CROSS ORIGIN CALLS
app.options("*", cors());
app.use(compression()); // Compressing responses to reduce data transfer to clients

let mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

mongoose.connect(
  "mongodb://localhost:27017/jagadish-portfolio",
  mongoOptions,
  async (err) => {
    if (err) {
      console.error(err);
      console.error("MongoDb Connection Failed");
      process.exit(1);
    }

    console.log("MongoDb Connection Successful!!");
    if (process.argv.indexOf("--initialize") != -1) {
      await initialize();
    }
  }
);

app.use(
  morgan(
    ":method :url :status :response-time ms :total-time ms - :res[content-length] :date[web]"
  )
);
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.get("/", function (req, res) {
  res.send({
    message: "Welcome",
  });
});

app.post("/", function (req, res) {
  res.send({
    message: "Welcome",
  });
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "options") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use('/project-interaction', ProjectInteractionRouter);

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

app.use(
  express.json({
    limit: "30kb",
  })
); // Body limit is 10
// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
// Data Sanitization against XSS attacks
app.use(xss());

module.exports = app;
