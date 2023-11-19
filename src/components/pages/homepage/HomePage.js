import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div>
      <Box bg={"gray.300"}>
        <NavBar />
        <Outlet />
      </Box>
    </div>
  );
};

export default HomePage;
