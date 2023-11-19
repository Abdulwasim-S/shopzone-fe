import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const BuyProductPage = () => {
  const navTo = useNavigate();
  const [state, setState] = useState(1);
  const data = JSON.parse(localStorage["shopzone-buy-item"]);
  const price = data.price;
  const fieldValidationSchema = yup.object({
    product_name: yup.string().required(),
    description: yup.string().required(),
    image_url: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
    mobile: yup.number().required(),
    address: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      _id: data._id,
      product_name: data.product_name,
      description: data.description,
      image_url: data.image_url,
      price: data.price,
      quantity: 1,
      mobile: "",
      address: "",
      email: localStorage["shopzone-user-email"],
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (productInfo) => {
      try {
        await axios
          .post("https://shopzone-backend.vercel.app/cart/buy", productInfo, {
            headers: {
              "x-auth-token-user": localStorage["shopzone-user-token"],
              email: localStorage["shopzone-user-email"],
            },
          })
          .then((res) => {
            navTo("/");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("Error....", error);
      }
    },
  });
  const placeOrder = () => {
    values.price = price * state;
    handleSubmit();
  };
  const changeQuantity = (val) => {
    if (val === "dec" && state > 1) {
      setState(state - 1);
      values.quantity = state - 1;
    } else if (val === "inc") {
      setState(state + 1);
      values.quantity = state + 1;
    }
  };
  return (
    <Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
        <Stack spacing={8} mx={"auto"} py={6} px={6} rounded={"lg"}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Buy product</Heading>
            </Stack>
            <Stack spacing={4}>
              <LazyLoadImage width={"25%"} src={values.image_url} />
              <FormControl id="product_name" isRequired>
                <FormLabel>product name</FormLabel>
                <Input
                  disabled
                  type="product_name"
                  id="product_name"
                  onChange={handleChange}
                  bg={errors.product_name ? "red.100" : ""}
                  placeholder={errors.product_name ? "required" : ""}
                  value={values.product_name}
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>price</FormLabel>
                <Input
                  disabled
                  type="price"
                  id="price"
                  onChange={handleChange}
                  bg={errors.price ? "red.100" : ""}
                  placeholder={errors.price ? "required" : ""}
                  value={price * state}
                />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Quantity</FormLabel>
                <Flex>
                  <Button onClick={() => changeQuantity("dec")}>-</Button>
                  {" " + state + " "}
                  <Button onClick={() => changeQuantity("inc")}>+</Button>
                </Flex>
              </FormControl>
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile</FormLabel>
                <Input
                  type="mobile"
                  id="mobile"
                  onChange={handleChange}
                  bg={errors.mobile ? "red.100" : ""}
                  placeholder={errors.mobile ? "required" : ""}
                  value={values.mobile}
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Textarea
                  type="address"
                  id="address"
                  onChange={handleChange}
                  bg={errors.address ? "red.100" : ""}
                  placeholder={errors.address ? "required" : ""}
                  value={values.address}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  my={5}
                  onClick={placeOrder}
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Buy product
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Button
            onClick={() => {
              navTo("/");
            }}
          >
            return to homepage
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default BuyProductPage;
