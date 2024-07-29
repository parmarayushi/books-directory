import { Box, Flex } from "@mantine/core";
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
      <Box p={20} style={{ height: "100%", overflow: "auto" }}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;
