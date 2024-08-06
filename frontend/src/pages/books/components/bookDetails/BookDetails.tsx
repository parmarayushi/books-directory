import {
  Badge,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBooks } from "../../utility/models/books.model";
import { useGetBooksByIdQuery } from "../../utility/services/books.service";
import noImageFound from "./../../../../../public/no-img-found.png";

export default function BookDetails() {
  const { id } = useParams();

  const { data: res } = useGetBooksByIdQuery(id);

  const [bookDetails, setBookDetails] = useState<IBooks>();

  useEffect(() => {
    if (res) {
      setBookDetails(res);
    }
  }, [res, bookDetails]);

  return (
    <Container bg={"white"} p={20} style={{ borderRadius: "10px" }}>
      {bookDetails && (
        <Grid>
          <GridCol span={4} style={{ borderRight: "1px solid #e7ebe9" }}>
            <Image
              pe={20}
              w={300}
              src={
                bookDetails.thumbnailUrl
                  ? bookDetails.thumbnailUrl
                  : noImageFound
              }
              alt={bookDetails.thumbnailUrl}
            />
          </GridCol>

          <GridCol span={8} ps={20}>
            <Title order={3} c={"#000000"} pb={5}>
              {bookDetails.title || "{No title available}"}
            </Title>

            <Group c="dimmed" gap={4}>
              <Text fz={"xs"}>
                By {bookDetails.authors[0] || "{No author found}"}
              </Text>
              <Divider orientation="vertical" size={"sm"}></Divider>
              <Text fz={"xs"}>
                {bookDetails.publishedDate
                  ? format(parseISO(bookDetails.publishedDate), "dd MMM yyyy")
                  : "{No published date found}"}
              </Text>
            </Group>

            <Text fz={"sm"} my={10}>
              Total Pages: {bookDetails.pageCount || "{No total pages found}"}
            </Text>

            <Group>
              {bookDetails.categories.map((categories) => {
                return (
                  <Badge
                    key={categories}
                    size="md"
                    variant="gradient"
                    gradient={{ from: "blue", to: "grape", deg: 116 }}
                  >
                    {categories}
                  </Badge>
                );
              })}
            </Group>

            <Text style={{ textWrap: "wrap" }} fz={"sm"} my={10} c="dimmed">
              {bookDetails.shortDescription
                ? bookDetails.shortDescription
                : "{No description available}"}
            </Text>

            <Group gap={4}>
              <Text fz={"sm"}>- By</Text>
              <Text fz={"sm"} fw={"bold"}>
                {bookDetails.authors.join(", ") || "{No authors found}"}
              </Text>
            </Group>
          </GridCol>
        </Grid>
      )}
    </Container>
  );
}
