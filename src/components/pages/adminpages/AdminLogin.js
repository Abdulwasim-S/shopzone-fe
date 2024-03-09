import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setAdminOrders } from "../../../helpers/Redux/Reducer/products.reducer";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState(false);
  const navTo = useNavigate();
  const dispatch = useDispatch();

  const fieldValidationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (loginInfo) => {
      try {
        setCredential(false);
        setLoading(true);
        await axios
          .post("https://shopzone-backend.vercel.app/admin/login", {
            ...loginInfo,
          })
          .then(async (res) => {
            if (res.status === 200) {
              localStorage["shopzone-admin-token"] = res.data.token;
              localStorage["shopzone-admin-email"] = loginInfo.email;
              localStorage["shopzone-admin-password"] = loginInfo.password;
              await axios
                .get(
                  "https://shopzone-backend.vercel.app/user/orders",
                  {},
                  {
                    headers: {
                      "x-auth-roken": localStorage["shopzone-admin-token"],
                      email: localStorage["shopzone-admin-email"],
                    },
                  }
                )
                .then((res) => {
                  dispatch(setAdminOrders(res.data.items));
                  navTo("/admin");
                })
                .catch((error) => {
                  console.log("error", error);
                });
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
              setCredential(true);
              setLoading(false);
            }
          });
      } catch (error) {
        setLoading(false);
        console.log("Error....", error);
      }
    },
  });
  const fillDemo = () => {
    values.email = "admin@lakshmibuilderssupply.in";
    values.password = "admin@123";
    handleSubmit();
  };
  return (
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
              Admin LogIn
            </Heading>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                onChange={handleChange}
                bg={errors.email ? "red.100" : ""}
                placeholder={errors.email ? "required" : ""}
                value={values.email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  bg={errors.password ? "red.100" : ""}
                  placeholder={errors.password ? "required" : ""}
                  value={values.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box color={"red.300"}>
              {credential ? "*Invalid Credential" : ""}
            </Box>
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
                LogIn
              </Button>
              <Button
                isLoading={loading}
                onClick={fillDemo}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Demo Credential
              </Button>
            </Stack>
          </Stack>
        </Box>
        <NavLink to="/">click here to home page</NavLink>
      </Stack>
    </Flex>
  );
};
export default AdminLogin;
