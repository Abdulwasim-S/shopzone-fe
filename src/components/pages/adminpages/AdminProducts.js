import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../helpers/Redux/Reducer/products.reducer";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AdminProducts = () => {
  const { products } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navTo = useNavigate();

  const delete_product = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5000/products/${id}`, {
          headers: {
            "x-auth-token": localStorage["shopzone-admin-token"],
          },
        })
        .then(() => {
          dispatch(deleteProduct(id));
        })
        .catch((error) => {
          navTo("/admin-login");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const editItem = (id) => {
    const item = products.filter((ele) => ele._id === id);
    localStorage["shopzone-edit-item"] = JSON.stringify(item[0]);
    navTo(id);
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
      <Flex>
        <Input
          mb={5}
          bg={"white"}
          variant={"ghost"}
          placeholder="Type here to search..."
          type="text"
          onChange={(e) => searchFilter(e.target.value)}
        />
      </Flex>
      <div className="row justify-content-around">
        {products.length > 0 ? (
          products.map((ele, idx) => (
            <Box
              className="product-card"
              id={
                ele.product_name.toLowerCase() +
                ele.description.toLowerCase() +
                " " +
                ele._id.toLowerCase()
              }
              maxW={"18rem"}
              mb={5}
              key={idx}
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
                  <Flex justifyContent={"space-evenly"}>
                    <Button
                      variant="ghost"
                      boxShadow={"md"}
                      bg={"orange.200"}
                      onClick={() => editItem(ele._id)}
                    >
                      Edit <EditIcon ml={2} />
                    </Button>
                    <Button
                      variant="ghost"
                      boxShadow={"md"}
                      bg={"red.200"}
                      onClick={() => delete_product(ele._id)}
                    >
                      Delete <DeleteIcon ml={2} />
                    </Button>
                  </Flex>
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

export default AdminProducts;
