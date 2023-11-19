import { Box, Button, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";

const User = () => {
  const [state, setState] = useState(true);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6} bg={"gray.200"}>
        <Flex>
          <Button
            width={"50%"}
            m={1}
            onClick={() => setState(true)}
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Login
          </Button>
          <Button
            width={"50%"}
            m={1}
            onClick={() => setState(false)}
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            SignUp
          </Button>
        </Flex>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
          {state ? <UserLogin /> : <UserSignup />}
        </Box>
      </Stack>
    </Flex>
  );
};
export default User;
