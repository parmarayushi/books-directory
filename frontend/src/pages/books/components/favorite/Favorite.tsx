import { Flex, Image, Input, SimpleGrid, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardUi from "../../../../shared/components/CardUi";
import PaginationUi from "../../../../shared/components/PaginationUi";
import { debounce } from "../../../../shared/utility/functions/function";
import { IBooks } from "../../utility/models/books.model";
import { useGetBooksQuery } from "../../utility/services/books.service";
import SkeletonView from "../directory/SkeletonView";
import NoRecordFound from "./../../../../../public/NoRecordFound.png";

export default function Favorite() {
  const [booksData, setBooksData] = useState<IBooks[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize: number = 12;

  const [searchText, setSearchText] = useState<string>("");

  // api call to get books data
  const { data: bookDirectoryData, isFetching } = useGetBooksQuery({
    pageNumber: currentPage,
    pageSize,
    search: searchText,
    isFavorite: true,
  });

  // set books data
  useEffect(() => {
    if (bookDirectoryData) {
      setBooksData(bookDirectoryData.data.books);
      setTotalCount(Math.ceil(bookDirectoryData.totalCount / pageSize));
    }
  }, [bookDirectoryData]);

  // handle search text on type
  function handleSearchText(value: string) {
    setSearchText(value);
  }

  return (
    <Flex h={"100%"} direction={"column"} align={"center"}>
      {/* Search Input box */}
      <Flex justify={"flex-end"} align={"center"} w={"100%"} mb={10}>
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
                to={`/book-details/${book._id}`}
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
    </Flex>
  );
}
