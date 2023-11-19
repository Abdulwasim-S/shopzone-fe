import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

const MyOrdersPage = () => {
  const { myOrders } = useSelector((state) => state.productReducer);

  return (
    <Box minH={"100vh"} p={6} boxShadow={"md"} textAlign={"center"}>
      <Heading>My Orders</Heading>
      <div className="row justify-content-around">
        {myOrders.length > 0
          ? myOrders.map((ele, idx) => (
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
                  </Card.Body>
                </Card>
              </Box>
            ))
          : ""}
        {!myOrders.length > 0 && <Heading color={"gray.500"}>No items</Heading>}
      </div>
    </Box>
  );
};

export default MyOrdersPage;
