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
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";

const UserSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState(false);
  const navTo = useNavigate();

  const fieldValidationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required().min(8),
    userName: yup.string().required(),
    mobile: yup.number().required().min(10),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: "",
      userName: "",
      mobile: "",
      password: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (signUpInfo) => {
      try {
        setLoading(true);
        await axios
          .post("https://shopzone-backend.vercel.app/user/signup", {
            ...signUpInfo,
          })
          .then((res) => {
            if (res.status === 200) {
              navTo("/login");
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
              SignUp User
            </Heading>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="userName" isRequired>
              <FormLabel>UserName</FormLabel>
              <Input
                type="userName"
                id="userName"
                onChange={handleChange}
                bg={errors.userName ? "red.100" : ""}
                placeholder={errors.userName ? "required" : ""}
                value={values.userName}
              />
            </FormControl>
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
            <FormControl id="mobile" isRequired>
              <FormLabel>Mobile number </FormLabel>
              <Input
                type="mobile"
                id="mobile"
                onChange={handleChange}
                bg={errors.mobile ? "red.100" : ""}
                placeholder={errors.mobile ? "required" : ""}
                value={values.mobile}
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
              <Box color={"red.300"}>
                {errors.password ? "*min length should be 8" : ""}
              </Box>
            </FormControl>
            <Box color={"red.300"}>
              {credential ? "*User alredy exists" : ""}
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
                SignUp
              </Button>
            </Stack>
          </Stack>
        </Box>
        <NavLink to="/login">Already have account, click to login</NavLink>
      </Stack>
    </Flex>
  );
};
export default UserSignup;
