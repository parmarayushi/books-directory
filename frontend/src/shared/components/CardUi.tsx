import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { IBooks } from "../../pages/books/utility/models/books.model";
import { useUpdateBooksDataMutation } from "../../pages/books/utility/services/books.service";
import noImageFound from "./../../../public/no-img-found.png";

export default function CardUi({ data }: { data: IBooks }) {
  //api call to update books data
  const [updateData] = useUpdateBooksDataMutation();

  // handle click on favorite click icon and updates data
  function handleFavoriteList(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    book: IBooks
  ) {
    event.preventDefault();
    const tempValue = { ...book, isFavorite: !book.isFavorite };
    updateData({ ...tempValue, _id: tempValue._id });
  }

  return (
    <Flex
      h={"100%"}
      p={"md"}
      direction={"column"}
      align={"center"}
      bg={"white"}
      style={{ border: "1px solid #e7ebe9", borderRadius: "8px" }}
    >
      {/* Status Badge */}
      <Flex w={"100%"} justify={"space-between"}>
        <Badge
          variant="light"
          size="sm"
          radius="sm"
          style={{ alignSelf: "start" }}
          color={data.status === "PUBLISH" ? "green" : "blue"}
        >
          {data.status}
        </Badge>

        {/* Favorite Icon */}
        <UnstyledButton
          className="add-to-fav-btn"
          onClick={(e) => handleFavoriteList(e, data)}
        >
          {data.isFavorite === true ? (
            <IconHeartFilled size={20} color="RED" stroke={1} />
          ) : (
            <IconHeart size={20} color="grey" stroke={1} />
          )}
        </UnstyledButton>
      </Flex>

      {/* Book Thumb Image */}
      <Box mt={16} w={150} h={200}>
        <Image
          w={"100%"}
          src={data.thumbnailUrl ? data.thumbnailUrl : noImageFound}
          alt={data.thumbnailUrl}
        />
      </Box>

      {/* Book Title */}
      <Title order={6} ta="center" c={"#000000"}>
        {data.title || "-"}
      </Title>

      {/* Book Published Date */}
      <Group gap={5} mt={5}>
        <Text fz={12} component="span" c="dimmed">
          Published Date :
        </Text>
        <Text fz={12} c={"#000000"}>
          {data.publishedDate
            ? format(parseISO(data.publishedDate), "dd MMM yyyy")
            : "-"}
        </Text>
      </Group>
    </Flex>
  );
}
