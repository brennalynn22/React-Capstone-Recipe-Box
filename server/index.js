require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const { SERVER_PORT } = process.env;

const { sequelize } = require("./util/database");
const { User } = require("./models/user");

const { login, register } = require("./controllers/auth-server");
const { isAuthenticated } = require("./middleware/isAuthenticated");

app.use(express.json());
app.use(cors());

app.post("/auth/login", login);
app.post("/auth/register", register);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`dB sync successful & listening on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
