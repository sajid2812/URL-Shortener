const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path");

const app = express();
const PORT = 3000;

const urlRoute = require("./routes/url.route");
const userRoute = require("./routes/user.route");
const staticRoute = require("./routes/static.route");

// Mongo connection

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// test route
app.get("/test", async (req, res) => {
  const allUrls = [{ shortId: "1" }, { shortId: "2" }];
  return res.render("home", {
    urls: allUrls,
  });
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", staticRoute);
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
