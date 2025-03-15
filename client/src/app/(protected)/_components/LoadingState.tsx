import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingState = () => {
  return (
    <Flex justify="center" align="center" height="200px">
      <Spinner size="xl" />
    </Flex>
  );
};

export default LoadingState;
