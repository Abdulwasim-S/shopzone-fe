import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../helpers/Redux/Reducer/products.reducer";
import axios from "axios";
import { Search2Icon } from "@chakra-ui/icons";

const HomeProductsPage = () => {
  const { products, isLoggedIn } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const addCart = async (data) => {
    if (!isLoggedIn) {
      navTo("login");
      return;
    }

    const product = data;
    await axios
      .post("https://shopzone-backend.vercel.app/cart/add-item", product, {
        headers: {
          "x-auth-token-user": localStorage["shopzone-user-token"],
          email: localStorage["shopzone-user-email"],
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(addToCart(product));
          navTo("/cart");
        }
      })
      .catch((error) => console.log(error));
  };
  const buy = (data) => {
    if (!isLoggedIn) {
      navTo("/login");
    } else {
      localStorage["shopzone-buy-item"] = JSON.stringify(data);
      navTo("buyproduct");
    }
  };

  return (
    <Box minH={"100vh"} p={6} boxShadow={"md"} textAlign={"center"}>
      <InputGroup maxW={"80%"} my={5} bg={"white"} borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input type="text" placeholder="Search..." border="1px solid #949494" />
        <InputRightAddon p={0} border="none">
          <Button
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>

      <div className="row justify-content-around">
        {products.length > 0 ? (
          products.map((ele, idx) => (
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
                      boxShadow={"md"}
                      bg={"orange.200"}
                      mb={5}
                      onClick={() => buy(ele)}
                    >
                      Buy product
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      colorScheme="red"
                      w={"100%"}
                      boxShadow={"md"}
                      mb={5}
                    >
                      Out of stock
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    boxShadow={"md"}
                    bg={"red.200"}
                    w={"100%"}
                    mb={5}
                    onClick={() => addCart(ele)}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Box>
          ))
        ) : (
          <Heading textAlign={"center"} color={"gray.500"}>
            Loading...
          </Heading>
        )}
      </div>
    </Box>
  );
};

export default HomeProductsPage;
