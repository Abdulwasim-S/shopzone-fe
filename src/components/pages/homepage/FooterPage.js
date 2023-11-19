import { Flex } from "@chakra-ui/react";
import React from "react";

const FooterPage = () => {
  return (
    <Flex
      bg={"gray.900"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"white"}
      minH={"15vh"}
    >
      <i>Copyrights @ ShopZone.in</i>
    </Flex>
  );
};

export default FooterPage;
