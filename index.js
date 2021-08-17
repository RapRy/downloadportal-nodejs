const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const usersRoutes = require("./routes/usersRoutes.js");
const contentsRoutes = require("./routes/contentsRoutes.js");
const categoriesRoutes = require("./routes/categoriesRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const DBURI = process.env.DBURI;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/categories", categoriesRoutes);
app.use("/contents", contentsRoutes);
app.use("/users", usersRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
  const fetches = [
    {
      heading: "Fetch Categories",
      link: "https://downloadstoreportal.herokuapp.com/categories",
    },
    {
      heading: "Fetch Contents By Category",
      link: "https://downloadstoreportal.herokuapp.com/contents/Games",
    },
    {
      heading: "Fetch Featured Contents",
      link: "https://downloadstoreportal.herokuapp.com/contents/featured",
    },
    {
      heading: "Fetch Single Content Details",
      link: "https://downloadstoreportal.herokuapp.com/contents/details/60768cf51a2259428bce41bf",
    },
  ];

  const routes = [
    { method: "get", route: "/categories" },
    { method: "get", route: "/contents/name of category" },
    { method: "get", route: "/contents/featured" },
    { method: "get", route: "/contents/details/id of content" },
  ];

  res.render("index", { fetches, routes });
});

mongoose
  .connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) =>
    app.listen(PORT, () => console.log(`Server started at Port ${PORT}`))
  )
  .catch((err) => console.log(err));
