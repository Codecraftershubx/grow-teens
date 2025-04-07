/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  SimpleGrid,
  VStack,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { 
  FiBookOpen, 
  FiCheckCircle, 
  FiClock, 
  FiUsers 
} from "react-icons/fi";

import requestClient from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";

interface OverviewItem {
  id: number;
  title: string;
  value: string;
  icon: React.ReactElement;
  bgColor?: string;
  bgPattern: string;
}

const Dashboard = () => {
  const [enrolled, setEnrolled] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  const session = useSession();
  const sessionData = session.data as NextAuthUserSession;

  const fetchEnrolled = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await requestClient({
          token: sessionData?.user?.token,
        }).get("/programs");
        if (!response.data) {
          return;
        }
        setEnrolled(response.data?.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    });
  }, [sessionData?.user?.token]);

  useEffect(() => {
    if (sessionData?.user) {
      fetchEnrolled();
    }
  }, [fetchEnrolled, sessionData]);

  const dailyTip =
    "Remember to take short breaks during study sessions to improve focus!";

    console.log("enrolled", isPending);

  const overview: OverviewItem[] = [
    { 
      id: 1, 
      title: "Courses Enrolled", 
      value: enrolled?.length || "0", 
      icon: <FiBookOpen size={24} />,
      bgColor: "blue.50", 
      bgPattern: `radial-gradient(circle at 20% 20%, rgba(66, 153, 225, 0.15) 0%, rgba(66, 153, 225, 0.05) 25%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(66, 153, 225, 0.15) 0%, transparent 50%)`
    },
    { 
      id: 2, 
      title: "Completed Modules", 
      value: "0", 
      icon: <FiCheckCircle size={24} />,
      bgColor: "green.50", 
      bgPattern: `linear-gradient(135deg, rgba(72, 187, 120, 0.1) 25%, transparent 25%),
                  linear-gradient(225deg, rgba(72, 187, 120, 0.1) 25%, transparent 25%),
                  linear-gradient(45deg, rgba(72, 187, 120, 0.1) 25%, transparent 25%),
                  linear-gradient(315deg, rgba(72, 187, 120, 0.1) 25%, transparent 25%)`,
    },
    { 
      id: 3, 
      title: "Upcoming Deadlines", 
      value: "0", 
      icon: <FiClock size={24} />,
      bgColor: "red.50", 
      bgPattern: `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(245, 101, 101, 0.05) 5px, rgba(245, 101, 101, 0.05) 10px)`
    },
    { 
      id: 4, 
      title: "Mentorship Sessions", 
      value: "1", 
      icon: <FiUsers size={24} />,
      bgColor: "purple.50", 
      bgPattern: `radial-gradient(circle at 90% 10%, rgba(159, 122, 234, 0.15) 0%, transparent 30%),
                  radial-gradient(circle at 10% 90%, rgba(159, 122, 234, 0.1) 0%, transparent 30%),
                  radial-gradient(circle at 50% 50%, rgba(159, 122, 234, 0.05) 0%, transparent 50%)`
    },
  ];

  return (
    <Box p={6}>
      {/* Header Section */}
      {/* <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Dashboard
      </Text> */}

      {/* Quick Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
        {overview.map((item) => (
          <Card 
            key={item.id} 
            borderRadius="lg" 
            overflow="hidden"
            position="relative"
            boxShadow="md"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "lg",
            }}
          >
            <Box 
              position="absolute" 
              top={0} 
              left={0} 
              right={0} 
              bottom={0} 
              bg={item.bgColor}
              backgroundImage={item.bgPattern}
              backgroundSize="cover"
              opacity={1}
              zIndex={0}
            />
            <CardHeader p={4} fontSize="md" fontWeight="md" position="relative" zIndex={1}>
              <Flex align="center" gap={2}>
                {item.icon}
                <Text>{item.title}</Text>
              </Flex>
            </CardHeader>
            <CardBody
              p={4}
              fontSize={{ base: "x-large", md: "2xl", lg: "4xl" }}
              fontWeight="semibold"
              position="relative" 
              zIndex={1}
            >
              <Text>{item.value}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Daily Inspiration Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Daily Inspiration
        </Heading>
        <Box
          p={4}
          bg="blue.50"
          borderRadius="md"
        >
          <Text fontSize="lg" fontStyle="italic">
            {dailyTip}
          </Text>
        </Box>
      </Box>

      {/* Mentorship & Support Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Mentorship & Support
        </Heading>
        <Box
          p={4}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          boxShadow="md"
        >
          <Flex alignItems="center">
            <Avatar name="John Doe" src="https://bit.ly/kent-c-dodds" mr={4} />
            <Box>
              <Text fontWeight="bold">Your Mentor: John Doe</Text>
              <Text fontSize="sm">Next session: Today at 4 PM</Text>
            </Box>
          </Flex>
          <Button mt={4} size="sm" colorScheme="blue">
            Join Session
          </Button>
        </Box>
      </Box>

      {/* Community & Additional Resources Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Community Feed
        </Heading>
        <Box
          p={4}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          boxShadow="md"
        >
          <Text>
            This is a placeholder for the community feed where you can see
            posts, discussions, and shared resources from fellow GrowTeens
            users.
          </Text>
          <Button mt={4} size="sm" colorScheme="purple">
            View More
          </Button>
        </Box>
      </Box>

      {/* Additional Resources Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Additional Resources
        </Heading>
        <VStack spacing={4} align="stretch">
          <Button colorScheme="green" size="sm">
            Help & Support
          </Button>
          <Button colorScheme="orange" size="sm">
            Resource Library
          </Button>
          <Button colorScheme="blue" size="sm">
            Sponsorship Opportunities
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
