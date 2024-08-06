import { Pagination } from "@mantine/core";

interface IProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

// UI component for pagination
export default function PaginationUi({
  setCurrentPage,
  currentPage,
  totalCount,
}: IProps) {
  // handle next page click of pagination
  function handleNextPageHandle() {
    setCurrentPage(currentPage + 1);
  }

  // handle previous page click of pagination
  function handlePreviousPageHandle() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <Pagination
      withEdges
      size={"lg"}
      mt={"auto"}
      total={totalCount}
      onNextPage={handleNextPageHandle}
      onPreviousPage={handlePreviousPageHandle}
      onChange={setCurrentPage}
    />
  );
}
