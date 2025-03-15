/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface CourseCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  programs?: any;
  statusType?: "PENDING" | "ACTIVE" | "COMPLETED";
  enrollDate?: string;
  onEnroll?: () => void;
}

const ProgramCard = ({

  image,
  title,
  description,
  // statusType,
  // enrollDate,
  // onEnroll,
  id,
}: CourseCardProps) => {
  return (
    <Link href={`/dashboard/course/${id}`} className="cursor-pointer">
      <Box
        p={5}
        h="full"
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
      </Box>
    </Link>
  );
};

export default ProgramCard;
