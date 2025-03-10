"use client";

import { Box, Image, Text, VStack, Button } from "@chakra-ui/react";

interface CourseCardProps {
  image: string;
  title: string;
  description: string;
  programs: string[];
  statusType: "PENDING" | "ACTIVE" | "COMPLETED";
  enrollDate?: string;
  onEnroll?: () => void;
}

const ProgramCard = ({
  image,
  title,
  description,
  programs,
  statusType,
  enrollDate,
  onEnroll,
}: CourseCardProps) => {
  return (
    <Box
      p={5}
      h="96"
      borderRadius="lg"
      border="1px solid gray"
      boxShadow="lg"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image
        src={image}
        alt={title}
        borderRadius="md"
        mb={4}
        width="full"
        height="100px"
        objectFit="cover"
      />

      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {title}
      </Text>

      <Text fontSize="sm" color="gray.600" mb={3}>
        {description}
      </Text>

      <VStack align="start" spacing={1} mb={3} mt="auto">
        {/* <Text fontWeight="bold" color="black">
          Programs:
        </Text> */}
        {programs &&
          programs.map((program, index) => (
            <Text key={index} fontSize="sm" color="black">
              - {program}
            </Text>
          ))}
      </VStack>

      {statusType === "PENDING" ? (
        <Button colorScheme="red" w="full" onClick={onEnroll}>
          Enroll
        </Button>
      ) : statusType === "ACTIVE" ? (
        <Text fontSize="sm">
          Enrolled on:{" "}
          <Text as="span" fontWeight="bold">
            {enrollDate}
          </Text>
        </Text>
      ) : (
        <Text fontSize="sm">Completed</Text>
      )}
    </Box>
  );
};

export default ProgramCard;