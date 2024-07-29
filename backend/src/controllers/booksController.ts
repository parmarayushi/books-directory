import Book from "../models/booksModel";
import APIFeatures from "../utility/apiFeatures";

//GET all Books
export const getAllBooks = async (req: any, res: any) => {
  try {
    const features = new APIFeatures(Book.find(), req.query).filter().sort();

    const totalSearchResults = await features.countDocuments();
    const paginatedResults = await features.paginate();

    const books = await paginatedResults.query;

    if (req.query.search && req.query.search.trim() != " ") {
      const searchBooks = new APIFeatures(Book.find(), req.query)
        .search()
        .filter();

      // Get the count of records found in the search
      const totalSearchResults = await searchBooks.countDocuments();

      // Apply pagination to the search results
      const paginatedSearchBooks = searchBooks.paginate().sort();

      const searchResult = await paginatedSearchBooks.query;

      res.status(200).json({
        status: "success",
        totalCount: totalSearchResults,
        data: { books: searchResult },
      });
    } else {
      res.status(200).json({
        status: "OK",
        totalCount: totalSearchResults,
        data: { books },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Page not found",
      message: err,
    });
  }
};

// POST Book
export const createBook = async (req: any, res: any) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: "OK",
      data: { books: newBook },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

// GET Book by ID
export const getBookById = async (req: any, res: any) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: "OK",
      data: { book: book },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// PATCH Book
export const updateBook = async (req: any, res: any) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(book);

    res.status(200).json({
      status: "OK",
      data: { book: book },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// DELETE Book
export const deleteBook = async (req: any, res: any) => {
  try {
    const tour = await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "OK",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// Filtered data for dropdown menu
export const filterBooks = async (req: any, res: any) => {
  try {
    const book = await Book.aggregate([
      { $unwind: "$authors" },
      { $unwind: "$categories" },
      {
        $match: {
          author: { $ne: "" },
          categories: { $ne: "" },
        },
      },
      {
        $group: {
          _id: null,
          status: { $addToSet: "$status" }, //collect unique status into array
          authors: { $addToSet: "$authors" },
          categories: { $addToSet: "$categories" },
        },
      },
      {
        $project: {
          _id: 0, //remove this field
          status: 1, //show this field
          authors: 1,
          categories: 1,
        },
      },
      {
        $addFields: {
          authors: { $sortArray: { input: "$authors", sortBy: 1 } }, // sort authors array
          categories: { $sortArray: { input: "$categories", sortBy: 1 } }, // sort categories array
        },
      },
    ]);

    res.status(200).json({
      status: "OK",
      result: book.length,
      data: book,
    });
  } catch (err: any) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};
