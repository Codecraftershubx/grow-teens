/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import React from "react";

const OverviewCard = ({item}: {item: any}) => {
  return (
    <Card key={item.id} borderRadius="lg" p={6} gap={6}>
      <CardHeader p={0} fontSize="md" fontWeight="md">
        {item.title}
      </CardHeader>
      <CardBody
        p={0}
        fontSize={{ base: "x-large", md: "2xl", lg: "4xl" }}
        fontWeight="semibold"
      >
        <Flex gap={2} alignItems="center">
          <Text>{item.value}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default OverviewCard;
