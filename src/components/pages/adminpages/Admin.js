import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { Box } from "@chakra-ui/react";

const Admin = () => {
  return (
    <Box minH={"100vh"} bg={"gray.200"}>
      <AdminNavbar />
      <Outlet />
    </Box>
  );
};

export default Admin;
