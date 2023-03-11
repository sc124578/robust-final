const express = require("express");
const urlsRouter = require("./Urls/Urls.router")
const userRouter = require("./Uses/Uses.router")
const app = express();


app.use(express.json());

app.use("/urls", urlsRouter)
app.use("/uses", userRouter)

app.use((req, res, next) => {
    return next({ status: 404, message: `Not found: ${req.originalUrl}` });
  });

// TODO: Add code to meet the requirements and make the tests pass.
app.use((error, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });
  


module.exports = app;
