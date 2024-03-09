import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import bg_img from "./bg.png";

const HomePage = () => {
  return (
    <div>
      <Box bg={"gray.300"}>
        <NavBar />
        <Flex
          minH={"30vh"}
          // bg={"gray.800"}
          bgImage={bg_img}
          color={"white"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={{ lg: "3xl" }}
          textShadow={"5px 3px 5px black"}
        >
          {" "}
          <i>Habibi welcome to Lakshmi Builders Supply</i>
        </Flex>
        <Outlet />
      </Box>
    </div>
  );
};

export default HomePage;
