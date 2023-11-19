import { Box, Button, Flex, Heading, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { updateAdminOrder } from "../../../helpers/Redux/Reducer/products.reducer";
import { useDispatch } from "react-redux";

const UpdateOrderStatus = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const navTo = useNavigate();
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage["shopzone-update-order"]);
  const id = data._id;

  const fieldValidationSchema = yup.object({
    order_status: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      order_status: data.order_status,
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (updateInfo) => {
      try {
        setLoading(!loading);
        setMessage(false);
        await axios
          .put(`https://shopzone-backend.vercel.app/orders/${id}`, updateInfo, {
            headers: {
              "x-auth-token": localStorage["shopzone-admin-token"],
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(updateAdminOrder(res.data.item));
              navTo("/admin/order-status");
            }
          });
      } catch (error) {
        setMessage(true);
        console.log("Error....", error);
      }
    },
  });

  return (
    <Box>
      <Flex align={"center"} justify={"center"} bg={"gray.200"}>
        <Stack
          bg={"white"}
          textAlign={"start"}
          spacing={8}
          mx={"auto"}
          my={5}
          maxW={"lg"}
          py={6}
          px={6}
          rounded={"lg"}
          boxShadow={"md"}
        >
          <Heading m={5}>Update order status</Heading>
          <Box>
            Order_id : <i>{id}</i>
          </Box>
          <Box>
            Mobile : <i>{data.mobile}</i>
          </Box>
          <Box textAlign={"start"}>
            <FormLabel>Order status :</FormLabel>
            <Textarea
              type="order_status"
              id="order_status"
              onChange={handleChange}
              bg={errors.order_status ? "red.100" : ""}
              placeholder={errors.order_status ? "required" : ""}
              value={values.order_status}
            />
          </Box>
          {message && (
            <Box textAlign={"center"} color={"red.300"}>
              *unable to update
            </Box>
          )}
          <Button
            color={"gray.700"}
            mb={5}
            isLoading={loading}
            bg={"green.300"}
            onClick={handleSubmit}
          >
            Update status
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default UpdateOrderStatus;
