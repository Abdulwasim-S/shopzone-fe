import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { updateProduct } from "../../../helpers/Redux/Reducer/products.reducer";

const EditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [message, setMessage] = useState(false);
  const navTo = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const data = JSON.parse(localStorage["shopzone-edit-item"]);

  const fieldValidationSchema = yup.object({
    product_name: yup.string().required(),
    description: yup.string().required(),
    image_url: yup.string().required(),
    price: yup.number().required(),
    status: yup.boolean().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      _id: id,
      product_name: data.product_name,
      description: data.description,
      image_url: data.image_url,
      price: data.price,
      status: state,
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (productInfo) => {
      try {
        setLoading(!loading);
        setMessage(false);
        await axios
          .put(
            `https://shopzone-backend.vercel.app/products/${id}`,
            productInfo,
            {
              headers: {
                "x-auth-token": localStorage["shopzone-admin-token"],
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              dispatch(updateProduct(productInfo));

              navTo("/admin");
            }
          });
      } catch (error) {
        setMessage(true);
        console.log("Error....", error);
      }
    },
  });

  const changeStatus = (val) => {
    val ? (values.status = true) : (values.status = false);
    setState(val ? true : false);
  };
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
                Edit product
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
                <Input
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
              <FormControl id="status" textAlign={"start"} isRequired>
                <FormLabel>Availablity Status</FormLabel>
                {state ? (
                  <Button
                    w={"100%"}
                    variant={"outline"}
                    id="status"
                    onClick={() => changeStatus(false)}
                    colorScheme="green"
                  >
                    Available
                  </Button>
                ) : (
                  <Button
                    w={"100%"}
                    variant={"outline"}
                    id="status"
                    onClick={() => changeStatus(true)}
                    colorScheme="red"
                  >
                    Out of Stock
                  </Button>
                )}
              </FormControl>
              {message ? (
                <Box color={"red.300"}>
                  Unable to update, please logout and login then try again
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
                  Update
                </Button>
              </Stack>
            </Stack>
          </Box>
          <NavLink to="/admin">discard change</NavLink>
        </Stack>
      </Flex>
    </Box>
  );
};

export default EditProduct;
