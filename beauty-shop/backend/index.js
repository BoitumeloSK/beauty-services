const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const routes = require("./routes");
const sequelize = require("./config/config");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.get("*", (req, res) => {
  res.send("This is not a valid route");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
});
