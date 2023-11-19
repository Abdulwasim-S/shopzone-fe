import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { adminOrders } = useSelector((state) => state.productReducer);
  const navTo = useNavigate();
  const updateStatus = (data) => {
    localStorage["shopzone-update-order"] = JSON.stringify(data);
    navTo("/admin/update-status");
  };
  const searchFilter = (filterKey) => {
    var boxes = document.getElementsByClassName("product-card");
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if (box.id.includes(filterKey)) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    }
  };
  return (
    <Box minH={"100vh"} p={6} boxShadow={"md"} textAlign={"center"}>
      <Heading>Orders</Heading>
      <Flex>
        <Input
          mb={5}
          bg={"white"}
          variant={"ghost"}
          placeholder="Type order id to search..."
          type="text"
          onChange={(e) => searchFilter(e.target.value)}
        />
      </Flex>
      <div className="row justify-content-around">
        {adminOrders.length > 0
          ? adminOrders.map((ele, idx) => (
              <Box
                className="product-card"
                maxW={"18rem"}
                mb={5}
                key={idx}
                id={ele._id}
              >
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
                      Price : <i>₹ {ele.price}</i>
                    </Card.Text>
                    <Card.Text>
                      Quantity : <i>{ele.quantity}</i>
                    </Card.Text>
                    <Card.Text>
                      Mobile : <i> {ele.mobile}</i>
                    </Card.Text>
                    <Card.Text>
                      Delivery Address : <i> {ele.address}</i>
                    </Card.Text>
                    <Card.Text>
                      Order status : <i> {ele.order_status}</i>
                    </Card.Text>
                  </Card.Body>
                  <Button
                    m={5}
                    bg={"orange.300"}
                    onClick={() => updateStatus(ele)}
                  >
                    Update Status
                  </Button>
                </Card>
              </Box>
            ))
          : ""}
        {!adminOrders.length > 0 && (
          <Heading color={"gray.500"}>No items</Heading>
        )}
      </div>
    </Box>
  );
};

export default Orders;
