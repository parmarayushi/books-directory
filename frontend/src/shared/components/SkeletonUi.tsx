import { Flex, Skeleton } from "@mantine/core";

export default function SkeletonUi() {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      bg={"white"}
      p={12}
      style={{ border: "1px solid #e7ebe9", borderRadius: "8px" }}
    >
      <Skeleton height={200} mt={6} width={"40%"} radius={"md"} />
      <Skeleton height={20} mt={10} width={"60%"} radius={"md"} />
      <Skeleton height={20} mt={6} width={"40%"} radius={"md"} />
    </Flex>
  );
}
