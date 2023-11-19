import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navTo = useNavigate();
  const logout = () => {
    localStorage["shopzone-admin-token"] = "";
    localStorage["shopzone-admin-email"] = "";
    localStorage["shopzone-admin-password"] = "";
    navTo("/admin-login");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Heading href="" mx={5}>
          Admin
        </Heading>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-center">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <Button
                width={"100%"}
                variant={"ghost"}
                onClick={() => navTo("/admin")}
              >
                Products List
              </Button>
              <NavDropdown.Divider />
              <Button
                width={"100%"}
                variant={"ghost"}
                onClick={() => navTo("/admin/add-product")}
              >
                Add products
              </Button>
            </NavDropdown>

            <Button
              variant={"ghost"}
              onClick={() => navTo("/admin/order-status")}
            >
              Order Status
            </Button>
            <Button
              variant={"ghost"}
              color={"gray.400"}
              onClick={() => {
                // navTo("/admin/cancel-requests");
              }}
              disabled
            >
              Cancel Requests
            </Button>
          </Nav>
          <Box textAlign={"center"}>
            <Button my={3} variant={"ghost"} onClick={logout}>
              LogOut
            </Button>
          </Box>
        </Navbar.Collapse>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
