const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url.route");

const app = express();
const PORT = 3000;

// Mongo connection

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
