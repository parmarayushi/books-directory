import { SimpleGrid } from "@mantine/core";
import SkeletonUi from "../../../../shared/components/SkeletonUi";

export default function SkeletonView() {
  return (
    <SimpleGrid
      w={"100%"}
      cols={{ base: 1, sm: 3, md: 5, xl: 6 }}
      spacing={{ base: 6, sm: "md" }}
      verticalSpacing={{ base: 5, sm: "md" }}
    >
      {[...Array(12)].map((_, index) => (
        <SkeletonUi key={index} />
      ))}
    </SimpleGrid>
  );
}
