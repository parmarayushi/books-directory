import {
  Flex,
  Image,
  Input,
  MultiSelect,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardUi from "../../../../shared/components/CardUi";
import PaginationUi from "../../../../shared/components/PaginationUi";
import { debounce } from "../../../../shared/utility/functions/function";
import { IBooks } from "../../utility/models/books.model";
import {
  useGetBooksQuery,
  useGetStatusAuthorCategoriesDataQuery,
} from "../../utility/services/books.service";
import NoRecordFound from "./../../../../../public/NoRecordFound.png";
import SkeletonView from "./SkeletonView";

export default function BookDirectory() {
  const [booksData, setBooksData] = useState<IBooks[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize: number = 12;

  const [bookStatus, setBookStatus] = useState<string[]>([]);
  const [bookAuthors, setBookAuthors] = useState<string[]>([]);
  const [bookCategories, setBookCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // api call to get books data
  const { data: bookDirectoryData, isFetching } = useGetBooksQuery({
    pageNumber: currentPage,
    pageSize,
    search: searchText,
    status: selectedStatus,
    authors: selectedAuthors,
    categories: selectedCategories,
  });

  //api call to get dropdown actors, categories and status data
  const { data: dropdownData } = useGetStatusAuthorCategoriesDataQuery();

  // set books data
  useEffect(() => {
    if (bookDirectoryData) {
      setBooksData(bookDirectoryData.data.books);
      setTotalCount(Math.ceil(bookDirectoryData.totalCount / pageSize));
    }
  }, [bookDirectoryData]);

  //set dropdown actors, categories and status data
  useEffect(() => {
    if (dropdownData) {
      setBookAuthors(dropdownData.authors);
      setBookCategories(dropdownData.categories);
      setBookStatus(dropdownData.status);
    }
  }, [dropdownData]);

  // handle search text on type
  function handleSearchText(value: string) {
    setSearchText(value);
  }

  //handle status change if get null
  function handleStatusChange(value: string | null) {
    if (!value) {
      setSelectedStatus(""); // Set to empty string to fetch all data
    } else {
      setSelectedStatus(value);
    }
  }

  return (
    <>
      <Flex gap={10} justify={"flex-end"} align={"center"} w={"100%"} mb={10}>
        {/* Status Dropdowm */}
        <Select
          placeholder="Select Status"
          data={bookStatus}
          onChange={(value) => handleStatusChange(value)}
          clearable
        />

        {/* Authors Dropdowm */}
        <MultiSelect
          searchable
          clearable
          w={250}
          placeholder="Select Authors"
          data={bookAuthors}
          onChange={(value) => setSelectedAuthors(value)}
        />

        {/* Categories Dropdowm */}
        <MultiSelect
          searchable
          clearable
          w={250}
          placeholder="Select Categories"
          data={bookCategories}
          onChange={(value) => setSelectedCategories(value)}
        />

        {/* Search Input box */}
        <Input
          placeholder="Search Books here..."
          leftSection={<IconSearch size={16} />}
          onChange={(e) => debounce(handleSearchText, e.target.value)}
        />
      </Flex>

      {isFetching ? (
        <SkeletonView />
      ) : booksData && booksData.length > 0 ? (
        <SimpleGrid
          mt={10}
          mb={20}
          cols={{ base: 1, sm: 3, md: 5, xl: 6 }}
          spacing={{ base: 6, sm: "md" }}
          verticalSpacing={{ base: 5, sm: "md" }}
        >
          {booksData &&
            booksData.map((book: IBooks) => (
              <Link
                key={book._id}
                to={`book-details/${book._id}`}
                style={{ textDecoration: "none" }}
              >
                <CardUi data={book} />
              </Link>
            ))}
        </SimpleGrid>
      ) : (
        <Flex
          h={"100%"}
          direction={"column"}
          align={"center"}
          justify={"center"}
        >
          <Image w={500} src={NoRecordFound}></Image>
          <Text fz={24} fw={"bold"}>
            No Books Found
          </Text>
        </Flex>
      )}

      {/* Pagination */}
      {totalCount > 1 && (
        <PaginationUi
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
        />
      )}
    </>
  );
}
