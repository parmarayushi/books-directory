import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "./core/components/header/Header";

function App() {
  return (
    <Flex
      bg={"#eef0ef"}
      direction={"column"}
      style={{ height: "100%", overflow: "hidden" }}
    >
      <Header />
      <Flex
        direction={"column"}
        align={"center"}
        p={20}
        h={"100%"}
        style={{ overflow: "auto" }}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default App;
