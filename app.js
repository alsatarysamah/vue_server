require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/index");

///////////////////////////
// testing release 1

const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./src/routers/userRoute");
const taskRoute = require("./src/routers/taskRoute");
const taskUserRoute = require("./src/routers/taskUserRoute");


app.use("/users",userRoute);
app.use("/task",taskRoute);
app.use("/taskuser",taskUserRoute)

app.get("/", (req, res) => {
  res.send("hello");
});

/////////////////////////// scheduledRoute   ///////////////////////////

//////////////////////////////////////////////////////

///////////////////////////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    console.log(`app listening on http://localhost:${PORT}`);
    await sequelize
      .sync({
        // force: true,
        alter: true,
      })
      .then(() => {
        console.log("Database connected successfully");
      });
  } catch (error) {
    console.log(error);
  }
});
