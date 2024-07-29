import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app";

const port = process.env.PORT || 4000;

dotenv.config({ path: "./config.env" });

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  throw new Error(
    "Database connection string or password is not defined in environment variables."
  );
}

// replace password in config file
const DB: string = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// connect DB using mongoose middleware
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    tls: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection Successfully!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1); // Exit the process with failure
  });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

app.on("close", () => {});
