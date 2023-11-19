import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div>
      <Box bg={"gray.300"}>
        <NavBar />
        <Flex
          minH={"20vh"}
          bg={"gray.800"}
          color={"white"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {" "}
          <i>Habibi come to welcome to ShopZone</i>
        </Flex>
        <Outlet />
      </Box>
    </div>
  );
};

export default HomePage;
