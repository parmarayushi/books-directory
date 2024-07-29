import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  isbn: {
    type: String,
    trim: true,
  },
  pageCount: {
    type: Number,
  },
  thumbnailUrl: { type: String },
  publishedDate: { type: String },
  shortDescription: { type: String, trim: true },
  longDescription: { type: String, trim: true },
  status: { type: String, trim: true },
  authors: [String],
  categories: [String],
  isFavorite: { type: Boolean },
});

const Book = mongoose.model("Book", booksSchema);

export default Book;
