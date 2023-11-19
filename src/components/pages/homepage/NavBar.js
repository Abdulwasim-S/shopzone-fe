import { Button } from "@chakra-ui/react";
import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../../../helpers/Redux/Reducer/products.reducer";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isLoggedIn, loggedUserName, cart } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const logOut = () => {
    dispatch(logoutuser());
    navTo("/");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Shop Zone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-center">
            <Button
              variant={"ghost"}
              onClick={() => {
                navTo("/");
              }}
            >
              Home
            </Button>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item className="text-warning" href="#">
                User : {loggedUserName}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <Button
                variant={"ghost"}
                onClick={() => {
                  navTo("/cart");
                }}
              >
                Cart : {cart.length}
              </Button>
              <NavDropdown.Divider />
              <Button
                variant={"ghost"}
                onClick={() => {
                  // navTo("/myorders");
                }}
              >
                My orders
              </Button>
            </NavDropdown>
            {!isLoggedIn ? (
              <Button variant={"ghost"} onClick={() => navTo("/login")}>
                Login
              </Button>
            ) : (
              <Button variant={"outline"} onClick={logOut}>
                LogOut
              </Button>
            )}
            <Button variant={"ghost"} onClick={() => navTo("/admin-login")}>
              Admin
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
