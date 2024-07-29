import express from "express";
import {
  createBook,
  deleteBook,
  filterBooks,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/booksController";

const router = express.Router();

router.route("/filter").get(filterBooks);

router.route("/").get(getAllBooks).post(createBook);

router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default router;
