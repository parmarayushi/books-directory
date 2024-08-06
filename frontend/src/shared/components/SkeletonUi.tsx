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
      <Flex mb={15} w={"100%"} align={"center"} justify={"space-between"}>
        <Skeleton height={18} width={"30%"} radius={"xs"} />
        <Skeleton height={18} width={"8%"} radius={"xs"} />
      </Flex>
      <Skeleton height={160} mt={8} width={"55%"} radius={"md"} />
      <Skeleton height={15} mt={18} width={"80%"} radius={"sm"} />
      <Skeleton height={15} mt={8} width={"40%"} radius={"sm"} />
    </Flex>
  );
}
