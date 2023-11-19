import { Button, Heading } from "@chakra-ui/react";
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
          <Nav className="me-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin">Products List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/add-product">
                Add products
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/admin/order-status">Order Status</Nav.Link>
            <Nav.Link href="/admin/cancel-requests" disabled>
              Cancel Requests
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button variant={"outline"} borderWidth={3} onClick={logout}>
          LogOut
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
