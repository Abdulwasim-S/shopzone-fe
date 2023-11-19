import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../../helpers/Redux/Reducer/products.reducer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, isLoggedIn } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const handelRemove = async (value) => {
    try {
      await axios
        .delete(`https://shopzone-backend.vercel.app/cart/${value}`, {
          headers: {
            "x-auth-token-user": localStorage["shopzone-user-token"],
          },
        })
        .then((res) => {
          dispatch(deleteFromCart(value));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const buy = (data) => {
    if (!isLoggedIn) {
      navTo("/login");
    } else {
      localStorage["shopzone-buy-item"] = JSON.stringify(data);
      navTo("/buyproduct");
    }
  };
  return (
    <Box minH={"100vh"} p={6} boxShadow={"md"} textAlign={"center"}>
      <Heading>My cart items</Heading>
      <div className="row justify-content-around">
        {cart.length > 0
          ? cart.map((ele, idx) => (
              <Box maxW={"18rem"} mb={5} key={idx}>
                <Card className="h-100">
                  <Box
                    maxH={"30vh"}
                    border={"lg"}
                    overflow={"hidden"}
                    boxShadow={"md"}
                    m={3}
                  >
                    <LazyLoadImage
                      effect="blur"
                      className="card-image"
                      variant="top"
                      src={ele.image_url}
                    />
                  </Box>
                  <Card.Body>
                    <Card.Title>{ele.product_name}</Card.Title>
                    <Card.Text>
                      Description : <i>{ele.description}</i>
                    </Card.Text>
                    <Card.Text>
                      Price : <i>₹ {ele.price}</i>
                    </Card.Text>
                    <Box>
                      Status :{" "}
                      <Box color={ele.status ? "green.300" : "red.300"}>
                        <i> {ele.status ? "Available" : "Out of stock"}</i>
                      </Box>
                    </Box>
                    <Card.Text>
                      <small>
                        Offer :{" "}
                        <s>
                          <i>₹ {+ele.price + +ele.price / 10}</i>
                        </s>
                      </small>
                    </Card.Text>
                    {ele.status ? (
                      <Button
                        variant="ghost"
                        w={"100%"}
                        bg={"orange.200"}
                        mb={5}
                        onClick={() => buy(ele)}
                      >
                        Buy product
                      </Button>
                    ) : (
                      <Button variant="outline" w={"100%"} mb={5}>
                        Out of stock
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      boxShadow={"md"}
                      bg={"red.200"}
                      w={"100%"}
                      mb={5}
                      onClick={() => handelRemove(ele._id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Box>
            ))
          : ""}
        {!cart.length > 0 && <Heading color={"gray.500"}>No items</Heading>}
      </div>
    </Box>
  );
};

export default CartPage;
