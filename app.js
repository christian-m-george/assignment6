import express from "express";
import bodyParser from "body-parser";
import placesRoutes from "./routes/places-routes.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/user", placesRoutes);
app.use("/", (req, res) => {
  res.status(200).json("nothing to see here");
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

app.listen(3001);
