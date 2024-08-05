import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/booksRoutes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow sessions
  })
);

// 1. Middleware to modify incoming data
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Api");
});

//--------------------------- ROUTES ------------------------------
app.use("/api/v1/books", router);

export default app;
