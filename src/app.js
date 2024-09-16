const express = require("express");
const cors = require("cors");

const JSend = require("./jsend");
const contactsRouter = require("./routes/contacts.router");

const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json(JSend.success());
});

app.use("/public", express.static("public"));

// run api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
contactsRouter.setup(app);

// handle the 404 error
app.use(resourceNotFound);

// Define error-handling middleware last, after other app.use() and routes calls
app.use(handleError);
module.exports = app;