import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addProduct } from "../../../helpers/Redux/Reducer/products.reducer";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const navTo = useNavigate();
  const dispatch = useDispatch();

  const fieldValidationSchema = yup.object({
    product_name: yup.string().required(),
    description: yup.string().required(),
    image_url: yup.string().required(),
    price: yup.number().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      image_url: "",
      price: "",
      status: true,
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (productInfo) => {
      try {
        setLoading(true);
        await axios
          .post(
            "https://shopzone-backend.vercel.app/products/addProduct",
            productInfo,
            {
              headers: {
                "x-auth-token": localStorage["shopzone-admin-token"],
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              dispatch(addProduct(res.data.new_product));

              navTo("/admin");
            }
          });
      } catch (error) {
        setState(true);
        console.log("Error....", error);
      }
    },
  });
  return (
    <Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
        <Stack
          textAlign={"center"}
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={6}
          px={6}
          rounded={"lg"}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Add new product
              </Heading>
            </Stack>
            <Stack spacing={4}>
              <FormControl id="product_name" isRequired>
                <FormLabel>product name</FormLabel>
                <Input
                  type="product_name"
                  id="product_name"
                  onChange={handleChange}
                  bg={errors.product_name ? "red.100" : ""}
                  placeholder={errors.product_name ? "required" : ""}
                  value={values.product_name}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>description</FormLabel>
                <Textarea
                  type="description"
                  id="description"
                  onChange={handleChange}
                  bg={errors.description ? "red.100" : ""}
                  placeholder={errors.description ? "required" : ""}
                  value={values.description}
                />
              </FormControl>
              <FormControl id="image_url" isRequired>
                <FormLabel>image_url</FormLabel>
                <Input
                  type="image_url"
                  id="image_url"
                  onChange={handleChange}
                  bg={errors.image_url ? "red.100" : ""}
                  placeholder={errors.image_url ? "required" : ""}
                  value={values.image_url}
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>price</FormLabel>
                <Input
                  type="price"
                  id="price"
                  onChange={handleChange}
                  bg={errors.price ? "red.100" : ""}
                  placeholder={errors.price ? "required" : ""}
                  value={values.price}
                />
              </FormControl>
              {state ? (
                <Box color={"red.300"}>
                  Unable to add, please logout and login then try again
                </Box>
              ) : (
                ""
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  onClick={handleSubmit}
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Click to Add
                </Button>
              </Stack>
            </Stack>
          </Box>
          <NavLink to="/admin">discard product</NavLink>
        </Stack>
      </Flex>
    </Box>
  );
};

export default AddProduct;
